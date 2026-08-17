import clsx from "clsx";
import { type ComponentPropsWithoutRef, type CSSProperties } from "react";
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
 * "List Cell=Yes/No" is "has the row's bottom divider" — first assumed
 * this meant every row except the last (dropping it there to avoid
 * doubling up against the table's own outer border), but the actual
 * assembled Table instance keeps border-b on every row INCLUDING the
 * last one, because the Pagination footer always follows and needs
 * that boundary line (confirmed directly against the real instance's
 * last row, not the isolated ComponentSet in the abstract). Applied
 * here as a box-shadow divider on every TableRow unconditionally,
 * rather than a boolean prop repeated on every cell.
 *
 * The full assembled example (drag-handle column, checkbox column, 6
 * data columns, trailing kebab-menu column) is reproduced in the
 * playground demo using these primitives plus the existing Checkbox/
 * Avatar/Badge/Button/Dropdown/Pagination components — kept out of
 * this file so Table itself stays a plain, composable primitive
 * (matching every other multi-part component in this codebase) rather
 * than a monolithic "data grid" baking in drag/select/actions.
 */
export function Table({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div role="table" className={clsx(styles.table, className)} {...props} />;
}

/**
 * Wraps TableHeader + TableBody together so they scroll horizontally
 * in sync (a single shared scrollbox, not two independently-scrolling
 * regions) once the flexible columns hit their min-width and the row
 * no longer fits — not itself in Figma (every column in the one
 * assembled example fits comfortably at 1576px), but necessary real-
 * world behavior for any table with more columns than a narrow
 * viewport can show. TablePaginationWrapper stays a sibling outside
 * this, matching Figma (pagination doesn't scroll with the rows).
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

export function TableRow({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div role="row" className={clsx(styles.row, className)} {...props} />;
}

export interface TableHeadProps extends ComponentPropsWithoutRef<"div"> {
  /** Fixed column width (e.g. the drag-handle/checkbox/actions columns) — omit for a flexible data column. */
  width?: number;
}

export function TableHead({ className, width, style, ...props }: TableHeadProps) {
  const widthStyle: CSSProperties | undefined = width !== undefined ? { ...style, width, flex: `0 0 ${width}px` } : style;
  return <div role="columnheader" className={clsx(styles.head, className)} style={widthStyle} {...props} />;
}

export interface TableCellProps extends ComponentPropsWithoutRef<"div"> {
  /** Fixed column width (e.g. the drag-handle/checkbox/actions columns) — omit for a flexible data column. */
  width?: number;
}

export function TableCell({ className, width, style, ...props }: TableCellProps) {
  const widthStyle: CSSProperties | undefined = width !== undefined ? { ...style, width, flex: `0 0 ${width}px` } : style;
  return <div role="cell" className={clsx(styles.cell, className)} style={widthStyle} {...props} />;
}

export function TablePaginationWrapper({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={clsx(styles.paginationWrapper, className)} {...props} />;
}
