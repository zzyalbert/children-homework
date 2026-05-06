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
    <div className="min-h-screen bg-zinc-950">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-10">
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
      </main>
    </div>
  );
}
