import { FigmaEmbed } from "@/components/figma-embed";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Aspect Ratio — Venstra Design System",
  description:
    "A container that maintains a fixed width-to-height ratio. Used to display images, videos, and media without distortion.",
  path: "/docs/components/aspect-ratio",
});

export default function AspectRatioPage() {
  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Aspect Ratio
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      A container that maintains a fixed width-to-height ratio
      regardless of its size. Used to display images, videos, and
      media without distortion.
    </p>

    <FigmaEmbed nodeId="2060-23630" />

    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Example
      </h2>
      <div className="example-zoom flex w-full flex-col items-center justify-center gap-4 rounded-2xl border border-stroke px-10 py-20">
        <div className="relative h-[171px] w-[400px] shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/components/aspect-ratio-photo.png"
            alt="21:9 aspect ratio example"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
        <div className="relative size-[400px] shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/components/aspect-ratio-photo.png"
            alt="1:1 aspect ratio example"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
    </>
  );
}
