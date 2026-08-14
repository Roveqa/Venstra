"use client";

import clsx from "clsx";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight } from "lucide-react";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Kbd } from "./kbd";
import styles from "./dropdown.module.css";

/**
 * Source: Figma "Dropdown" component set (page 2014:1667). Pieces:
 * "Dropdown" master (2042:2434, trigger Button + "Dropdown Menu" panel),
 * "Dropdown Item" ComponentSet (2032:1797: State(Default/Hover/Selected/
 * Disabled) × Variant(Default/Distructive), 8 variants), "Dropdown Item
 * SubTrigger" (2042:2157: Default/Hover, chevron-right trailing icon),
 * "Dropdown Label" (2042:2217).
 *
 * Built on @radix-ui/react-dropdown-menu (Root/Trigger/Portal/Content/
 * Item/Label/Separator/Sub/SubTrigger/SubContent) — gives correct
 * roving-tabindex keyboard nav, typeahead, collision-aware positioning,
 * and focus-trap/return-focus for free.
 *
 * Item anatomy: leading icon + label, trailing Kbd (reusing the existing
 * Kbd component, variant="ghost" — Figma's own Kbd sub-instance here is
 * exactly that) and/or a checkmark for the "Selected" state. Modeled as
 * `icon`/`shortcut`/`checked` props rather than requiring children to
 * assemble that structure by hand. `destructive` maps Figma's
 * "Variant=Distructive" (foreground-error text, surface-error-low hover
 * bg) — note the sic spelling is Figma's own typo, not repeated here.
 *
 * Panel: surface-elevated bg, 1px stroke border, radius-xl (12px),
 * Shadow/lg (two-layer drop shadow), 220px default width, 2px vertical
 * padding — that 2px is Figma's literal panel-level py, but it only
 * reads correctly when a Label is present (the Label's own pt-8/pb-4
 * supplies the real visual breathing room above the first item); with
 * no Label, 2px alone looks cramped against the panel border, so
 * dropdown.module.css bumps it to 8px when `.content` has no `.label`
 * child.
 *
 * Positioning: `align="start"` by default (Radix's own default is
 * "center") so the panel hugs the trigger's near edge, combined with
 * Radix's `avoidCollisions` (on by default) to flip start↔end — i.e.
 * left- or right-aligned, whichever side actually has room — instead of
 * Radix's default centered placement. Sub-menus open with a 2px
 * `sideOffset` (Radix's own default is 0) so they sit slightly clear of
 * the trigger item instead of touching it edge-to-edge.
 */
export const Dropdown = RadixDropdownMenu.Root;
export const DropdownTrigger = RadixDropdownMenu.Trigger;
export const DropdownGroup = RadixDropdownMenu.Group;
export const DropdownSub = RadixDropdownMenu.Sub;

export type DropdownContentProps = ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content>;

export function DropdownContent({ className, sideOffset = 4, align = "start", ...props }: DropdownContentProps) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        className={clsx(styles.content, className)}
        sideOffset={sideOffset}
        align={align}
        {...props}
      />
    </RadixDropdownMenu.Portal>
  );
}

export type DropdownSubContentProps = ComponentPropsWithoutRef<typeof RadixDropdownMenu.SubContent>;

export function DropdownSubContent({ className, sideOffset = 2, ...props }: DropdownSubContentProps) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.SubContent className={clsx(styles.content, className)} sideOffset={sideOffset} {...props} />
    </RadixDropdownMenu.Portal>
  );
}

export type DropdownLabelProps = ComponentPropsWithoutRef<typeof RadixDropdownMenu.Label>;

export function DropdownLabel({ className, ...props }: DropdownLabelProps) {
  return <RadixDropdownMenu.Label className={clsx(styles.label, className)} {...props} />;
}

export type DropdownSeparatorProps = ComponentPropsWithoutRef<typeof RadixDropdownMenu.Separator>;

export function DropdownSeparator({ className, ...props }: DropdownSeparatorProps) {
  return <RadixDropdownMenu.Separator className={clsx(styles.separator, className)} {...props} />;
}

export interface DropdownItemProps extends ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item> {
  icon?: ReactNode;
  shortcut?: ReactNode;
  destructive?: boolean;
  checked?: boolean;
}

export function DropdownItem({
  className,
  icon,
  shortcut,
  destructive,
  checked,
  children,
  ...props
}: DropdownItemProps) {
  return (
    <RadixDropdownMenu.Item className={clsx(styles.item, className)} data-destructive={destructive || undefined} {...props}>
      <span className={styles.itemMain}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.itemLabel}>{children}</span>
      </span>
      {checked && <Check className={styles.check} />}
      {shortcut && (
        <Kbd variant="ghost" className={styles.kbd}>
          {shortcut}
        </Kbd>
      )}
    </RadixDropdownMenu.Item>
  );
}

export interface DropdownSubTriggerProps extends ComponentPropsWithoutRef<typeof RadixDropdownMenu.SubTrigger> {
  icon?: ReactNode;
}

export function DropdownSubTrigger({ className, icon, children, ...props }: DropdownSubTriggerProps) {
  return (
    <RadixDropdownMenu.SubTrigger className={clsx(styles.item, className)} {...props}>
      <span className={styles.itemMain}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.itemLabel}>{children}</span>
      </span>
      <ChevronRight className={styles.chevron} />
    </RadixDropdownMenu.SubTrigger>
  );
}
