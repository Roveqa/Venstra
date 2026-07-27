import { Fragment } from "react";
import {
  disabledRows,
  focusRows,
  shadowRows,
  type EffectRow,
} from "@/lib/effects-tokens";

function EffectValue({ row }: { row: EffectRow }) {
  const multiLayer = row.layers.length > 1;
  return (
    <div className="flex flex-col gap-3">
      {row.layers.map((layer, i) => (
        <div key={i} className="flex flex-col">
          {multiLayer && <div className="font-semibold">Layer {i + 1}:</div>}
          <div>x: {layer.x}px</div>
          <div>y: {layer.y}px</div>
          <div>blur: {layer.blur}px</div>
          <div>spread: {layer.spread}px</div>
          <div>color: {layer.color}</div>
          <div>type: dropShadow</div>
        </div>
      ))}
    </div>
  );
}

function EffectTable({ rows }: { rows: EffectRow[] }) {
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

      {rows.map((row, i) => (
        <Fragment key={row.name}>
          <div
            className={`flex min-w-0 items-center border-stroke px-3 py-[20px] text-sm leading-5 tracking-[-0.14px] text-ink-950 ${
              i < rows.length - 1 ? "border-b" : ""
            }`}
          >
            {row.name}
          </div>
          <div
            className={`flex min-w-0 items-center border-stroke px-3 py-[20px] text-sm leading-5 tracking-[-0.14px] text-ink-950 ${
              i < rows.length - 1 ? "border-b" : ""
            }`}
          >
            <EffectValue row={row} />
          </div>
          <div
            className={`flex min-w-0 items-center border-stroke px-3 py-[20px] ${
              i < rows.length - 1 ? "border-b" : ""
            }`}
          >
            <div
              className="h-[60px] w-[60px] rounded-[8px] bg-[#fefefe]"
              style={{ boxShadow: row.boxShadow }}
            />
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export function ShadowTable() {
  return <EffectTable rows={shadowRows} />;
}

export function FocusTable() {
  return <EffectTable rows={focusRows} />;
}

export function DisabledTable() {
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

      {disabledRows.map((row) => (
        <Fragment key={row.name}>
          <div className="flex min-w-0 items-center px-3 py-[20px] text-sm leading-5 tracking-[-0.14px] text-ink-950">
            {row.name}
          </div>
          <div className="flex min-w-0 items-center px-3 py-[20px] text-sm leading-5 tracking-[-0.14px] text-ink-950">
            {row.valueText}
          </div>
          <div className="flex min-w-0 items-center bg-[#040404] px-3 py-[20px]">
            <div className="h-[60px] w-[60px] rounded-[8px] bg-[#fefefe] opacity-40" />
          </div>
        </Fragment>
      ))}
    </div>
  );
}
