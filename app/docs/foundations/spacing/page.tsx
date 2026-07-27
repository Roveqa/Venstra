import { SpacingTable } from "@/components/spacing-table";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Spacing — Venstra Design System",
  description:
    "Consistent spacing tokens used across every component and layout in Venstra. Use them instead of custom values to keep alignment consistent.",
  path: "/docs/foundations/spacing",
});

export default function SpacingPage() {
  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Spacing
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      Venstra&apos;s spacing tokens define the standard distances
      between UI elements. Use them instead of custom values to keep
      padding, gaps, and margins consistent across every component
      and layout.
    </p>

    <SpacingTable />
  </div>
    </>
  );
}
