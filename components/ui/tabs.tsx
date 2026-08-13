"use client";

import clsx from "clsx";
import * as RadixTabs from "@radix-ui/react-tabs";
import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import styles from "./tabs.module.css";

/**
 * Source: Figma "Tabs" component set (page 39:3838). Two independent
 * pieces: the track wrapper ("Tabs/Fill" 2085:2774, "Tabs/Line"
 * 2088:14134) and the tab item itself, whose real master is
 * "Tab Item master" (2081:2475) — the State×Active×Style ComponentSet
 * (2085:2564) is the full state matrix built on top of it.
 *
 * Built on @radix-ui/react-tabs (Root/List/Trigger/Content) — gives
 * roving-tabindex arrow-key navigation, correct aria-selected/
 * aria-controls wiring, and disabled-tab skipping for free.
 *
 * Fill vs Line is a single `style` prop on TabsList (cascades to its
 * Tab children via a `data-style` attribute + descendant selectors in
 * tabs.module.css, since both live in the same CSS module) rather than
 * a prop repeated on every Tab — matches how the two wrapper masters
 * are actually distinct components in Figma, not a per-item toggle.
 *
 * Verified per state (Default/Hover/Focus/Disabled × Active × Fill/
 * Line) directly against the ComponentSet's 16-variant matrix:
 * - Fill active: bg surface-elevated + shadow-md, rounded-sm (6px).
 * - Hover (inactive OR active): text dims to foreground-subtle.
 * - Focus: ring (0 0 0 2px rgba(10,10,10,.1)) via :focus-visible, not
 *   :focus, matching every other interactive control in this set.
 * - Disabled: whole tab (bg/border/text) dims to opacity 0.4.
 *
 * Line's active indicator deliberately does NOT match the Figma
 * ComponentSet literally (a static border-bottom baked into each tab
 * item) — instead it's a single shared underline that slides/resizes
 * between tabs, following the same pattern already established on this
 * site's own Foundations pages (see UnderlineTabs, used by the
 * Semantic/Primitive switcher on /docs/foundations/color): measure the
 * active trigger's offsetLeft/offsetWidth and animate a `left`/`width`
 * transition on an absolutely-positioned indicator, rather than 16
 * separate tabs each drawing their own border. Tracked via a
 * MutationObserver on each trigger's `data-state` attribute so it stays
 * correct however the active tab changes (click, arrow keys, or a
 * controlled `value` from outside).
 *
 * Badge: optional trailing pill (fill-success bg, 18px, size-xs text)
 * from the master's `badgeRight`/`badgeLeft` slots — modeled as a
 * `badge` ReactNode prop rather than hardcoding the "8" placeholder.
 */
export const TabsRoot = RadixTabs.Root;
export const TabsContent = RadixTabs.Content;

export type TabsStyle = "fill" | "line";

export interface TabsListProps extends ComponentPropsWithoutRef<typeof RadixTabs.List> {
  tabsStyle?: TabsStyle;
}

export function TabsList({ className, tabsStyle = "fill", children, ...props }: TabsListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    if (tabsStyle !== "line") return;
    const container = ref.current;
    if (!container) return;

    const update = () => {
      const activeEl = container.querySelector<HTMLElement>('[data-state="active"]');
      setIndicator(activeEl ? { left: activeEl.offsetLeft, width: activeEl.offsetWidth } : null);
    };
    update();

    const observer = new MutationObserver(update);
    observer.observe(container, { attributes: true, attributeFilter: ["data-state"], subtree: true });
    return () => observer.disconnect();
  }, [tabsStyle]);

  return (
    <RadixTabs.List ref={ref} className={clsx(styles.list, className)} data-style={tabsStyle} {...props}>
      {children}
      {tabsStyle === "line" && indicator && (
        <span className={styles.indicator} style={{ left: indicator.left, width: indicator.width }} />
      )}
    </RadixTabs.List>
  );
}

export interface TabProps extends ComponentPropsWithoutRef<typeof RadixTabs.Trigger> {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  badge?: ReactNode;
}

export function Tab({ className, children, iconLeft, iconRight, badge, ...props }: TabProps) {
  return (
    <RadixTabs.Trigger className={clsx(styles.tab, className)} {...props}>
      {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
      <span className={styles.label}>{children}</span>
      {iconRight && <span className={styles.icon}>{iconRight}</span>}
      {badge && <span className={styles.badge}>{badge}</span>}
    </RadixTabs.Trigger>
  );
}
