"use client";

import clsx from "clsx";
import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Label } from "./label";
import { HintText } from "./hint-text";
import styles from "./select.module.css";

/**
 * Source: Figma "Select" component set (page 1774:9310). Pieces:
 * "Select" ComponentSet (2145:11591: State(Placeholder/Hover/Focus/
 * Filled/Disabled/Error/Error focus) × Size(Medium/Large), 14 variants
 * — same anatomy/token recipe as Input Text, just with a chevron-down
 * instead of typed text caret), "Select menu" (2157:1130: panel +
 * ScrollUp/ScrollDown arrow rows), "Select Item" ComponentSet
 * (2148:12658: State(Default/Hover/Selected/Disabled), same margin/
 * padding recipe as Dropdown's item — but radius-s (4px), not
 * Dropdown's radius-md (8px); updated after review, not an
 * inconsistency to reconcile back).
 *
 * Built on @radix-ui/react-select (Root/Trigger/Value/Icon/Portal/
 * Content/Viewport/Item/ItemText/ItemIndicator/ScrollUpButton/
 * ScrollDownButton) — gives correct aria-expanded/typeahead/keyboard
 * nav and native <select> form-submission behavior for free.
 *
 * Trigger reuses Input's exact box recipe (surface-subtle bg, box-
 * shadow ring for focus/error rather than a real border, same
 * size/padding scale) since the ComponentSet's own token values are
 * identical to Input Text's — confirmed side by side, not assumed.
 * Unlike Input's plain <div>, Trigger renders a real <button> (required
 * for the combobox a11y pattern), which ships default browser button
 * chrome (`appearance: button`) — reset explicitly in CSS so it reads
 * as the same flat custom box as Input, not a native button underneath.
 *
 * Content uses position="popper" + sideOffset (like Dropdown), matching
 * Figma's literal structure: the "Wrapper" slot sits at a fixed offset
 * directly below the trigger, not aligned to the currently-selected
 * item the way a native <select> would be (Radix's actual default,
 * position="item-aligned" — tried first, incorrectly assumed it matched
 * Figma's intent without checking, corrected after review).
 *
 * Menu panel: surface-low bg (NOT surface-elevated, unlike Dropdown/
 * Tooltip — a real, confirmed difference, not an inconsistency),
 * radius-md (8px, also smaller than Dropdown's radius-xl), Shadow/lg.
 * ScrollUp/ScrollDownButton map directly to Figma's "Select arrow"
 * chevron rows.
 */
export const Select = RadixSelect.Root;
export const SelectGroup = RadixSelect.Group;

export type SelectFieldSize = "md" | "lg";

export interface SelectTriggerProps extends ComponentPropsWithoutRef<typeof RadixSelect.Trigger> {
  label?: ReactNode;
  labelOptional?: boolean;
  hint?: ReactNode;
  error?: boolean;
  size?: SelectFieldSize;
  placeholder?: string;
  wrapperClassName?: string;
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(function SelectTrigger(
  { className, wrapperClassName, label, labelOptional, hint, error, size = "md", placeholder, id, ...props },
  ref,
) {
  const autoId = useId();
  const triggerId = id ?? autoId;

  return (
    <div className={clsx(styles.wrapper, wrapperClassName)} data-error={error || undefined}>
      {label && (
        <Label htmlFor={triggerId} optional={labelOptional}>
          {label}
        </Label>
      )}
      <div className={styles.field}>
        <RadixSelect.Trigger
          ref={ref}
          id={triggerId}
          className={clsx(styles.box, className)}
          data-size={size}
          {...props}
        >
          {/* RadixSelect.Value doesn't forward its className onto the
              placeholder text specifically (only onto an actual selected
              value) — wrapping it in a real span we control means the
              placeholder-muted-color rule below always has something to
              target, regardless of that Radix quirk. */}
          <span className={styles.value}>
            <RadixSelect.Value placeholder={placeholder} />
          </span>
          <RadixSelect.Icon className={styles.icon}>
            <ChevronDown />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        {hint && <HintText variant={error ? "error" : "default"}>{hint}</HintText>}
      </div>
    </div>
  );
});

export type SelectContentProps = ComponentPropsWithoutRef<typeof RadixSelect.Content>;

export function SelectContent({ className, children, position = "popper", sideOffset = 4, ...props }: SelectContentProps) {
  return (
    <RadixSelect.Portal>
      <RadixSelect.Content
        className={clsx(styles.content, className)}
        position={position}
        sideOffset={sideOffset}
        {...props}
      >
        <RadixSelect.ScrollUpButton className={styles.scrollButton}>
          <ChevronUp />
        </RadixSelect.ScrollUpButton>
        <RadixSelect.Viewport className={styles.viewport}>{children}</RadixSelect.Viewport>
        <RadixSelect.ScrollDownButton className={styles.scrollButton}>
          <ChevronDown />
        </RadixSelect.ScrollDownButton>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  );
}

export interface SelectItemProps extends ComponentPropsWithoutRef<typeof RadixSelect.Item> {
  icon?: ReactNode;
}

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(
  { className, icon, children, ...props },
  ref,
) {
  return (
    <RadixSelect.Item ref={ref} className={clsx(styles.item, className)} {...props}>
      <span className={styles.itemMain}>
        {icon && <span className={styles.itemIcon}>{icon}</span>}
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      </span>
      <RadixSelect.ItemIndicator className={styles.check}>
        <Check />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
});
