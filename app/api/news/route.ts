import { NextRequest, NextResponse } from 'next/server';
import { ensureNewsSchema, query } from '@/lib/db';

const MAX_CALLS_PER_DAY = Number(process.env.NEWS_MAX_OPENROUTER_CALLS_PER_DAY ?? '10');
const FRESHNESS_HOURS = Number(process.env.NEWS_FRESHNESS_HOURS ?? '6');

async function getTodayCallCount() {
  const { rows } = await query<{ sum: string | null }>(
    'SELECT COALESCE(SUM(calls_used), 0) AS sum FROM news_generation_stats WHERE created_at::date = CURRENT_DATE;',
  );
  return Number(rows[0]?.sum ?? 0);
}

async function getLatestAiPostAgeHours() {
  const { rows } = await query<{ age_hours: number | null }>(
    `SELECT EXTRACT(EPOCH FROM (NOW() - MAX(created_at))) / 3600 AS age_hours
     FROM news_posts
     WHERE source = 'ai';`,
  );
  const age = rows[0]?.age_hours;
  return age == null ? null : Number(age);
}

async function generatePostsIfNeeded() {
  const callsToday = await getTodayCallCount();
  if (callsToday >= MAX_CALLS_PER_DAY) return;

  const ageHours = await getLatestAiPostAgeHours();
  if (ageHours !== null && ageHours < FRESHNESS_HOURS) return;

  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL ?? 'openrouter/openai/gpt-4o-mini';
  if (!apiKey) return;

  const prompt = `You are generating short in-universe news updates about The Hobbit (2003) video game and its modding community.
Return JSON ONLY, in the following shape:
[
  {
    "content": "... main news text ...",
    "comments": [
      { "content": "short comment text" },
      { "content": "short comment text" }
    ]
  },
  ... (2-3 items total)
]
Each content string should be at most 2 sentences, no markdown, no quotes.`;

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': process.env.OPENROUTER_SITE_URL ?? '',
      'X-Title': 'Hobbit Lounge News',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: 'You are a JSON-only generator for a Hobbit 2003 fan site.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
    }),
  });

  if (!res.ok) return;

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content;
  if (!raw || typeof raw !== 'string') return;

  let parsed: { content: string; comments?: { content: string }[] }[] = [];
  try {
    // Strip code fences if model wrapped JSON
    const jsonText = raw.replace(/```json/gi, '').replace(/```/g, '').trim();
    parsed = JSON.parse(jsonText);
  } catch {
    return;
  }

  if (!Array.isArray(parsed) || parsed.length === 0) return;
  let postsGenerated = 0;

  for (const item of parsed) {
    if (!item || typeof item.content !== 'string' || !item.content.trim()) continue;

    const content = item.content.trim();
    const meta = { model };

    const { rows: postRows } = await query<{ id: string }>(
      'INSERT INTO news_posts (content, source, meta) VALUES ($1, $2, $3) RETURNING id;',
      [content, 'ai', meta],
    );

    const postId = postRows[0]?.id;
    if (!postId) continue;

    postsGenerated += 1;

    const comments = Array.isArray(item.comments) ? item.comments : [];
    for (const c of comments) {
      if (!c || typeof c.content !== 'string' || !c.content.trim()) continue;
      await query(
        'INSERT INTO news_comments (post_id, content, meta) VALUES ($1, $2, $3);',
        [postId, c.content.trim(), meta],
      );
    }
  }

  if (postsGenerated > 0) {
    await query(
      'INSERT INTO news_generation_stats (calls_used, posts_generated) VALUES ($1, $2);',
      [1, postsGenerated],
    );
  }
}

export async function GET(_req: NextRequest) {
  await ensureNewsSchema();

  // Try generation (non-blocking for errors)
  try {
    await generatePostsIfNeeded();
  } catch (e) {
    console.error('Error generating AI news posts', e);
  }

  const { rows } = await query<{
    id: string;
    content: string;
    created_at: string;
    source: string;
  }>(
    'SELECT id, content, created_at, source FROM news_posts ORDER BY created_at DESC LIMIT 30;',
  );

  // Fetch comments per post
  const ids = rows.map((r) => r.id);
  let commentsByPost: Record<string, { id: string; post_id: string; content: string; created_at: string }[]> = {};
  if (ids.length) {
    const { rows: crows } = await query<{
      id: string;
      post_id: string;
      content: string;
      created_at: string;
    }>('SELECT id, post_id, content, created_at FROM news_comments WHERE post_id = ANY($1) ORDER BY created_at ASC;', [
      ids,
    ]);
    for (const c of crows) {
      (commentsByPost[c.post_id] ??= []).push(c);
    }
  }

  const result = rows.map((p) => ({
    ...p,
    comments: commentsByPost[p.id] ?? [],
  }));

  return NextResponse.json({ posts: result });
}
