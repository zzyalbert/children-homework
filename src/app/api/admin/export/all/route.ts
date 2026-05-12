import JSZip from "jszip";
import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/auth";
import { getAllEssays } from "@/lib/db";
import { toSafeFileBaseName } from "@/lib/export-markdown";
import { buildEssayZip } from "@/lib/export-package";

export async function GET() {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const essays = await getAllEssays();
  const zip = new JSZip();

  for (const essay of essays) {
    const folder = `${toSafeFileBaseName(essay)}/`;
    await buildEssayZip(zip, essay, folder);
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
