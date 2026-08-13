"use client";

import clsx from "clsx";
import * as RadixSlider from "@radix-ui/react-slider";
import { useId, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Label } from "./label";
import styles from "./slider.module.css";

/**
 * Source: Figma "Slider" component set (page 2067:2937, ComponentSet
 * 2128:4666). Variants: State = Default/Disabled, Range = No/Yes.
 * Thumb ("Slider Item") is its own component set (2128:4661): State =
 * Default/Hover/Focus, plus an optional Tooltip shown on Focus.
 *
 * Built on @radix-ui/react-slider (Root/Track/Range/Thumb) rather than
 * plain divs — gives correct role="slider" + keyboard/drag handling +
 * aria-valuenow for free, same reasoning as Progress. Thumb count
 * follows `value`/`defaultValue` array length (1 = single, 2 = range),
 * matching Radix's own model instead of inventing a separate `range`
 * boolean prop.
 *
 * Track/range corners: Figma only rounds the range's leading edge
 * (rounded-bl/tl) since the thumb visually covers the trailing edge.
 * Rounding the range full (rounded-full both ends) is visually
 * identical once the thumb sits on top of it, so no need to replicate
 * the asymmetric radius.
 *
 * Tooltip: Figma's Focus+Tooltip thumb variant shows the current value
 * in a small bubble above the thumb. Modeled as `showValue`, shown
 * while a thumb is hovered, focused, or actively being dragged.
 */
export type SliderProps = Omit<ComponentPropsWithoutRef<typeof RadixSlider.Root>, "className"> & {
  className?: string;
  wrapperClassName?: string;
  label?: ReactNode;
  labelOptional?: boolean;
  showValue?: boolean;
};

export function Slider({
  className,
  wrapperClassName,
  label,
  labelOptional,
  showValue = false,
  id,
  defaultValue,
  value,
  min = 0,
  max = 100,
  disabled,
  ...props
}: SliderProps) {
  const autoId = useId();
  const sliderId = id ?? autoId;
  const [activeThumb, setActiveThumb] = useState<number | null>(null);

  const values = value ?? defaultValue ?? [min];

  return (
    <div className={clsx(styles.wrapper, wrapperClassName)} data-disabled={disabled || undefined}>
      {label && (
        <Label htmlFor={sliderId} optional={labelOptional} className={styles.label}>
          {label}
        </Label>
      )}
      <RadixSlider.Root
        id={sliderId}
        className={clsx(styles.root, className)}
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        {...props}
      >
        <RadixSlider.Track className={styles.track}>
          <RadixSlider.Range className={styles.range} />
        </RadixSlider.Track>
        {values.map((v, i) => (
          <RadixSlider.Thumb
            key={i}
            className={styles.thumb}
            onPointerEnter={() => setActiveThumb(i)}
            onPointerLeave={() => setActiveThumb((cur) => (cur === i ? null : cur))}
            onFocus={() => setActiveThumb(i)}
            onBlur={() => setActiveThumb((cur) => (cur === i ? null : cur))}
          >
            {showValue && activeThumb === i && <span className={styles.tooltip}>{v}</span>}
          </RadixSlider.Thumb>
        ))}
      </RadixSlider.Root>
    </div>
  );
}
