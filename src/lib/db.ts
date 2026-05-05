import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

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

const dbPath = path.join(process.cwd(), "data", "app.db");
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new DatabaseSync(dbPath);
db.exec(`
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

export function getPublishedEssays() {
  return db
    .prepare("SELECT * FROM essays WHERE published = 1 ORDER BY datetime(created_at) DESC")
    .all() as Essay[];
}

export function getAllEssays() {
  return db.prepare("SELECT * FROM essays ORDER BY datetime(created_at) DESC").all() as Essay[];
}

export function getEssayBySlug(slug: string) {
  return db.prepare("SELECT * FROM essays WHERE slug = ?").get(slug) as Essay | undefined;
}

export function getEssayById(id: number) {
  return db.prepare("SELECT * FROM essays WHERE id = ?").get(id) as Essay | undefined;
}

export function createEssay(input: {
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string | null;
  tags: string[];
  published: boolean;
}) {
  db.prepare(
    `INSERT INTO essays (title, slug, summary, content, cover_image, tags, published, updated_at)
     VALUES (:title, :slug, :summary, :content, :cover_image, :tags, :published, datetime('now'))`,
  ).run({
    title: input.title,
    slug: input.slug,
    summary: input.summary,
    content: input.content,
    cover_image: input.coverImage,
    tags: JSON.stringify(input.tags),
    published: input.published ? 1 : 0,
  });
}

export function updateEssay(
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
  db.prepare(
    `UPDATE essays
     SET title = :title, slug = :slug, summary = :summary, content = :content,
         cover_image = :cover_image, tags = :tags, published = :published,
         updated_at = datetime('now')
     WHERE id = :id`,
  ).run({
    id,
    title: input.title,
    slug: input.slug,
    summary: input.summary,
    content: input.content,
    cover_image: input.coverImage,
    tags: JSON.stringify(input.tags),
    published: input.published ? 1 : 0,
  });
}

export function deleteEssay(id: number) {
  db.prepare("DELETE FROM essays WHERE id = ?").run(id);
}

export function parseTags(raw: string) {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
