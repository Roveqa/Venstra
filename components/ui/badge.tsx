import { type VariantProps, cva } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Source: Figma "Badge" component set (r2dbmly2FCs307sePH1Z9C, page 903:5385).
 * Status × Style × Size variants — Content=Number uses the `shape="number"` prop.
 */
const badgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[var(--radius-full)] font-normal leading-[1.16]",
  {
    variants: {
      intent: {
        neutral: "",
        success: "",
        warning: "",
        error: "",
        info: "",
      },
      variant: {
        fill: "",
        light: "",
        ghost: "",
      },
      size: {
        medium: "text-[length:var(--text-md)] tracking-[-0.28px]",
        small: "text-[length:var(--text-xs)] tracking-[-0.2px] leading-[1.4]",
      },
      shape: {
        text: "",
        number: "aspect-square justify-center p-0",
      },
    },
    compoundVariants: [
      // Fill — solid background, inverse (white) text
      {
        variant: "fill",
        intent: "neutral",
        class: "bg-[var(--fill-neutral)] text-[color:var(--foreground-inverse)]",
      },
      {
        variant: "fill",
        intent: "success",
        class: "bg-[var(--fill-success)] text-[color:var(--foreground-inverse)]",
      },
      {
        variant: "fill",
        intent: "warning",
        class: "bg-[var(--fill-warning)] text-[color:var(--foreground-inverse)]",
      },
      {
        variant: "fill",
        intent: "error",
        class: "bg-[var(--fill-error)] text-[color:var(--foreground-inverse)]",
      },
      {
        variant: "fill",
        intent: "info",
        class: "bg-[var(--fill-info)] text-[color:var(--foreground-inverse)]",
      },
      // Light — tinted background, colored text
      {
        variant: "light",
        intent: "neutral",
        class: "bg-[var(--fill-neutral-overlay)] text-[color:var(--foreground-neutral)]",
      },
      {
        variant: "light",
        intent: "success",
        class: "bg-[var(--fill-success-overlay)] text-[color:var(--foreground-success)]",
      },
      {
        variant: "light",
        intent: "warning",
        class: "bg-[var(--fill-warning-overlay)] text-[color:var(--foreground-warning)]",
      },
      {
        variant: "light",
        intent: "error",
        class: "bg-[var(--fill-error-overlay)] text-[color:var(--foreground-error)]",
      },
      {
        variant: "light",
        intent: "info",
        class: "bg-[var(--fill-info-overlay)] text-[color:var(--foreground-info)]",
      },
      // Ghost — no background, colored text
      { variant: "ghost", intent: "neutral", class: "text-[color:var(--foreground-neutral)]" },
      { variant: "ghost", intent: "success", class: "text-[color:var(--foreground-success)]" },
      { variant: "ghost", intent: "warning", class: "text-[color:var(--foreground-warning)]" },
      { variant: "ghost", intent: "error", class: "text-[color:var(--foreground-error)]" },
      { variant: "ghost", intent: "info", class: "text-[color:var(--foreground-info)]" },
      // Size × shape padding (text pill vs. number square)
      { size: "medium", shape: "text", class: "gap-[var(--spacing-0,0px)] p-[4px] px-[8px]" },
      { size: "small", shape: "text", class: "px-[4px] py-[2px]" },
      { size: "medium", shape: "number", class: "h-[24px] min-w-[24px]" },
      { size: "small", shape: "number", class: "h-[18px] min-w-[18px] px-[4px]" },
    ],
    defaultVariants: {
      intent: "neutral",
      variant: "fill",
      size: "medium",
      shape: "text",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, intent, variant, size, shape, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ intent, variant, size, shape }), className)} {...props} />
  );
}
