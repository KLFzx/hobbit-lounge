import { NextRequest, NextResponse } from 'next/server';
import { ensureNewsSchema, query } from '@/lib/db';

const MAX_CALLS_PER_DAY = Number(process.env.NEWS_MAX_OPENROUTER_CALLS_PER_DAY ?? '10');
const FRESHNESS_HOURS = Number(process.env.NEWS_FRESHNESS_HOURS ?? '1');

// Simple pools from /public/images to decorate posts and users
const NEWS_IMAGES = [
  '/posts/1.jpg',
  '/posts/2.jpg',
  '/posts/3.jpg',
  '/posts/4.jpg',
  '/posts/5.jpg'
];

const AVATAR_IMAGES = [
  '/avatars/bilbo.jpg',
  '/avatars/frodo.jpg',
  '/avatars/gandalf.jpg',
  '/avatars/legolas.jpg',
  '/avatars/thorin.jpg',
];

const HOBBIT_CANON_NAMES = [
  'Bilbo Baggins',
  'Frodo Baggins',
  'Samwise Gamgee',
  'Meriadoc Brandybuck',
  'Peregrin Took',
  'Gandalf',
  'Thorin Oakenshield',
  'Balin',
  'Dwalin',
  'Bofur',
  'Bombur',
  'Bard the Bowman',
  'Thranduil',
  'Legolas',
  'Gloin',
  'Kili',
  'Fili',
  'Beorn',
  'Smaug',
];

const NEWS_TOPICS = [
  'modding updates and new features',
  'patch notes and bug fixes',
  'player discoveries and hidden easter eggs',
  'weird glitches or cursed screenshots',
  'speedruns or challenge runs in Middle-earth',
  'trading, bartering, and deals across the map',
  'events or gatherings at inns and towns',
  'travels and journeys between iconic locations',
  'behind-the-scenes notes from modders or devs',
  'tips, tricks, or build guides for specific quests',
];

const POST_STYLES = [
  'short hype announcement, 1 sentences',
  'casual in-character diary entry, 24 short paragraphs',
  'Reddit-style story time about something that happened in-game',
  'bug report that accidentally turns into a funny story',
  'help-me post asking the community for advice',
  'in-universe town crier style proclamation',
  'chill late-night post from a tired traveller at an inn',
  'excited screenshot-style caption describing a cool moment',
];


function randomOf<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomUnique<T>(arr: T[], count: number): T[] {
  const pool = [...arr];
  const result: T[] = [];
  const n = Math.min(count, pool.length);
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    result.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return result;
}

function makeRandomAuthor() {
  return randomOf(HOBBIT_CANON_NAMES);
}

function makeRandomHandle(base?: string) {
  const core = base?.replace(/\s+/g, '').toLowerCase() || HOBBIT_CANON_NAMES[0].replace(/\s+/g, '').toLowerCase();
  return `@${core}`;
}

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
  // Default to xAI Grok model via OpenRouter, but allow override via env
  const model = process.env.OPENROUTER_MODEL ?? 'x-ai/grok-4.1-fast:free';
  if (!apiKey) return;

  const characters = pickRandomUnique(HOBBIT_CANON_NAMES, 3);
  const topics = pickRandomUnique(NEWS_TOPICS, 3);
  const styles = pickRandomUnique(POST_STYLES, 3);

  const prompt = `You are writing posts for a small but very active fan community around the video game "The Hobbit" and its mods.
The posts appear in a public news/feed page on a website called Hobbit Reddit.

The community vibe is a mix of:
- Modding updates, patch notes, WIP teasers
- Players sharing discoveries, easter eggs, weird bugs
- Questions to developers and modders, AMA-style threads
- Short hype announcements about events in Middle-Earth
- Short stories from middle-earth. Can be from any house-keeping field, travels, deals, trades, opportunities
- Longer, Reddit-like posts with small stories, tips, or behind-the-scenes notes

Write posts that will feel like they come from some character from the Middle-earth universe or a community member, but DO NOT include usernames.
The style should feel like a Middle-earth subreddit: sometimes short, sometimes a few paragraphs. Vary the length naturally.
Keep everything in-universe and related to The Hobbit universe, its areas, quests, characters, glitches, mods, tools, or random events from Middle-earth, stories from characters.

You will write EXACTLY 3 posts, each based on the following briefs:

1) Character: ${characters[0]} | Topic: ${topics[0]} | Style: ${styles[0]}
2) Character: ${characters[1]} | Topic: ${topics[1]} | Style: ${styles[1]}
3) Character: ${characters[2]} | Topic: ${topics[2]} | Style: ${styles[2]}

Each post should clearly feel like it is written by that character or a player strongly associated with them, staying in-universe.

Return JSON ONLY, no markdown, with the following structure:
[
  {
    "author": "hobbit-themed display name (e.g. \"Bilbo of Dale\")",
    "handle": "hobbit-themed modern @handle, must start with @ and be lowercase/underscored, can have numbers (e.g. \"@bilbo7\", \"@gandalfwhite\")",
    "content": "full text of the post",
    "comments": [
      { "author": "display name for commenter", "handle": "@handle for commenter", "content": "a short comment reacting to the post" },
      { "author": "display name for commenter", "handle": "@handle for commenter", "content": "another short comment reacting to the post" }
    ]
  },
  {
    "author": "...second post...",
    "handle": "...",
    "content": "...",
    "comments": [ ... ]
  },
  {
    "author": "...third post...",
    "handle": "...",
    "content": "...",
    "comments": [ ... ]
  }
]

Rules:
- author / handle: must be hobbit-world or Middle-earth inspired, but handles use modern style like a subreddit user (lowercase, no spaces, underscores allowed, must start with @).
- content: 16 paragraphs, natural language, no markdown, no quotes around the whole text.
- comments: 13 sentences each, conversational, no markdown.
- No backticks, no explanation outside of the JSON array.`;

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
        { role: 'system', content: 'You are a JSON-only generator for a Hobbit fan site.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
      reasoning: { enabled: true },
    }),
  });

  if (!res.ok) return;

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content;
  if (!raw || typeof raw !== 'string') return;

  let parsed: { author?: string; handle?: string; content: string; comments?: { author?: string; handle?: string; content: string }[] }[] = [];
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

    // Use provided author/handle if present, otherwise generate hobbit-themed ones
    const baseAuthor = item.author && item.author.trim().length > 0 ? item.author.trim() : makeRandomAuthor();
    const baseHandle = item.handle && item.handle.trim().startsWith('@') ? item.handle.trim() : makeRandomHandle(baseAuthor);

    // Randomly attach an image from our pool to some posts
    let image: string | null = null;
    if (NEWS_IMAGES.length && Math.random() < 0.6) {
      image = NEWS_IMAGES[Math.floor(Math.random() * NEWS_IMAGES.length)];
    }

    const avatar = AVATAR_IMAGES.length ? randomOf(AVATAR_IMAGES) : '/images/logo.png';

    const meta: Record<string, unknown> = image
      ? { model, image, author: baseAuthor, handle: baseHandle, avatar }
      : { model, author: baseAuthor, handle: baseHandle, avatar };

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

      const commentAuthor = c.author && c.author.trim().length > 0 ? c.author.trim() : makeRandomAuthor();
      const commentHandle = c.handle && c.handle.trim().startsWith('@') ? c.handle.trim() : makeRandomHandle(commentAuthor);
      const commentAvatar = AVATAR_IMAGES.length ? randomOf(AVATAR_IMAGES) : '/images/logo.png';

      await query(
        'INSERT INTO news_comments (post_id, content, meta) VALUES ($1, $2, $3);',
        [postId, c.content.trim(), { author: commentAuthor, handle: commentHandle, avatar: commentAvatar }],
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
    image: string | null;
    author: string | null;
    handle: string | null;
    avatar: string | null;
  }>(
    "SELECT id, content, created_at, source, meta->>'image' AS image, meta->>'author' AS author, meta->>'handle' AS handle, meta->>'avatar' AS avatar FROM news_posts ORDER BY created_at DESC LIMIT 30;",
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
      author: string | null;
      handle: string | null;
      avatar: string | null;
    }>(
      "SELECT id, post_id, content, created_at, meta->>'author' AS author, meta->>'handle' AS handle, meta->>'avatar' AS avatar FROM news_comments WHERE post_id = ANY($1) ORDER BY created_at ASC;",
      [ids],
    );
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
