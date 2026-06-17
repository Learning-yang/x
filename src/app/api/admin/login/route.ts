import { NextRequest, NextResponse } from "next/server";
import { getAdminPassword } from "@/lib/db-check";

interface LoginResponse {
  success: boolean;
  error?: string;
  token?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { password?: string };
    const inputPassword = body.password || "";
    const correctPassword = getAdminPassword();

    if (inputPassword !== correctPassword) {
      return NextResponse.json<LoginResponse>(
        { success: false, error: "密码错误" },
        { status: 401 }
      );
    }

    const token = Buffer.from(`admin:${Date.now()}`).toString("base64");
    return NextResponse.json<LoginResponse>({
      success: true,
      token
    });
  } catch (err) {
    return NextResponse.json<LoginResponse>(
      { success: false, error: "登录失败" },
      { status: 500 }
    );
  }
}
