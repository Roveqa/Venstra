import clsx from "clsx";
import { UserRound } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import styles from "./avatar.module.css";

/**
 * Source: Figma "Avatar" component set (r2dbmly2FCs307sePH1Z9C, page 1:10,
 * ComponentSet 1814:15928). Size × Style, plus built-in dotBadge/numberBadge
 * boolean slots (confirmed via get_design_context on 1817:15941 etc.) —
 * NOT the doc's originally-assumed separate manually-composed components.
 *
 * Background is `Fill/Base/fill-base` (#ebebeb) — the registry doc's
 * `Surface/Base/surface-strong` was stale/wrong, corrected after a fresh
 * Figma scan. Badge Avatar's per-status fill uses the same Fill/[status]
 * tokens as Badge/Button (fill-error, fill-success, ...), not
 * Surface/[status] as the doc speculated.
 *
 * dotBadge/numberBadge are only exposed in Figma at size >= 24 — 14/16px
 * have no badge variant at all (too small).
 */
export type AvatarSize = 14 | 16 | 24 | 32 | 40 | 48;
export type AvatarVariant = "text" | "image" | "icon";
export type AvatarBadgeStatus = "neutral" | "error" | "success" | "warning" | "info";

export interface AvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  size?: AvatarSize;
  variant?: AvatarVariant;
  /** Initials — used when variant="text". */
  children?: ReactNode;
  /** Photo URL — used when variant="image". */
  src?: string;
  alt?: string;
  /** CSS object-position for the photo, e.g. "50% 20%" to favor a face near the top of the frame. Defaults to center. */
  imagePosition?: string;
  /** Custom icon override — used when variant="icon". Defaults to lucide's UserRound (Figma's "user-round"). */
  icon?: ReactNode;
  /** Status dot, bottom-right corner. Figma doesn't parametrize its color (always fill-base). */
  dotBadge?: boolean;
  /** Notification counter, top-right corner. Omit to hide. A number > 99 renders as "99+"; non-numeric content (e.g. a custom node) passes through untouched. */
  badge?: ReactNode;
  badgeStatus?: AvatarBadgeStatus;
}

export function Avatar({
  className,
  size = 40,
  variant = "text",
  children,
  src,
  alt = "",
  imagePosition,
  icon,
  dotBadge,
  badge,
  badgeStatus = "neutral",
  ...props
}: AvatarProps) {
  // Figma has no dotBadge/badge variant at all at size 14/16 (confirmed
  // across all three styles) — the CSS has no matching rules there, so
  // rendering them would produce an unstyled, wrongly-sized element
  // instead of just not showing one.
  const supportsBadge = size >= 24;
  const badgeContent = typeof badge === "number" && badge > 99 ? "99+" : badge;

  return (
    <div className={clsx(styles.avatar, className)} data-size={size} {...props}>
      {/* Circular clip lives on this inner wrapper, not the outer element —
          dotBadge/badge below need to overflow past the circle's edge,
          which a clip on the outer element would cut off. */}
      <div className={styles.content}>
        {variant === "text" && <span className={styles.initials}>{children}</span>}
        {variant === "icon" && <span className={styles.icon}>{icon ?? <UserRound />}</span>}
        {variant === "image" && src && (
          // eslint-disable-next-line @next/next/no-img-element -- arbitrary user-supplied avatar URLs, not a known static domain
          <img
            src={src}
            alt={alt}
            className={styles.image}
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
          />
        )}
      </div>
      {dotBadge && supportsBadge && <span className={styles.dot} />}
      {badge !== undefined && supportsBadge && (
        <span className={styles.badge} data-status={badgeStatus}>
          {badgeContent}
        </span>
      )}
    </div>
  );
}
