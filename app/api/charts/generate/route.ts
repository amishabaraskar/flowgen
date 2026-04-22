import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import connect from "@/lib/db";
import Chart from "@/lib/models/Chart";
import User from "@/lib/models/User";

// Initialise Gemini client once at module level
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const geminiModel = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
});

const SYSTEM_PROMPT = `You are a flowchart generator.
Respond ONLY with valid Mermaid flowchart syntax.
Rules you must follow:
- Always start your response with: flowchart TD
- No explanation text before or after
- No markdown code fences (no \`\`\`mermaid or \`\`\`)
- Keep node labels under 5 words
- Use decision diamonds {like this} for conditions like if/when/depending`;

export async function POST(req: NextRequest) {
  try {
    // 1. Connect to MongoDB
    await connect();

    // 2. Parse request body
    const body = await req.json();
    const { prompt, userId } = body;

    // 3. Validate prompt exists
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    // 4. Check user exists and enforce usage limit
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.plan === "free" && user.usageCount >= 5) {
      return NextResponse.json(
        { error: "Free limit reached. Upgrade to Pro for unlimited charts." },
        { status: 403 },
      );
    }

    // 5. Call Gemini API
    const fullPrompt = `${SYSTEM_PROMPT}\n\nUser request: ${prompt.trim()}`;
    const result = await geminiModel.generateContent(fullPrompt);
    let mermaidCode = result.response.text().trim();

    // 6. Strip markdown fences if Gemini adds them anyway
    mermaidCode = mermaidCode
      .replace(/^```mermaid\n?/i, "")
      .replace(/^```\n?/i, "")
      .replace(/\n?```$/i, "")
      .trim();

    // 7. Validate output starts with flowchart
    if (!mermaidCode.startsWith("flowchart")) {
      console.error("Bad Gemini output:", mermaidCode);
      return NextResponse.json(
        { error: "AI returned invalid output. Please try a clearer prompt." },
        { status: 500 },
      );
    }

    // 8. Save chart to MongoDB
    const chart = await Chart.create({
      userId,
      prompt: prompt.trim(),
      mermaidCode,
      title: prompt.trim().slice(0, 60),
    });

    // 9. Increment usage count atomically
    await User.findByIdAndUpdate(userId, { $inc: { usageCount: 1 } });

    // 10. Return saved chart
    return NextResponse.json({ chart }, { status: 200 });
  } catch (err: any) {
    console.error("Generate route error:", err?.message || err);

    // Gemini quota exceeded
    if (err?.message?.includes("quota")) {
      return NextResponse.json(
        { error: "AI service quota exceeded. Try again in a minute." },
        { status: 429 },
      );
    }

    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 },
    );
  }
}
