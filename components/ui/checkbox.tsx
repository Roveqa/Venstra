"use client";

import clsx from "clsx";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
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
 * component (matches Input's disabled treatment).
 *
 * Checked/Indeterminate: bg fill-primary (#0a61f9), border removed.
 * Hover: fill-primary-hover (#3967ff). Focus ring identical to the
 * unchecked case. Disabled: opacity 0.4, same fill-primary (not
 * grayed separately). Check/minus icon is 10x10, confirmed via raw
 * SVG stroke to be #fefefe — matches Button's existing --foreground-
 * inverse token for text-on-Fill/Primary (same semantic case: white
 * icon on the constant primary-blue fill, not meant to flip in dark
 * mode), so reused that token rather than inventing a new one.
 */
export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<typeof RadixCheckbox.Root>, "className"> {
  className?: string;
  wrapperClassName?: string;
  label?: ReactNode;
  labelOptional?: boolean;
  hint?: ReactNode;
  error?: boolean;
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
        <RadixCheckbox.Root
          id={checkboxId}
          className={clsx(styles.box, className)}
          data-error={error || undefined}
          {...props}
        >
          <RadixCheckbox.Indicator className={styles.indicator}>
            <Check className={styles.check} />
            <Minus className={styles.minus} />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
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
