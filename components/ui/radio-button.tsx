"use client";

import clsx from "clsx";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Label } from "./label";
import { HintText } from "./hint-text";
import styles from "./radio-button.module.css";

/**
 * Source: Figma "Radio Button" component set (r2dbmly2FCs307sePH1Z9C /
 * RIB8DZ9M5Uay7si4mI19Yt, page 1563:8187, ComponentSet 1563:8210).
 * States: Default/Hover/Focus/Error/Disabled x Mode: Default/Active —
 * no Indeterminate (not a radio concept) and Error only exists for
 * Default mode, same reasoning as Checkbox. Checked the real master
 * (1563:8194): exposes text/label/hintText booleans, same anatomy
 * convention as Checkbox/Switch — a control (here: ring + dot) plus a
 * label+hint content column, reusing Input's Label/HintText.
 *
 * Built on Radix (@radix-ui/react-radio-group) — real keyboard/ARIA
 * radio semantics (arrow-key navigation between items, single
 * selection within a group) for free. Unlike Checkbox/Switch, a
 * radio button only makes sense grouped, so this also re-exports
 * Radix's Root as `RadioGroup` for composing a set of RadioButtons.
 *
 * Anatomy: an 18x18 ring (1px border, transparent fill, fully
 * rounded, 2px padding inset) wrapped in a 2px hit-slot, containing a
 * 12px dot. Unlike Checkbox (solid filled square) the ring and dot
 * always share the same color when checked — confirmed across every
 * state, not assumed:
 * - Unchecked: ring stroke-subtle, dot transparent (invisible).
 *   Hover: ring stroke-strong. Focus: ring stroke-subtle + the usual
 *   box-shadow ring. Error: ring stroke-error. Disabled: opacity 0.4
 *   on the whole component (matches every other control this
 *   session), ring/dot colors unchanged from Default.
 * - Checked: ring stroke-primary (#0a61f9) AND dot fill-primary
 *   (#0a61f9) — same value, confirmed via raw fetch, not just eyeballed.
 *   Hover: both shift to the *-hover/-subtle variant (#3967ff)
 *   together. Focus: ring stroke-primary + ring shadow, dot stays
 *   fill-primary (not the hover variant — confirmed via a dedicated
 *   Focus+Active fetch, not assumed from the unchecked Focus state).
 *   Disabled: opacity 0.4, same fill-primary/stroke-primary as resting
 *   checked (no separate disabled color, matching Checkbox/Switch).
 */
export type RadioGroupProps = ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>;
export const RadioGroup = RadixRadioGroup.Root;

export type RadioButtonBoxProps = Omit<ComponentPropsWithoutRef<typeof RadixRadioGroup.Item>, "className"> & {
  className?: string;
  error?: boolean;
};

/** The bare ring+dot, with no label/hint — shared by RadioButton and RadioButtonCard. */
export const RadioButtonBox = forwardRef<HTMLButtonElement, RadioButtonBoxProps>(function RadioButtonBox(
  { className, error, ...props },
  ref,
) {
  return (
    <RadixRadioGroup.Item ref={ref} className={clsx(styles.ring, className)} data-error={error || undefined} {...props}>
      <RadixRadioGroup.Indicator className={styles.dot} />
    </RadixRadioGroup.Item>
  );
});

export interface RadioButtonProps extends Omit<RadioButtonBoxProps, "className"> {
  className?: string;
  wrapperClassName?: string;
  label?: ReactNode;
  labelOptional?: boolean;
  hint?: ReactNode;
}

export function RadioButton({
  className,
  wrapperClassName,
  label,
  labelOptional,
  hint,
  error,
  id,
  ...props
}: RadioButtonProps) {
  const autoId = useId();
  const radioId = id ?? autoId;

  return (
    <div className={clsx(styles.wrapper, wrapperClassName)}>
      <span className={styles.slot}>
        <RadioButtonBox id={radioId} error={error} className={className} {...props} />
      </span>
      {(label || hint) && (
        <div className={styles.content}>
          {label && (
            <Label htmlFor={radioId} optional={labelOptional}>
              {label}
            </Label>
          )}
          {hint && <HintText variant={error ? "error" : "default"}>{hint}</HintText>}
        </div>
      )}
    </div>
  );
}
