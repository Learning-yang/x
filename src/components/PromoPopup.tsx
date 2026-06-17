"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PromoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = sessionStorage.getItem("promo-dismissed");
    if (dismissed) return;
    const t = setTimeout(() => setOpen(true), 6000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("promo-dismissed", "1");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-slide-up">
        <button
          onClick={close}
          aria-label="关闭"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <div className="text-center">
          <div className="text-5xl mb-3">🎁</div>
          <h3 className="text-xl font-bold text-xhs-600 mb-2">新用户专享</h3>
          <p className="text-gray-700 mb-1">首次下单输入优惠码</p>
          <div className="bg-xhs-50 border-2 border-dashed border-xhs-300 rounded-lg py-2 px-4 my-3 font-mono font-bold text-xhs-600 text-lg tracking-widest">
            XHS66
          </div>
          <p className="text-xs text-gray-500 mb-4">66折优惠 · 限新用户首单</p>
          <Link
            href="/pricing"
            onClick={close}
            className="block w-full bg-xhs-500 text-white py-3 rounded-xl font-semibold hover:bg-xhs-600 transition"
          >
            立即领取优惠
          </Link>
        </div>
      </div>
    </div>
  );
}
