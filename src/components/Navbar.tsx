import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur border-b border-xhs-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌸</span>
          <span className="font-bold text-xhs-600 text-lg">AI小红书爆款笔记工坊</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/batch" className="text-gray-700 hover:text-xhs-500">批量生成</Link>
          <Link href="/single" className="text-gray-700 hover:text-xhs-500">单篇深做</Link>
          <Link href="/analyze" className="text-gray-700 hover:text-xhs-500">爆款拆解</Link>
          <Link href="/pricing" className="text-gray-700 hover:text-xhs-500">定价</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden sm:inline-block text-sm text-gray-700 hover:text-xhs-500"
          >
            登录
          </Link>
          <Link
            href="/batch"
            className="bg-xhs-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-xhs-600 transition shadow-soft"
          >
            立即生成
          </Link>
        </div>
      </div>
    </header>
  );
}
