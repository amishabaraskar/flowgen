import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionWrapper from "@/components/SessionWrapper";

import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlowGen — AI Flowchart Generator",
  description: "Generate flowcharts from plain text using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 overflow-y-auto scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <span className="font-semibold text-lg">FlowGen</span>
          {userId ? (
            <a
              href="/api/auth/logout"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Logout
            </a>
          ) : (
            <a
              href="/api/auth/login"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Login
            </a>
          )}
        </nav> */}
        <SessionWrapper>
          <main className="max-w-screen mx-auto">{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
