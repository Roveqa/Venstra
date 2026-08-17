import clsx from "clsx";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import styles from "./table.module.css";

/**
 * Source: Figma "Table" (page 2067:2938). "Table" master (2425:7911):
 * surface-elevated card, 1px stroke border, radius-xxl (16px),
 * overflow-clip, wrapping a header row + body rows + a Pagination
 * wrapper (padding px-8/py-6 around the already-built Pagination
 * component — reused as-is, not rebuilt).
 *
 * "Table head" ComponentSet (2286:12705, Default/Hover): h-40, bg
 * surface-subtle (surface-subtle-hover on Hover), border-bottom,
 * padding-6 (12px), text foreground-weak 14px regular ln-1.16.
 * Optional leading checkbox (the "select all" header cell) — reuses
 * the real Checkbox component, not a static drawn box.
 *
 * "Table Cell" ComponentSet (2244:12054): every "Content" variant
 * (Text/Button/Checkbox/Badge/Avatar/Avatar group/Progress/Dropdown)
 * shares the exact same shell (h-56, px-6, border-bottom, flex
 * items-center) — the only real difference Figma encodes is padding
 * (py-10/20px for a single line of Text, py-1/2px for anything taller
 * that needs less breathing room to hit the same 56px row height).
 * Since flex `align-items: center` already vertically centers any
 * child regardless of its own height, TableCell doesn't need a
 * content-type prop to reproduce this — one consistent horizontal-only
 * padding does the same job for arbitrary children. "State=Active" was
 * checked directly against "State=Default" for the Text variant and
 * is visually identical (no background, no color change) — only Hover
 * differs (surface-subtle bg) — so rows only need a hover treatment,
 * not a separate "active" one.
 *
 * "List Cell=Yes/No" is "has the row's bottom divider". Every row in
 * the one assembled Table instance keeps it, including the last one —
 * confirmed directly against that instance, not assumed — because the
 * Pagination footer always follows and needs the boundary line. But
 * List Cell is still a real per-row variant in Figma's own
 * ComponentSet, not just an internal implementation detail, so it's
 * exposed here as `divider` on TableRow (default true) rather than
 * baked in unconditionally — a consuming app can turn it off per row
 * the same way Figma's own variant does.
 *
 * Columns are a real CSS Grid (`--table-columns`, set once via the
 * `columns` prop on <Table> and inherited by every row) instead of
 * independent flexbox per row. Header and body used to each be their
 * own flex-col box, and — even with identical flex-basis/grow on every
 * cell — their EXACT pixel widths could still drift apart by a few px
 * (confirmed via getBoundingClientRect: header cells sat at 140px while
 * body cells the same "column" grew to ~150px, because .header and
 * .body each computed their own independent max-content width from
 * their own content). That drift is what made the row dividers and
 * hover state look like they were cutting out mid-scroll — the header
 * and body columns were never actually aligned to begin with. A single
 * shared grid track list guarantees pixel-perfect alignment instead.
 *
 * The full assembled example (drag-handle column, checkbox column, 6
 * data columns, trailing kebab-menu column) is reproduced in the
 * playground demo using these primitives plus the existing Checkbox/
 * Avatar/Badge/Button/Dropdown/Pagination components — kept out of
 * this file so Table itself stays a plain, composable primitive
 * (matching every other multi-part component in this codebase) rather
 * than a monolithic "data grid" baking in drag/select/actions.
 */
export interface TableColumn {
  /** Fixed column width in px (e.g. the drag-handle/checkbox/actions columns). */
  width?: number;
  /** Minimum width for a flexible (grow-to-fill) column — ignored if `width` is set. Defaults to 140. */
  minWidth?: number;
}

export interface TableProps extends ComponentPropsWithoutRef<"div"> {
  /** Column widths, in order — shared by the header row and every body row so they stay pixel-aligned. */
  columns: TableColumn[];
}

export function Table({ className, columns, style, ...props }: TableProps) {
  const template = columns.map((c) => (c.width !== undefined ? `${c.width}px` : `minmax(${c.minWidth ?? 140}px, 1fr)`)).join(" ");
  return (
    <div
      role="table"
      className={clsx(styles.table, className)}
      style={{ ...style, ["--table-columns" as string]: template }}
      {...props}
    />
  );
}

/**
 * Wraps TableHeader + TableBody together so they scroll horizontally
 * in sync (a single shared scrollbox, not two independently-scrolling
 * regions) once the columns hit their min-width and the row no longer
 * fits — not itself in Figma (every column in the one assembled
 * example fits comfortably at 1576px), but necessary real-world
 * behavior for any table with more columns than a narrow viewport can
 * show. TablePaginationWrapper stays a sibling outside this, matching
 * Figma (pagination doesn't scroll with the rows).
 */
export function TableScrollArea({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={clsx(styles.scrollArea, className)} {...props} />;
}

export function TableHeader({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div role="rowgroup" className={clsx(styles.header, className)} {...props} />;
}

export function TableBody({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div role="rowgroup" className={clsx(styles.body, className)} {...props} />;
}

export interface TableRowProps extends ComponentPropsWithoutRef<"div"> {
  /** Bottom divider line — Figma's "List Cell" variant. Defaults to true. */
  divider?: boolean;
}

export function TableRow({ className, divider = true, ...props }: TableRowProps) {
  return <div role="row" className={clsx(styles.row, className)} data-divider={divider || undefined} {...props} />;
}

export interface TableHeadProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Leading glyph before the label — Figma's own "Table head" exposes
   * this as a `checkbox` boolean specifically for the select-all
   * column, but the same "icon vs. no icon" header variant applies to
   * any column, so this takes any node (a Checkbox, a sort arrow,
   * whatever) rather than being hardcoded to one.
   */
  icon?: ReactNode;
}

export function TableHead({ className, icon, children, ...props }: TableHeadProps) {
  return (
    <div role="columnheader" className={clsx(styles.head, className)} {...props}>
      {icon && <span className={styles.headIcon}>{icon}</span>}
      {children}
    </div>
  );
}

export function TableCell({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div role="cell" className={clsx(styles.cell, className)} {...props} />;
}

export function TablePaginationWrapper({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={clsx(styles.paginationWrapper, className)} {...props} />;
}
