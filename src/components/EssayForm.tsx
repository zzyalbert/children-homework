type EssayFormValues = {
  id?: number;
  title?: string;
  slug?: string;
  summary?: string;
  content?: string;
  coverImage?: string | null;
  tags?: string[];
  published?: boolean;
};

export function EssayForm({
  action,
  values,
  submitText,
}: {
  action: (formData: FormData) => void;
  values?: EssayFormValues;
  submitText: string;
}) {
  return (
    <form action={action} className="space-y-4 rounded-2xl border border-white/10 bg-zinc-900 p-5">
      {values?.id ? <input type="hidden" name="id" value={values.id} /> : null}
      {values?.slug ? <input type="hidden" name="oldSlug" value={values.slug} /> : null}
      <div>
        <label className="mb-1 block text-sm text-zinc-300">作品标题</label>
        <input name="title" defaultValue={values?.title || ""} required className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white" />
      </div>
      <div>
        <label className="mb-1 block text-sm text-zinc-300">Slug（可空，自动由标题生成）</label>
        <input name="slug" defaultValue={values?.slug || ""} className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white" />
      </div>
      <div>
        <label className="mb-1 block text-sm text-zinc-300">导览摘要</label>
        <textarea name="summary" defaultValue={values?.summary || ""} required rows={3} className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white" />
      </div>
      <div>
        <label className="mb-1 block text-sm text-zinc-300">标签（逗号分隔）</label>
        <input name="tags" defaultValue={(values?.tags || []).join(", ")} className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white" />
      </div>
      <div>
        <label className="mb-1 block text-sm text-zinc-300">封面图片 URL（可空，可用上传接口返回路径）</label>
        <input name="coverImage" defaultValue={values?.coverImage || ""} className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white" />
      </div>
      <div>
        <label className="mb-1 block text-sm text-zinc-300">正文（支持 Markdown / MDX / 图片混排）</label>
        <textarea
          name="content"
          defaultValue={values?.content || ""}
          required
          rows={16}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-white"
          placeholder={'# 今天的作品\n\n这是仲城铄的一篇作文。\n\n![配图](/uploads/xxx.png)'}
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-zinc-300">
        <input type="checkbox" name="published" defaultChecked={values?.published ?? true} /> 设为展出中
      </label>
      <button className="rounded-lg bg-cyan-300 px-4 py-2 font-semibold text-zinc-950">{submitText}</button>
    </form>
  );
}
