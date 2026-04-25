// import { NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from "jose"; // use jose — not jsonwebtoken (Edge runtime)

// export async function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
//   if (!token) return NextResponse.redirect(new URL("/login", req.url));
//   try {
//     await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
//     return NextResponse.next();
//   } catch {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }

// export const config = {
//   matcher: ["/dashboard/:path*"], // only protect these routes
// };

// proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
