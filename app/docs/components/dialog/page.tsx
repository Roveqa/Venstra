import { readSvg } from "@/lib/inline-svg";
import { FigmaEmbed } from "@/components/figma-embed";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Dialog — Venstra Design System",
  description:
    "A modal window that appears on top of the page to display content or request input.",
  path: "/docs/components/dialog",
});

export default function DialogPage() {
  const dialogSvg = readSvg("components/dialog-example.svg");

  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Dialog
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      A modal window that appears on top of the current page to
      display content or request input. Blocks interaction with the
      rest of the interface until dismissed.
    </p>

    <FigmaEmbed nodeId="116-4195" />

    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Example
      </h2>
      <div
        className="example-zoom flex w-full items-center justify-center rounded-2xl border border-stroke px-10 py-20 [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-[452px]"
        dangerouslySetInnerHTML={{ __html: dialogSvg }}
      />
    </div>
  </div>
    </>
  );
}
