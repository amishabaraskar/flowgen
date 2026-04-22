import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connect from "@/lib/db";
import User from "@/lib/models/User";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  await connect();
  const { email, password } = await req.json();
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true, // Recommended for security
    secure: true, // Required for HTTPS
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
  return NextResponse.json({ plan: user.plan, token });
}
