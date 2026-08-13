"use client";

import clsx from "clsx";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./tooltip.module.css";

/**
 * Source: Figma "Tooltip" component set (page 1:14, ComponentSet
 * 1721:14102). Variant: Position = Bottom/Top/Left/Right.
 *
 * Built on @radix-ui/react-tooltip (Root/Trigger/Portal/Content/Arrow)
 * instead of a hand-rolled positioned div — gives correct hover/focus
 * open logic, collision-aware flipping, and delay-group coordination
 * (via TooltipProvider) for free.
 *
 * IMPORTANT — Figma's "Position" naming is the INVERSE of `side`:
 * Figma names each variant by where the tail sits ON THE BUBBLE, not
 * where the bubble sits relative to the trigger. "Position=Bottom" has
 * the tail at the bubble's bottom edge pointing down — which means the
 * bubble itself sits ABOVE the trigger. That's `side="top"` in Radix's
 * (and every other floating-ui-based library's) vocabulary, where side
 * names where the CONTENT appears relative to the trigger. Verified by
 * fetching screenshots of all four real Figma nodes (1721:14101/14111/
 * 14144/14153) directly: Position=Bottom ⇒ side="top", Position=Top ⇒
 * side="bottom", Position=Left ⇒ side="right", Position=Right ⇒
 * side="left". Kept `side` on the standard/intuitive meaning here
 * (matches Radix, Popper, Floating UI) rather than mirroring Figma's
 * asset-authoring naming into the public API — but every visual
 * orientation Figma drew is still reproduced exactly, just addressed by
 * its conventional name instead of Figma's.
 *
 * Arrow: Figma's tail is a custom rounded-corner path (not a plain
 * sharp triangle) shared unchanged across all four variants — the
 * per-side rotation happens in the wrapping CSS, not the path itself
 * (confirmed by downloading the exported SVG for Bottom/Left/Right:
 * byte-identical path data). Reproduced via `asChild` on Radix's Arrow
 * with that exact path, authored pointing down (Radix's own rotation
 * convention for side="top") so Radix's per-side rotation still lines
 * it up correctly for all four sides.
 *
 * Bubble: surface-inverse bg, radius-sm (6px), 8px/6px padding,
 * size-sm/medium text, foreground-inverse. Plus the subtle outer
 * drop-shadow Figma layers on top of the bubble's own box-shadow
 * (barely visible at 2% opacity, but present on the real node).
 */
export const TooltipProvider = RadixTooltip.Provider;

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  delayDuration?: number;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  contentProps?: Omit<ComponentPropsWithoutRef<typeof RadixTooltip.Content>, "side" | "sideOffset" | "children">;
}

export function Tooltip({
  children,
  content,
  side = "top",
  sideOffset = 8,
  delayDuration,
  defaultOpen,
  open,
  onOpenChange,
  contentProps,
}: TooltipProps) {
  return (
    <RadixTooltip.Root delayDuration={delayDuration} defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          {...contentProps}
          side={side}
          sideOffset={sideOffset}
          className={clsx(styles.content, contentProps?.className)}
        >
          {content}
          {/* width/height must match the (trimmed) viewBox's own aspect
              ratio exactly — passing the nominal 18x9 Figma "slot" size
              here (rather than the path's true 16.1776x9.08579) forced a
              ~12% horizontal stretch, visibly fattening the tail compared
              to the real asset. viewBox is trimmed to the path's actual
              ink (raw asset has ~0.5 units of dead space above the flat
              top edge) so the shape sits flush against the bubble with no
              seam. */}
          <RadixTooltip.Arrow asChild width={16.1776} height={9.08579}>
            <svg viewBox="0 0.5 16.1776 9.08579" fill="none" className={styles.arrow}>
              <path d="M7.38169 8.79289L0.7959 2.20711C0.165936 1.57714 0.612102 0.5 1.50301 0.5H14.6746C15.5655 0.5 16.0117 1.57714 15.3817 2.2071L8.7959 8.79289C8.40538 9.18342 7.77221 9.18342 7.38169 8.79289Z" />
            </svg>
          </RadixTooltip.Arrow>
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
}
