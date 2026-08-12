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
 * None of the 14 scanned instances render the optional left/right
 * icon or suffix slots shown in the doc's anatomy (every default
 * demo is icon-less) — kept as optional props with the doc's
 * previously-recorded tokens (foreground-subtle for icons), not
 * independently re-verified since no live instance had one to check.
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
          {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
          <input id={inputId} className={clsx(styles.input, className)} {...props} />
          {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
        </div>
        {hint && <HintText variant={error ? "error" : "default"}>{hint}</HintText>}
      </div>
    </div>
  );
}
