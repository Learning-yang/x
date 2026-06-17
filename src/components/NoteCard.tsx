"use client";

import { useState } from "react";
import type { Note } from "@/lib/types";

interface Props {
  note: Note;
  index?: number;
}

export default function NoteCard({ note, index }: Props) {
  const [copied, setCopied] = useState<"title" | "content" | "all" | null>(null);

  const handleCopy = async (text: string, type: "title" | "content" | "all") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 1500);
    } catch (err) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(type);
      setTimeout(() => setCopied(null), 1500);
    }
  };

  const exportMarkdown = () => {
    const md = `# ${note.title}

${note.content}

**封面文案：** ${note.cover_text}

**预估流量：** ${note.estimated_views}

${note.tags.join(" ")}
`;
    handleCopy(md, "all");
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-xhs-100 overflow-hidden hover:shadow-soft transition animate-slide-up">
      <div className="bg-gradient-to-r from-xhs-50 to-xhs-100 px-5 py-4 flex items-start justify-between gap-3">
        <div className="flex-1">
          {typeof index === "number" && (
            <span className="inline-block bg-xhs-500 text-white text-xs px-2 py-0.5 rounded-full mb-2">
              #{index + 1}
            </span>
          )}
          <h3 className="font-bold text-lg text-gray-900 leading-snug">{note.title}</h3>
        </div>
        <span className="text-xs bg-white text-xhs-600 px-2 py-1 rounded-full border border-xhs-200 whitespace-nowrap">
          {note.type}
        </span>
      </div>

      <div className="px-5 py-4 space-y-3">
        <div className="bg-xhs-50 rounded-xl p-3 text-sm">
          <div className="text-xs text-gray-500 mb-1">📸 封面文案</div>
          <div className="font-semibold text-xhs-600">{note.cover_text}</div>
        </div>

        <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
          {note.content}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {note.tags.map((t, i) => (
            <span key={i} className="text-xs text-xhs-500 bg-xhs-50 px-2 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
          <span>👀 预估流量：{note.estimated_views}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleCopy(note.title, "title")}
            className="text-xs bg-gray-100 hover:bg-xhs-50 text-gray-700 py-2 rounded-lg transition"
          >
            {copied === "title" ? "✓ 已复制" : "复制标题"}
          </button>
          <button
            onClick={() => handleCopy(note.content, "content")}
            className="text-xs bg-gray-100 hover:bg-xhs-50 text-gray-700 py-2 rounded-lg transition"
          >
            {copied === "content" ? "✓ 已复制" : "复制正文"}
          </button>
          <button
            onClick={exportMarkdown}
            className="text-xs bg-xhs-500 hover:bg-xhs-600 text-white py-2 rounded-lg transition"
          >
            {copied === "all" ? "✓ 已导出" : "导出MD"}
          </button>
        </div>
      </div>
    </div>
  );
}
