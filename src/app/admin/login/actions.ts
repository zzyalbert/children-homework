"use server";

import { redirect } from "next/navigation";
import { login } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") || "");
  const ok = await login(password);
  if (!ok) {
    redirect("/admin/login?error=1");
  }
  redirect("/admin");
}
