import { TypographyTabs } from "@/components/typography-tabs";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Typography — Venstra Design System",
  description:
    "Venstra uses Inter as its typeface. Explore the full type scale and semantic typography tokens used across all components.",
  path: "/docs/foundations/typography",
});

export default function TypographyPage() {
  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Typography
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      Venstra uses a single typeface — Inter. The type system runs on
      two layers: a primitive scale of raw size and weight values,
      and semantic tokens that define how text is used across
      components.
    </p>

    <TypographyTabs />
  </div>
    </>
  );
}
