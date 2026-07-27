import { DisabledTable, FocusTable, ShadowTable } from "@/components/effects-tables";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Effects — Venstra Design System",
  description:
    "Effect tokens in Venstra covering shadows, focus rings, and disabled state opacity used across all components.",
  path: "/docs/foundations/effects",
});

export default function EffectsPage() {
  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Effects
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      Effects in Venstra cover three categories — shadows, focus
      rings, and opacity for disabled states. Each is tokenized to
      stay consistent across components and themes.
    </p>

    <div className="flex w-full flex-col gap-5">
      <h2 className="text-[16px] font-semibold leading-[1.2] tracking-[-0.48px] text-ink-950">
        Shadow
      </h2>
      <ShadowTable />
    </div>

    <div className="flex w-full flex-col gap-5">
      <h2 className="text-[16px] font-semibold leading-[1.2] tracking-[-0.48px] text-ink-950">
        Focus
      </h2>
      <FocusTable />
    </div>

    <div className="flex w-full flex-col gap-5">
      <h2 className="text-[16px] font-semibold leading-[1.2] tracking-[-0.48px] text-ink-950">
        Disabled
      </h2>
      <DisabledTable />
    </div>
  </div>
    </>
  );
}
