export function toSlug(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ensureSlug(input: string, fallbackSeed?: number) {
  const slug = toSlug(input);
  if (slug) return slug;

  const now = Date.now().toString(36);
  const seed = (fallbackSeed ?? Math.floor(Math.random() * 1e6)).toString(36);
  return `essay-${now}-${seed}`;
}
