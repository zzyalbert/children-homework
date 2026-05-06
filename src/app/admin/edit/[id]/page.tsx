import { notFound, redirect } from "next/navigation";
import { EssayForm } from "@/components/EssayForm";
import { isAdminLoggedIn } from "@/lib/auth";
import { getEssayById, parseTags } from "@/lib/db";
import { updateEssayAction } from "../../actions";

export default async function EditEssayPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminLoggedIn())) redirect("/admin/login");

  const { id } = await params;
  const essay = await getEssayById(Number(id));
  if (!essay) notFound();

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8">
      <div className="mx-auto max-w-4xl space-y-4">
        <h1 className="text-3xl font-black text-white">编辑展览作品</h1>
        <EssayForm
          action={updateEssayAction}
          submitText="保存修改"
          values={{
            id: essay.id,
            title: essay.title,
            slug: essay.slug,
            summary: essay.summary,
            content: essay.content,
            coverImage: essay.cover_image,
            tags: parseTags(essay.tags),
            published: !!essay.published,
          }}
        />
      </div>
    </main>
  );
}
