import clsx from "clsx";
import type { HTMLAttributes } from "react";
import styles from "./hint-text.module.css";

/**
 * Source: Figma "Hint text" component set (r2dbmly2FCs307sePH1Z9C, page 1:13,
 * ComponentSet 1684:2129). Helper/error text shown under a form field —
 * lives on the same Figma page as Label but is a separate component.
 * Variant: Default, Error.
 */
export interface HintTextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: "default" | "error";
}

export function HintText({ className, variant = "default", ...props }: HintTextProps) {
  return <p className={clsx(styles.hint, styles[variant], className)} {...props} />;
}
