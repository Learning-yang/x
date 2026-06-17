import { isDemoMode } from "@/lib/db-check";

export default function DemoBanner() {
  if (!isDemoMode()) return null;
  return (
    <div className="bg-gradient-to-r from-xhs-400 to-xhs-500 text-white text-center text-sm py-2 px-4">
      🎀 当前为演示模式（无需 API Key）· 数据为高质量 Mock · 配置 <code className="bg-white/20 px-1 rounded">DEEPSEEK_API_KEY</code> 即可启用真实 AI
    </div>
  );
}
