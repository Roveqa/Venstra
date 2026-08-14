"use client";

import clsx from "clsx";
import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import styles from "./toggle-group.module.css";

/**
 * Source: Figma "Toggle Group" component set (page 2067:2993): three
 * masters, "Toggle Group/Fill" (2220:457), "/Outline" (2220:459), "/Ghost"
 * (2220:494) — each a row of Toggle items (reusing the same "Toggle
 * master" states/colors as the standalone Toggle component) joined into
 * one segmented control.
 *
 * Built on @radix-ui/react-toggle-group (Root type="single"|"multiple" +
 * Item) — gives roving-tabindex arrow-key navigation between items and
 * correct aria-pressed/data-state wiring for free, same reasoning as
 * Toggle/Tabs.
 *
 * Joining: the Root itself carries `border-radius` + `overflow: hidden`
 * (matching Figma's outer wrapper) and items render with square corners
 * — the overflow clip alone produces the rounded outer silhouette, so
 * no per-item first/last conditional border-radius is needed (verified
 * this is visually identical to Figma's explicit rounded-tl/tr-on-
 * first-item markup, which is redundant under a clipping parent).
 *
 * Outline's 1px borders are collapsed the same way Figma builds it: each
 * item but the last gets `margin-right: -1px` so adjacent borders
 * overlap into a single line instead of doubling up at the shared edge.
 *
 * Color/state logic (Default/Hover/On/Focus/Disabled × Fill/Outline/
 * Ghost) is identical to the standalone Toggle — see toggle.tsx's source
 * comment for the state-matrix verification and the fill-neutral-overlay
 * token note, both apply unchanged here.
 */
export type ToggleGroupStyle = "fill" | "outline" | "ghost";
export type ToggleGroupSize = "sm" | "md" | "lg";

export type ToggleGroupProps = ComponentPropsWithoutRef<typeof RadixToggleGroup.Root> & {
  toggleStyle?: ToggleGroupStyle;
  size?: ToggleGroupSize;
};

export function ToggleGroup({ className, toggleStyle = "fill", size = "md", ...props }: ToggleGroupProps) {
  return (
    <RadixToggleGroup.Root
      className={clsx(styles.group, className)}
      data-style={toggleStyle}
      data-size={size}
      {...props}
    />
  );
}

export interface ToggleGroupItemProps extends ComponentPropsWithoutRef<typeof RadixToggleGroup.Item> {
  icon?: ReactNode;
}

export function ToggleGroupItem({ className, icon, children, ...props }: ToggleGroupItemProps) {
  return (
    <RadixToggleGroup.Item className={clsx(styles.item, className)} {...props}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children && <span className={styles.label}>{children}</span>}
    </RadixToggleGroup.Item>
  );
}
