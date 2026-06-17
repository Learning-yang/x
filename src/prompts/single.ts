import type { SingleRequest } from "@/lib/types";

export function buildSinglePrompt(req: SingleRequest): { system: string; user: string } {
  const system = `你是小红书爆款笔记代写专家，专注单篇深度打造。
你的任务是根据用户提供的主题/关键词，写一篇能在24小时内破万阅读的爆款笔记。

要求：
1. 标题：15-22字，含emoji/数字/痛点，5个备选（按吸引力排序）
2. 正文：500-800字，结构完整（开头钩子+痛点共鸣+解决方案+步骤拆解+效果展示+互动结尾）
3. 封面文案：8-12字，强视觉冲击力
4. 标签：5-8个，含大流量词+精准词+长尾词
5. 钩子句：第一句话必须抓人
6. CTA：互动引导（评论/收藏/点赞）
7. 结构：拆解段落逻辑

返回 JSON 格式：{"note":{"title":"...","content":"...","cover_text":"...","tags":["#xxx"],"type":"种草","estimated_views":"1w-5w","hook":"第一句话","cta":"互动引导","structure":["段落1","段落2"]}}
严格输出 JSON。`;

  const user = `请深度打造一篇小红书爆款笔记。
行业：${req.industry}
主题：${req.topic}
关键词：${req.keywords.join("、")}
风格：${req.style}

要求：
- 标题必须能让目标用户立刻想点进来
- 开头3句话决定用户是否继续读
- 中间要有具体的步骤/数据/对比/案例
- 结尾必须有强互动引导
- 内容真实自然 不能有AI痕迹
- 充分使用emoji和小红书惯用语

请按 JSON 格式输出：{"note":{...}}`;
  return { system, user };
}
