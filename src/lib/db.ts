import { createClient } from "@libsql/client";

export type Essay = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover_image: string | null;
  tags: string;
  published: number;
  created_at: string;
  updated_at: string;
};

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in environment variables.");
}

const client = createClient({ url, authToken });

const initPromise = client.execute(`
CREATE TABLE IF NOT EXISTS essays (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  tags TEXT NOT NULL DEFAULT '[]',
  published INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`);

function mapEssay(row: Record<string, unknown>): Essay {
  return {
    id: Number(row.id),
    title: String(row.title ?? ""),
    slug: String(row.slug ?? ""),
    summary: String(row.summary ?? ""),
    content: String(row.content ?? ""),
    cover_image: row.cover_image == null ? null : String(row.cover_image),
    tags: String(row.tags ?? "[]"),
    published: Number(row.published ?? 0),
    created_at: String(row.created_at ?? ""),
    updated_at: String(row.updated_at ?? ""),
  };
}

export async function getPublishedEssays() {
  await initPromise;
  const result = await client.execute(
    "SELECT * FROM essays WHERE published = 1 ORDER BY datetime(created_at) DESC",
  );
  return result.rows.map((row) => mapEssay(row as Record<string, unknown>));
}

export async function getAllEssays() {
  await initPromise;
  const result = await client.execute("SELECT * FROM essays ORDER BY datetime(created_at) DESC");
  return result.rows.map((row) => mapEssay(row as Record<string, unknown>));
}

export async function getEssayBySlug(slug: string) {
  await initPromise;
  const result = await client.execute({
    sql: "SELECT * FROM essays WHERE slug = ?",
    args: [slug],
  });
  const row = result.rows[0];
  return row ? mapEssay(row as Record<string, unknown>) : undefined;
}

export async function getEssayById(id: number) {
  await initPromise;
  const result = await client.execute({
    sql: "SELECT * FROM essays WHERE id = ?",
    args: [id],
  });
  const row = result.rows[0];
  return row ? mapEssay(row as Record<string, unknown>) : undefined;
}

export async function createEssay(input: {
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string | null;
  tags: string[];
  published: boolean;
}) {
  await initPromise;
  await client.execute({
    sql: `INSERT INTO essays (title, slug, summary, content, cover_image, tags, published, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
    args: [
      input.title,
      input.slug,
      input.summary,
      input.content,
      input.coverImage,
      JSON.stringify(input.tags),
      input.published ? 1 : 0,
    ],
  });
}

export async function updateEssay(
  id: number,
  input: {
    title: string;
    slug: string;
    summary: string;
    content: string;
    coverImage: string | null;
    tags: string[];
    published: boolean;
  },
) {
  await initPromise;
  await client.execute({
    sql: `UPDATE essays
          SET title = ?, slug = ?, summary = ?, content = ?,
              cover_image = ?, tags = ?, published = ?,
              updated_at = datetime('now')
          WHERE id = ?`,
    args: [
      input.title,
      input.slug,
      input.summary,
      input.content,
      input.coverImage,
      JSON.stringify(input.tags),
      input.published ? 1 : 0,
      id,
    ],
  });
}

export async function deleteEssay(id: number) {
  await initPromise;
  await client.execute({
    sql: "DELETE FROM essays WHERE id = ?",
    args: [id],
  });
}

export function parseTags(raw: string) {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
