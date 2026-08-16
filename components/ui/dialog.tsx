"use client";

import clsx from "clsx";
import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import styles from "./dialog.module.css";

/**
 * Source: Figma "Dialog" (page 116:4195, ComponentSet 1967:12059).
 * Fixed 400x202 panel — surface-low bg, 1px stroke border, radius-xxl
 * (16px), hardcoded shadow (0px 2px 26px rgba(196,196,196,0.2); Figma's
 * own effectStyleId is empty here too, per the registry scan). Anatomy:
 * "Text" (title + description column, gap-1 (4px), + close X, row,
 * gap-8 (16px), padding-8 (16px)) / "Content" (free-form slot, pt-1
 * (4px) px/pb-8 (16px)) / "Buttons" (footer slot, top stroke divider,
 * padding-8 (16px), gap-1 (4px)).
 *
 * Built on @radix-ui/react-dialog (Root/Trigger/Portal/Overlay/Content/
 * Title/Description/Close) — correct focus-trap, scroll-lock, and
 * return-focus for free. No dedicated Overlay/scrim node exists in
 * Figma — the semi-transparent backdrop and its fade animation are a
 * standard, necessary modal affordance, not a fabricated embellishment.
 *
 * Position (Center/Right/Left) does NOT move the panel on screen —
 * Figma's 3 instances sit in the exact same spot side by side in the
 * file (first assumed otherwise, corrected after review: the dashed
 * outlines around each are just Figma's own instance-selection
 * chrome, not a viewport). The panel is always centered. What Position
 * actually changes is the footer button layout: Center's two buttons
 * are equal-width (flex:1, filling the row); Right/Left's are natural-
 * width and pushed to one side. Right keeps reading order (Cancel,
 * then the primary action); Left reverses it (primary action first) —
 * confirmed by comparing the actual button colors across Figma's 3
 * instances, not assumed from Right's layout. DialogFooter only
 * handles alignment/sizing; passing children in the right order per
 * position is on the caller (documented on the demo), not solved with
 * a CSS reorder trick that would desync visual order from focus order.
 */
export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;

export type DialogPosition = "center" | "right" | "left";

export const DialogContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof RadixDialog.Content>>(
  function DialogContent({ className, children, onOpenAutoFocus, ...props }, ref) {
    return (
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.overlay} />
        <RadixDialog.Content
          ref={ref}
          className={clsx(styles.content, className)}
          onOpenAutoFocus={(e) => {
            // Radix's default focuses the first tabbable descendant on open —
            // here that's the close X, which shows an unintended focus ring
            // the instant the dialog appears. Focus the panel itself instead
            // (tabIndex -1, no visible ring since .content has outline: none).
            e.preventDefault();
            (e.currentTarget as HTMLElement | null)?.focus();
            onOpenAutoFocus?.(e);
          }}
          {...props}
        >
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    );
  },
);

export interface DialogHeaderProps {
  className?: string;
  children: ReactNode;
}

export function DialogHeader({ className, children }: DialogHeaderProps) {
  return (
    <div className={clsx(styles.header, className)}>
      <div className={styles.headerText}>{children}</div>
      <RadixDialog.Close className={styles.closeButton} aria-label="Close">
        <X />
      </RadixDialog.Close>
    </div>
  );
}

export function DialogTitle({ className, ...props }: ComponentPropsWithoutRef<typeof RadixDialog.Title>) {
  return <RadixDialog.Title className={clsx(styles.title, className)} {...props} />;
}

export function DialogDescription({ className, ...props }: ComponentPropsWithoutRef<typeof RadixDialog.Description>) {
  return <RadixDialog.Description className={clsx(styles.description, className)} {...props} />;
}

export function DialogBody({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={clsx(styles.body, className)} {...props} />;
}

export interface DialogFooterProps extends ComponentPropsWithoutRef<"div"> {
  position?: DialogPosition;
}

export function DialogFooter({ className, position = "center", ...props }: DialogFooterProps) {
  return <div className={clsx(styles.footer, className)} data-position={position} {...props} />;
}
