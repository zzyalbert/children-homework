"use client";

import { useState } from "react";

export function UploadImageClient() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function onUpload(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    setLoading(false);
    if (!res.ok) {
      alert("上传失败");
      return;
    }

    const data = (await res.json()) as { url: string };
    setUrl(data.url);
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
      <h2 className="mb-2 text-lg font-semibold text-white">展馆图片上传</h2>
      <p className="mb-3 text-sm text-zinc-400">上传后会保存到 Vercel Blob，并返回可直接用于 MDX 的图片 URL：`![图](https://...blob.vercel-storage.com/xxx.png)`</p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void onUpload(file);
        }}
      />
      <p className="mt-2 text-sm text-cyan-300">{loading ? "上传中..." : url}</p>
    </section>
  );
}
