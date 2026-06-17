import { NextRequest, NextResponse } from "next/server";
import { generateBatch } from "@/lib/ai";
import type { BatchRequest, ApiResponse, Note } from "@/lib/types";

const VALID_INDUSTRIES = ["美妆", "穿搭", "美食", "家居", "母婴", "数码", "护肤", "健身", "教育", "职场"];
const VALID_STYLES = ["种草", "测评", "教程", "探店", "对比"];
const VALID_COUNTS: Array<5 | 10 | 20> = [5, 10, 20];

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<BatchRequest>;

    if (!body.industry || !VALID_INDUSTRIES.includes(body.industry)) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "请选择有效行业" },
        { status: 400 }
      );
    }
    if (!body.style || !VALID_STYLES.includes(body.style)) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "请选择有效风格" },
        { status: 400 }
      );
    }
    if (!body.count || !VALID_COUNTS.includes(body.count as 5 | 10 | 20)) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "数量必须为 5/10/20" },
        { status: 400 }
      );
    }

    const result = await generateBatch({
      industry: body.industry,
      style: body.style,
      count: body.count as 5 | 10 | 20,
      topic: body.topic?.slice(0, 100)
    });

    return NextResponse.json<ApiResponse<{ notes: Note[]; demo: boolean }>>({
      success: true,
      data: { notes: result.notes, demo: result.demo },
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
