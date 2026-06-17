export type Industry =
  | "美妆"
  | "穿搭"
  | "美食"
  | "家居"
  | "母婴"
  | "数码"
  | "护肤"
  | "健身"
  | "教育"
  | "职场";

export type Style = "种草" | "测评" | "教程" | "探店" | "对比";

export interface Note {
  title: string;
  content: string;
  cover_text: string;
  tags: string[];
  type: string;
  estimated_views: string;
}

export interface SingleNote extends Note {
  hook: string;
  cta: string;
  structure: string[];
}

export interface AnalyzeResult {
  title_analysis: string;
  hook_analysis: string;
  structure_analysis: string;
  emotional_triggers: string[];
  replicable_template: string;
  suggestions: string[];
  score: number;
}

export interface BatchRequest {
  industry: Industry;
  count: 5 | 10 | 20;
  style: Style;
  topic?: string;
}

export interface SingleRequest {
  industry: Industry;
  topic: string;
  keywords: string[];
  style: Style;
}

export interface AnalyzeRequest {
  noteText: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  demo?: boolean;
  message?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  period: string;
  count: string;
  features: string[];
  highlight?: boolean;
  cta: string;
  badge?: string;
}

export interface Coupon {
  code: string;
  discount: number;
  description: string;
}
