"use client";

import clsx from "clsx";
import Image from "next/image";
import * as RadixSelect from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { forwardRef, useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Label } from "./label";
import { HintText } from "./hint-text";
import { SelectContent, SelectItem } from "./select";
import styles from "./input-phone.module.css";

/**
 * Source: Figma "Input Phone" component set (page 1:12, ComponentSet
 * 1753:17890). States: Placeholder, Hover, Focus, Filled, Error, Error
 * focus, Disabled x Size (Medium/Large), 14 total.
 *
 * Unlike every other Input* variant, this isn't a single text field —
 * it's one shared box (same surface-subtle/rounded-md/focus-ring recipe
 * as Input Text) split into two segments by a 1px stroke divider: a
 * compact country-code trigger ("Input select for input", flag + dial
 * code + chevron) on the left, and the phone-number field on the right.
 * Both segments highlight together on hover/focus in Figma's demo (a
 * single wrapping button per state) — reproduced here with :focus-within
 * / :hover on the shared .box rather than styling each segment alone.
 *
 * The country trigger reuses SelectContent/SelectItem from select.tsx
 * (same "Select menu"/"Select Item" pieces the registry lists under
 * Select's own page) since it's a real Radix Select under the hood, just
 * with its own compact trigger instead of Select's full-width box —
 * matching Figma's "Input select for input master", not Select's own
 * "Select master".
 *
 * Input Phone's own spec only shows one country (US). The design system
 * separately has a full ISO-country "Flag" set (page 1756:18167) with a
 * real exported icon per country — used for the playground demo's extra
 * countries (GB/DE/JP, public/flags/{gb,de,jp}.svg) instead of emoji.
 * `defaultPhoneCountries` still ships with just US, matching Input
 * Phone's own default value; `countries` is a prop so a consuming app
 * picks whichever real flags it needs from that page.
 *
 * The number field auto-formats as (999) 999-9999 while typing — same
 * strip-to-digits/reformat/restore-caret-by-digit-count technique as
 * DateInput's DD/MM/YYYY mask (see that file's comment), and matching
 * the exact placeholder Figma specifies. Deliberately US-shaped
 * regardless of the selected country: Figma only specifies this one
 * mask, and a real per-country mask table is a much bigger, separately
 * scoped feature (libphonenumber-style formatting), not something to
 * half-implement here.
 */
export type InputPhoneSize = "md" | "lg";

export interface PhoneCountry {
  value: string;
  label: string;
  dialCode: string;
  flag: ReactNode;
}

export const defaultPhoneCountries: PhoneCountry[] = [
  { value: "us", label: "United States", dialCode: "+1", flag: <Image src="/flags/us.svg" alt="" width={16} height={16} /> },
];

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length > 6) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  if (digits.length > 3) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  if (digits.length > 0) return `(${digits}`;
  return digits;
}

export interface InputPhoneProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: ReactNode;
  labelOptional?: boolean;
  hint?: ReactNode;
  error?: boolean;
  size?: InputPhoneSize;
  wrapperClassName?: string;
  countries?: PhoneCountry[];
  countryValue?: string;
  defaultCountryValue?: string;
  onCountryChange?: (value: string) => void;
}

export const InputPhone = forwardRef<HTMLInputElement, InputPhoneProps>(function InputPhone(
  {
    className,
    wrapperClassName,
    label,
    labelOptional,
    hint,
    error,
    size = "md",
    countries = defaultPhoneCountries,
    countryValue,
    defaultCountryValue,
    onCountryChange,
    id,
    disabled,
    onKeyDown,
    onChange,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const initialCountry = defaultCountryValue ?? countries[0]?.value;
  const [uncontrolledCountry, setUncontrolledCountry] = useState(initialCountry);
  const resolvedCountryValue = countryValue ?? uncontrolledCountry;
  const selectedCountry = countries.find((c) => c.value === resolvedCountryValue) ?? countries[0];

  function handleCountryChange(value: string) {
    if (countryValue === undefined) setUncontrolledCountry(value);
    onCountryChange?.(value);
  }

  const handleKeyDown: InputPhoneProps["onKeyDown"] = (e) => {
    onKeyDown?.(e);
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End", "Enter"];
    if (allowed.includes(e.key)) return;
    if (/^[0-9]$/.test(e.key)) return;
    e.preventDefault();
  };

  const handleChange: InputPhoneProps["onChange"] = (e) => {
    const el = e.target;
    const cursorPos = el.selectionStart ?? el.value.length;
    const digitsBeforeCursor = el.value.slice(0, cursorPos).replace(/\D/g, "").length;

    const formatted = formatPhone(el.value);
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
    <div className={clsx(styles.wrapper, wrapperClassName)} data-error={error || undefined}>
      {label && (
        <Label htmlFor={inputId} optional={labelOptional}>
          {label}
        </Label>
      )}
      <div className={styles.field}>
        <div className={styles.box} data-size={size} data-disabled={disabled || undefined}>
          <RadixSelect.Root value={resolvedCountryValue} onValueChange={handleCountryChange} disabled={disabled}>
            <RadixSelect.Trigger className={styles.prefix} data-size={size}>
              <RadixSelect.Value>
                {selectedCountry && (
                  <span className={styles.prefixContent}>
                    <span className={styles.flag}>{selectedCountry.flag}</span>
                    <span className={styles.codeGroup}>
                      <span className={styles.code}>{selectedCountry.dialCode}</span>
                      <RadixSelect.Icon className={styles.chevron}>
                        <ChevronDown />
                      </RadixSelect.Icon>
                    </span>
                  </span>
                )}
              </RadixSelect.Value>
            </RadixSelect.Trigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value} icon={<span className={styles.itemFlag}>{country.flag}</span>}>
                  {country.label} ({country.dialCode})
                </SelectItem>
              ))}
            </SelectContent>
          </RadixSelect.Root>
          <div className={styles.inputSegment} data-size={size}>
            <input
              ref={ref}
              id={inputId}
              type="tel"
              inputMode="tel"
              disabled={disabled}
              className={clsx(styles.input, className)}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              {...props}
            />
          </div>
        </div>
        {hint && <HintText variant={error ? "error" : "default"}>{hint}</HintText>}
      </div>
    </div>
  );
});
