import JSZip from "jszip";
import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/auth";
import { toSafeFileBaseName } from "@/lib/export-markdown";
import { getEssayById } from "@/lib/db";
import { buildEssayZip } from "@/lib/export-package";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const essay = await getEssayById(Number(id));
  if (!essay) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const zip = new JSZip();
  await buildEssayZip(zip, essay);
  const body = await zip.generateAsync({ type: "arraybuffer" });
  const fileName = `${toSafeFileBaseName(essay)}.zip`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "no-store",
    },
  });
}
