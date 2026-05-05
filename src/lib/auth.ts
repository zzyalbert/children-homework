import { cookies } from "next/headers";

const AUTH_COOKIE = "kids_writer_admin";

export async function isAdminLoggedIn() {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE)?.value === "ok";
}

export async function login(password: string) {
  if (!process.env.ADMIN_PASSWORD) return false;
  if (password !== process.env.ADMIN_PASSWORD) return false;

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, "ok", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return true;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
}
