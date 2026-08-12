"use client";

import clsx from "clsx";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import styles from "./checkbox-card.module.css";

/**
 * Source: Figma "Checkbox card" component set (page 254:17986,
 * ComponentSet 1559:12640), verified against the real master
 * (1559:12624). Same States/Modes as the plain Checkbox, wrapped in a
 * card surface (surface-subtle, 16px padding, radius-l).
 *
 * The whole card is the click target (Figma's Hover state wraps the
 * entire card in a button) — implemented as a real `<label
 * htmlFor={checkboxId}>` wrapping the card, with the actual
 * `Checkbox.Root` (the interactive control) inside it as a normal
 * labelable element. This is why it doesn't reuse the standalone
 * Checkbox's Label/HintText components: those render real `<label>`/
 * `<p>` elements, and nesting a `<label>` inside the button that IS
 * the checkbox (or inside another `<label>`) isn't valid — so the
 * label/hint text here are plain spans styled to match instead.
 *
 * Real differences from the standalone Checkbox, confirmed per-state
 * (not assumed from the standalone variant):
 * - The inner box's resting border is stroke-strong (#b3b3b3), not
 *   stroke-subtle — reads better against the card's surface-subtle
 *   background. It does NOT additionally darken on hover like the
 *   standalone box does; the whole card darkens instead.
 * - Checked/indeterminate cards get a permanent blue-tinted
 *   background (surface-primary-overlay-hover, 12% alpha) even at
 *   rest, not just on hover — darkening further to
 *   surface-primary-overlay-active (16% alpha) on hover while
 *   checked. Unchecked cards use plain surface-subtle / surface-
 *   subtle-hover.
 */
export interface CheckboxCardProps extends Omit<ComponentPropsWithoutRef<typeof RadixCheckbox.Root>, "className"> {
  className?: string;
  wrapperClassName?: string;
  label?: ReactNode;
  labelOptional?: boolean;
  hint?: ReactNode;
  error?: boolean;
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

  return (
    <label htmlFor={checkboxId} className={clsx(styles.card, wrapperClassName)}>
      <span className={styles.slot}>
        <RadixCheckbox.Root
          id={checkboxId}
          className={clsx(styles.box, className)}
          data-error={error || undefined}
          {...props}
        >
          <RadixCheckbox.Indicator className={styles.indicator}>
            <Check className={styles.check} />
            <Minus className={styles.minus} />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
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
