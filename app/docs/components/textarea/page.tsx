import { readSvg } from "@/lib/inline-svg";
import { FigmaEmbed } from "@/components/figma-embed";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Textarea — Venstra Design System",
  description:
    "A multi-line text field for collecting longer input such as messages, descriptions, and comments.",
  path: "/docs/components/textarea",
});

export default function TextareaPage() {
  const textareaSvg = readSvg("components/textarea-example.svg");

  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Textarea
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      A multi-line text field for collecting longer user input. Used
      for messages, descriptions, comments, and any content that may
      span multiple lines.
    </p>

    <FigmaEmbed nodeId="2067-2939" />

    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Example
      </h2>
      <div
        className="example-zoom [&_svg]:h-auto [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: textareaSvg }}
      />
    </div>
  </div>
    </>
  );
}
