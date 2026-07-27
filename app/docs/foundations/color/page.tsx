import { ColorTabs } from "@/components/color-tabs";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Colors — Venstra Design System",
  description:
    "Venstra's color system built on two layers — a primitive palette and semantic tokens. Surface, Fill, Foreground, and Stroke with light and dark mode support.",
  path: "/docs/foundations/color",
});

export default function ColorPage() {
  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Color
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      The color system in Venstra runs on two layers. At the base
      sits a primitive palette — raw color values with no meaning
      attached. On top of that, semantic tokens define what each
      color is actually for. Every component pulls from the semantic
      layer only.
    </p>

    <ColorTabs />
  </div>
    </>
  );
}
