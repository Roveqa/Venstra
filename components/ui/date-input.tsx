"use client";

import clsx from "clsx";
import { Calendar } from "lucide-react";
import { Input, type InputProps } from "./input";
import styles from "./date-input.module.css";

/**
 * Source: Figma "Input Date" component set (r2dbmly2FCs307sePH1Z9C /
 * RIB8DZ9M5Uay7si4mI19Yt, page 1:12, ComponentSet 1774:8926). Same
 * 7-state x 2-size anatomy as Input Text. Checked the real
 * configurable master (1774:8955/1774:8956, same pattern as Input
 * Text/Search/Email/Number's own masters): exposes iconLeft (default
 * true)/iconRight/suffix/label/hintText — no kbd. iconRight/suffix
 * left as regular passthrough props; only leftIcon is fixed, to the
 * lucide Calendar glyph. Placeholder text is "DD / MM / YYYY".
 *
 * Deliberately NOT `type="date"` — a real native date input renders
 * the browser's own picker affordance and value formatting, which
 * can't be made to match this design (custom "DD / MM / YYYY" text
 * with a left-side calendar icon, no native picker indicator). Same
 * reasoning as NumberInput avoiding `type="number"`: `type="text"` +
 * `inputMode="numeric"`.
 *
 * Auto-inserts "/" as DD/MM/YYYY while typing (strip to digits, cap
 * at 8, reformat) — a first pass of this component only filtered
 * keystrokes to digits/"/" without any masking, reasoning Figma's
 * mockup doesn't show a real interactive example. That's true, but
 * auto-formatting is table-stakes UX for a date field regardless of
 * what the static mockup shows, not a scope-creep addition. Restores
 * caret position after reformatting (counting digits before the
 * caret, then walking that many digits into the reformatted string)
 * via requestAnimationFrame — same caret-jump risk NumberInput hit
 * earlier with type="number", avoided here since the value is always
 * rebuilt from the same synchronous change, not from a browser-owned
 * invalid-state reset.
 *
 * Icon color follows the same dynamic rule as Search/Email — verified
 * via raw SVG stroke across every state — with one real difference:
 * Disabled here is foreground-muted (#b3b3b3), NOT foreground-subtle
 * like Search/Email/Number's disabled icon. Confirmed by re-checking
 * the raw SVG specifically (not assumed from the other components) —
 * a genuine difference, not an inconsistency to paper over. Input's
 * .icon rule (input.module.css) has a dedicated --icon-color-disabled
 * variable for exactly this case.
 */
export type DateInputProps = Omit<InputProps, "leftIcon" | "kbd" | "type">;

function formatDate(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length > 4) return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

export function DateInput({ wrapperClassName, onKeyDown, onChange, ...props }: DateInputProps) {
  const handleKeyDown: NonNullable<InputProps["onKeyDown"]> = (e) => {
    onKeyDown?.(e);
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End", "Enter"];
    if (allowed.includes(e.key)) return;
    if (/^[0-9]$/.test(e.key)) return;
    e.preventDefault();
  };

  const handleChange: NonNullable<InputProps["onChange"]> = (e) => {
    const el = e.target;
    const cursorPos = el.selectionStart ?? el.value.length;
    const digitsBeforeCursor = el.value.slice(0, cursorPos).replace(/\D/g, "").length;

    const formatted = formatDate(el.value);
    el.value = formatted;

    let pos = 0;
    let seen = 0;
    while (pos < formatted.length && seen < digitsBeforeCursor) {
      if (/\d/.test(formatted[pos])) seen++;
      pos++;
    }
    requestAnimationFrame(() => el.setSelectionRange(pos, pos));

    onChange?.(e);
  };

  return (
    <Input
      {...props}
      type="text"
      inputMode="numeric"
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      wrapperClassName={clsx(styles.wrapper, wrapperClassName)}
      leftIcon={<Calendar />}
    />
  );
}
