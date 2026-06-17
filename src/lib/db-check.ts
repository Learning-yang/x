export function isDemoMode(): boolean {
  if (process.env.DEMO_MODE === "false") return false;
  const dsKey = process.env.DEEPSEEK_API_KEY;
  if (!dsKey) return true;
  if (dsKey.length < 10) return true;
  if (dsKey.startsWith("sk-your")) return true;
  return false;
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "123456";
}

export function getDeepSeekConfig() {
  return {
    apiKey: process.env.DEEPSEEK_API_KEY || "",
    baseUrl: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com/v1",
    model: process.env.DEEPSEEK_MODEL || "deepseek-chat"
  };
}
