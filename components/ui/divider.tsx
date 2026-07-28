import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Source: Figma "Divider" component set (r2dbmly2FCs307sePH1Z9C, page 1637:14992).
 * Variants: Horizontally, Vertically, Or (horizontal line + centered label).
 */
export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "horizontal" | "vertical" | "or";
  /** Label shown in the middle of the line — only used when variant="or". */
  label?: string;
}

export function Divider({ className, variant = "horizontal", label = "Or", ...props }: DividerProps) {
  if (variant === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn("h-full w-px shrink-0 bg-[var(--stroke)]", className)}
        {...props}
      />
    );
  }

  if (variant === "or") {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cn(
          "flex w-full items-center gap-[var(--spacing-6,12px)]",
          className
        )}
        {...props}
      >
        <div className="h-px min-w-px flex-1 bg-[var(--stroke)]" />
        <span className="shrink-0 whitespace-nowrap text-[length:var(--text-sm)] font-medium leading-[1.16] tracking-[-0.12px] text-[color:var(--foreground-muted)]">
          {label}
        </span>
        <div className="h-px min-w-px flex-1 bg-[var(--stroke)]" />
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn("h-px w-full shrink-0 bg-[var(--stroke)]", className)}
      {...props}
    />
  );
}
