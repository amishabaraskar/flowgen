"use client";
import { useState } from "react";

interface FlowEditorProps {
  userId: string;
  onGenerate: (mermaidCode: string) => void;
  parentsetLoading: (loading: boolean) => void;
}

export default function FlowEditor({
  userId,
  onGenerate,
  parentsetLoading,
}: FlowEditorProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    parentsetLoading(true);
    try {
      const res = await fetch("/api/charts/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, userId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Generation failed");
        return;
      }

      onGenerate(data.chart.mermaidCode);
      setPrompt("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      parentsetLoading(false);
    }
  };

  return (
    <div className=" border border-gray-200 rounded-xl p-5">
      <label className="block text-sm font-medium mb-2">
        Describe your process
      </label>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g. User signs up, verifies email, then accesses the dashboard..."
        rows={4}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 resize-none"
      />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className="mt-3 w-full bg-rose-500 text-white py-2 rounded-lg text-md font-bold hover:bg-rose-600 disabled:opacity-70"
      >
        {loading ? "Generating..." : "Generate flowchart"}
      </button>
    </div>
  );
}
