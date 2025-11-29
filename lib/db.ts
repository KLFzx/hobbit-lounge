import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('DATABASE_URL is not set. Neon Postgres connection will fail at runtime.');
}

export const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

export async function query<T = any>(text: string, params?: any[]): Promise<{ rows: T[] }> {
  const client = await pool.connect();
  try {
    const res = await (client as any).query(text, params);
    return { rows: res.rows as T[] };
  } finally {
    client.release();
  }
}

export async function ensureNewsSchema() {
  await query(`
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    CREATE TABLE IF NOT EXISTS news_posts (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      content text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      source text NOT NULL,
      meta jsonb
    );

    CREATE TABLE IF NOT EXISTS news_comments (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      post_id uuid NOT NULL REFERENCES news_posts(id) ON DELETE CASCADE,
      content text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      meta jsonb
    );

    CREATE TABLE IF NOT EXISTS news_generation_stats (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at timestamptz NOT NULL DEFAULT now(),
      calls_used int NOT NULL,
      posts_generated int NOT NULL
    );
  `);
}
