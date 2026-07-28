import { type VariantProps, cva } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Source: Figma "Badge" component set (r2dbmly2FCs307sePH1Z9C, page 903:5385).
 * Status × Style × Size variants — Content=Number uses the `shape="number"` prop.
 */
const badgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[var(--radius-full)] font-normal token-leading-compact",
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
        small: "text-[length:var(--text-xs)] tracking-[-0.2px] token-leading-relaxed",
      },
      shape: {
        text: "",
        number: "justify-center",
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
      // Size × shape padding — node 1801:1598 (Medium Text): outer p-[4px] +
      // inner label px-[4px] = py-[4px] px-[8px] effective. Node 1802:14198
      // (Small Text): outer px-[4px] py-[2px] + inner label px-[4px] =
      // py-[2px] px-[8px] effective. Node 1802:1600 (Medium Number):
      // h-[24px] min-w-[24px] p-[4px], no aspect-ratio lock — it's allowed
      // to grow wider than tall for 2-digit counts. Node 1802:14228 (Small
      // Number): h-[18px] min-w-[18px] px-[4px], no vertical padding.
      { size: "medium", shape: "text", class: "py-[4px] px-[8px]" },
      { size: "small", shape: "text", class: "py-[2px] px-[8px]" },
      { size: "medium", shape: "number", class: "h-[24px] min-w-[24px] p-[4px]" },
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
