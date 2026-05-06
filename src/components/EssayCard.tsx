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
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-[0_12px_40px_rgba(2,6,23,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(2,6,23,0.12)]">
      {props.coverImage ? (
        <img src={props.coverImage} alt={props.title} className="h-44 w-full object-cover transition duration-500 group-hover:scale-105" />
      ) : null}
      <div className="space-y-3 p-5">
        <p className="text-xs font-medium text-slate-500">{new Date(props.createdAt).toLocaleDateString()}</p>
        <h3 className="text-xl font-bold text-slate-900">{props.title}</h3>
        <p className="line-clamp-2 text-sm leading-6 text-slate-700">{props.summary}</p>
        <div className="flex flex-wrap gap-2">
          {props.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-sky-200 bg-sky-50 px-2 py-1 text-xs font-medium text-sky-700">
              #{tag}
            </span>
          ))}
        </div>
        <Link href={href} className="inline-block pt-2 text-sm font-semibold text-sky-700 hover:text-sky-900">
          阅读全文 →
        </Link>
      </div>
    </article>
  );
}
