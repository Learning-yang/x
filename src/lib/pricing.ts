import type { PricingPlan, Coupon } from "./types";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "single",
    name: "体验单篇",
    price: 9.9,
    period: "一次性",
    count: "1 篇笔记",
    features: [
      "完整生成1篇爆款笔记",
      "含标题/正文/封面/标签",
      "Markdown 导出",
      "7天内不限次数修改"
    ],
    cta: "立即体验"
  },
  {
    id: "monthly",
    name: "博主月卡",
    price: 199,
    originalPrice: 299,
    period: "月",
    count: "60 篇额度",
    features: [
      "每月60篇生成额度",
      "全部10个行业模板",
      "批量生成（5/10/20条）",
      "爆款拆解无限次",
      "微信群答疑"
    ],
    highlight: true,
    badge: "最热销",
    cta: "立即开通"
  },
  {
    id: "quarterly",
    name: "季度畅写",
    price: 499,
    originalPrice: 897,
    period: "季",
    count: "200 篇额度",
    features: [
      "3个月200篇生成额度",
      "全部10个行业模板",
      "优先使用 GPT-4o 级模型",
      "1对1选题指导1次",
      "代运营优惠券100元"
    ],
    badge: "省398",
    cta: "立即开通"
  },
  {
    id: "business",
    name: "商家代运营包",
    price: 2999,
    originalPrice: 5999,
    period: "月",
    count: "无限篇 + 代运营",
    features: [
      "无限生成额度",
      "专业代运营1个月",
      "5个矩阵账号托管",
      "每周数据复盘报告",
      "专属客服 + 选题会",
      "投流建议（千川/聚光）"
    ],
    badge: "商家首选",
    cta: "联系商务"
  }
];

export const COUPONS: Coupon[] = [
  {
    code: "XHS66",
    discount: 0.66,
    description: "全品类66折（限新用户）"
  },
  {
    code: "BATCH20",
    discount: 0.8,
    description: "月卡/季卡8折（批量生成用户专享）"
  },
  {
    code: "BOSS",
    discount: 0.5,
    description: "商家包5折（咨询客服）"
  }
];

export function getPriceById(id: string): PricingPlan | undefined {
  return PRICING_PLANS.find((p) => p.id === id);
}

export function calcFinalPrice(plan: PricingPlan, couponCode?: string): number {
  let price = plan.price;
  if (couponCode) {
    const coupon = COUPONS.find(
      (c) => c.code.toUpperCase() === couponCode.toUpperCase()
    );
    if (coupon) {
      price = Math.round(plan.price * coupon.discount * 100) / 100;
    }
  }
  return price;
}
