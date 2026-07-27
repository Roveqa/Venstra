import { Fragment } from "react";
import { previewStyle, semanticTypographyRows } from "@/lib/semantic-typography-tokens";

export function SemanticTypographyTable() {
  return (
    <div className="grid w-full grid-cols-[1fr_1.5fr_0.8fr] overflow-hidden rounded-xl border border-stroke bg-[var(--surface-low)]">
      <div className="flex h-10 items-center border-b border-stroke bg-surface-subtle px-3 text-sm text-ink-600">
        Name
      </div>
      <div className="flex h-10 items-center border-b border-stroke bg-surface-subtle px-3 text-sm text-ink-600">
        Value
      </div>
      <div className="flex h-10 items-center border-b border-stroke bg-surface-subtle px-3 text-sm text-ink-600">
        Example
      </div>

      {semanticTypographyRows.map((row, i) => (
        <Fragment key={row.name}>
          <div
            className={`flex min-w-0 items-center border-stroke px-3 py-[18px] text-sm leading-5 tracking-[-0.14px] text-ink-950 ${
              i < semanticTypographyRows.length - 1 ? "border-b" : ""
            }`}
          >
            {row.name}
          </div>
          <div
            className={`flex min-w-0 flex-col justify-center gap-[2px] border-stroke px-3 py-[18px] text-sm leading-5 tracking-[-0.14px] text-ink-950 ${
              i < semanticTypographyRows.length - 1 ? "border-b" : ""
            }`}
          >
            <div>
              <span className="font-semibold">fontSize:</span> {row.fontSizeKey}
            </div>
            <div>
              <span className="font-semibold">fontFamily:</span> inter
            </div>
            <div>
              <span className="font-semibold">fontWeight:</span> {row.fontWeightLabel}
            </div>
            <div>
              <span className="font-semibold">lineHeight:</span> {row.lineHeightKey}
            </div>
            <div>
              <span className="font-semibold">letterSpacing:</span> {row.letterSpacingKey}
            </div>
          </div>
          <div
            className={`flex min-w-0 items-center overflow-hidden border-stroke px-3 py-[18px] text-ink-950 ${
              i < semanticTypographyRows.length - 1 ? "border-b" : ""
            }`}
          >
            <span style={previewStyle(row)}>Aa</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
