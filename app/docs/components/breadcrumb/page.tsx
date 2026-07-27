import { readSvg } from "@/lib/inline-svg";
import { FigmaEmbed } from "@/components/figma-embed";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Breadcrumb — Venstra Design System",
  description:
    "A secondary navigation pattern that shows the user's current location within a hierarchy.",
  path: "/docs/components/breadcrumb",
});

export default function BreadcrumbPage() {
  const breadcrumbSvg = readSvg("components/breadcrumb-example.svg");

  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Breadcrumb
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      A secondary navigation pattern that shows the user&apos;s
      current location within a hierarchy. Helps users understand
      where they are and navigate back.
    </p>

    <FigmaEmbed nodeId="128-4797" />

    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Example
      </h2>
      <div className="example-zoom flex w-full items-center justify-center rounded-2xl border border-stroke px-10 py-20">
        <div
          className="flex w-full justify-center [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-[342px]"
          dangerouslySetInnerHTML={{ __html: breadcrumbSvg }}
        />
      </div>
    </div>
  </div>
    </>
  );
}
