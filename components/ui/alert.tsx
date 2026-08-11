import clsx from "clsx";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
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
 * Close button token differs by style: Fill uses a constant
 * white-80% token (foreground-base-inverse, added to globals.css —
 * Fill's background is always mid/dark-toned regardless of site
 * theme); Light/Stroke reuse the existing foreground-base-muted.
 *
 * Inline action button renders as plain underlined text matching the
 * alert's own text color (confirmed in Figma: its color always
 * equals the description text's color, not a separate Button
 * intent), not the full Button component — avoids trying to map 15
 * Alert combinations onto Button's own intent system for a chunk of
 * UI that Figma always renders identically to the description text.
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
          <button type="button" className={styles.action} onClick={onAction}>
            {action}
          </button>
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
