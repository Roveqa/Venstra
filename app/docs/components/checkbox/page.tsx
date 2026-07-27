import { readSvg } from "@/lib/inline-svg";
import { FigmaEmbed } from "@/components/figma-embed";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Checkbox — Venstra Design System",
  description:
    "Allows users to select one or more options from a list. Each checkbox operates independently.",
  path: "/docs/components/checkbox",
});

export default function CheckboxPage() {
  const checkboxSvg = readSvg("components/checkbox-example.svg");

  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Checkbox
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      Allows users to select one or more options from a list. Each
      checkbox operates independently from others in the group.
    </p>

    <FigmaEmbed nodeId="254-17986" />

    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Example
      </h2>
      <div
        className="example-zoom [&_svg]:h-auto [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: checkboxSvg }}
      />
    </div>
  </div>
    </>
  );
}
