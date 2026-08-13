"use client";

import clsx from "clsx";
import { useId, useState, type ReactNode } from "react";
import { RadioButtonBox, type RadioButtonBoxProps } from "./radio-button";
import styles from "./radio-button-card.module.css";

/**
 * Source: Figma "Radio Button card" component set (page 1563:8187,
 * ComponentSet 1563:8259), verified against its real master
 * (1563:8243). Same States/Modes as the plain RadioButton, wrapped in
 * a card surface (surface-subtle, 16px padding, radius-l) — same
 * pattern as CheckboxCard/SwitchCard.
 *
 * Confirmed per-state (not assumed from the other card variants):
 * - The ring's resting border is stroke-strong (#b3b3b3), not
 *   stroke-subtle, matching CheckboxCard — and like CheckboxCard
 *   (unlike SwitchCard), it does NOT change with the card's hover;
 *   only the card's own background darkens. Checked via a dedicated
 *   Hover+Default card fetch, not assumed.
 * - Checked cards get a permanent blue-tinted background
 *   (surface-primary-overlay-hover, 12%) at rest, darkening to
 *   surface-primary-overlay-active (16%) on hover. The ring+dot color
 *   (stroke-primary/fill-primary) stays constant regardless of card
 *   hover — confirmed via a dedicated Hover+Active card fetch, which
 *   is the opposite of SwitchCard's track (whose color DOES follow
 *   ambient card hover). This is a real, confirmed difference between
 *   the two card variants, not an inconsistency to paper over.
 *
 * The whole card is the click target (Figma's Hover state wraps the
 * entire card in a button), implemented the same way as
 * CheckboxCard/SwitchCard: a real `<label htmlFor={radioId}>` around
 * the card, with RadioButtonBox (a real <button role="radio">) inside
 * as a normal labelable element — avoids nesting a <label> inside a
 * <button> or inside another <label>, which is why this doesn't reuse
 * the plain RadioButton's Label/HintText components (plain styled
 * spans instead). Hover is tracked via onPointerEnter/Leave into a
 * `data-hover` attribute rather than native :hover — same fix applied
 * to CheckboxCard/SwitchCard after a reported stuck-hover bug.
 */
export interface RadioButtonCardProps extends Omit<RadioButtonBoxProps, "className"> {
  className?: string;
  wrapperClassName?: string;
  label?: ReactNode;
  labelOptional?: boolean;
  hint?: ReactNode;
}

export function RadioButtonCard({
  className,
  wrapperClassName,
  label,
  labelOptional,
  hint,
  error,
  id,
  ...props
}: RadioButtonCardProps) {
  const autoId = useId();
  const radioId = id ?? autoId;
  const [hovered, setHovered] = useState(false);

  return (
    <label
      htmlFor={radioId}
      className={clsx(styles.card, wrapperClassName)}
      data-hover={hovered || undefined}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <span className={styles.slot}>
        <RadioButtonBox id={radioId} error={error} className={className} {...props} />
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
