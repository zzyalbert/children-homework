import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminLoggedIn } from "@/lib/auth";
import { getAllEssays, parseTags } from "@/lib/db";
import { deleteEssayAction, logoutAction } from "./actions";
import { UploadImageClient } from "@/components/UploadImageClient";

export default async function AdminPage() {
  if (!(await isAdminLoggedIn())) redirect("/admin/login");

  const essays = getAllEssays();

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-black text-white">仲城铄展馆管理台</h1>
          <div className="flex gap-2">
            <Link href="/admin/new" className="rounded-lg bg-cyan-300 px-4 py-2 font-semibold text-zinc-950">新增作品</Link>
            <form action={logoutAction}>
              <button className="rounded-lg border border-white/20 px-4 py-2 text-white">退出</button>
            </form>
          </div>
        </header>

        <UploadImageClient />

        <section className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
          <h2 className="mb-3 text-lg font-semibold text-white">作品列表</h2>
          <div className="space-y-3">
            {essays.map((essay) => (
              <div key={essay.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-700 p-3">
                <div>
                  <p className="font-semibold text-white">{essay.title}</p>
                  <p className="text-xs text-zinc-400">/{essay.slug} · {essay.published ? "展出中" : "未展出"}</p>
                  <p className="text-xs text-cyan-300">{parseTags(essay.tags).join(" / ")}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/edit/${essay.id}`} className="rounded-md border border-cyan-300/40 px-3 py-1 text-sm text-cyan-200">编辑</Link>
                  <form action={deleteEssayAction}>
                    <input type="hidden" name="id" value={essay.id} />
                    <button className="rounded-md border border-rose-400/40 px-3 py-1 text-sm text-rose-300">删除</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
