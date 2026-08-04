"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

const FIGMA_FILE_KEY = "RIB8DZ9M5Uay7si4mI19Yt";

export function FigmaEmbed({ nodeId }: { nodeId: string }) {
  const [loaded, setLoaded] = useState(false);
  const figmaUrl = `https://www.figma.com/design/${FIGMA_FILE_KEY}/Venstra?node-id=${nodeId}`;
  const embedSrc = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(figmaUrl)}`;

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-stroke">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[#f8f8f8]">
          <Loader2 className="h-6 w-6 animate-spin text-[#b3b3b3]" />
          <span className="text-center text-[32px] leading-[1.24] tracking-[-0.64px] text-[#b3b3b3]">
            Figma
          </span>
        </div>
      )}
      <iframe
        src={embedSrc}
        title="Figma component preview"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full border-none transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        allowFullScreen
      />
    </div>
  );
}
