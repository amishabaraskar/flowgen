"use client";
import { useEffect, useRef } from "react";
import mermaid from "mermaid";
import {
  ArrowDownRightSquare,
  DownloadIcon,
  LucideAArrowDown,
  LucideDownload,
} from "lucide-react";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
});

interface FlowCanvasProps {
  code: string;
  editorloading?: boolean;
}

export default function FlowCanvas({ code, editorloading }: FlowCanvasProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!code || !ref.current) return;

    const render = async () => {
      if (!ref.current) return;
      ref.current.innerHTML = "";

      try {
        const id = "fc-" + Date.now();
        const { svg } = await mermaid.render(id, code);
        console.log("Rendered SVG:", svg);
        ref.current.innerHTML = svg;
      } catch (err) {
        ref.current.innerHTML =
          '<p class="text-red-500 text-sm">Could not render diagram. Try a clearer prompt.</p>';
      }
    };

    render();
  }, [code]);

  if (!code || editorloading) {
    return (
      <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm">
        Your flowchart will appear here
      </div>
    );
  }

  const downloadSVG = () => {
    const svgData = ref.current?.innerHTML; // Or use container.querySelector('svg').outerHTML
    if (svgData) {
      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "image.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url); // Clean up memory
    }
  };
  return (
    <>
      <button
        onClick={downloadSVG}
        className="btn-primary py-2 rounded-lg font-medium flex gap-2"
      >
        Download
        <LucideDownload size={24} />
      </button>
      <div
        ref={ref}
        className="w-full overflow-x-auto bg-white border border-gray-400 rounded-xl p-4 min-h-[200px]"
      />
    </>
  );
}
