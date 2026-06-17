"use client";

import { useState } from "react";
import Link from "next/link";
import { PRICING_PLANS, COUPONS, calcFinalPrice } from "@/lib/pricing";
import type { PricingPlan } from "@/lib/types";

export default function PricingPage() {
  const [code, setCode] = useState("");
  const [activeCode, setActiveCode] = useState<string | undefined>();

  const applyCoupon = () => {
    const c = COUPONS.find(
      (x) => x.code.toUpperCase() === code.trim().toUpperCase()
    );
    if (c) {
      setActiveCode(c.code);
      alert(`✅ 已应用优惠码：${c.code} · ${c.description}`);
    } else {
      alert("❌ 优惠码无效");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">💎 灵活定价方案</h1>
        <p className="text-gray-600 mb-4">单篇9.9起 · 月卡199 · 商家包月可选 · 不满意全额退款</p>

        <div className="max-w-md mx-auto bg-xhs-50 rounded-2xl p-4 flex items-center gap-2 border border-xhs-200">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="输入优惠码"
            className="flex-1 px-3 py-2 rounded-lg border border-xhs-200 outline-none focus:border-xhs-400 text-sm bg-white"
          />
          <button
            onClick={applyCoupon}
            className="bg-xhs-500 hover:bg-xhs-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            应用
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          推荐码：<code className="bg-xhs-50 px-1 rounded">XHS66</code>（新用户66折） ·{" "}
          <code className="bg-xhs-50 px-1 rounded">BATCH20</code>（批量生成用户8折）
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {PRICING_PLANS.map((plan) => {
          const finalPrice = calcFinalPrice(plan, activeCode);
          return (
            <PlanCard key={plan.id} plan={plan} finalPrice={finalPrice} />
          );
        })}
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-xl font-bold mb-4">❓ 常见问题</h3>
          <div className="space-y-4 text-sm">
            <div>
              <div className="font-semibold mb-1">Q: 演示模式有什么限制？</div>
              <p className="text-gray-600">
                A: 演示模式下生成的内容是预置的高质量 Mock 数据，足以展示效果。配置 DeepSeek API Key 后即启用真实 AI 生成。
              </p>
            </div>
            <div>
              <div className="font-semibold mb-1">Q: 生成的内容可以商用吗？</div>
              <p className="text-gray-600">A: 可以，付费后内容版权归你。</p>
            </div>
            <div>
              <div className="font-semibold mb-1">Q: 如何支付？</div>
              <p className="text-gray-600">A: 支持微信/支付宝手动转账，<Link href="/manual-pay" className="text-xhs-500 underline">查看收款方式</Link>。</p>
            </div>
            <div>
              <div className="font-semibold mb-1">Q: 可以退款吗？</div>
              <p className="text-gray-600">A: 7天内未使用可全额退款。</p>
            </div>
          </div>
        </div>
        <div className="card p-6 bg-gradient-to-br from-xhs-50 to-white">
          <h3 className="text-xl font-bold mb-4">💬 用户评价</h3>
          <div className="space-y-4 text-sm">
            <div className="bg-white rounded-xl p-3">
              <div className="text-yellow-500 mb-1">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700">"效率神器！之前一周写3篇，现在一天写30篇，老板都惊了。"</p>
              <p className="text-xs text-gray-400 mt-1">— 美妆代运营 小王</p>
            </div>
            <div className="bg-white rounded-xl p-3">
              <div className="text-yellow-500 mb-1">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700">"季卡太值了，爆款拆解功能让我学到了很多公式。"</p>
              <p className="text-xs text-gray-400 mt-1">— 母婴博主 乐乐妈</p>
            </div>
            <div className="bg-white rounded-xl p-3">
              <div className="text-yellow-500 mb-1">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-700">"商家包月服务直接让我店铺流量翻了3倍。"</p>
              <p className="text-xs text-gray-400 mt-1">— 服装店主 陈总</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlanCard({ plan, finalPrice }: { plan: PricingPlan; finalPrice: number }) {
  return (
    <div
      className={`card p-6 relative ${
        plan.highlight ? "border-2 border-xhs-400 shadow-soft" : ""
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-xhs-500 text-white text-xs px-3 py-1 rounded-full font-medium">
          {plan.badge}
        </div>
      )}
      <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
      <p className="text-sm text-gray-500 mb-4">{plan.count} · {plan.period}</p>
      <div className="mb-4">
        <span className="text-3xl font-extrabold text-xhs-500">¥{finalPrice}</span>
        {plan.originalPrice && (
          <span className="text-sm text-gray-400 line-through ml-2">
            ¥{plan.originalPrice}
          </span>
        )}
      </div>
      <ul className="space-y-2 text-sm mb-6 min-h-[140px]">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-xhs-500 mt-0.5">✓</span>
            <span className="text-gray-700">{f}</span>
          </li>
        ))}
      </ul>
      {plan.id === "business" ? (
        <a
          href="https://example.com/business"
          className={`w-full block text-center py-3 rounded-xl font-semibold transition ${
            plan.highlight
              ? "bg-xhs-500 hover:bg-xhs-600 text-white"
              : "bg-xhs-50 hover:bg-xhs-100 text-xhs-600"
          }`}
        >
          {plan.cta}
        </a>
      ) : (
        <Link
          href={`/manual-pay?plan=${plan.id}`}
          className={`w-full block text-center py-3 rounded-xl font-semibold transition ${
            plan.highlight
              ? "bg-xhs-500 hover:bg-xhs-600 text-white"
              : "bg-xhs-50 hover:bg-xhs-100 text-xhs-600"
          }`}
        >
          {plan.cta}
        </Link>
      )}
    </div>
  );
}
