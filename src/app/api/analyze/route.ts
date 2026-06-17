import { NextRequest, NextResponse } from "next/server";
import { analyzeNote } from "@/lib/ai";
import type { AnalyzeRequest, ApiResponse, AnalyzeResult } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<AnalyzeRequest>;

    if (!body.noteText || body.noteText.trim().length < 20) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "请粘贴至少20字的笔记内容" },
        { status: 400 }
      );
    }

    const result = await analyzeNote({
      noteText: body.noteText.slice(0, 3000)
    });

    return NextResponse.json<ApiResponse<{ result: AnalyzeResult; demo: boolean }>>({
      success: true,
      data: { result: result.result, demo: result.demo },
      demo: result.demo
    });
  } catch (err) {
    const message = (err as Error).message || "拆解失败，请稍后重试";
    return NextResponse.json<ApiResponse<null>>(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
