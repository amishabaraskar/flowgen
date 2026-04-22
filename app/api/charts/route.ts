import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Chart from "@/lib/models/Chart";
import { jwtVerify } from "jose";

export async function GET(req: NextRequest) {
  // 1. Connect to MongoDB

  try {
    await connect();

    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!),
    );

    const userId = payload.id || "";
    const charts = await Chart.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json({ charts });
  } catch (err: any) {
    console.error("Get charts route error:", err?.message || err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 },
    );
  }
}
