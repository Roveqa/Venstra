import clsx from "clsx";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import type { HTMLAttributes, ReactNode } from "react";
import { Label } from "./label";
import { HintText } from "./hint-text";
import styles from "./progress.module.css";

/**
 * Source: Figma "Progress" component set (r2dbmly2FCs307sePH1Z9C /
 * RIB8DZ9M5Uay7si4mI19Yt — same node IDs in both, page 2067:1225,
 * ComponentSet 2251:3807). Variant: Percent position = Top, Right.
 *
 * Label/percent/hint text are independent boolean slots in Figma (not
 * tied to each other) — modeled here as optional content: pass
 * `label`/`hint` to show them, or omit for a bare track.
 *
 * Indicator is only rounded on its leading edge (rounded-bl/tl in
 * Figma) — the track's own overflow:hidden + full radius clips the
 * trailing edge automatically at 100%, so this isn't just cosmetic
 * symmetry, it's how Figma actually built it.
 *
 * Track/indicator are built on @radix-ui/react-progress (Root/
 * Indicator) instead of plain divs — gives correct role="progressbar"
 * + aria-valuenow/min/max/text for free instead of hand-rolling them.
 * Visuals are unchanged: still styled entirely via progress.module.css.
 */
export type ProgressPercentPosition = "top" | "right";

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** 0–100. Clamped. */
  value: number;
  percentPosition?: ProgressPercentPosition;
  label?: ReactNode;
  labelOptional?: boolean;
  showPercent?: boolean;
  hint?: ReactNode;
  hintVariant?: "default" | "error";
}

export function Progress({
  className,
  value,
  percentPosition = "top",
  label,
  labelOptional,
  showPercent = true,
  hint,
  hintVariant = "default",
  ...props
}: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const percentEl = showPercent && <span className={styles.percent}>{Math.round(clamped)}%</span>;

  const track = (
    <ProgressPrimitive.Root className={styles.track} value={clamped}>
      <ProgressPrimitive.Indicator className={styles.indicator} style={{ width: `${clamped}%` }} />
    </ProgressPrimitive.Root>
  );

  return (
    <div className={clsx(styles.progress, className)} {...props}>
      {percentPosition === "top" ? (
        <>
          {(label || percentEl) && (
            <div className={styles.headerRow}>
              {label && (
                <Label className={styles.label} optional={labelOptional}>
                  {label}
                </Label>
              )}
              {percentEl}
            </div>
          )}
          {track}
        </>
      ) : (
        <>
          {label && (
            <Label className={styles.label} optional={labelOptional}>
              {label}
            </Label>
          )}
          <div className={styles.trackRow}>
            {track}
            {percentEl}
          </div>
        </>
      )}
      {hint && <HintText variant={hintVariant}>{hint}</HintText>}
    </div>
  );
}
