import JSZip from "jszip";
import { Essay } from "@/lib/db";
import { buildEssayMarkdown, toSafeFileBaseName } from "@/lib/export-markdown";

const CONTENT_TYPE_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/avif": "avif",
};

function extractMarkdownImageUrls(content: string) {
  const urls = new Set<string>();

  const mdImg = /!\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let m: RegExpExecArray | null;
  while ((m = mdImg.exec(content))) {
    if (m[1]) urls.add(m[1]);
  }

  const htmlImg = /<img[^>]*src=["']([^"']+)["'][^>]*>/g;
  while ((m = htmlImg.exec(content))) {
    if (m[1]) urls.add(m[1]);
  }

  return [...urls];
}

function extFromUrlOrType(url: string, contentType: string | null) {
  const pathPart = url.split("?")[0].split("#")[0];
  const fromPath = pathPart.includes(".") ? pathPart.split(".").pop() : "";
  const safePathExt = (fromPath || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  if (safePathExt) return safePathExt;

  if (contentType && CONTENT_TYPE_EXT[contentType.toLowerCase()]) {
    return CONTENT_TYPE_EXT[contentType.toLowerCase()];
  }

  return "bin";
}

async function fetchImageBuffer(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type");
    const ab = await res.arrayBuffer();
    return { data: ab, contentType };
  } catch {
    return null;
  }
}

export async function buildEssayZip(zip: JSZip, essay: Essay, folderPrefix = "") {
  const base = toSafeFileBaseName(essay);
  const mdPath = `${folderPrefix}${base}.md`;
  const assetsPrefix = `${folderPrefix}assets/`;

  const sourceUrls = new Set<string>();
  if (essay.cover_image) sourceUrls.add(essay.cover_image);
  for (const url of extractMarkdownImageUrls(essay.content || "")) {
    sourceUrls.add(url);
  }

  const urlToLocal = new Map<string, string>();
  let imageIndex = 1;

  for (const url of sourceUrls) {
    if (!/^https?:\/\//i.test(url)) continue;
    const payload = await fetchImageBuffer(url);
    if (!payload) continue;

    const ext = extFromUrlOrType(url, payload.contentType);
    const assetName = `image-${String(imageIndex).padStart(2, "0")}.${ext}`;
    imageIndex += 1;
    const assetPath = `${assetsPrefix}${assetName}`;

    zip.file(assetPath, payload.data);
    urlToLocal.set(url, `./assets/${assetName}`);
  }

  let markdown = buildEssayMarkdown(essay);
  for (const [url, local] of urlToLocal) {
    markdown = markdown.split(url).join(local);
  }

  zip.file(mdPath, markdown);
}
