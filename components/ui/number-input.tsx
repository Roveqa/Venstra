"use client";

import clsx from "clsx";
import { useRef, type KeyboardEvent } from "react";
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
 * than Search's state-dependent one.
 *
 * Deliberately NOT `type="number"`, despite that being the obvious
 * first choice (and what an earlier pass of this component used).
 * Real `<input type="number">` has a well-known cross-browser quirk:
 * typing a character that makes the content invalid (any letter, or
 * a second `.`/`-`) makes the browser report `el.value` as `""`
 * regardless of what's visually still in the field, and — combined
 * with `text-align: center` — the caret then re-centers over an
 * effectively-empty box, which reads as the caret "jumping" left of
 * where you were typing. This isn't fixable from a controlled
 * component's onChange, since the browser has already decided the
 * value is "" before React ever sees the event.
 *
 * Instead this uses `type="text"` + `inputMode="numeric"` (numeric
 * mobile keyboard, no native spinner/scientific-notation quirks) and
 * rejects non-numeric keys in onKeyDown, before the browser ever
 * inserts the character — so there's never an invalid intermediate
 * state for the caret to react to. Native `stepUp`/`stepDown` only
 * exist on numeric input types, so +/- now compute the next value in
 * JS (respecting min/max/step) and write it through the real
 * `<input>` value setter — the same technique React itself uses
 * internally — before dispatching an "input" event, so it stays in
 * sync for both controlled (value/onChange) and uncontrolled
 * (defaultValue) usage.
 *
 * Defaults to a real starting value of 0 (like Chakra/MUI's number
 * steppers) rather than sitting empty behind a placeholder — a
 * stepper with nothing in it has no real value for +/- to act on.
 * Only kicks in when the consumer passes neither `value` nor
 * `defaultValue` themselves.
 */
export type NumberInputProps = Omit<InputProps, "leftIcon" | "rightIcon" | "kbd" | "type">;

function getNativeValueSetter() {
  return Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
}

export function NumberInput({
  wrapperClassName,
  className,
  disabled,
  value,
  defaultValue,
  onKeyDown,
  min,
  max,
  step: stepAttr,
  ...props
}: NumberInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const resolvedDefaultValue = value === undefined && defaultValue === undefined ? 0 : defaultValue;

  const step = (direction: 1 | -1) => {
    const el = ref.current;
    const setter = getNativeValueSetter();
    if (!el || !setter) return;
    const delta = stepAttr ? Number(stepAttr) : 1;
    const current = parseFloat(el.value) || 0;
    let next = current + direction * delta;
    if (min !== undefined) next = Math.max(Number(min), next);
    if (max !== undefined) next = Math.min(Number(max), next);
    setter.call(el, String(next));
    el.dispatchEvent(new Event("input", { bubbles: true }));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End", "Enter"];
    if (allowed.includes(e.key)) return;
    if (/^[0-9]$/.test(e.key)) return;
    if ((e.key === "-" || e.key === ".") && !e.currentTarget.value.includes(e.key)) return;
    e.preventDefault();
  };

  return (
    <Input
      {...props}
      ref={ref}
      type="text"
      inputMode="numeric"
      value={value}
      defaultValue={resolvedDefaultValue}
      onKeyDown={handleKeyDown}
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
