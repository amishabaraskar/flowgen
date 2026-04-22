import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connect from "@/lib/db";
import User from "@/lib/models/User";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { email, password } = await req.json();
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true, // Recommended for security
      secure: true, // Required for HTTPS
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.json({ token });
  } catch (err: any) {
    console.error("Registration error:", err?.message || err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 },
    );
  }
}
