import { readSvg } from "@/lib/inline-svg";
import { FigmaEmbed } from "@/components/figma-embed";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Tooltip — Venstra Design System",
  description:
    "A small informational label that appears on hover to provide additional context for an element.",
  path: "/docs/components/tooltip",
});

export default function TooltipPage() {
  const tooltipSvg = readSvg("components/tooltip-example.svg");

  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Tooltip
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      A small informational label that appears on hover to provide
      additional context for an element. Used when the purpose of a
      control is not immediately obvious.
    </p>

    <FigmaEmbed nodeId="1-14" />

    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Example
      </h2>
      <div
        className="example-zoom [&_svg]:h-auto [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: tooltipSvg }}
      />
    </div>
  </div>
    </>
  );
}
