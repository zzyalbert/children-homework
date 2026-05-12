import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/auth";

export async function POST(req: Request) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only images are supported" }, { status: 400 });
  }

  const ext = (file.name.split(".").pop() || "png").toLowerCase().replace(/[^a-z0-9]/g, "");
  const safeExt = ext || "png";
  const safeName = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "image";
  const ymd = new Date().toISOString().slice(0, 10).replace(/-/g, "/");
  const objectKey = `essays/${ymd}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}.${safeExt}`;

  const { url } = await put(objectKey, file, {
    access: "public",
  });

  return NextResponse.json({ url });
}
