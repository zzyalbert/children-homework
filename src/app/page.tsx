import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";

export default function Home() {
  return (
    <div className="cosmic-shell tech-grid scanlines relative min-h-screen overflow-hidden">
      <Image
        src="/cosmic-hero-bg.png"
        alt=""
        fill
        priority
        className="object-cover object-center opacity-70"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(8,145,178,0.2),transparent_20%),radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.16),transparent_24%),linear-gradient(120deg,rgba(2,6,23,0.1),rgba(2,6,23,0.7))]" />
      <Nav />
      <main className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:py-28">
        <section className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/30 bg-[var(--panel)] px-4 py-2 shadow-[0_0_35px_rgba(34,211,238,0.18)] backdrop-blur-xl">
            <p className="text-xs tracking-[0.3em] text-cyan-200">PRIVATE WRITING GALLERY</p>
          </div>
          <h1 className="max-w-xl text-5xl font-black leading-tight text-white md:text-6xl">
            仲城铄
            <br />
            作文展览馆
          </h1>
          <p className="max-w-xl text-lg text-zinc-200">
            这里是仲城铄的私人作文展览馆，只展示他自己的作文作品与写作片段。每一篇文字，都是成长中的一段真实记录。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/essays" className="rounded-xl bg-cyan-300 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-200">
              进入作品展厅
            </Link>
            <Link href="/admin" className="rounded-xl border border-cyan-300/40 px-6 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-300/10">
              馆内管理
            </Link>
          </div>
        </section>
        <section className="relative z-10 min-h-[420px]">
          <Image
            src="/icon-book-holo.png"
            alt=""
            width={192}
            height={192}
            className="floating-book absolute -left-3 bottom-0 opacity-90 drop-shadow-[0_0_55px_rgba(34,211,238,0.35)]"
          />
          <div className="absolute -left-4 -top-4 h-52 w-52 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -bottom-8 right-2 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="relative mt-24 rounded-[28px] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[0_0_80px_rgba(34,211,238,0.22)] backdrop-blur-2xl">
            <p className="mb-3 text-sm uppercase tracking-[0.24em] text-cyan-200/80">展馆导览</p>
            <h2 className="mb-4 text-2xl font-bold text-white">从第一篇到最新一篇</h2>
            <p className="text-zinc-300">按时间浏览仲城铄的写作轨迹，看看他如何从最初的短文，慢慢写出更完整、更有想象力的作品。</p>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-cyan-100/80">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3">
                <p className="text-lg font-bold text-white">童年</p>
                <p>一年年的写作痕迹</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3">
                <p className="text-lg font-bold text-white">想象</p>
                <p>小小世界的故事</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3">
                <p className="text-lg font-bold text-white">成长</p>
                <p>文字里的变化</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
