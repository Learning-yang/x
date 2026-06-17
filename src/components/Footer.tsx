import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-xhs-100 bg-xhs-50">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🌸</span>
            <span className="font-bold text-xhs-600">AI小红书爆款笔记工坊</span>
          </div>
          <p className="text-gray-600 leading-relaxed">
            用 AI 1 分钟生成爆款标题、正文、封面文案、标签。<br />
            商家订阅 / 单篇付费 / 代运营包月 多模式可选。
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">产品</h4>
          <ul className="space-y-2 text-gray-600">
            <li><Link href="/batch">批量生成</Link></li>
            <li><Link href="/single">单篇深做</Link></li>
            <li><Link href="/analyze">爆款拆解</Link></li>
            <li><Link href="/pricing">定价方案</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">帮助</h4>
          <ul className="space-y-2 text-gray-600">
            <li><Link href="/dashboard">控制台</Link></li>
            <li><Link href="/manual-pay">手动收款</Link></li>
            <li><Link href="/login">登录</Link></li>
            <li><a href="https://platform.deepseek.com/" target="_blank" rel="noreferrer">DeepSeek API</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-xhs-100 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} AI小红书爆款笔记工坊 · 演示模式下无需 API Key 即可体验
      </div>
    </footer>
  );
}
