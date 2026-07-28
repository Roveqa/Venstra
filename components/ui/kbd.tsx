import clsx from "clsx";
import type { HTMLAttributes } from "react";
import styles from "./kbd.module.css";

/**
 * Source: Figma "Kbd" component set (r2dbmly2FCs307sePH1Z9C, page 149:3743).
 * Style variants: Background, Outline, Ghost.
 */
export type KbdVariant = "background" | "outline" | "ghost";

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  variant?: KbdVariant;
}

export function Kbd({ className, variant = "background", ...props }: KbdProps) {
  return <kbd className={clsx(styles.kbd, styles[variant], className)} {...props} />;
}
