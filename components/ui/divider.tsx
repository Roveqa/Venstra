import clsx from "clsx";
import type { HTMLAttributes } from "react";
import styles from "./divider.module.css";

/**
 * Source: Figma "Divider" component set (r2dbmly2FCs307sePH1Z9C, page 1637:14992).
 * Variants: Horizontally, Vertically, Or (horizontal line + centered label).
 */
export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "horizontal" | "vertical" | "or";
  /** Label shown in the middle of the line — only used when variant="or". */
  label?: string;
}

export function Divider({ className, variant = "horizontal", label = "Or", ...props }: DividerProps) {
  if (variant === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={clsx(styles.vertical, className)}
        {...props}
      />
    );
  }

  if (variant === "or") {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={clsx(styles.or, className)}
        {...props}
      >
        <div className={styles.orLine} />
        <span className={styles.orLabel}>{label}</span>
        <div className={styles.orLine} />
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={clsx(styles.horizontal, className)}
      {...props}
    />
  );
}
