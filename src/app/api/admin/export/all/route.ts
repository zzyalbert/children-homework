import JSZip from "jszip";
import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/auth";
import { getAllEssays } from "@/lib/db";
import { buildEssayMarkdown, toSafeFileBaseName } from "@/lib/export-markdown";

export async function GET() {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const essays = await getAllEssays();
  const zip = new JSZip();

  for (const essay of essays) {
    const fileName = `${toSafeFileBaseName(essay)}.md`;
    zip.file(fileName, buildEssayMarkdown(essay));
  }

  const body = await zip.generateAsync({ type: "arraybuffer" });
  const now = new Date().toISOString().slice(0, 10);
  const archiveName = `ethan-zhong-essays-${now}.zip`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${archiveName}"`,
      "Cache-Control": "no-store",
    },
  });
}
