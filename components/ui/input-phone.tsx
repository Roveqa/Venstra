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
 * Figma's spec only defines one flag (US, exported and committed at
 * public/flags/us.svg) — no other countries were designed. `countries`
 * is a prop so a consuming app supplies its own real flag assets/data;
 * shipping fabricated flag icons for countries Figma never specified
 * would misrepresent the design system's source of truth.
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
              disabled={disabled}
              className={clsx(styles.input, className)}
              {...props}
            />
          </div>
        </div>
        {hint && <HintText variant={error ? "error" : "default"}>{hint}</HintText>}
      </div>
    </div>
  );
});
