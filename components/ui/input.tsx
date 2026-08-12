import clsx from "clsx";
import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { Label } from "./label";
import { HintText } from "./hint-text";
import styles from "./input.module.css";

/**
 * Source: Figma "Input Text" component set (r2dbmly2FCs307sePH1Z9C /
 * RIB8DZ9M5Uay7si4mI19Yt, page 1:12, ComponentSet 1648:13829). States:
 * Placeholder, Hover, Focus, Filled, Error, Error focus, Disabled ×
 * Size (Medium/Large) — 14 total. Verified live; structure and tokens
 * matched the registry doc closely (same as Textarea).
 *
 * Same box-shadow-ring technique as Textarea/Button for the Error
 * border and Focus/Focus-error rings, for the same reason: a real
 * border would add 2px only in the Error state, misaligning the field
 * against the borderless states.
 *
 * Placeholder vs Filled isn't a separate CSS state — ::placeholder
 * (foreground-muted) vs the input's own typed-text color (foreground)
 * is handled natively by the browser.
 *
 * leftIcon/rightIcon/suffix aren't shown in any of the 14 State×Size
 * demo instances (all icon-less) — found via the actual master
 * component instead (1648:13446), which exposes them as real boolean
 * properties (iconLeft/iconRight/suffix) with a screenshot showing
 * each: icon color is foreground-weak (#5f5f5f, confirmed from the
 * icon's own SVG stroke), not foreground-subtle like an earlier pass
 * of this component assumed. Suffix is a vertical divider
 * (stroke, matches the Divider component) + 12px Medium text
 * (foreground-muted). leftIcon sits inside the same flex:1 row as the
 * input; rightIcon/suffix are separate siblings in the outer row.
 */
export type InputSize = "md" | "lg";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: ReactNode;
  labelOptional?: boolean;
  hint?: ReactNode;
  error?: boolean;
  size?: InputSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  suffix?: ReactNode;
  wrapperClassName?: string;
}

export function Input({
  className,
  wrapperClassName,
  label,
  labelOptional,
  hint,
  error,
  size = "md",
  leftIcon,
  rightIcon,
  suffix,
  id,
  ...props
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div className={clsx(styles.wrapper, wrapperClassName)} data-error={error || undefined}>
      {label && (
        <Label htmlFor={inputId} optional={labelOptional}>
          {label}
        </Label>
      )}
      <div className={styles.field}>
        <div className={styles.box} data-size={size}>
          <div className={styles.content}>
            {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
            <input id={inputId} className={clsx(styles.input, className)} {...props} />
          </div>
          {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
          {suffix && (
            <div className={styles.suffix}>
              <span className={styles.suffixDivider} />
              <span className={styles.suffixText}>{suffix}</span>
            </div>
          )}
        </div>
        {hint && <HintText variant={error ? "error" : "default"}>{hint}</HintText>}
      </div>
    </div>
  );
}
