import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/auth";
import { buildEssayMarkdown, toSafeFileBaseName } from "@/lib/export-markdown";
import { getEssayById } from "@/lib/db";

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

  const markdown = buildEssayMarkdown(essay);
  const fileName = `${toSafeFileBaseName(essay)}.md`;

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "no-store",
    },
  });
}
