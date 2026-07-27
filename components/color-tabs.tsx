"use client";

import { useState } from "react";
import { ColorTable } from "@/components/color-table";
import { SemanticColorTable } from "@/components/semantic-color-table";
import { UnderlineTabs } from "@/components/underline-tabs";
import { primitiveColorGroups } from "@/lib/color-tokens";
import { semanticColorGroups } from "@/lib/semantic-color-tokens";

const tabs = ["Semantic", "Primitive"] as const;

export function ColorTabs() {
  const [active, setActive] = useState<(typeof tabs)[number]>("Semantic");

  return (
    <div className="flex w-full flex-col gap-8">
      <UnderlineTabs
        tabs={tabs}
        active={active}
        onChange={(tab) => setActive(tab as (typeof tabs)[number])}
      />

      {active === "Primitive" ? (
        <div className="flex w-full flex-col gap-[28px]">
          <div className="flex flex-col gap-3">
            <h2 className="text-[18px] font-semibold text-ink-950">Primitive palette</h2>
            <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
              The raw color values that power the entire system, organized by scale (50–950).
            </p>
          </div>

          <div className="flex w-full flex-col gap-10">
            {primitiveColorGroups.map((group) => (
              <ColorTable key={group.title} group={group} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-[28px]">
          <div className="flex flex-col gap-3">
            <h2 className="text-[18px] font-semibold text-ink-950">Semantic palette</h2>
            <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
              Semantic tokens define what each color is for, not what it looks
              like. Every token resolves to a primitive value — one for light
              mode, one for dark.
            </p>
          </div>

          <div className="flex w-full flex-col gap-10">
            {semanticColorGroups.map((group) => (
              <SemanticColorTable key={group.title} group={group} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
