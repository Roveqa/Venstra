"use client";

import { useState } from "react";
import { SemanticTypographyTable } from "@/components/semantic-typography-table";
import { TokenTable } from "@/components/token-table";
import { UnderlineTabs } from "@/components/underline-tabs";
import { primitiveTypographyGroups } from "@/lib/typography-tokens";

const tabs = ["Semantic", "Primitive"] as const;

export function TypographyTabs() {
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
            <h2 className="text-[18px] font-semibold text-ink-950">Primitive scale</h2>
            <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
              The base typographic values — font sizes, line heights, and
              weights that semantic tokens are built from.
            </p>
          </div>

          <div className="flex w-full flex-col gap-10">
            {primitiveTypographyGroups.map((group) => (
              <TokenTable key={group.title} group={group} />
            ))}
          </div>
        </div>
      ) : (
        <SemanticTypographyTable />
      )}
    </div>
  );
}
