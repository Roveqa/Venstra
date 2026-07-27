import { readSvg } from "@/lib/inline-svg";
import { FigmaEmbed } from "@/components/figma-embed";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Input — Venstra Design System",
  description:
    "A single-line text field for collecting user input with label, placeholder, and helper text support.",
  path: "/docs/components/input",
});

export default function InputPage() {
  const inputSvg = readSvg("components/input-example.svg");

  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Input
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      A single-line text field for collecting user input. Supports
      labels, placeholder text, helper messages, and multiple states.
    </p>

    <FigmaEmbed nodeId="1-12" />

    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Example
      </h2>
      <div
        className="example-zoom [&_svg]:h-auto [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: inputSvg }}
      />
    </div>
  </div>
    </>
  );
}
