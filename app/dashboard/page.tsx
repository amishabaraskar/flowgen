"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import FlowEditor from "@/components/FlowEditor";
import NavBar from "@/components/NavBar";

// Dynamic import with ssr:false — critical for Mermaid.js
const FlowCanvas = dynamic(() => import("@/components/FlowCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm">
      Loading renderer...
    </div>
  ),
});

interface Chart {
  _id: string;
  title: string;
  mermaidCode: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [mermaidCode, setMermaidCode] = useState("");
  const [charts, setCharts] = useState<Chart[]>([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  // Get userId from the server on mount
  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.userId) setUserId(d.userId);
      });
  }, []);

  // Load saved charts
  useEffect(() => {
    if (!userId) return;
    fetch("/api/charts")
      .then((r) => r.json())
      .then((d) => setCharts(d.charts || []));
  }, [userId]);

  const handleGenerate = (code: string) => {
    setMermaidCode(code);
    // Refresh saved charts list
    fetch("/api/charts")
      .then((r) => r.json())
      .then((d) => setCharts(d.charts || []));
  };

  return (
    <>
      <NavBar page="dashboard" />

      <div className=" max-h-screen grid grid-cols-1 lg:grid-cols-4 gap-6 px-10 ">
        {/* Left sidebar — saved charts */}
        <div className="lg:col-span-1">
          <h2 className="font-semibold text-sm mb-3 text-gray-500 uppercase tracking-wide">
            Saved charts
          </h2>
          {charts.length === 0 ? (
            <div>
              <p className="text-sm text-gray-700">No charts yet</p>
              <p className="text-sm text-gray-400">
                Start writing your process description for first chart
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {charts.map((chart) => (
                <li
                  key={chart._id}
                  onClick={() => setMermaidCode(chart.mermaidCode)}
                  className=" border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-rose-500 transition-colors"
                >
                  <p className="text-sm font-medium truncate">{chart.title}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(chart.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Main area — editor + canvas */}
        <div className="lg:col-span-3 space-y-5">
          <FlowEditor
            userId={userId}
            onGenerate={handleGenerate}
            parentsetLoading={setLoading}
          />
          <FlowCanvas code={mermaidCode} editorloading={loading} />
        </div>
      </div>
    </>
  );
}
