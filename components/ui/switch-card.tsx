"use client";

import clsx from "clsx";
import { useId, useState, type ReactNode } from "react";
import { SwitchBox, type SwitchBoxProps } from "./switch";
import styles from "./switch-card.module.css";

/**
 * Source: Figma "Switch card" component set (page 1898:6461,
 * ComponentSet 1914:40533), verified against its real master
 * (1914:40518). Same States/Active as the plain Switch, wrapped in a
 * card surface (surface-subtle, 16px padding, radius-l) — same
 * pattern as CheckboxCard, including the same real, confirmed
 * difference: checked cards get a permanent blue-tinted background
 * (surface-primary-overlay-hover, 12% alpha) at rest, darkening to
 * surface-primary-overlay-active (16%) on hover, vs. plain
 * surface-subtle / surface-subtle-hover when unchecked. Unlike
 * CheckboxCard, the track itself needs no --*-border style override
 * — its colors (surface-strong/-hover, fill-primary/-hover) are
 * identical between the standalone Switch and the card variant, so
 * SwitchBox is reused completely unmodified here.
 *
 * The whole card is the click target (Figma's Hover state wraps the
 * entire card in a button), implemented the same way as
 * CheckboxCard: a real `<label htmlFor={switchId}>` around the card,
 * with SwitchBox (a real <button role="switch">) inside as a normal
 * labelable element — avoids nesting a <label> inside a <button> or
 * inside another <label>, which is why this doesn't reuse the plain
 * Switch's Label/HintText components (plain styled spans instead).
 *
 * The card's own hover background is tracked via onPointerEnter/Leave
 * into a `data-hover` attribute instead of a plain CSS :hover rule —
 * user reported the card's hover getting stuck after hovering the
 * nested track and moving the cursor away (track's own hover cleared
 * correctly, only the card's didn't). Couldn't reproduce it through
 * Playwright's synthetic pointer events, which points at a real
 * browser's :hover recalculation across a <label> wrapping a nested
 * native interactive control rather than anything reproducible in
 * this component's own logic — sidestepped entirely by not depending
 * on native :hover for the card background at all.
 */
export interface SwitchCardProps extends Omit<SwitchBoxProps, "className"> {
  className?: string;
  wrapperClassName?: string;
  label?: ReactNode;
  labelOptional?: boolean;
  hint?: ReactNode;
}

export function SwitchCard({
  className,
  wrapperClassName,
  label,
  labelOptional,
  hint,
  id,
  ...props
}: SwitchCardProps) {
  const autoId = useId();
  const switchId = id ?? autoId;
  const [hovered, setHovered] = useState(false);

  return (
    <label
      htmlFor={switchId}
      className={clsx(styles.card, wrapperClassName)}
      data-hover={hovered || undefined}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <span className={styles.slot}>
        <SwitchBox id={switchId} className={className} {...props} />
      </span>
      {(label || hint) && (
        <span className={styles.content}>
          {label && (
            <span className={styles.label}>
              {label}
              {labelOptional && <span className={styles.optional}>(Optional)</span>}
            </span>
          )}
          {hint && <span className={styles.hint}>{hint}</span>}
        </span>
      )}
    </label>
  );
}
