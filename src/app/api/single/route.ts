import { NextRequest, NextResponse } from "next/server";
import { generateSingle } from "@/lib/ai";
import type { SingleRequest, ApiResponse, SingleNote } from "@/lib/types";

const VALID_INDUSTRIES = ["美妆", "穿搭", "美食", "家居", "母婴", "数码", "护肤", "健身", "教育", "职场"];
const VALID_STYLES = ["种草", "测评", "教程", "探店", "对比"];

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<SingleRequest>;

    if (!body.industry || !VALID_INDUSTRIES.includes(body.industry)) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "请选择有效行业" },
        { status: 400 }
      );
    }
    if (!body.topic || body.topic.trim().length === 0) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "请填写主题" },
        { status: 400 }
      );
    }
    if (!body.style || !VALID_STYLES.includes(body.style)) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "请选择有效风格" },
        { status: 400 }
      );
    }
    const keywords = Array.isArray(body.keywords) ? body.keywords : [];

    const result = await generateSingle({
      industry: body.industry,
      topic: body.topic.trim().slice(0, 200),
      keywords: keywords.slice(0, 10),
      style: body.style
    });

    return NextResponse.json<ApiResponse<{ note: SingleNote; demo: boolean }>>({
      success: true,
      data: { note: result.note, demo: result.demo },
      demo: result.demo
    });
  } catch (err) {
    const message = (err as Error).message || "生成失败，请稍后重试";
    return NextResponse.json<ApiResponse<null>>(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
