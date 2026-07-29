import clsx from "clsx";
import { Children } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import type { AvatarSize } from "./avatar";
import styles from "./avatar-group.module.css";

/**
 * Source: Figma "Avatar Group" component set (r2dbmly2FCs307sePH1Z9C,
 * page 1:10, ComponentSet 2259:4006). Confirmed via get_design_context on
 * 2259:4333 (size 32): each Avatar gets a 1px surface-low ring (not
 * present on a standalone Avatar) and overlaps the next one via negative
 * margin; the "+N" chip is the same circle shape with fill-base bg and
 * foreground-weak text.
 */
export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize;
  /** Avatar elements — each will get the overlap ring/spacing applied. */
  children: ReactNode;
  /** Show at most this many avatars before collapsing the rest into "+N". */
  max?: number;
}

export function AvatarGroup({ className, size = 40, children, max, ...props }: AvatarGroupProps) {
  const items = Children.toArray(children);
  const visible = max ? items.slice(0, max) : items;
  const overflow = max ? items.length - max : 0;

  return (
    <div className={clsx(styles.group, className)} data-size={size} {...props}>
      <div className={styles.avatars}>
        {visible.map((child, i) => (
          <span className={styles.item} key={i}>
            {child}
          </span>
        ))}
      </div>
      {overflow > 0 && <span className={clsx(styles.item, styles.more)}>+{overflow}</span>}
    </div>
  );
}
