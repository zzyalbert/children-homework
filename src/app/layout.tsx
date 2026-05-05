import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "仲城铄作文展览馆",
  description: "仲城铄私人作文作品展览馆",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full bg-black text-zinc-100">{children}</body>
    </html>
  );
}
