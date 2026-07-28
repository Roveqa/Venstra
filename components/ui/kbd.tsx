import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";
import styles from "./kbd.module.css";

/**
 * Source: Figma "Kbd" component set (r2dbmly2FCs307sePH1Z9C, page 149:3743).
 * Style variants: Background, Outline, Ghost. Every variant's anatomy
 * includes an optional leading icon slot (squircle_12 for Background/
 * Outline, squircle_14 for Ghost) ahead of the key label.
 */
export type KbdVariant = "background" | "outline" | "ghost";

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  variant?: KbdVariant;
  icon?: ReactNode;
}

export function Kbd({ className, variant = "background", icon, children, ...props }: KbdProps) {
  return (
    <kbd className={clsx(styles.kbd, styles[variant], className)} {...props}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </kbd>
  );
}
