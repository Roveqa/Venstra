"use client";

import clsx from "clsx";
import { useRef } from "react";
import { Minus, Plus } from "lucide-react";
import { Input, type InputProps } from "./input";
import styles from "./number-input.module.css";

/**
 * Source: Figma "Input Number" component set (r2dbmly2FCs307sePH1Z9C /
 * RIB8DZ9M5Uay7si4mI19Yt, page 1:12, ComponentSet 1677:14877). Verified
 * against the real configurable master (1677:14852/1677:14853, same
 * pattern as Input Text/Search's masters) — unlike those, it exposes
 * only hintText/label/size, no icon/suffix/kbd booleans. Structurally
 * it's a stepper: a minus button, a centered numeric value, and a
 * plus button, all inside the same field box (data-name "Input Text"
 * in Figma, i.e. built from the same primitive).
 *
 * Minus/plus icon color is foreground-subtle (#4a4a4a) — confirmed
 * via raw SVG stroke across every state (Placeholder, Hover, Filled,
 * Error focus, Disabled) — and unlike Input Search's icon, it does
 * NOT change per state, so it's set as a static --icon-color rather
 * than Search's state-dependent one. The value text itself still
 * follows Input's existing native ::placeholder-vs-value color
 * handling (muted placeholder, darker on hover, full foreground once
 * typed) — no extra CSS needed there.
 *
 * The buttons call the native input's stepUp()/stepDown() (respects
 * min/max/step automatically) via a ref threaded through Input's
 * forwardRef, then dispatch a real "input" event so it works for both
 * controlled (value/onChange) and uncontrolled (defaultValue) usage.
 *
 * Defaults to a real starting value of 0 (like Chakra/MUI's number
 * steppers) rather than sitting empty behind a "12" placeholder — a
 * bare empty number field with centered text has no real value for
 * +/- to act on, and its caret renders at the box's horizontal center
 * (since text-align follows the empty/placeholder content), which
 * visually looks like it's sitting mid-placeholder and can appear to
 * "jump" once a keystroke is rejected. A real starting value sidesteps
 * both: only kicks in when the consumer passes neither `value` nor
 * `defaultValue` themselves.
 */
export type NumberInputProps = Omit<InputProps, "leftIcon" | "rightIcon" | "kbd" | "type">;

export function NumberInput({
  wrapperClassName,
  className,
  disabled,
  value,
  defaultValue,
  ...props
}: NumberInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const resolvedDefaultValue = value === undefined && defaultValue === undefined ? 0 : defaultValue;

  const step = (direction: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    if (direction === 1) {
      el.stepUp();
    } else {
      el.stepDown();
    }
    el.dispatchEvent(new Event("input", { bubbles: true }));
  };

  return (
    <Input
      {...props}
      ref={ref}
      type="number"
      value={value}
      defaultValue={resolvedDefaultValue}
      disabled={disabled}
      className={clsx(styles.field, className)}
      wrapperClassName={clsx(styles.wrapper, wrapperClassName)}
      leftIcon={
        <button
          type="button"
          className={styles.step}
          disabled={disabled}
          onClick={() => step(-1)}
          aria-label="Decrease"
        >
          <Minus />
        </button>
      }
      rightIcon={
        <button
          type="button"
          className={styles.step}
          disabled={disabled}
          onClick={() => step(1)}
          aria-label="Increase"
        >
          <Plus />
        </button>
      }
    />
  );
}
