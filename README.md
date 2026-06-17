# 🌸 AI小红书爆款笔记工坊

> 专为小红书商家 / 代运营 / 博主打造的 AI 爆款笔记生产工具
> 一键生成爆款标题、正文、封面文案、标签，让你的小红书运营效率提升 10 倍

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan) ![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ 核心功能

| 功能 | 说明 |
| --- | --- |
| 🚀 **批量生成** | 一次生成 5/10/20 条爆款笔记，10 大行业全覆盖 |
| 🎯 **单篇深做** | 输入主题和关键词，深度打造完整一篇（标题+正文+封面+标签+钩子+CTA+结构） |
| 🔍 **爆款拆解** | 粘贴爆款笔记，AI 多维度结构化拆解，输出可复用模板 |
| 💎 **完整内容** | 标题 + 正文 + 封面文案 + 标签 + 预估流量 一次性给齐 |
| 🎨 **小红书风格** | 粉红主色 / 圆角卡片 / 大量 emoji / 移动端优先 |
| 🆓 **演示模式** | 无 API Key 也能跑，部署完立即看到效果 |

---

## 🎯 10 大行业模板

美妆 · 穿搭 · 美食 · 家居 · 母婴 · 数码 · 护肤 · 健身 · 教育 · 职场

每种风格：种草 / 测评 / 教程 / 探店 / 对比

---

## 🛠 技术栈

- **框架**：Next.js 14 (App Router) + TypeScript
- **样式**：Tailwind CSS（不引入 UI 库）
- **AI**：DeepSeek API（OpenAI 兼容）+ 内置演示模式
- **部署**：Vercel（默认 `hkg1` 区域，国内访问更快）
- **支付**：手动收款（不依赖商户号）

---

## 🚀 本地启动 5 步

### 1. 克隆/进入项目目录
```bash
cd ai-xiaohongshu
```

### 2. 安装依赖
```bash
npm install
```

### 3. 配置环境变量（可选）
```bash
cp .env.example .env.local
```
默认演示模式即可运行；如需真实 AI 生成，请申请 [DeepSeek API Key](https://platform.deepseek.com/)，填入 `DEEPSEEK_API_KEY`。

### 4. 启动开发服务器
```bash
npm run dev
```

### 5. 打开浏览器
```
http://localhost:3000
```

✅ **演示模式下无需任何配置即可看到完整效果！**

---

## ☁️ Vercel 部署 5 步

### 1. 推送代码到 GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/ai-xiaohongshu.git
git push -u origin main
```

### 2. 登录 [Vercel](https://vercel.com)

### 3. 点击 "Import Project" → 选择你的 GitHub 仓库

### 4. 配置环境变量（在 Project Settings → Environment Variables）
```
DEEPSEEK_API_KEY = sk-你的真实key（可选）
DEEPSEEK_BASE_URL = https://api.deepseek.com/v1
DEEPSEEK_MODEL = deepseek-chat
DEMO_MODE = false  # 启用真实 AI 时设为 false
ADMIN_PASSWORD = 你的管理员密码
```

### 5. 点击 Deploy，等待 1-2 分钟即可访问

项目自带 `vercel.json`，已配置：
- ✅ `framework: nextjs`（自动识别）
- ✅ `regions: ["hkg1"]`（香港节点，国内更快）
- ✅ `buildCommand: npm run build`

---

## 📁 项目结构

```
ai-xiaohongshu/
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── vercel.json
├── .env.example
├── .gitignore
├── README.md
└── src/
    ├── app/
    │   ├── layout.tsx              # 全局布局
    │   ├── page.tsx                # 首页
    │   ├── globals.css             # 全局样式
    │   ├── pricing/page.tsx        # 定价页
    │   ├── batch/page.tsx          # 批量生成（核心）
    │   ├── single/page.tsx         # 单篇深做
    │   ├── analyze/page.tsx        # 爆款拆解
    │   ├── login/page.tsx          # 登录
    │   ├── dashboard/page.tsx      # 控制台
    │   ├── manual-pay/page.tsx     # 手动收款
    │   └── api/
    │       ├── batch/route.ts
    │       ├── single/route.ts
    │       ├── analyze/route.ts
    │       └── admin/login/route.ts
    ├── components/
    │   ├── Navbar.tsx              # 导航
    │   ├── Footer.tsx              # 页脚
    │   ├── DemoBanner.tsx          # 演示模式横幅
    │   ├── NoteCard.tsx            # 笔记卡片
    │   └── PromoPopup.tsx          # 优惠弹窗
    ├── lib/
    │   ├── ai.ts                   # AI 封装（含演示模式）
    │   ├── types.ts                # 类型定义
    │   ├── pricing.ts              # 套餐+优惠码
    │   └── db-check.ts             # 环境变量读取
    └── prompts/
        ├── batch.ts                # 批量生成 Prompt
        ├── single.ts               # 单篇生成 Prompt
        └── analyze.ts              # 拆解 Prompt
```

---

## 🎁 演示模式 (Mock 数据)

部署完即开即用，预置 10 个行业 × 10 条爆款笔记 = **100 条真实爆款样本**。

判定逻辑（`src/lib/ai.ts`）：
```typescript
export function isDemoMode(): boolean {
  if (process.env.DEMO_MODE === "false") return false;
  const dsKey = process.env.DEEPSEEK_API_KEY;
  return !dsKey || dsKey.length < 10 || dsKey.startsWith("sk-your");
}
```

---

## 💰 定价方案

| 套餐 | 价格 | 数量 | 适合 |
| --- | --- | --- | --- |
| 体验单篇 | ¥9.9 | 1 篇 | 首次体验 |
| 博主月卡 | ¥199 | 60 篇/月 | 个人博主 |
| 季度畅写 | ¥499 | 200 篇/季 | 高产博主 |
| 商家代运营包 | ¥2999 | 无限+代运营 | 商家/品牌 |

**优惠码**：
- `XHS66` - 新用户 66 折
- `BATCH20` - 批量生成用户 8 折
- `BOSS` - 商家包 5 折（咨询客服）

支付方式：微信 / 支付宝 手动转账，1-5 分钟内开通。

---

## 🎨 设计风格

- **主色调**：粉红 / 玫红（小红书经典色）
- **圆角**：卡片 2xl，按钮 full
- **emoji**：每段至少 1 个
- **移动端**：完全响应式，手机也能用
- **动画**：fade-in / slide-up / pulse-slow

---

## ❓ 常见问题

### Q1: 演示模式有什么限制？
**A**: 演示模式下生成内容是预置的 100 条高质量 Mock 数据，足够展示产品效果。配置 `DEEPSEEK_API_KEY` 后即启用真实 AI 生成。

### Q2: 没有 API Key 能用吗？
**A**: 可以！演示模式无需任何配置，部署即用。申请 DeepSeek API Key 也很简单：https://platform.deepseek.com/ 充值后即可。

### Q3: 生成的内容可以商用吗？
**A**: 可以。付费后内容版权归你。

### Q4: 如何修改管理员密码？
**A**: 在 `.env.local` 或 Vercel 环境变量中设置 `ADMIN_PASSWORD=你的密码`，默认 123456。

### Q5: 如何接入真实数据库？
**A**: 推荐使用 Supabase。修改 `src/lib/db-check.ts` 添加数据库连接，在 `src/app/dashboard/page.tsx` 中读取订单数据。

### Q6: 如何自定义 Prompt？
**A**: 修改 `src/prompts/` 下的三个文件：`batch.ts` / `single.ts` / `analyze.ts`。

### Q7: 部署到 Vercel 国内访问慢？
**A**: 已默认配置 `regions: ["hkg1"]` 香港节点，相对较快。如需更快，可配合 CDN 域名。

### Q8: 生成失败怎么办？
**A**:
1. 检查 `.env` 中的 `DEEPSEEK_API_KEY` 是否正确
2. 检查 DeepSeek 账户余额
3. 查看 Vercel 控制台的 Function Logs
4. 临时将 `DEMO_MODE` 设置为 `true` 回到演示模式

---

## 🔐 环境变量

| 变量 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- |
| `DEEPSEEK_API_KEY` | 否 | - | DeepSeek API 密钥 |
| `DEEPSEEK_BASE_URL` | 否 | `https://api.deepseek.com/v1` | API 端点 |
| `DEEPSEEK_MODEL` | 否 | `deepseek-chat` | 模型名称 |
| `DEMO_MODE` | 否 | `true` | 是否启用演示模式 |
| `ADMIN_PASSWORD` | 否 | `123456` | 管理员登录密码 |
| `WECHAT_QR_URL` | 否 | - | 微信收款码图片 URL |
| `ALIPAY_QR_URL` | 否 | - | 支付宝收款码图片 URL |
| `BUSINESS_WECHAT` | 否 | - | 商家微信号 |

---

## 📜 商业模式建议

### 流量入口
- 小红书 / 抖音 / B站 / 知乎 引流到官网
- SEO 关键词：小红书代写 / AI小红书 / 爆款笔记

### 转化路径
1. 用户访问首页
2. 试用演示模式（无需注册）
3. 看到效果 → 跳转到定价页
4. 选择套餐 → 手动收款页
5. 客服核销 → 开通权限

### 复购
- 弹窗推广（`PromoPopup` 已内置）
- 月卡自动到期提醒（可扩展邮件）

---

## 📝 License

MIT - 你可以自由商用、修改、分发。

---

## 🙏 致谢

- [DeepSeek](https://platform.deepseek.com/) - 提供大模型 API
- [Next.js](https://nextjs.org/) - 强大的 React 框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Vercel](https://vercel.com/) - 一键部署平台

---

Made with 🌸 for 小红书创作者
