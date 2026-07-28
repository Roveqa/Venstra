import { type VariantProps, cva } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Source: Figma "Kbd" component set (r2dbmly2FCs307sePH1Z9C, page 149:3743).
 * Style variants: Background, Outline, Ghost.
 */
const kbdVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-[var(--spacing-1,2px)] rounded-[var(--radius-s)] font-medium leading-none",
  {
    variants: {
      variant: {
        background:
          "bg-[var(--surface-strong)] px-[6px] py-[4px] text-[12px] tracking-[-0.24px] text-[color:var(--foreground-subtle)]",
        outline:
          "border border-solid border-[var(--stroke-subtle)] px-[6px] py-[4px] text-[12px] tracking-[-0.24px] text-[color:var(--foreground-weak)]",
        ghost: "p-0 text-[14px] tracking-[-0.28px] text-[color:var(--foreground-muted)]",
      },
    },
    defaultVariants: {
      variant: "background",
    },
  }
);

export interface KbdProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof kbdVariants> {}

export function Kbd({ className, variant, ...props }: KbdProps) {
  return <kbd className={cn(kbdVariants({ variant }), className)} {...props} />;
}
