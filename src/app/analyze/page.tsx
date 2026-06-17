"use client";

import { useState } from "react";
import type { AnalyzeResult, ApiResponse } from "@/lib/types";

export default function AnalyzePage() {
  const [noteText, setNoteText] = useState("");
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demo, setDemo] = useState(false);

  const handleAnalyze = async () => {
    if (noteText.trim().length < 20) {
      setError("请粘贴一篇完整的爆款笔记（至少20字）");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteText })
      });
      const data: ApiResponse<{ result: AnalyzeResult; demo: boolean }> = await res.json();
      if (!data.success || !data.data) {
        throw new Error(data.error || "拆解失败");
      }
      setResult(data.data.result);
      setDemo(data.data.demo);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fillExample = () => {
    setNoteText(`姐妹们听我说！这个隔离真的绝了😭\n\n我是天生黄黑皮，之前脸上黄气重到爆，粉底液再白都救不回来。\n\n直到我遇到了这个紫色隔离，薄薄涂一层，整个肤色都亮了！不是死白，是那种通透的冷白皮感，质地很润不会卡粉。\n\n用法超简单：\n1️⃣ 护肤后直接涂隔离\n2️⃣ 黄黑皮选紫色，痘印选绿色\n3️⃣ 用美妆蛋拍开更服帖\n\n重点是它才几十块，我已经空瓶3罐了！\n\n#黄黑皮自救 #冷白皮 #平价隔离 #底妆技巧`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">🔍 爆款拆解</h1>
        <p className="text-gray-600">粘贴爆款笔记，AI 帮你拆解底层结构，让你也能复制爆款</p>
      </div>

      <div className="card p-6 mb-6">
        <label className="label">粘贴爆款笔记</label>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="把一篇你看好的爆款笔记粘贴到这里..."
          className="input min-h-[200px] resize-y font-mono text-sm"
        />
        <div className="flex flex-wrap gap-2 mt-3">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span> 拆解中...
              </span>
            ) : (
              "🔍 开始拆解"
            )}
          </button>
          <button onClick={fillExample} className="btn-secondary text-sm">
            填入示例
          </button>
          <button
            onClick={() => {
              setNoteText("");
              setResult(null);
            }}
            className="text-sm text-gray-500 hover:text-gray-700 px-4"
          >
            清空
          </button>
        </div>
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mt-3">⚠️ {error}</div>
        )}
      </div>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">📊 拆解结果</h2>
            <div className="flex items-center gap-3">
              {demo && <span className="text-xs text-xhs-500">🎀 演示模式</span>}
              <div className="bg-gradient-to-r from-xhs-400 to-xhs-500 text-white px-4 py-1.5 rounded-full font-bold">
                {result.score}/100
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card p-5">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <span>📌</span> 标题分析
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">{result.title_analysis}</p>
            </div>
            <div className="card p-5">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <span>🎯</span> 开头钩子
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">{result.hook_analysis}</p>
            </div>
            <div className="card p-5 md:col-span-2">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <span>📐</span> 结构分析
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">{result.structure_analysis}</p>
            </div>
            <div className="card p-5 md:col-span-2">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <span>🔥</span> 情绪触发点
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.emotional_triggers.map((t, i) => (
                  <span
                    key={i}
                    className="bg-xhs-50 text-xhs-600 px-3 py-1 rounded-full text-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="card p-5 md:col-span-2 bg-gradient-to-r from-xhs-50 to-white">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <span>📋</span> 可复用模板
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed font-mono bg-white p-3 rounded-lg">
                {result.replicable_template}
              </p>
            </div>
            <div className="card p-5 md:col-span-2">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <span>💡</span> 改进建议
              </h3>
              <ul className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-xhs-500 font-bold">{i + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {!result && !loading && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-6xl mb-3">🔍</div>
          <p>粘贴爆款笔记，AI 帮你看透底层结构</p>
        </div>
      )}
    </div>
  );
}
