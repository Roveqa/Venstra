"use client";

import clsx from "clsx";
import * as RadixToggle from "@radix-ui/react-toggle";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import styles from "./toggle.module.css";

/**
 * Source: Figma "Toggle" component set (page 2067:2992, ComponentSet
 * 2214:10786): State(Default/Hover/Active/Focus/Disabled) × Style(Fill/
 * Outline/Ghost) × Size(Small/Medium/Large), 45 variants, all fetched
 * and cross-checked directly. "Toggle master" (2217:11022) is the size
 * reference (padding 8/10/12px for sm/md/lg, 6px icon-label gap).
 *
 * Built on @radix-ui/react-toggle (a two-state pressable button, not a
 * track+thumb like Switch) — gives correct aria-pressed + `data-state`
 * ("on"/"off") for free, targeted directly in CSS instead of a custom
 * boolean prop.
 *
 * Figma's "Active" state = the pressed/on look, and it deliberately
 * reuses each style's own Hover treatment as its resting appearance
 * (Fill/Outline: same bg as Hover; Ghost: same bg as Hover but keeps
 * the non-hover foreground/full-opacity text color) — reproduced as
 * `[data-state="on"]` rules rather than inventing a separate palette.
 *
 * Token correction: Figma's "fill/neutral/overlay/default/fill-neutral"
 * maps to this codebase's `--fill-neutral-overlay` (a translucent black
 * overlay), not `--fill-neutral` (solid neutral-950) — the two are easy
 * to conflate by name alone.
 */
export type ToggleStyle = "fill" | "outline" | "ghost";
export type ToggleSize = "sm" | "md" | "lg";

export interface ToggleProps extends ComponentPropsWithoutRef<typeof RadixToggle.Root> {
  toggleStyle?: ToggleStyle;
  size?: ToggleSize;
  icon?: ReactNode;
}

export function Toggle({ className, toggleStyle = "fill", size = "md", icon, children, ...props }: ToggleProps) {
  return (
    <RadixToggle.Root
      className={clsx(styles.toggle, className)}
      data-style={toggleStyle}
      data-size={size}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children && <span className={styles.label}>{children}</span>}
    </RadixToggle.Root>
  );
}
