import clsx from "clsx";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { Button } from "./button";
import styles from "./notification.module.css";

/**
 * Source: Figma "Notification" component set (r2dbmly2FCs307sePH1Z9C /
 * RIB8DZ9M5Uay7si4mI19Yt, page 1:9, ComponentSet 1963:12590). Variants:
 * Type (Neutral/Success/Warning/Error/Info) × Style (Fill/Light/Stroke)
 * — 15 total.
 *
 * Re-verified live rather than trusting the registry doc, same as
 * Alert — the doc described a vertical layout with an absolutely
 * positioned close button and 44px of reserved right padding
 * (identical pattern to Alert's stale doc). The live file has since
 * moved to the same horizontal-row layout Alert uses: Notification
 * master (row, gap 10, padding 12 uniform, radius 12) containing
 * [Icon + Content] -- [close button, normal flex child, not
 * absolute]. Icon + Content itself has its own 4px inset padding not
 * mentioned in the doc.
 *
 * Status icon is the same generic circle-outline placeholder pattern
 * as Alert/Badge/Kbd (confirmed the underlying SVG is just a plain
 * ring) — defaults to sensible semantic lucide icons per type,
 * overridable via `icon`.
 *
 * CTA buttons are real Button instances (variant=Link): "neutral-
 * inverse" intent on Fill (white, since Fill's background is always
 * dark/saturated), "neutral" intent on Light/Stroke (near-black) —
 * same fixed-by-Style-not-Type pattern already confirmed on Alert.
 * Figma's Fill example additionally decorates the CTA with left/right
 * icons while Light/Stroke's doesn't, but nothing suggests that's a
 * deliberate style-level rule rather than incidental demo content, so
 * left/right icons are just optional props here, not tied to variant.
 *
 * The row is named "Buttons" (plural) in Figma and laid out as a flex
 * row with its own gap — built to hold more than one CTA side by
 * side, so `actions` takes an array rather than a single button.
 */
export type NotificationType = "neutral" | "success" | "warning" | "error" | "info";
export type NotificationVariant = "fill" | "light" | "stroke";

const DEFAULT_ICONS: Record<NotificationType, ReactNode> = {
  neutral: <Info />,
  success: <CheckCircle2 />,
  warning: <AlertTriangle />,
  error: <AlertCircle />,
  info: <Info />,
};

export interface NotificationAction {
  label: ReactNode;
  onClick?: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export interface NotificationProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  type?: NotificationType;
  variant?: NotificationVariant;
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: NotificationAction[];
  onClose?: () => void;
}

export function Notification({
  className,
  type = "neutral",
  variant = "fill",
  icon,
  title,
  description,
  actions,
  onClose,
  ...props
}: NotificationProps) {
  return (
    <div className={clsx(styles.notification, className)} data-type={type} data-variant={variant} {...props}>
      <div className={styles.iconContent}>
        <span className={styles.icon}>{icon ?? DEFAULT_ICONS[type]}</span>
        <div className={styles.buttonText}>
          <div className={styles.text}>
            <p className={styles.title}>{title}</p>
            {description && <p className={styles.description}>{description}</p>}
          </div>
          {actions && actions.length > 0 && (
            <div className={styles.buttons}>
              {actions.map((a, i) => (
                <Button
                  key={i}
                  variant="link"
                  intent={variant === "fill" ? "neutral-inverse" : "neutral"}
                  size="sm"
                  leftIcon={a.leftIcon}
                  rightIcon={a.rightIcon}
                  onClick={a.onClick}
                >
                  {a.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
      {onClose && (
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
          <X />
        </button>
      )}
    </div>
  );
}
