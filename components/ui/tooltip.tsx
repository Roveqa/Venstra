"use client";

import clsx from "clsx";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./tooltip.module.css";

/**
 * Source: Figma "Tooltip" component set (page 1:14, ComponentSet
 * 1721:14102). Variant: Position = Top/Bottom/Left/Right — `side` maps
 * directly onto these (confirmed against node 1721:14101, currently
 * named Position=Top: tail at the bubble's bottom edge, bubble above
 * the trigger, matching Radix's side="top").
 *
 * Built on @radix-ui/react-tooltip (Root/Trigger/Portal/Content/Arrow)
 * instead of a hand-rolled positioned div — gives correct hover/focus
 * open logic, collision-aware flipping, and delay-group coordination
 * (via TooltipProvider) for free.
 *
 * Arrow: ported structurally from Figma rather than eyeballed — the
 * source (node I1721:14094;1718:8264) is an 18x9 "slot" div containing
 * an absolutely-positioned inset wrapper (inset: -5.56% 5.06% -0.95%
 * 5.06%, i.e. the artwork bleeds slightly past the slot's top/bottom
 * and is inset from its left/right) holding the arrow SVG at its native
 * size (16.1776x9.58579, no stretching). That negative top/bottom bleed
 * is what makes the tail overlap into the bubble by exactly the same
 * 4px as the bubble's own `margin-bottom: -4px` (mb-[-4px] in the
 * source) — reproducing the slot+inset structure literally gets the
 * seamless attachment for free, instead of hand-tuning a trimmed
 * viewBox or a fudged negative margin (both tried first and both came
 * out visibly wrong on close inspection). Path is shared unchanged
 * across all four Position variants (confirmed byte-identical exported
 * SVGs for Top/Left/Right) — only the wrapping rotation differs, which
 * Radix's Arrow already handles per `side`.
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
          <RadixTooltip.Arrow asChild width={18} height={9}>
            <div className={styles.arrowSlot}>
              <div className={styles.arrowInset}>
                <svg viewBox="0 0 16.1776 9.58579" fill="none" className={styles.arrow}>
                  <path d="M7.38169 8.79289L0.7959 2.20711C0.165936 1.57714 0.612102 0.5 1.50301 0.5H14.6746C15.5655 0.5 16.0117 1.57714 15.3817 2.2071L8.7959 8.79289C8.40538 9.18342 7.77221 9.18342 7.38169 8.79289Z" />
                </svg>
              </div>
            </div>
          </RadixTooltip.Arrow>
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
}
