"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PRICING_PLANS, calcFinalPrice, getPriceById } from "@/lib/pricing";

export default function ManualPayPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">加载中...</div>}>
      <ManualPayInner />
    </Suspense>
  );
}

function ManualPayInner() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") || "monthly";
  const plan = getPriceById(planId) || PRICING_PLANS[0];
  const [coupon, setCoupon] = useState("");
  const [activeCoupon, setActiveCoupon] = useState<string | undefined>();
  const [finalPrice, setFinalPrice] = useState(plan.price);
  const [orderId, setOrderId] = useState("");
  const [paid, setPaid] = useState(false);
  const [contact, setContact] = useState("");

  useEffect(() => {
    setFinalPrice(calcFinalPrice(plan, activeCoupon));
    setOrderId(`XHS${Date.now().toString().slice(-8)}`);
  }, [plan, activeCoupon]);

  const applyCoupon = () => {
    setActiveCoupon(coupon.trim() || undefined);
  };

  const handleSubmitOrder = () => {
    if (!contact.trim()) {
      alert("请填写联系方式（微信号或手机号）");
      return;
    }
    if (typeof window !== "undefined") {
      const order = {
        id: orderId,
        plan: plan.name,
        amount: finalPrice,
        status: "待支付",
        createdAt: new Date().toISOString(),
        contact
      };
      const existing = localStorage.getItem("demo-orders");
      const orders = existing ? JSON.parse(existing) : [];
      orders.unshift(order);
      localStorage.setItem("demo-orders", JSON.stringify(orders));
    }
    setPaid(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">💰 手动收款</h1>
        <p className="text-gray-600">微信/支付宝转账，1-5分钟内到账开通</p>
      </div>

      {!paid ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6">
            <h2 className="text-lg font-bold mb-4">📋 订单信息</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">订单号</span>
                <span className="font-mono">{orderId}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">套餐</span>
                <span className="font-semibold">{plan.name}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">数量</span>
                <span>{plan.count}</span>
              </div>
              {plan.originalPrice && (
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">原价</span>
                  <span className="line-through text-gray-400">¥{plan.originalPrice}</span>
                </div>
              )}
              <div>
                <label className="label">优惠码（可选）</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="XHS66 / BATCH20"
                    className="input"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-xhs-500 hover:bg-xhs-600 text-white px-4 rounded-xl text-sm whitespace-nowrap"
                  >
                    应用
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3">
                <span className="text-gray-700 font-semibold">应付金额</span>
                <span className="text-2xl font-bold text-xhs-500">¥{finalPrice}</span>
              </div>
              <div>
                <label className="label">联系方式（必填）</label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="微信号或手机号"
                  className="input"
                />
              </div>
              <button
                onClick={handleSubmitOrder}
                className="w-full btn-primary mt-3"
              >
                ✅ 已完成支付，提交订单
              </button>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-bold mb-4">💳 收款方式</h2>
            <div className="space-y-4 text-sm">
              <div className="bg-xhs-50 rounded-xl p-4">
                <div className="font-bold mb-2">📱 微信支付</div>
                <div className="text-gray-600 text-xs mb-2">扫码或加好友转账</div>
                <div className="bg-white rounded p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">微信收款码</div>
                  <div className="w-32 h-32 bg-gray-200 mx-auto rounded flex items-center justify-center text-gray-400 text-xs">
                    收款码位置
                  </div>
                  <div className="text-xs text-gray-500 mt-2">微信昵称：AI小红书</div>
                </div>
              </div>
              <div className="bg-xhs-50 rounded-xl p-4">
                <div className="font-bold mb-2">💙 支付宝</div>
                <div className="text-gray-600 text-xs mb-2">扫码转账</div>
                <div className="bg-white rounded p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">支付宝收款码</div>
                  <div className="w-32 h-32 bg-gray-200 mx-auto rounded flex items-center justify-center text-gray-400 text-xs">
                    收款码位置
                  </div>
                  <div className="text-xs text-gray-500 mt-2">支付宝账号：aixhs@demo.com</div>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs text-yellow-800">
                ⚠️ 支付时请备注订单号 <code className="font-mono">{orderId}</code>，便于快速核销
              </div>
              <div className="text-xs text-gray-500">
                ⏰ 客服在线时间：9:00-22:00<br />
                📧 邮箱：support@demo.com<br />
                💬 微信：扫码后备注"咨询"
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-8 text-center">
          <div className="text-6xl mb-3">✅</div>
          <h2 className="text-2xl font-bold mb-2">订单提交成功</h2>
          <p className="text-gray-600 mb-4">
            订单号 <code className="bg-xhs-50 px-2 py-1 rounded font-mono">{orderId}</code>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            客服会在 5 分钟内联系您核销订单并开通权限。<br />
            如需加急，请联系微信：AI小红书
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/dashboard" className="btn-primary">
              进入控制台
            </Link>
            <Link href="/" className="btn-secondary">
              返回首页
            </Link>
          </div>
        </div>
      )}

      <div className="mt-8 text-center text-xs text-gray-500">
        <Link href="/pricing" className="hover:underline">← 返回定价页</Link>
      </div>
    </div>
  );
}
