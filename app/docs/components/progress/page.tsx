import { readSvg } from "@/lib/inline-svg";
import { FigmaEmbed } from "@/components/figma-embed";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Progress — Venstra Design System",
  description:
    "A visual indicator that shows the completion status of a task or process.",
  path: "/docs/components/progress",
});

export default function ProgressPage() {
  const progressSvg = readSvg("components/progress-example.svg");

  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Progress
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      A visual indicator that shows the completion status of a task or
      process. Communicates how much has been done and how much
      remains.
    </p>

    <FigmaEmbed nodeId="2067-1225" />

    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Example
      </h2>
      <div
        className="example-zoom [&_svg]:h-auto [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: progressSvg }}
      />
    </div>
  </div>
    </>
  );
}
