import { NextResponse } from "next/server";
import { getPublishedEssays, parseTags } from "@/lib/db";

export async function GET() {
  const data = (await getPublishedEssays()).map((x) => ({
    ...x,
    tags: parseTags(x.tags),
  }));
  return NextResponse.json(data);
}
