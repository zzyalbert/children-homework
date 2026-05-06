import Link from "next/link";

export function EssayCard(props: {
  id: number;
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  coverImage: string | null;
  createdAt: string;
}) {
  const href = props.slug ? `/essays/${props.slug}` : `/essays/id/${props.id}`;

  return (
    <article className="group overflow-hidden rounded-2xl border border-cyan-400/20 bg-zinc-950/70 shadow-[0_0_40px_rgba(34,211,238,0.12)] transition hover:border-cyan-300/40">
      {props.coverImage ? (
        <img src={props.coverImage} alt={props.title} className="h-44 w-full object-cover transition duration-500 group-hover:scale-105" />
      ) : null}
      <div className="space-y-3 p-5">
        <p className="text-xs text-zinc-400">{new Date(props.createdAt).toLocaleDateString()}</p>
        <h3 className="text-xl font-bold text-white">{props.title}</h3>
        <p className="line-clamp-2 text-sm text-zinc-300">{props.summary}</p>
        <div className="flex flex-wrap gap-2">
          {props.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-cyan-300/40 px-2 py-1 text-xs text-cyan-200">
              #{tag}
            </span>
          ))}
        </div>
        <Link href={href} className="inline-block pt-2 text-sm text-cyan-300 hover:text-cyan-200">
          阅读全文 →
        </Link>
      </div>
    </article>
  );
}
