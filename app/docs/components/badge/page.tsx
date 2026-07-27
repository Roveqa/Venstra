import { readSvg } from "@/lib/inline-svg";
import { FigmaEmbed } from "@/components/figma-embed";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Badge — Venstra Design System",
  description:
    "A small label used to highlight a status, category, or count. Placed on or near other elements to provide context.",
  path: "/docs/components/badge",
});

export default function BadgePage() {
  const draftSvg = readSvg("components/badge-draft.svg");
  const completedSvg = readSvg("components/badge-completed.svg");
  const pendingSvg = readSvg("components/badge-pending.svg");
  const failedSvg = readSvg("components/badge-failed.svg");

  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Badge
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      A small label used to highlight a status, category, or count.
      Commonly placed on or near other elements to provide additional
      context.
    </p>

    <FigmaEmbed nodeId="903-5385" />

    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Example
      </h2>
      <div className="example-zoom flex w-full flex-col items-center justify-center gap-4 rounded-2xl border border-stroke px-10 py-20">
        <div
          className="[&_svg]:h-6 [&_svg]:w-[49px]"
          dangerouslySetInnerHTML={{ __html: draftSvg }}
        />
        <div
          className="[&_svg]:h-6 [&_svg]:w-[103px]"
          dangerouslySetInnerHTML={{ __html: completedSvg }}
        />
        <div
          className="[&_svg]:h-6 [&_svg]:w-[85px]"
          dangerouslySetInnerHTML={{ __html: pendingSvg }}
        />
        <div
          className="[&_svg]:h-6 [&_svg]:w-[55px]"
          dangerouslySetInnerHTML={{ __html: failedSvg }}
        />
      </div>
    </div>
  </div>
    </>
  );
}
