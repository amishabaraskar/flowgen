import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Chart from "@/lib/models/Chart";

export async function GET(req: NextRequest) {
  try {
    // Read userId from query param: /api/charts?userId=abc123
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 },
      );
    }

    await connect();

    const charts = await Chart.find({ userId })
      .sort({ createdAt: -1 })
      .limit(20);

    return NextResponse.json({ charts });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 },
    );
  }
}
