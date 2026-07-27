import { Fragment } from "react";
import { spacingRows } from "@/lib/spacing-tokens";

export function SpacingTable() {
  return (
    <div className="grid w-full grid-cols-[1fr_1fr_1fr] overflow-hidden rounded-xl border border-stroke bg-[var(--surface-low)]">
      <div className="flex h-10 items-center border-b border-stroke bg-surface-subtle px-3 text-sm text-ink-600">
        Name
      </div>
      <div className="flex h-10 items-center border-b border-stroke bg-surface-subtle px-3 text-sm text-ink-600">
        Value
      </div>
      <div className="flex h-10 items-center border-b border-stroke bg-surface-subtle px-3 text-sm text-ink-600">
        Example
      </div>

      {spacingRows.map((row, i) => (
        <Fragment key={row.name}>
          <div
            className={`flex min-w-0 items-center border-stroke px-3 py-[18px] text-sm leading-5 tracking-[-0.14px] text-ink-950 ${
              i < spacingRows.length - 1 ? "border-b" : ""
            }`}
          >
            {row.name}
          </div>
          <div
            className={`flex min-w-0 items-center border-stroke px-3 py-[18px] text-sm leading-5 tracking-[-0.14px] text-ink-950 ${
              i < spacingRows.length - 1 ? "border-b" : ""
            }`}
          >
            {row.valuePx}px
          </div>
          <div
            className={`flex min-w-0 items-center border-stroke px-3 py-[18px] ${
              i < spacingRows.length - 1 ? "border-b" : ""
            }`}
          >
            {row.valuePx > 0 && (
              <div
                className="h-4 rounded-[4px] bg-[#0a61f9]"
                style={{ width: row.valuePx }}
              />
            )}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
