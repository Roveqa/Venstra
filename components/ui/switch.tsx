"use client";

import clsx from "clsx";
import * as RadixSwitch from "@radix-ui/react-switch";
import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Label } from "./label";
import { HintText } from "./hint-text";
import styles from "./switch.module.css";

/**
 * Source: Figma "Switch" component set (r2dbmly2FCs307sePH1Z9C /
 * RIB8DZ9M5Uay7si4mI19Yt, page 1898:6461, ComponentSet 1914:40289).
 * States: Default/Hover/Focus/Disabled x Active: No/Yes — no Error
 * state (confirmed absent; a switch is a direct action toggle, not a
 * validated form field, unlike Checkbox). Checked the real master
 * (1914:40276): exposes text/label/hintText booleans, same anatomy
 * convention as Checkbox — a track+thumb control plus a label+hint
 * content column, reusing Input's Label/HintText components.
 *
 * Built on Radix (@radix-ui/react-switch), same reasoning as
 * Checkbox/Progress earlier this session — real keyboard/ARIA switch
 * semantics for free. data-state ("checked"/"unchecked") drives every
 * visual state via CSS.
 *
 * Track: 28x16 (2px padding + 12px thumb), fully rounded. Off:
 * surface-strong (#ebebeb), hover surface-strong-hover (#d0d0d0). On:
 * fill-primary (#0a61f9), hover fill-primary-hover (#3967ff). Focus
 * (keyboard only, :focus-visible — matches Button/Checkbox's
 * convention): same box-shadow ring as every other focusable control.
 * Disabled: opacity 0.4 on the whole component, track colors
 * unchanged (matches Checkbox's disabled treatment — not grayed out
 * separately).
 *
 * Thumb is always white (--fill-primary-inverse — confirmed via Figma's
 * actual bound variable, constant across themes, unlike the generic
 * --foreground-inverse which flips with the theme and would turn the
 * thumb near-black in dark mode). Figma implements the thumb's on/off
 * position via the track's own justify-content
 * (flex-start/flex-end), but that can't be CSS-transitioned smoothly,
 * so this uses transform: translateX() on the thumb instead — same
 * rest position (12px travel = track width 28 - padding 2*2 - thumb
 * 12), just animatable.
 */
export type SwitchBoxProps = Omit<ComponentPropsWithoutRef<typeof RadixSwitch.Root>, "className"> & {
  className?: string;
};

/** The bare track+thumb, with no label/hint — shared by Switch and SwitchCard. */
export const SwitchBox = forwardRef<HTMLButtonElement, SwitchBoxProps>(function SwitchBox(
  { className, ...props },
  ref,
) {
  return (
    <RadixSwitch.Root ref={ref} className={clsx(styles.track, className)} {...props}>
      <RadixSwitch.Thumb className={styles.thumb} />
    </RadixSwitch.Root>
  );
});

export interface SwitchProps extends Omit<SwitchBoxProps, "className"> {
  className?: string;
  wrapperClassName?: string;
  label?: ReactNode;
  labelOptional?: boolean;
  hint?: ReactNode;
}

export function Switch({
  className,
  wrapperClassName,
  label,
  labelOptional,
  hint,
  id,
  ...props
}: SwitchProps) {
  const autoId = useId();
  const switchId = id ?? autoId;

  return (
    <div className={clsx(styles.wrapper, wrapperClassName)}>
      <span className={styles.slot}>
        <SwitchBox id={switchId} className={className} {...props} />
      </span>
      {(label || hint) && (
        <div className={styles.content}>
          {label && (
            <Label htmlFor={switchId} optional={labelOptional}>
              {label}
            </Label>
          )}
          {hint && <HintText>{hint}</HintText>}
        </div>
      )}
    </div>
  );
}
