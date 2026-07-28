import clsx from "clsx";
import type { LabelHTMLAttributes } from "react";
import styles from "./label.module.css";

/**
 * Source: Figma "Label" component set (r2dbmly2FCs307sePH1Z9C, page 1:13).
 * Variant: Optional Text = Yes/No.
 */
export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  optional?: boolean;
}

export function Label({ className, optional = false, children, ...props }: LabelProps) {
  return (
    <label className={clsx(styles.label, className)} {...props}>
      {children}
      {optional && <span className={styles.optional}>(Optional)</span>}
    </label>
  );
}
