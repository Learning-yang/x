"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem("admin-token", data.token || "1");
        router.push("/dashboard");
      } else {
        setError(data.error || "登录失败");
      }
    } catch (err) {
      setError("网络错误");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="card p-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🔐</div>
          <h1 className="text-2xl font-bold">管理员登录</h1>
          <p className="text-sm text-gray-500 mt-2">查看订单与历史笔记</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">管理员密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="演示密码：123456"
              className="input"
            />
          </div>
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">⚠️ {error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary"
          >
            {loading ? "登录中..." : "登录"}
          </button>
        </form>
        <div className="mt-6 text-center text-xs text-gray-500">
          演示密码可在 <code className="bg-gray-100 px-1 rounded">.env</code> 中修改
          <br />
          <Link href="/" className="text-xhs-500 hover:underline mt-2 inline-block">
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
