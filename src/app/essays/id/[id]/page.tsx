import Image from "next/image";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { getEssayById, parseTags } from "@/lib/db";
import { renderMdx } from "@/lib/mdx";

export default async function EssayDetailById({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const essay = await getEssayById(Number(id));
  if (!essay || !essay.published) notFound();

  const content = await renderMdx(essay.content);
  const tags = parseTags(essay.tags);

  return (
    <div className="cosmic-shell relative min-h-screen overflow-hidden">
      <Image
        src="/cosmic-hero-bg.png"
        alt=""
        fill
        priority
        className="object-cover object-center opacity-65"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(8,145,178,0.2),transparent_20%),radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.16),transparent_24%),linear-gradient(120deg,rgba(2,6,23,0.18),rgba(2,6,23,0.8))]" />
      <Nav />
      <main className="relative z-10 mx-auto flex max-w-6xl justify-center px-6 py-10 md:py-14">
        <section className="w-full max-w-4xl rounded-3xl bg-black p-6 shadow-[0_25px_80px_rgba(0,0,0,0.7)] md:p-10">
          <h1 className="text-4xl font-black text-white">{essay.title}</h1>
          <p className="mt-2 text-zinc-400">{new Date(essay.created_at).toLocaleString()}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-cyan-300/15 px-3 py-1 text-sm text-cyan-200">
                #{tag}
              </span>
            ))}
          </div>
          {essay.cover_image ? <img src={essay.cover_image} alt={essay.title} className="mt-6 w-full rounded-2xl" /> : null}
          <article className="prose prose-invert prose-cyan mt-8 max-w-none">{content}</article>
        </section>
      </main>
    </div>
  );
}
