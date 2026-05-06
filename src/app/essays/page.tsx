import Image from "next/image";
import Link from "next/link";
import { EssayCard } from "@/components/EssayCard";
import { Nav } from "@/components/Nav";
import { getPublishedEssays, parseTags } from "@/lib/db";

export default async function EssaysPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const all = (await getPublishedEssays()).map((item) => ({
    ...item,
    tagsArr: parseTags(item.tags),
  }));

  const tags = Array.from(new Set(all.flatMap((item) => item.tagsArr))).sort();
  const essays = tag ? all.filter((item) => item.tagsArr.includes(tag)) : all;

  return (
    <div className="cosmic-shell tech-grid scanlines min-h-screen overflow-hidden">
      <Image
        src="/cosmic-gallery-bg.png"
        alt=""
        fill
        className="object-cover object-center opacity-60"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.45),rgba(2,6,23,0.82)),radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_30%)]" />
      <Nav />
      <main className="relative z-10 mx-auto max-w-6xl space-y-8 px-6 py-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/30 bg-[var(--panel)] px-4 py-2 backdrop-blur-xl">
              <span className="text-xs tracking-[0.28em] text-cyan-200">PRIVATE COLLECTION</span>
            </div>
            <h1 className="text-3xl font-black text-white md:text-4xl">仲城铄作品展厅</h1>
            <p className="max-w-2xl text-zinc-300">这里是仲城铄个人作文作品的集中展示区，按时间与主题整理，方便家人和朋友阅读。</p>
          </div>
          <Image
            src="/icon-starburst-v2.png"
            alt=""
            width={90}
            height={90}
            className="floating-star hidden opacity-90 drop-shadow-[0_0_32px_rgba(236,72,153,0.42)] md:block"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/essays" className={`rounded-full px-3 py-1 text-sm ${!tag ? "bg-cyan-300 text-zinc-950" : "bg-zinc-800 text-zinc-300"}`}>
            全部主题
          </Link>
          {tags.map((t) => (
            <Link key={t} href={`/essays?tag=${encodeURIComponent(t)}`} className={`rounded-full px-3 py-1 text-sm ${tag === t ? "bg-cyan-300 text-zinc-950" : "bg-zinc-800 text-zinc-300"}`}>
              #{t}
            </Link>
          ))}
        </div>
        {essays.length === 0 ? (
          <p className="text-zinc-400">展厅里暂时还没有收录作品。</p>
        ) : (
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {essays.map((item) => (
              <EssayCard
                key={item.id}
                id={item.id}
                title={item.title}
                slug={item.slug}
                summary={item.summary}
                tags={item.tagsArr}
                coverImage={item.cover_image}
                createdAt={item.created_at}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
