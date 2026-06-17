"use client";

import { useState } from "react";
import type { Industry, Style, SingleNote, ApiResponse } from "@/lib/types";

const INDUSTRIES: Industry[] = [
  "美妆", "穿搭", "美食", "家居", "母婴",
  "数码", "护肤", "健身", "教育", "职场"
];

const STYLES: Style[] = ["种草", "测评", "教程", "探店", "对比"];

export default function SinglePage() {
  const [industry, setIndustry] = useState<Industry>("美妆");
  const [style, setStyle] = useState<Style>("种草");
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [note, setNote] = useState<SingleNote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demo, setDemo] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("请填写主题");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/single", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry,
          topic: topic.trim(),
          keywords: keywords.split(/[,，\s]+/).filter(Boolean),
          style
        })
      });
      const data: ApiResponse<{ note: SingleNote; demo: boolean }> = await res.json();
      if (!data.success || !data.data) {
        throw new Error(data.error || "生成失败");
      }
      setNote(data.data.note);
      setDemo(data.data.demo);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 1500);
    } catch (err) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(label);
      setTimeout(() => setCopied(null), 1500);
    }
  };

  const exportMD = () => {
    if (!note) return;
    const md = `# ${note.title}\n\n${note.content}\n\n**封面文案：** ${note.cover_text}\n\n${note.tags.join(" ")}\n\n预估流量：${note.estimated_views}`;
    handleCopy(md, "md");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">🎯 单篇深做</h1>
        <p className="text-gray-600">输入主题和关键词，AI为你打造一篇完整的爆款笔记</p>
      </div>

      <div className="card p-6 mb-6">
        <div className="space-y-5">
          <div>
            <label className="label">行业</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setIndustry(ind)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition ${
                    industry === ind
                      ? "bg-xhs-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-xhs-50"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">主题 *</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="例如：油皮亲妈粉底液 / 双十一值得买的家电"
              className="input"
            />
          </div>

          <div>
            <label className="label">关键词（用空格或逗号分隔）</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="例如：持久 不脱妆 控油"
              className="input"
            />
          </div>

          <div>
            <label className="label">风格</label>
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

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-xhs-500 hover:bg-xhs-600 text-white font-bold py-4 rounded-xl text-lg transition shadow-soft disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span> AI正在深度创作中...
              </span>
            ) : (
              "✨ 立即生成完整笔记"
            )}
          </button>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">⚠️ {error}</div>
          )}
        </div>
      </div>

      {note && (
        <div className="space-y-5 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">📝 生成的笔记</h2>
            {demo && (
              <span className="text-xs text-xhs-500">🎀 演示模式</span>
            )}
          </div>

          <div className="card p-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className="text-2xl font-bold leading-tight flex-1">{note.title}</h3>
              <button
                onClick={() => handleCopy(note.title, "title")}
                className="text-xs bg-xhs-50 hover:bg-xhs-100 text-xhs-600 px-3 py-1.5 rounded-full whitespace-nowrap"
              >
                {copied === "title" ? "✓ 已复制" : "复制标题"}
              </button>
            </div>

            <div className="bg-xhs-50 rounded-xl p-4 mb-4">
              <div className="text-xs text-gray-500 mb-1">📸 封面文案</div>
              <div className="text-lg font-bold text-xhs-600">{note.cover_text}</div>
            </div>

            {note.hook && (
              <div className="bg-gradient-to-r from-xhs-50 to-white border-l-4 border-xhs-500 p-4 mb-4 rounded-r-xl">
                <div className="text-xs text-gray-500 mb-1">🎯 开头钩子</div>
                <div className="text-sm italic">{note.hook}</div>
              </div>
            )}

            <div className="prose max-w-none mb-4">
              <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                {note.content}
              </div>
            </div>

            {note.structure && note.structure.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="text-xs text-gray-500 mb-2">📐 内容结构</div>
                <ol className="space-y-1 text-sm">
                  {note.structure.map((s, i) => (
                    <li key={i} className="text-gray-700">
                      <span className="text-xhs-500 font-bold">{i + 1}.</span> {s}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {note.tags.map((t, i) => (
                <span key={i} className="text-sm text-xhs-500 bg-xhs-50 px-3 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>

            {note.cta && (
              <div className="bg-xhs-50 border border-xhs-200 rounded-xl p-3 mb-4">
                <div className="text-xs text-gray-500 mb-1">💬 互动引导</div>
                <div className="text-sm text-xhs-600 font-medium">{note.cta}</div>
              </div>
            )}

            <div className="text-xs text-gray-500 mb-4">👀 预估流量：{note.estimated_views}</div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => handleCopy(note.content, "content")}
                className="btn-secondary text-sm py-2"
              >
                {copied === "content" ? "✓ 已复制" : "复制正文"}
              </button>
              <button
                onClick={() => handleCopy(note.tags.join(" "), "tags")}
                className="btn-secondary text-sm py-2"
              >
                {copied === "tags" ? "✓ 已复制" : "复制标签"}
              </button>
              <button
                onClick={() => handleCopy(note.cover_text, "cover")}
                className="btn-secondary text-sm py-2"
              >
                {copied === "cover" ? "✓ 已复制" : "复制封面"}
              </button>
              <button onClick={exportMD} className="btn-primary text-sm py-2">
                {copied === "md" ? "✓ 已导出" : "导出完整"}
              </button>
            </div>
          </div>
        </div>
      )}

      {!note && !loading && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-6xl mb-3">✍️</div>
          <p>填写主题和关键词，AI 为你深度打造爆款笔记</p>
        </div>
      )}
    </div>
  );
}
