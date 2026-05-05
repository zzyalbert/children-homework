import Link from "next/link";
import { loginAction } from "./actions";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
      <form action={loginAction} className="w-full max-w-md space-y-4 rounded-2xl border border-white/10 bg-zinc-900 p-6">
        <h1 className="text-2xl font-bold text-white">展馆管理登录</h1>
        <p className="text-sm text-zinc-400">输入管理员密码，维护仲城铄的个人展览馆</p>
        <input name="password" type="password" className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white" placeholder="输入密码" required />
        {error ? <p className="text-sm text-rose-400">密码错误</p> : null}
        <button className="w-full rounded-lg bg-cyan-300 px-4 py-2 font-semibold text-zinc-950">登录管理</button>
        <Link href="/" className="block text-center text-sm text-cyan-300">返回展馆首页</Link>
      </form>
    </main>
  );
}
