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
    <div className="cosmic-shell tech-grid min-h-screen overflow-hidden bg-slate-100 text-slate-900">
      <Image
        src="/cosmic-gallery-bg.png"
        alt=""
        fill
        className="object-cover object-center opacity-20"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(56,189,248,0.20),transparent_35%),radial-gradient(circle_at_90%_0%,rgba(251,191,36,0.20),transparent_30%),linear-gradient(180deg,rgba(248,250,252,0.94),rgba(241,245,249,0.94))]" />
      <Nav />
      <main className="relative z-10 mx-auto max-w-6xl space-y-8 px-6 py-10">
        <div className="rounded-3xl border border-sky-200/70 bg-white/75 p-6 shadow-[0_20px_70px_rgba(14,116,144,0.16)] backdrop-blur-xl md:p-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/70 bg-sky-50 px-4 py-2">
              <span className="text-xs font-semibold tracking-[0.22em] text-sky-700">PRIVATE COLLECTION</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 md:text-4xl">仲城铄作品展厅</h1>
            <p className="max-w-3xl text-slate-700">这里是仲城铄个人作文作品的集中展示区，按时间与主题整理，方便家人和朋友阅读。</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm backdrop-blur">
          <Link href="/essays" className={`rounded-full px-3 py-1 text-sm font-medium ${!tag ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
            全部主题
          </Link>
          {tags.map((t) => (
            <Link key={t} href={`/essays?tag=${encodeURIComponent(t)}`} className={`rounded-full px-3 py-1 text-sm font-medium ${tag === t ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
              #{t}
            </Link>
          ))}
        </div>
        {essays.length === 0 ? (
          <p className="rounded-2xl border border-slate-200 bg-white/80 p-6 text-slate-600 shadow-sm">展厅里暂时还没有收录作品。</p>
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
