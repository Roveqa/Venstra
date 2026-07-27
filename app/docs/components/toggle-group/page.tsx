import { readSvg } from "@/lib/inline-svg";
import { FigmaEmbed } from "@/components/figma-embed";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Toggle Group — Venstra Design System",
  description:
    "A set of related toggle buttons where one or more options can be selected. Used for formatting controls and view switchers.",
  path: "/docs/components/toggle-group",
});

export default function ToggleGroupPage() {
  const toggleGroupSvg = readSvg("components/toggle-group-example.svg");

  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Toggle Group
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      A set of related toggle buttons where one or more options can be
      selected at a time. Commonly used for text formatting controls
      and view switchers.
    </p>

    <FigmaEmbed nodeId="2067-2993" />

    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Example
      </h2>
      <div
        className="example-zoom [&_svg]:h-auto [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: toggleGroupSvg }}
      />
    </div>
  </div>
    </>
  );
}
