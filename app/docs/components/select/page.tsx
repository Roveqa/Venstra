import { readSvg } from "@/lib/inline-svg";
import { FigmaEmbed } from "@/components/figma-embed";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Select — Venstra Design System",
  description:
    "A dropdown control that allows users to choose one option from a predefined list.",
  path: "/docs/components/select",
});

export default function SelectPage() {
  const selectSvg = readSvg("components/select-example.svg");

  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Select
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      A dropdown control that allows users to choose one option from a
      predefined list. Used when the number of options is too large
      for radio buttons.
    </p>

    <FigmaEmbed nodeId="1774-9310" />

    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Example
      </h2>
      <div
        className="example-zoom [&_svg]:h-auto [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: selectSvg }}
      />
    </div>
  </div>
    </>
  );
}
