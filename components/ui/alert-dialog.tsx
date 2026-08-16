"use client";

import clsx from "clsx";
import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { X } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import styles from "./alert-dialog.module.css";

/**
 * Source: Figma "Alert Dialog" (page 2060:23629, ComponentSet
 * 2071:1430). For confirming destructive/critical actions — always
 * requires an explicit answer, unlike Dialog which has a free-form
 * Content slot for forms/settings. Fixed 400x150 panel: surface-low
 * bg, 1px stroke border, radius-xxl (16px), Shadow/xl (0px 2px 26px
 * rgba(196,196,196,0.2)). Anatomy: "Text" (title + description column,
 * gap-1 (4px), + close X, row, gap-8 (16px), padding 16/16/4/16 — note
 * the 4px BOTTOM padding, not 16 like Dialog's header, since there's
 * no Content slot absorbing that space below it) / "Buttons" (footer
 * slot, top stroke divider, padding-8 (16px), gap-1 (4px)). No Content
 * slot at all — 150px total height vs Dialog's 202px.
 *
 * Built on @radix-ui/react-alert-dialog (Root/Trigger/Portal/Overlay/
 * Content/Title/Description/Action/Cancel) rather than plain Dialog —
 * gives the correct role="alertdialog" semantics and, notably, doesn't
 * dismiss on outside click by default (Radix's own distinction from
 * Dialog), matching the "always requires an explicit answer" rule from
 * the registry's usage guidelines. The header's close X reuses
 * AlertDialogCancel (not a separate Close primitive — Radix doesn't
 * expose one here, and functionally "close via X" and "Cancel" are the
 * same action per the registry: "Клик X = аналог Cancel").
 *
 * Position (Center/Right/Left) only affects the footer, same as
 * Dialog: Center's buttons are equal-width (flex:1); Right/Left are
 * natural-width and pushed to one side. UNLIKE Dialog though — verified
 * by comparing Figma's 3 instances directly rather than assuming
 * symmetry — button ORDER never reverses here. Cancel is always first
 * in all 3 positions (Left just left-aligns instead of reversing to
 * put the destructive/confirm action first), matching the registry's
 * explicit rule: "Cancel — всегда первая кнопка" / never hide it. So
 * AlertDialogFooter's `position` only drives CSS width/alignment; the
 * caller doesn't need to reorder children per position like Dialog's
 * footer requires.
 */
export const AlertDialog = RadixAlertDialog.Root;
export const AlertDialogTrigger = RadixAlertDialog.Trigger;
export const AlertDialogAction = RadixAlertDialog.Action;
export const AlertDialogCancel = RadixAlertDialog.Cancel;

export type AlertDialogPosition = "center" | "right" | "left";

export const AlertDialogContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof RadixAlertDialog.Content>>(
  function AlertDialogContent({ className, children, onOpenAutoFocus, ...props }, ref) {
    return (
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className={styles.overlay} />
        <RadixAlertDialog.Content
          ref={ref}
          className={clsx(styles.content, className)}
          onOpenAutoFocus={(e) => {
            // Same fix as Dialog: Radix's default focuses the first tabbable
            // descendant (the close X), showing an unintended focus ring the
            // instant the dialog appears. Focus the panel itself instead.
            e.preventDefault();
            (e.currentTarget as HTMLElement | null)?.focus();
            onOpenAutoFocus?.(e);
          }}
          {...props}
        >
          {children}
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    );
  },
);

export interface AlertDialogHeaderProps {
  className?: string;
  children: ReactNode;
}

export function AlertDialogHeader({ className, children }: AlertDialogHeaderProps) {
  return (
    <div className={clsx(styles.header, className)}>
      <div className={styles.headerText}>{children}</div>
      <RadixAlertDialog.Cancel className={styles.closeButton} aria-label="Close">
        <X />
      </RadixAlertDialog.Cancel>
    </div>
  );
}

export function AlertDialogTitle({ className, ...props }: ComponentPropsWithoutRef<typeof RadixAlertDialog.Title>) {
  return <RadixAlertDialog.Title className={clsx(styles.title, className)} {...props} />;
}

export function AlertDialogDescription({ className, ...props }: ComponentPropsWithoutRef<typeof RadixAlertDialog.Description>) {
  return <RadixAlertDialog.Description className={clsx(styles.description, className)} {...props} />;
}

export interface AlertDialogFooterProps extends ComponentPropsWithoutRef<"div"> {
  position?: AlertDialogPosition;
}

export function AlertDialogFooter({ className, position = "center", ...props }: AlertDialogFooterProps) {
  return <div className={clsx(styles.footer, className)} data-position={position} {...props} />;
}
