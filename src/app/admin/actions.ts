"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteEssay, updateEssay, createEssay } from "@/lib/db";
import { logout } from "@/lib/auth";
import { toSlug } from "@/lib/slug";

function parseInput(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const manualSlug = String(formData.get("slug") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const coverImage = String(formData.get("coverImage") || "").trim() || null;
  const tags = String(formData.get("tags") || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
  const published = String(formData.get("published") || "") === "on";

  return {
    title,
    slug: toSlug(manualSlug || title),
    summary,
    content,
    coverImage,
    tags,
    published,
  };
}

export async function createEssayAction(formData: FormData) {
  await createEssay(parseInput(formData));
  revalidatePath("/essays");
  revalidatePath("/");
  redirect("/admin");
}

export async function updateEssayAction(formData: FormData) {
  const id = Number(formData.get("id"));
  await updateEssay(id, parseInput(formData));
  revalidatePath("/essays");
  revalidatePath(`/essays/${String(formData.get("oldSlug") || "")}`);
  redirect("/admin");
}

export async function deleteEssayAction(formData: FormData) {
  const id = Number(formData.get("id"));
  await deleteEssay(id);
  revalidatePath("/essays");
  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}
