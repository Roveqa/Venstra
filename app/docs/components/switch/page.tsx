import { readSvg } from "@/lib/inline-svg";
import { FigmaEmbed } from "@/components/figma-embed";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Switch — Venstra Design System",
  description:
    "A toggle control for turning a single setting on or off. Takes effect immediately without confirmation.",
  path: "/docs/components/switch",
});

export default function SwitchPage() {
  const switchSvg = readSvg("components/switch-example.svg");

  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Switch
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      A toggle control for turning a single setting on or off.
      Represents a binary choice that takes effect immediately
      without requiring confirmation.
    </p>

    <FigmaEmbed nodeId="1898-6461" />

    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Example
      </h2>
      <div
        className="example-zoom [&_svg]:h-auto [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: switchSvg }}
      />
    </div>
  </div>
    </>
  );
}
