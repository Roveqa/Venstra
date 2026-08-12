"use client";

import clsx from "clsx";
import { useId, useState, type ReactNode } from "react";
import { CheckboxBox, type CheckboxBoxProps } from "./checkbox";
import styles from "./checkbox-card.module.css";

/**
 * Source: Figma "Checkbox card" component set (page 254:17986,
 * ComponentSet 1559:12640), verified against the real master
 * (1559:12624). Same States/Modes as the plain Checkbox, wrapped in a
 * card surface (surface-subtle, 16px padding, radius-l).
 *
 * Built on top of the plain Checkbox rather than duplicating it:
 * reuses the exact same `CheckboxBox` (Root+Indicator+check/minus
 * marks) from checkbox.tsx, so both variants share one source of
 * truth for the interactive control. The only per-card differences
 * are expressed as CSS custom property overrides on `.card`
 * (checkbox-card.module.css) rather than a second copy of the box's
 * CSS:
 * - --cb-border/--cb-border-hover are both set to stroke-strong
 *   here, vs. the plain Checkbox's stroke-subtle/stroke-strong — the
 *   card's box border is stroke-strong even at rest, and does NOT
 *   darken further on hover (the whole card darkens instead; the
 *   plain Checkbox's box does its own hover-darken since it has no
 *   card surface around it).
 * - Checked/indeterminate cards additionally get a permanent blue-
 *   tinted background (surface-primary-overlay-hover, 12% alpha) at
 *   rest, darkening to surface-primary-overlay-active (16%) on
 *   hover — driven by :has() on the card container reading the
 *   nested box's data-state, not something CheckboxBox itself needs
 *   to know about.
 *
 * The whole card is the click target, matching Figma's Hover state
 * (entire card wrapped in a button). Implemented as a real `<label
 * htmlFor={checkboxId}>` around the card, with CheckboxBox (a real
 * <button role="checkbox">) inside as a normal labelable element —
 * native label-click-forwarding covers "click anywhere on the card
 * toggles it" without nesting a <label> inside a <button> or inside
 * another <label>, which is why this doesn't reuse the plain
 * Checkbox's Label/HintText components (plain styled spans instead).
 *
 * The card's own hover background is tracked via onPointerEnter/Leave
 * into a `data-hover` attribute instead of a plain CSS :hover rule —
 * same fix applied to SwitchCard after a reported stuck-hover bug
 * (hovering the nested control then moving the cursor away left the
 * card's hover background stuck, while the control's own hover
 * cleared correctly) that couldn't be reproduced through Playwright's
 * synthetic pointer events — points at real :hover recalculation
 * quirks across a <label> wrapping a nested native interactive
 * control, sidestepped by not depending on native :hover here at all.
 */
export interface CheckboxCardProps extends Omit<CheckboxBoxProps, "className"> {
  className?: string;
  wrapperClassName?: string;
  label?: ReactNode;
  labelOptional?: boolean;
  hint?: ReactNode;
}

export function CheckboxCard({
  className,
  wrapperClassName,
  label,
  labelOptional,
  hint,
  error,
  id,
  ...props
}: CheckboxCardProps) {
  const autoId = useId();
  const checkboxId = id ?? autoId;
  const [hovered, setHovered] = useState(false);

  return (
    <label
      htmlFor={checkboxId}
      className={clsx(styles.card, wrapperClassName)}
      data-hover={hovered || undefined}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <span className={styles.slot}>
        <CheckboxBox id={checkboxId} error={error} className={className} {...props} />
      </span>
      {(label || hint) && (
        <span className={styles.content}>
          {label && (
            <span className={styles.label}>
              {label}
              {labelOptional && <span className={styles.optional}>(Optional)</span>}
            </span>
          )}
          {hint && <span className={clsx(styles.hint, error && styles.hintError)}>{hint}</span>}
        </span>
      )}
    </label>
  );
}
