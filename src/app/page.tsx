import Link from "next/link";

const FEATURES = [
  {
    icon: "🚀",
    title: "1分钟批量生成",
    desc: "一次生成5-20条爆款笔记，效率提升10倍"
  },
  {
    icon: "🎯",
    title: "10大行业模板",
    desc: "美妆/穿搭/美食/家居/母婴/数码/护肤/健身/教育/职场全覆盖"
  },
  {
    icon: "🔥",
    title: "爆款公式拆解",
    desc: "学习真实爆款底层逻辑，让AI按公式生产"
  },
  {
    icon: "💎",
    title: "完整内容生成",
    desc: "标题+正文+封面文案+标签 一应俱全"
  },
  {
    icon: "📊",
    title: "预估流量分析",
    desc: "每篇笔记附带预估曝光区间"
  },
  {
    icon: "💰",
    title: "灵活付费",
    desc: "单篇9.9起 / 月卡199 / 商家包月可选"
  }
];

const STEPS = [
  { num: "1", title: "选择行业", desc: "美妆/穿搭/美食等10大行业" },
  { num: "2", title: "设置参数", desc: "数量、风格、关键词" },
  { num: "3", title: "一键生成", desc: "AI秒级生成多条笔记" },
  { num: "4", title: "复制发布", desc: "一键复制到小红书发布" }
];

const CASES = [
  {
    title: "黄黑皮逆袭冷白皮！这个隔离真的能处",
    industry: "美妆",
    views: "12.3w",
    likes: "8921",
    tag: "种草"
  },
  {
    title: "早八通勤5分钟妆容｜懒人必看",
    industry: "美妆",
    views: "8.7w",
    likes: "6324",
    tag: "教程"
  },
  {
    title: "小个子显高10cm穿搭｜155也能穿出170",
    industry: "穿搭",
    views: "15.6w",
    likes: "1.2w",
    tag: "教程"
  },
  {
    title: "深夜emo必备｜这碗汤面治愈一切",
    industry: "美食",
    views: "23.4w",
    likes: "1.8w",
    tag: "种草"
  },
  {
    title: "50块改造出租屋｜ins风一秒get",
    industry: "家居",
    views: "9.2w",
    likes: "7856",
    tag: "种草"
  },
  {
    title: "早C晚A入门指南｜新手必看",
    industry: "护肤",
    views: "18.9w",
    likes: "1.5w",
    tag: "教程"
  }
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-hero">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-block bg-white/80 backdrop-blur text-xhs-600 text-sm px-3 py-1 rounded-full mb-4 border border-xhs-200">
              🎀 已服务 3000+ 小红书商家/博主
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              用 AI <span className="gradient-text">1分钟</span>生成<br />
              小红书爆款笔记
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              专为小红书商家/博主打造。一键生成爆款标题、正文、封面文案、标签，<br />
              支持批量生成 + 单篇深做 + 爆款拆解，效率提升10倍。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/batch" className="btn-primary">
                🚀 立即免费体验
              </Link>
              <Link href="/pricing" className="btn-secondary">
                查看套餐
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-8 text-sm text-gray-600">
              <span>✅ 演示模式免登录</span>
              <span>✅ 一键复制</span>
              <span>✅ 10大行业</span>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {CASES.slice(0, 4).map((c, i) => (
                <div
                  key={i}
                  className={`card p-4 ${i % 2 === 0 ? "mt-6" : ""}`}
                >
                  <div className="text-xs text-xhs-500 mb-2">#{c.tag}</div>
                  <div className="text-sm font-semibold mb-2 line-clamp-2 leading-snug">
                    {c.title}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>👁 {c.views}</span>
                    <span>❤️ {c.likes}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute -bottom-4 -right-4 bg-xhs-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-soft animate-pulse-slow">
              🌟 真实爆款案例
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">核心功能</h2>
          <p className="text-gray-600">一站式小红书爆款笔记生产平台</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="card p-6 hover:shadow-soft transition group cursor-pointer"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="bg-xhs-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">4步生成爆款</h2>
            <p className="text-gray-600">简单到小白也能秒上手</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {STEPS.map((s) => (
              <div key={s.num} className="relative">
                <div className="card p-6 text-center">
                  <div className="w-12 h-12 bg-xhs-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {s.num}
                  </div>
                  <h3 className="font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">灵活定价方案</h2>
          <p className="text-gray-600">单篇9.9起 · 月卡199 · 商家包月可选</p>
        </div>
        <div className="text-center">
          <Link href="/pricing" className="btn-primary text-lg px-8 py-4">
            查看完整定价 →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-xhs-400 to-xhs-500 rounded-3xl p-8 md:p-12 text-white text-center shadow-soft">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            立即开始你的小红书爆款之路
          </h2>
          <p className="text-white/90 mb-6 text-lg">免费试用 · 无需注册 · 演示模式即开即用</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/batch"
              className="bg-white text-xhs-600 hover:bg-xhs-50 font-bold px-8 py-4 rounded-full transition text-lg"
            >
              🚀 开始批量生成
            </Link>
            <Link
              href="/single"
              className="bg-white/20 backdrop-blur text-white hover:bg-white/30 font-bold px-8 py-4 rounded-full transition text-lg border border-white/40"
            >
              🎯 单篇深做
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
