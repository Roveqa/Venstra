import clsx from "clsx";
import type { HTMLAttributes } from "react";
import styles from "./badge.module.css";

/**
 * Source: Figma "Badge" component set (r2dbmly2FCs307sePH1Z9C, page 903:5385).
 * See badge.module.css for the full color recipe and node-by-node source
 * comments. Status × Style × Size — Content=Number uses `type="number"`.
 * "Badge master" (887:4424) also exposes Dot left/right and Icon
 * left/right (`dotLeft`/`dotRight`/`iconLeft`/`iconRight` below) plus
 * Avatar left/right, which aren't implemented here.
 */
export type BadgeIntent = "neutral" | "success" | "warning" | "error" | "info";
export type BadgeVariant = "fill" | "light" | "ghost";
export type BadgeSize = "medium" | "small";
export type BadgeType = "text" | "number";

function BadgeDot({ side }: { side: "left" | "right" }) {
  return (
    <span className={clsx(styles.dot, side === "left" ? styles.dotLeft : styles.dotRight)}>
      <span className={styles.dotCircle} />
    </span>
  );
}

function BadgeText({ size, children }: { size: BadgeSize; children: React.ReactNode }) {
  return (
    <span className={styles.textWrap}>
      <span className={size === "small" ? styles.leadingRelaxed : styles.leadingCompact}>
        {children}
      </span>
    </span>
  );
}

function BadgeIcon({ side, children }: { side: "left" | "right"; children: React.ReactNode }) {
  return (
    <span className={clsx(styles.icon, side === "left" ? styles.iconLeft : styles.iconRight)}>
      {children}
    </span>
  );
}

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  intent?: BadgeIntent;
  variant?: BadgeVariant;
  size?: BadgeSize;
  type?: BadgeType;
  children?: React.ReactNode;
  dotLeft?: boolean;
  dotRight?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export function Badge({
  className,
  intent = "neutral",
  variant = "fill",
  size = "medium",
  type = "text",
  dotLeft,
  dotRight,
  iconLeft,
  iconRight,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(styles.badge, className)}
      data-intent={intent}
      data-variant={variant}
      data-size={size}
      data-type={type}
      {...props}
    >
      {iconLeft && <BadgeIcon side="left">{iconLeft}</BadgeIcon>}
      {dotLeft && <BadgeDot side="left" />}
      {type === "number" ? (
        <BadgeText size={size}>{children}</BadgeText>
      ) : (
        <span className={styles.label}>
          <BadgeText size={size}>{children}</BadgeText>
        </span>
      )}
      {dotRight && <BadgeDot side="right" />}
      {iconRight && <BadgeIcon side="right">{iconRight}</BadgeIcon>}
    </span>
  );
}
