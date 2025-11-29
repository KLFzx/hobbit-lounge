import { NextRequest, NextResponse } from 'next/server';
import { ensureNewsSchema, query } from '@/lib/db';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  await ensureNewsSchema();

  const { id } = params;

  const { rows: posts } = await query<{
    id: string;
    content: string;
    created_at: string;
    source: string;
  }>('SELECT id, content, created_at, source FROM news_posts WHERE id = $1;', [id]);

  if (!posts[0]) {
    return new NextResponse('Not found', { status: 404 });
  }

  const { rows: comments } = await query<{
    id: string;
    post_id: string;
    content: string;
    created_at: string;
  }>('SELECT id, post_id, content, created_at FROM news_comments WHERE post_id = $1 ORDER BY created_at ASC;', [id]);

  return NextResponse.json({ post: posts[0], comments });
}
