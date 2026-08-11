import clsx from "clsx";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { Button } from "./button";
import styles from "./alert.module.css";

/**
 * Source: Figma "Alert" component set (r2dbmly2FCs307sePH1Z9C /
 * RIB8DZ9M5Uay7si4mI19Yt, page 2060:23628, ComponentSet 2070:12587).
 * Variants: Type (Neutral/Error/Success/Warning/Info) × Style
 * (Fill/Light/Stroke) — 15 total.
 *
 * The content icon in Figma (squircle_16) is a literal plain circle
 * outline in every Type — confirmed by downloading the actual SVG
 * path (just a rounded-rect stroke, no glyph inside) — i.e. a
 * swappable placeholder, not a real per-type icon baked into the
 * design. Defaults below use conventional semantic icons per type
 * instead, overridable via the `icon` prop.
 *
 * Alert master is a HORIZONTAL row (re-verified after a design
 * update): [Icon + Content] -- gap 12px -- [close button], padding a
 * uniform 8px/10px. The close button is a normal in-flow flex child
 * now, not absolutely positioned with reserved padding like before —
 * so omitting it (no onClose) just removes that child and its gap,
 * no manual width/padding bookkeeping needed.
 *
 * Close button token differs by style: Fill uses a constant
 * white-80% token (foreground-base-inverse, added to globals.css —
 * Fill's background is always mid/dark-toned regardless of site
 * theme); Light/Stroke reuse the existing foreground-base-muted.
 *
 * Inline action IS a real Button instance in Figma (variant=Link),
 * and its color does NOT track the alert's own text color — checked
 * Fill/Neutral, Fill/Error, Light/Error and Stroke/Error specifically
 * (e.g. Light/Error's description is foreground-error-strong #320404,
 * a dark red, while its Button is plain foreground-neutral #0f0f0f —
 * different colors, not inherited). It's a fixed intent based only on
 * Style: "neutral-inverse" for Fill (white, on the always-dark Fill
 * background), "neutral" for Light/Stroke (near-black) — regardless
 * of Type.
 */
export type AlertType = "neutral" | "error" | "success" | "warning" | "info";
export type AlertVariant = "fill" | "light" | "stroke";

const DEFAULT_ICONS: Record<AlertType, ReactNode> = {
  neutral: <Info />,
  error: <AlertCircle />,
  success: <CheckCircle2 />,
  warning: <AlertTriangle />,
  info: <Info />,
};

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  type?: AlertType;
  variant?: AlertVariant;
  icon?: ReactNode;
  children: ReactNode;
  action?: ReactNode;
  onAction?: () => void;
  onClose?: () => void;
}

export function Alert({
  className,
  type = "neutral",
  variant = "fill",
  icon,
  children,
  action,
  onAction,
  onClose,
  ...props
}: AlertProps) {
  return (
    <div className={clsx(styles.alert, className)} data-type={type} data-variant={variant} {...props}>
      <div className={styles.row}>
        <div className={styles.titleRow}>
          <span className={styles.icon}>{icon ?? DEFAULT_ICONS[type]}</span>
          <p className={styles.description}>{children}</p>
        </div>
        {action && (
          <Button
            variant="link"
            intent={variant === "fill" ? "neutral-inverse" : "neutral"}
            size="sm"
            className={styles.action}
            onClick={onAction}
          >
            {action}
          </Button>
        )}
      </div>
      {onClose && (
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
          <X />
        </button>
      )}
    </div>
  );
}
