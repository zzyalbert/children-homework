import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-widest text-cyan-200">
          ETHAN ZHONG
        </Link>
        <div className="flex items-center gap-5 text-sm text-zinc-200">
          <Link href="/essays" className="hover:text-cyan-300">
            作品
          </Link>
          <Link href="/admin" className="hover:text-cyan-300">
            管理
          </Link>
        </div>
      </nav>
    </header>
  );
}
