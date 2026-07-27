import { Fragment } from "react";
import type { TokenGroup } from "@/lib/typography-tokens";

export function TokenTable({ group }: { group: TokenGroup }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <h3 className="text-[16px] font-semibold leading-[1.19] text-ink-950">{group.title}</h3>

      <div className="grid w-full grid-cols-2 overflow-hidden rounded-xl border border-stroke bg-[var(--surface-low)]">
        <div className="flex h-10 items-center border-b border-stroke bg-surface-subtle px-3 text-sm text-ink-600">
          Name
        </div>
        <div className="flex h-10 items-center border-b border-stroke bg-surface-subtle px-3 text-sm text-ink-600">
          Value
        </div>

        {group.rows.map((row, i) => (
          <Fragment key={row.name}>
            <div
              className={`flex min-w-0 items-center border-stroke px-3 py-[18px] text-sm leading-5 tracking-[-0.14px] text-ink-950 ${
                i < group.rows.length - 1 ? "border-b" : ""
              }`}
            >
              {row.name}
            </div>
            <div
              className={`flex min-w-0 items-center border-stroke px-3 py-[18px] text-sm leading-5 tracking-[-0.14px] text-ink-950 ${
                i < group.rows.length - 1 ? "border-b" : ""
              }`}
            >
              {row.value}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
