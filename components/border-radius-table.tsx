import { Fragment } from "react";
import { borderRadiusRows } from "@/lib/border-radius-tokens";

export function BorderRadiusTable() {
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

      {borderRadiusRows.map((row, i) => (
        <Fragment key={row.name}>
          <div
            className={`flex min-w-0 items-center border-stroke px-3 py-[20px] text-sm leading-5 tracking-[-0.14px] text-ink-950 ${
              i < borderRadiusRows.length - 1 ? "border-b" : ""
            }`}
          >
            {row.name}
          </div>
          <div
            className={`flex min-w-0 items-center border-stroke px-3 py-[20px] text-sm leading-5 tracking-[-0.14px] text-ink-950 ${
              i < borderRadiusRows.length - 1 ? "border-b" : ""
            }`}
          >
            {row.valuePx}px
          </div>
          <div
            className={`flex min-w-0 items-center border-stroke px-3 py-[20px] ${
              i < borderRadiusRows.length - 1 ? "border-b" : ""
            }`}
          >
            <div
              className="h-11 w-full border-l border-t border-dashed border-[#0a61f9] bg-[rgba(10,97,249,0.1)]"
              style={{ borderTopLeftRadius: row.valuePx }}
            />
          </div>
        </Fragment>
      ))}
    </div>
  );
}
