import { readSvg } from "@/lib/inline-svg";
import { FigmaEmbed } from "@/components/figma-embed";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pagination — Venstra Design System",
  description:
    "Allows users to navigate through multiple pages of content with clear controls.",
  path: "/docs/components/pagination",
});

export default function PaginationPage() {
  const paginationSvg = readSvg("components/pagination-example.svg");

  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Pagination
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      Allows users to navigate through multiple pages of content.
      Displays the current page and provides controls to move
      forward, backward, or to a specific page.
    </p>

    <FigmaEmbed nodeId="2067-1176" />

    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Example
      </h2>
      <div
        className="example-zoom [&_svg]:h-auto [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: paginationSvg }}
      />
    </div>
  </div>
    </>
  );
}
