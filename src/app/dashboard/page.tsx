"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Order {
  id: string;
  plan: string;
  amount: number;
  status: string;
  createdAt: string;
}

interface Note {
  id: string;
  title: string;
  industry: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = sessionStorage.getItem("admin-token");
    if (!token) {
      router.push("/login");
      return;
    }
    setAuthenticated(true);
    if (typeof window !== "undefined") {
      const savedOrders = localStorage.getItem("demo-orders");
      const savedNotes = localStorage.getItem("demo-notes");
      if (savedOrders) setOrders(JSON.parse(savedOrders));
      if (savedNotes) setNotes(JSON.parse(savedNotes));
    }
  }, [router]);

  if (!authenticated) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="text-4xl mb-3">⏳</div>
        <p className="text-gray-500">验证登录中...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">📊 控制台</h1>
        <button
          onClick={() => {
            sessionStorage.removeItem("admin-token");
            router.push("/login");
          }}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          退出登录
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <StatCard label="累计订单" value={orders.length} icon="📦" />
        <StatCard label="累计生成笔记" value={notes.length} icon="📝" />
        <StatCard
          label="累计消费"
          value={`¥${orders.reduce((s, o) => s + o.amount, 0).toFixed(2)}`}
          icon="💰"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-bold mb-4">📦 我的订单</h2>
          {orders.length === 0 ? (
            <EmptyState
              icon="📦"
              text="暂无订单"
              link={{ href: "/pricing", label: "去选购套餐" }}
            />
          ) : (
            <div className="space-y-2">
              {orders.map((o) => (
                <div key={o.id} className="border border-gray-100 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{o.plan}</span>
                    <span className="text-xs text-xhs-500">¥{o.amount}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(o.createdAt).toLocaleString("zh-CN")}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full ${
                        o.status === "已支付"
                          ? "bg-green-50 text-green-600"
                          : "bg-yellow-50 text-yellow-600"
                      }`}
                    >
                      {o.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-4">📝 历史笔记</h2>
          {notes.length === 0 ? (
            <EmptyState
              icon="📝"
              text="还没有生成过笔记"
              link={{ href: "/batch", label: "立即生成" }}
            />
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {notes.map((n) => (
                <div key={n.id} className="border border-gray-100 rounded-xl p-3">
                  <div className="text-sm font-semibold mb-1 line-clamp-1">{n.title}</div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="bg-xhs-50 text-xhs-600 px-2 py-0.5 rounded">
                      {n.industry}
                    </span>
                    <span>{new Date(n.createdAt).toLocaleString("zh-CN")}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 card p-6 bg-gradient-to-r from-xhs-50 to-white">
        <h3 className="font-bold mb-3">⚡ 快捷入口</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          <Link href="/batch" className="btn-secondary text-sm py-2">🚀 批量生成</Link>
          <Link href="/single" className="btn-secondary text-sm py-2">🎯 单篇深做</Link>
          <Link href="/analyze" className="btn-secondary text-sm py-2">🔍 爆款拆解</Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}

function EmptyState({ icon, text, link }: { icon: string; text: string; link: { href: string; label: string } }) {
  return (
    <div className="text-center py-10">
      <div className="text-4xl mb-2">{icon}</div>
      <p className="text-gray-500 text-sm mb-3">{text}</p>
      <Link href={link.href} className="text-xhs-500 text-sm hover:underline">
        {link.label} →
      </Link>
    </div>
  );
}
