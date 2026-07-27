import { Fragment } from "react";
import { resolveColorRef, type SemanticGroup } from "@/lib/semantic-color-tokens";
import { needsSwatchBorder } from "@/lib/swatch-border";

/** Inserts zero-width spaces after "/" so long token paths wrap at segment boundaries, not mid-word. */
function withBreakOpportunities(text: string) {
  return text.split("/").join("/​");
}

export function SemanticColorTable({ group }: { group: SemanticGroup }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <h3 className="text-[16px] font-semibold leading-[1.19] text-ink-950">{group.title}</h3>

      <div className="grid w-full grid-cols-3 overflow-hidden rounded-xl border border-stroke bg-[var(--surface-low)]">
        <div className="flex h-10 items-center border-b border-stroke bg-surface-subtle px-3 text-sm text-ink-600">
          Name
        </div>
        <div className="flex h-10 items-center border-b border-stroke bg-surface-subtle px-3 text-sm text-ink-600">
          Value on light
        </div>
        <div className="flex h-10 items-center border-b border-stroke bg-surface-subtle px-3 text-sm text-ink-600">
          Value on dark
        </div>

        {group.rows.map((row, i) => {
          const lightColor = resolveColorRef(row.light);
          const darkColor = resolveColorRef(row.dark);
          return (
            <Fragment key={row.name}>
              <div
                key={`${row.name}-name`}
                className={`flex min-w-0 items-center border-stroke px-3 py-[18px] text-sm leading-5 tracking-[-0.14px] text-ink-950 ${
                  i < group.rows.length - 1 ? "border-b" : ""
                }`}
              >
                {withBreakOpportunities(row.name)}
              </div>
              <div
                key={`${row.name}-light`}
                className={`flex min-w-0 items-center gap-2 border-stroke px-3 py-[18px] ${
                  i < group.rows.length - 1 ? "border-b" : ""
                }`}
              >
                <div
                  className={`h-4 w-5 shrink-0 rounded ${
                    needsSwatchBorder(lightColor, "light") ? "border border-[#d0d0d0]" : ""
                  }`}
                  style={{ background: lightColor }}
                />
                <span className="min-w-0 text-sm leading-5 tracking-[-0.14px] text-ink-950">
                  {withBreakOpportunities(row.light)}
                </span>
              </div>
              <div
                key={`${row.name}-dark`}
                className={`flex min-w-0 items-center gap-2 border-[#262626] bg-[#040404] px-3 py-[18px] ${
                  i < group.rows.length - 1 ? "border-b" : ""
                }`}
              >
                <div
                  className={`h-4 w-5 shrink-0 rounded ${
                    needsSwatchBorder(darkColor, "dark") ? "border border-[#4a4a4a]" : ""
                  }`}
                  style={{ background: darkColor }}
                />
                <span className="min-w-0 text-sm leading-5 tracking-[-0.14px] text-white">
                  {withBreakOpportunities(row.dark)}
                </span>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
