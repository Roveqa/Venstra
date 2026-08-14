"use client";

import clsx from "clsx";
import * as RadixSelect from "@radix-ui/react-select";
import { ChevronDown, ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { Button } from "./button";
import { SelectContent, SelectItem } from "./select";
import styles from "./pagination.module.css";

/**
 * Source: Figma "Pagination" component (page 2067:1176, node 2422:2732).
 * Left: "Rows X to Y of Z" hint text (foreground-weak). Right, gap-40px:
 * an optional "Rows per page" mini-select, then the nav cluster —
 * First/Prev buttons, page-number cells, Next/Last buttons.
 *
 * First/Prev/Next/Last reuse the real Button component (ghost/neutral/
 * md/iconOnly) — Figma literally names these nodes "Button"/"Button
 * master", same padding-5/rounded-md recipe as Button's own md+icon-only
 * variant, not a bespoke nav-arrow style.
 *
 * Page-number cells are their own thing though (Pagination Cells master,
 * ComponentSet 2404:7222): fixed 36x36, radius-l (10px, NOT radius-md —
 * a real, confirmed difference from every other 8px-radius control in
 * this system), padding-2 (4px). States: Default (no bg, foreground-
 * subtle) / Hover (surface-subtle bg, foreground) / Focus (same as
 * Default + focus ring) / Active=current page (surface-soft bg,
 * foreground, and Hover/Focus variants darken from there) / Disabled
 * (opacity 40%, non-interactive — used for the "…" truncation cell).
 *
 * "Rows per page" reuses SelectContent/SelectItem from select.tsx (same
 * pattern as InputPhone's country trigger) with its own compact trigger
 * matching Figma's "Input select master" box (surface-subtle bg,
 * rounded-md, px-6/py-4, gap-1 between value and chevron) — a real
 * background box, unlike InputPhone's borderless flush trigger.
 *
 * Page-list truncation (1 2 3 4 … 12) uses a standard sibling/boundary
 * algorithm (1 boundary page each end, 1 sibling each side of current),
 * matching Figma's 7-cell example (page 2 of 12: 1 2 3 4 … 12).
 */
export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
  showHint?: boolean;
  showPageSize?: boolean;
  className?: string;
}

type PageItem = number | "ellipsis-start" | "ellipsis-end";

function getPageList(current: number, total: number, siblingCount = 1, boundaryCount = 1): PageItem[] {
  if (total <= 0) return [];
  const totalSlots = boundaryCount * 2 + siblingCount * 2 + 3;
  if (total <= totalSlots) return Array.from({ length: total }, (_, i) => i + 1);

  const startPages = Array.from({ length: boundaryCount }, (_, i) => i + 1);
  const endPages = Array.from({ length: boundaryCount }, (_, i) => total - boundaryCount + i + 1);

  const siblingStart = Math.max(Math.min(current - siblingCount, total - boundaryCount - siblingCount * 2 - 1), boundaryCount + 2);
  const siblingEnd = Math.min(Math.max(current + siblingCount, boundaryCount + siblingCount * 2 + 2), endPages[0] - 2);

  const items: PageItem[] = [...startPages];
  items.push(siblingStart > boundaryCount + 2 ? "ellipsis-start" : boundaryCount + 1);
  for (let p = siblingStart; p <= siblingEnd; p++) items.push(p);
  items.push(siblingEnd < endPages[0] - 2 ? "ellipsis-end" : endPages[0] - 1);
  items.push(...endPages);

  return items;
}

function PageSizeSelect({ pageSize, pageSizeOptions, onPageSizeChange }: { pageSize: number; pageSizeOptions: number[]; onPageSizeChange?: (size: number) => void }) {
  return (
    <div className={styles.pageSize}>
      <span className={styles.pageSizeLabel}>Rows per page</span>
      <RadixSelect.Root value={String(pageSize)} onValueChange={(v) => onPageSizeChange?.(Number(v))}>
        <RadixSelect.Trigger className={styles.pageSizeTrigger}>
          <RadixSelect.Value />
          <RadixSelect.Icon className={styles.pageSizeIcon}>
            <ChevronDown />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <SelectContent>
          {pageSizeOptions.map((n) => (
            <SelectItem key={n} value={String(n)}>
              {n}
            </SelectItem>
          ))}
        </SelectContent>
      </RadixSelect.Root>
    </div>
  );
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
  pageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  onPageSizeChange,
  showHint = true,
  showPageSize = true,
  className,
}: PaginationProps) {
  const pageList = useMemo(() => getPageList(page, totalPages), [page, totalPages]);
  const rangeStart = totalItems ? (page - 1) * pageSize + 1 : undefined;
  const rangeEnd = totalItems ? Math.min(page * pageSize, totalItems) : undefined;

  return (
    <div className={clsx(styles.root, className)}>
      {showHint && totalItems !== undefined && (
        <span className={styles.hint}>
          Rows {rangeStart} to {rangeEnd} of {totalItems}
        </span>
      )}
      <div className={styles.controls}>
        {showPageSize && <PageSizeSelect pageSize={pageSize} pageSizeOptions={pageSizeOptions} onPageSizeChange={onPageSizeChange} />}
        <div className={styles.nav}>
          <span className={styles.navGroup}>
            <Button
              iconOnly={<ChevronFirst />}
              variant="ghost"
              intent="neutral"
              size="md"
              disabled={page <= 1}
              onClick={() => onPageChange(1)}
              aria-label="First page"
            />
            <Button
              iconOnly={<ChevronLeft />}
              variant="ghost"
              intent="neutral"
              size="md"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              aria-label="Previous page"
            />
          </span>
          <span className={styles.cells}>
            {pageList.map((item, i) =>
              typeof item === "number" ? (
                <button
                  key={item}
                  type="button"
                  className={styles.cell}
                  data-active={item === page || undefined}
                  aria-current={item === page ? "page" : undefined}
                  onClick={() => onPageChange(item)}
                >
                  {item}
                </button>
              ) : (
                <span key={item + i} className={styles.cell} data-disabled aria-hidden="true">
                  …
                </span>
              ),
            )}
          </span>
          <span className={styles.navGroup}>
            <Button
              iconOnly={<ChevronRight />}
              variant="ghost"
              intent="neutral"
              size="md"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              aria-label="Next page"
            />
            <Button
              iconOnly={<ChevronLast />}
              variant="ghost"
              intent="neutral"
              size="md"
              disabled={page >= totalPages}
              onClick={() => onPageChange(totalPages)}
              aria-label="Last page"
            />
          </span>
        </div>
      </div>
    </div>
  );
}
