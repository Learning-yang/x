import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import PromoPopup from "@/components/PromoPopup";

export const metadata: Metadata = {
  title: "AI小红书爆款笔记工坊 - 1分钟生成爆款笔记",
  description:
    "专为小红书商家/博主打造的AI爆款笔记生成工具。批量生成标题/正文/封面/标签，单篇深做，爆款拆解，让你的小红书运营效率提升10倍。",
  keywords: ["AI小红书", "小红书爆款", "笔记生成", "小红书代写", "爆款标题", "小红书运营"],
  authors: [{ name: "AI小红书爆款笔记工坊" }],
  openGraph: {
    title: "AI小红书爆款笔记工坊",
    description: "1分钟生成爆款标题、正文、封面、标签",
    type: "website"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ff2442"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        <DemoBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <PromoPopup />
      </body>
    </html>
  );
}
