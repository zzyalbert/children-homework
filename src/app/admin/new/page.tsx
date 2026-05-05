import { redirect } from "next/navigation";
import { EssayForm } from "@/components/EssayForm";
import { isAdminLoggedIn } from "@/lib/auth";
import { createEssayAction } from "../actions";

export default async function NewEssayPage() {
  if (!(await isAdminLoggedIn())) redirect("/admin/login");

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8">
      <div className="mx-auto max-w-4xl space-y-4">
        <h1 className="text-3xl font-black text-white">新增展览作品</h1>
        <EssayForm action={createEssayAction} submitText="保存并更新展厅" />
      </div>
    </main>
  );
}
