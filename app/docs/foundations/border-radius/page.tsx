import { BorderRadiusTable } from "@/components/border-radius-table";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Border Radius — Venstra Design System",
  description:
    "Border radius tokens that define corner rounding for every component in Venstra. Keep shape consistent across the entire system.",
  path: "/docs/foundations/border-radius",
});

export default function BorderRadiusPage() {
  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Border radius
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      Venstra&apos;s border radius tokens define the corner rounding
      for every component. Use them instead of custom values to keep
      shape consistent across the entire system.
    </p>

    <BorderRadiusTable />
  </div>
    </>
  );
}
