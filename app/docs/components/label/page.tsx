import { readSvg } from "@/lib/inline-svg";
import { FigmaEmbed } from "@/components/figma-embed";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Label — Venstra Design System",
  description:
    "A text element paired with a form control to describe its purpose and improve accessibility.",
  path: "/docs/components/label",
});

export default function LabelPage() {
  const labelSvg = readSvg("components/label-example.svg");

  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Label
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      A text element paired with a form control to describe its
      purpose. Improves accessibility and helps users understand what
      input is expected.
    </p>

    <FigmaEmbed nodeId="1-13" />

    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Example
      </h2>
      <div
        className="example-zoom [&_svg]:h-auto [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: labelSvg }}
      />
    </div>
  </div>
    </>
  );
}
