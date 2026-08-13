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
 * (via TooltipProvider) for free. Radix's own Arrow renders a real SVG
 * triangle positioned by floating-ui, so unlike Slider's ad-hoc CSS
 * border-triangle (built before this component existed), no manual
 * per-side offset math is needed to reproduce Figma's four Position
 * variants — `side` maps directly to them.
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
  side = "bottom",
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
          <RadixTooltip.Arrow className={styles.arrow} width={18} height={9} />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
}
