import clsx from "clsx";
import { useId, type ReactNode, type TextareaHTMLAttributes } from "react";
import { Label } from "./label";
import { HintText } from "./hint-text";
import styles from "./textarea.module.css";

/**
 * Source: Figma "Textarea" component set (r2dbmly2FCs307sePH1Z9C /
 * RIB8DZ9M5Uay7si4mI19Yt, page 2067:2939, ComponentSet 2088:14314).
 * States: Placeholder, Hover, Focus, Filled, Disabled, Error, Error
 * focus — one size only (Medium). Verified live: structure and tokens
 * matched the registry doc closely (unlike Alert/Notification, whose
 * docs turned out stale).
 *
 * Placeholder vs Filled isn't a separate CSS state — it's just
 * ::placeholder styling (foreground-muted) vs the textarea's own
 * typed-text color (foreground), which the browser already
 * distinguishes natively. Hover/Focus are real :hover/:focus.
 *
 * The 1px error border uses box-shadow (inset), not a real border —
 * same reasoning as Button/Kbd's Outline variants: a real border
 * would add 2px to the field's rendered size only in the Error state,
 * making it misaligned with the borderless states.
 */
export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: ReactNode;
  labelOptional?: boolean;
  hint?: ReactNode;
  error?: boolean;
  wrapperClassName?: string;
}

export function Textarea({
  className,
  wrapperClassName,
  label,
  labelOptional,
  hint,
  error,
  id,
  ...props
}: TextareaProps) {
  const autoId = useId();
  const textareaId = id ?? autoId;

  return (
    <div className={clsx(styles.wrapper, wrapperClassName)} data-error={error || undefined}>
      {label && (
        <Label htmlFor={textareaId} optional={labelOptional}>
          {label}
        </Label>
      )}
      <div className={styles.field}>
        <textarea id={textareaId} className={clsx(styles.textarea, className)} {...props} />
        {hint && <HintText variant={error ? "error" : "default"}>{hint}</HintText>}
      </div>
    </div>
  );
}
