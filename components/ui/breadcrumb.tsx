"use client";

import clsx from "clsx";
import { ChevronDown, ChevronRight, Ellipsis } from "lucide-react";
import { forwardRef, type AnchorHTMLAttributes, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "./dropdown";
import styles from "./breadcrumb.module.css";

/**
 * Source: Figma "Breadcrumb" (page 128:4797). Pieces: "Breadcrumb"
 * master (2005:1699, padding-2 wrapper + Slot with gap-2 between every
 * item/divider), "Breadcrumb item" ComponentSet (2001:19361: State
 * (Default/Hover/Focus/Active) x Variant(Text + Icon/Icon/Ellipsis), 12
 * variants), "Divider breadcrumb" (2005:605 — ComponentSet exposes
 * Splash/Dot/Chevron variants, but the actual assembled Breadcrumb
 * instance only ever uses Chevron; Splash/Dot were never wired into any
 * real composition, so only Chevron is implemented here).
 *
 * Segment states: Default (foreground-weak), Hover (foreground-subtle,
 * cursor pointer, no bg — color-only), Focus (foreground-weak + ring,
 * matching every other focus-visible ring in this system), Active/
 * current-page (foreground, full-strength — the last, non-navigable
 * segment). "Text + Icon" vs "Icon"-only vs bare label are one
 * component (`icon`/`iconOnly` props), not three.
 *
 * The `dropdown` boolean on Figma's item (trailing chevron-down) means
 * "this segment picks from sibling pages" rather than "this segment AND
 * has a submenu" — modeled as mutually exclusive with href/onClick:
 * pass `items` to BreadcrumbLink and it renders as a Dropdown trigger
 * (reusing Dropdown/DropdownTrigger/DropdownContent/DropdownItem from
 * dropdown.tsx) instead of an anchor.
 *
 * BreadcrumbEllipsis (collapsed-items "…") is the same idea — Figma's
 * own "Active, Variant=Ellipsis" state literally embeds a real Dropdown
 * Menu panel — so it's built the same way: a Dropdown trigger, not a
 * dead label. `items` is required (an ellipsis with nothing to expand
 * into isn't meaningful).
 */
export function Breadcrumb({ className, children, ...props }: ComponentPropsWithoutRef<"nav">) {
  return (
    <nav aria-label="breadcrumb" className={className} {...props}>
      {children}
    </nav>
  );
}

export function BreadcrumbList({ className, ...props }: ComponentPropsWithoutRef<"ol">) {
  return <ol className={clsx(styles.list, className)} {...props} />;
}

export function BreadcrumbItem({ className, ...props }: ComponentPropsWithoutRef<"li">) {
  return <li className={clsx(styles.li, className)} {...props} />;
}

export interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: ReactNode;
  iconOnly?: boolean;
  /** Sibling pages to pick from — renders as a Dropdown trigger instead of a plain link. */
  items?: { label: string; onClick?: () => void }[];
}

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(function BreadcrumbLink(
  { className, icon, iconOnly, items, children, ...props },
  ref,
) {
  if (items && items.length > 0) {
    return (
      <Dropdown>
        <DropdownTrigger className={clsx(styles.item, className)}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {!iconOnly && <span className={styles.label}>{children}</span>}
          <span className={styles.chevron}>
            <ChevronDown />
          </span>
        </DropdownTrigger>
        <DropdownContent align="start">
          {items.map((item, i) => (
            <DropdownItem key={i} onSelect={item.onClick}>
              {item.label}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    );
  }

  return (
    <a ref={ref} className={clsx(styles.item, className)} {...props}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {!iconOnly && <span className={styles.label}>{children}</span>}
    </a>
  );
});

export interface BreadcrumbPageProps extends ComponentPropsWithoutRef<"span"> {
  icon?: ReactNode;
  iconOnly?: boolean;
}

export function BreadcrumbPage({ className, icon, iconOnly, children, ...props }: BreadcrumbPageProps) {
  return (
    <span aria-current="page" className={clsx(styles.item, styles.page, className)} {...props}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {!iconOnly && <span className={styles.label}>{children}</span>}
    </span>
  );
}

export function BreadcrumbSeparator({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span aria-hidden="true" className={clsx(styles.separator, className)} {...props}>
      <ChevronRight />
    </span>
  );
}

export interface BreadcrumbEllipsisProps {
  items: { label: string; onClick?: () => void }[];
  className?: string;
  "aria-label"?: string;
}

export function BreadcrumbEllipsis({ items, className, "aria-label": ariaLabel = "Show more breadcrumb items" }: BreadcrumbEllipsisProps) {
  return (
    <Dropdown>
      <DropdownTrigger className={clsx(styles.item, styles.ellipsisTrigger, className)} aria-label={ariaLabel}>
        <span className={styles.icon}>
          <Ellipsis />
        </span>
      </DropdownTrigger>
      <DropdownContent align="start" className={styles.ellipsisContent}>
        {items.map((item, i) => (
          <DropdownItem key={i} onSelect={item.onClick}>
            {item.label}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
}
