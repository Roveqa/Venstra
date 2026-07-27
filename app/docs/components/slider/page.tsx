import { readSvg } from "@/lib/inline-svg";
import { FigmaEmbed } from "@/components/figma-embed";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Slider — Venstra Design System",
  description:
    "An input control for selecting a value or range by dragging a handle along a track.",
  path: "/docs/components/slider",
});

export default function SliderPage() {
  const sliderSvg = readSvg("components/slider-example.svg");

  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Slider
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      An input control that lets users select a value or range by
      dragging a handle along a track. Used for continuous values
      like volume, price, or size.
    </p>

    <FigmaEmbed nodeId="2067-2937" />

    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Example
      </h2>
      <div
        className="example-zoom [&_svg]:h-auto [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: sliderSvg }}
      />
    </div>
  </div>
    </>
  );
}
