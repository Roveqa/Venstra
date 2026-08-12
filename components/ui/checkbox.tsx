"use client";

import clsx from "clsx";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Label } from "./label";
import { HintText } from "./hint-text";
import styles from "./checkbox.module.css";

/**
 * Source: Figma "Checkbox" component set (r2dbmly2FCs307sePH1Z9C /
 * RIB8DZ9M5Uay7si4mI19Yt, page 254:17986, ComponentSet 1553:9365).
 * States: Default/Hover/Focus/Error/Disabled x Mode: Default/Active/
 * Indeterminate (Error only exists for Default mode — a checkbox
 * with an already-confirmed value has nothing left to validate).
 * Checked the real master (1553:8991): exposes text/label/hintText
 * booleans — anatomy is a 16x16 box (wrapped in a 2px padding hit-
 * slot) plus a label+hint content column, reusing the same Label/
 * HintText components as Input.
 *
 * Built on Radix (@radix-ui/react-checkbox) per explicit request,
 * same as Progress earlier this session — gives real keyboard/ARIA
 * checkbox semantics and native indeterminate support for free.
 * data-state ("checked"/"unchecked"/"indeterminate") drives all the
 * visual states via CSS; no JS state tracking needed for which icon
 * to show.
 *
 * Unchecked: 1px border stroke-subtle, transparent fill. Hover:
 * border darkens to stroke-strong (#b3b3b3). Focus (keyboard only,
 * :focus-visible — matches Button's convention, not Input's :focus,
 * since this renders as a real <button>): same box-shadow ring as
 * every other focusable control (0 0 0 2px rgba(10,10,10,0.1)).
 * Error: border stroke-error. Disabled: opacity 0.4 on the whole
 * component (matches Input's disabled treatment). Border/hover-border
 * colors are read from --cb-border/--cb-border-hover custom
 * properties (falling back to stroke-subtle/stroke-strong) so
 * CheckboxCard (checkbox-card.tsx) can override just those two
 * variables on its own card wrapper instead of duplicating the box.
 *
 * Checked/Indeterminate: bg fill-primary (#0a61f9), border removed.
 * Hover: fill-primary-hover (#3967ff), border explicitly kept
 * transparent (the plain :hover rule above would otherwise reapply
 * stroke-strong on top of the fill — caught and fixed after it
 * shipped once already). Focus ring identical to the unchecked case.
 * Disabled: opacity 0.4, same fill-primary (not grayed separately).
 *
 * Check/minus glyphs are NOT lucide's Check/Minus icons — those read
 * as visually off-center inside the 16x16 box because lucide's Check
 * glyph isn't symmetric within its own viewBox the way Figma's
 * custom check_10/minus_10 marks are. Reproduced Figma's exact paths
 * instead (raw SVG stroke confirmed #fefefe, matching Button's
 * --foreground-inverse token for text-on-Fill/Primary — same
 * semantic case, reused rather than inventing a new token).
 */
function CheckMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" fill="none" className={className} aria-hidden="true">
      <path
        d="M8.75 2.917L4.167 7.5L2.083 5.417"
        stroke="currentColor"
        strokeWidth="0.833"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MinusMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" fill="none" className={className} aria-hidden="true">
      <path d="M2.083 5H7.917" stroke="currentColor" strokeWidth="0.833" strokeLinecap="round" />
    </svg>
  );
}

export type CheckboxBoxProps = Omit<ComponentPropsWithoutRef<typeof RadixCheckbox.Root>, "className"> & {
  className?: string;
  error?: boolean;
};

/** The bare 16x16 box + indicator, with no label/hint — shared by Checkbox and CheckboxCard. */
export const CheckboxBox = forwardRef<HTMLButtonElement, CheckboxBoxProps>(function CheckboxBox(
  { className, error, ...props },
  ref,
) {
  return (
    <RadixCheckbox.Root
      ref={ref}
      className={clsx(styles.box, className)}
      data-error={error || undefined}
      {...props}
    >
      <RadixCheckbox.Indicator className={styles.indicator}>
        <CheckMark className={styles.check} />
        <MinusMark className={styles.minus} />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
});

export interface CheckboxProps extends Omit<CheckboxBoxProps, "className"> {
  className?: string;
  wrapperClassName?: string;
  label?: ReactNode;
  labelOptional?: boolean;
  hint?: ReactNode;
}

export function Checkbox({
  className,
  wrapperClassName,
  label,
  labelOptional,
  hint,
  error,
  id,
  ...props
}: CheckboxProps) {
  const autoId = useId();
  const checkboxId = id ?? autoId;

  return (
    <div className={clsx(styles.wrapper, wrapperClassName)}>
      <span className={styles.slot}>
        <CheckboxBox id={checkboxId} error={error} className={className} {...props} />
      </span>
      {(label || hint) && (
        <div className={styles.content}>
          {label && (
            <Label htmlFor={checkboxId} optional={labelOptional}>
              {label}
            </Label>
          )}
          {hint && <HintText variant={error ? "error" : "default"}>{hint}</HintText>}
        </div>
      )}
    </div>
  );
}
