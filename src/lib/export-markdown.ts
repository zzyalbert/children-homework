import { Essay, parseTags } from "@/lib/db";

function safeLine(value: string) {
  return value.replace(/\r?\n/g, " ").trim();
}

export function toSafeFileBaseName(essay: Essay) {
  const base = (essay.slug || essay.title || `essay-${essay.id}`)
    .toLowerCase()
    .replace(/[^a-z0-9\-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || `essay-${essay.id}`;
}

export function buildEssayMarkdown(essay: Essay) {
  const tags = parseTags(essay.tags);
  const lines = [
    "---",
    `title: "${safeLine(essay.title).replace(/"/g, '\\"')}"`,
    `slug: "${safeLine(essay.slug).replace(/"/g, '\\"')}"`,
    `published: ${essay.published ? "true" : "false"}`,
    `created_at: "${essay.created_at}"`,
    `updated_at: "${essay.updated_at}"`,
    `tags: [${tags.map((tag) => `"${safeLine(tag).replace(/"/g, '\\"')}"`).join(", ")}]`,
    `summary: "${safeLine(essay.summary).replace(/"/g, '\\"')}"`,
    `cover_image: "${(essay.cover_image ?? "").replace(/"/g, '\\"')}"`,
    "---",
    "",
    essay.content || "",
    "",
  ];

  return lines.join("\n");
}
