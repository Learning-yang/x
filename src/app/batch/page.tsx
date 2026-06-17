"use client";

import { useState } from "react";
import NoteCard from "@/components/NoteCard";
import type { Industry, Style, Note, ApiResponse } from "@/lib/types";

const INDUSTRIES: Industry[] = [
  "美妆", "穿搭", "美食", "家居", "母婴",
  "数码", "护肤", "健身", "教育", "职场"
];

const INDUSTRY_ICONS: Record<Industry, string> = {
  美妆: "💄",
  穿搭: "👗",
  美食: "🍜",
  家居: "🏠",
  母婴: "👶",
  数码: "📱",
  护肤: "🧴",
  健身: "💪",
  教育: "📚",
  职场: "💼"
};

const STYLES: Style[] = ["种草", "测评", "教程", "探店", "对比"];
const COUNTS: Array<5 | 10 | 20> = [5, 10, 20];

export default function BatchPage() {
  const [industry, setIndustry] = useState<Industry>("美妆");
  const [style, setStyle] = useState<Style>("种草");
  const [count, setCount] = useState<5 | 10 | 20>(10);
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demo, setDemo] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry, count, style, topic: topic || undefined })
      });
      const data: ApiResponse<{ notes: Note[]; demo: boolean }> = await res.json();
      if (!data.success || !data.data) {
        throw new Error(data.error || "生成失败");
      }
      setNotes(data.data.notes);
      setDemo(data.data.demo);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAll = async () => {
    const md = notes
      .map(
        (n, i) =>
          `## ${i + 1}. ${n.title}\n\n**封面：** ${n.cover_text}\n\n${n.content}\n\n${n.tags.join(" ")}\n\n预估：${n.estimated_views}`
      )
      .join("\n\n---\n\n");
    try {
      await navigator.clipboard.writeText(md);
      alert("✅ 已复制全部笔记到剪贴板");
    } catch (err) {
      const textarea = document.createElement("textarea");
      textarea.value = md;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("✅ 已复制全部笔记到剪贴板");
    }
  };

  const handleExport = () => {
    const md = `# AI 小红书爆款笔记 - ${industry}行业\n\n` +
      `生成时间：${new Date().toLocaleString("zh-CN")}\n` +
      `风格：${style} | 数量：${notes.length}\n\n---\n\n` +
      notes
        .map(
          (n, i) =>
            `## ${i + 1}. ${n.title}\n\n**封面文案：** ${n.cover_text}\n**类型：** ${n.type}\n**预估流量：** ${n.estimated_views}\n\n${n.content}\n\n${n.tags.join(" ")}`
        )
        .join("\n\n---\n\n");
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `小红书爆款笔记-${industry}-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">🚀 批量生成爆款笔记</h1>
        <p className="text-gray-600">选择行业+风格+数量，AI一键生成多条爆款笔记</p>
      </div>

      <div className="card p-6 mb-6">
        <div className="space-y-6">
          <div>
            <label className="label">1. 选择行业</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setIndustry(ind)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition ${
                    industry === ind
                      ? "bg-xhs-500 text-white shadow-soft"
                      : "bg-gray-100 text-gray-700 hover:bg-xhs-50"
                  }`}
                >
                  {INDUSTRY_ICONS[ind]} {ind}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="label">2. 选择风格</label>
              <div className="flex flex-wrap gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      style === s
                        ? "bg-xhs-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-xhs-50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="label">3. 选择数量</label>
              <div className="flex gap-2">
                {COUNTS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCount(c)}
                    className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition ${
                      count === c
                        ? "bg-xhs-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-xhs-50"
                    }`}
                  >
                    {c} 条
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="label">4. 主题/关键词（可选）</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="例如：双十一值得买 / 早八通勤 / 减脂餐 / 黄黑皮显白"
              className="input"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-xhs-500 hover:bg-xhs-600 text-white font-bold py-4 rounded-xl text-lg transition shadow-soft disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span> AI正在生成中...
              </span>
            ) : (
              `✨ 立即生成 ${count} 条爆款笔记`
            )}
          </button>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">⚠️ {error}</div>
          )}
        </div>
      </div>

      {notes.length > 0 && (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl font-bold">📝 生成结果（{notes.length} 条）</h2>
              {demo && (
                <span className="text-xs text-xhs-500">🎀 演示模式 · 配置 API Key 启用真实生成</span>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={handleCopyAll} className="btn-secondary text-sm">
                📋 全部复制
              </button>
              <button onClick={handleExport} className="btn-secondary text-sm">
                💾 导出 Markdown
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {notes.map((note, i) => (
              <NoteCard key={i} note={note} index={i} />
            ))}
          </div>
        </div>
      )}

      {!notes.length && !loading && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-6xl mb-3">📝</div>
          <p>点击上方按钮，AI 立即为你生成爆款笔记</p>
        </div>
      )}
    </div>
  );
}
