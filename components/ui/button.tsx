import { type VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Source: Figma "Button" component set (r2dbmly2FCs307sePH1Z9C, page 1:11).
 * Style × Type × Size × State variants. Hover/Active/Focus are real CSS
 * pseudo-classes; Disabled/Loading are props (Figma states, not variants a
 * user can hover into).
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-[var(--spacing-3,6px)] whitespace-nowrap rounded-[var(--radius-md)] font-medium leading-[1.16] tracking-[-0.14px] transition-colors disabled:pointer-events-none disabled:opacity-[0.4] focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(10,10,10,0.1)]",
  {
    variants: {
      intent: {
        primary: "",
        neutral: "",
        success: "",
        warning: "",
        error: "",
        info: "",
      },
      variant: {
        fill: "",
        light: "",
        outline: "border border-solid",
        ghost: "",
        link: "!p-0 underline decoration-solid underline-offset-[from-font] !leading-[1.4]",
      },
      size: {
        lg: "px-[var(--spacing-10,20px)] py-[var(--spacing-6,12px)] text-[length:var(--text-md)] [&_svg]:size-[16px]",
        md: "px-[var(--spacing-6,12px)] py-[var(--spacing-5,10px)] text-[length:var(--text-md)] [&_svg]:size-[16px]",
        sm: "px-[var(--spacing-6,12px)] py-[var(--spacing-4,8px)] text-[length:var(--text-md)] [&_svg]:size-[16px]",
      },
    },
    compoundVariants: [
      // Fill — solid background, inverse text
      {
        variant: "fill",
        intent: "primary",
        class:
          "bg-[var(--fill-primary)] text-[color:var(--foreground-inverse)] hover:bg-[var(--fill-primary-hover)] active:bg-[var(--fill-primary-active)]",
      },
      {
        variant: "fill",
        intent: "neutral",
        class:
          "bg-[var(--fill-neutral)] text-[color:var(--foreground-inverse)] hover:bg-[var(--fill-neutral-hover)] active:bg-[var(--fill-neutral)]",
      },
      {
        variant: "fill",
        intent: "success",
        class:
          "bg-[var(--fill-success)] text-[color:var(--foreground-inverse)] hover:bg-[var(--fill-success-hover)] active:bg-[var(--fill-success-active)]",
      },
      {
        variant: "fill",
        intent: "warning",
        class:
          "bg-[var(--fill-warning)] text-[color:var(--foreground-inverse)] hover:bg-[var(--fill-warning-hover)] active:bg-[var(--fill-warning-active)]",
      },
      {
        variant: "fill",
        intent: "error",
        class:
          "bg-[var(--fill-error)] text-[color:var(--foreground-inverse)] hover:bg-[var(--fill-error-hover)] active:bg-[var(--fill-error-active)]",
      },
      {
        variant: "fill",
        intent: "info",
        class:
          "bg-[var(--fill-info)] text-[color:var(--foreground-inverse)] hover:bg-[var(--fill-info-hover)] active:bg-[var(--fill-info-active)]",
      },
      // Light — tinted background, colored text
      {
        variant: "light",
        intent: "primary",
        class:
          "bg-[var(--fill-primary-overlay)] text-[color:var(--foreground-primary)] hover:bg-[var(--fill-primary-overlay-hover)] active:bg-[var(--fill-primary-overlay-active)]",
      },
      {
        variant: "light",
        intent: "neutral",
        class:
          "bg-[var(--fill-neutral-overlay)] text-[color:var(--foreground-neutral-strong)] hover:bg-[var(--fill-neutral-overlay-hover)]",
      },
      {
        variant: "light",
        intent: "success",
        class:
          "bg-[var(--fill-success-overlay)] text-[color:var(--foreground-success)] hover:bg-[var(--fill-success-overlay-hover)]",
      },
      {
        variant: "light",
        intent: "warning",
        class:
          "bg-[var(--fill-warning-overlay)] text-[color:var(--foreground-warning)] hover:bg-[var(--fill-warning-overlay-hover)]",
      },
      {
        variant: "light",
        intent: "error",
        class:
          "bg-[var(--fill-error-overlay)] text-[color:var(--foreground-error)] hover:bg-[var(--fill-error-overlay-hover)]",
      },
      {
        variant: "light",
        intent: "info",
        class:
          "bg-[var(--fill-info-overlay)] text-[color:var(--foreground-info)] hover:bg-[var(--fill-info-overlay-hover)]",
      },
      // Outline — bordered, colored text
      {
        variant: "outline",
        intent: "primary",
        class:
          "border-[var(--stroke-primary)] text-[color:var(--foreground-primary)] hover:bg-[var(--fill-primary-overlay)]",
      },
      {
        variant: "outline",
        intent: "neutral",
        class:
          "border-[var(--stroke-neutral-strong)] text-[color:var(--foreground-neutral-strong)] hover:bg-[var(--fill-neutral-overlay)]",
      },
      {
        variant: "outline",
        intent: "success",
        class:
          "border-[var(--stroke-success)] text-[color:var(--foreground-success)] hover:bg-[var(--fill-success-overlay)]",
      },
      {
        variant: "outline",
        intent: "warning",
        class:
          "border-[var(--stroke-warning)] text-[color:var(--foreground-warning)] hover:bg-[var(--fill-warning-overlay)]",
      },
      {
        variant: "outline",
        intent: "error",
        class:
          "border-[var(--stroke-error)] text-[color:var(--foreground-error)] hover:bg-[var(--fill-error-overlay)]",
      },
      {
        variant: "outline",
        intent: "info",
        class:
          "border-[var(--stroke-info)] text-[color:var(--foreground-info)] hover:bg-[var(--fill-info-overlay)]",
      },
      // Ghost — no background/border, colored text, tinted hover
      {
        variant: "ghost",
        intent: "primary",
        class: "text-[color:var(--foreground-primary)] hover:bg-[var(--fill-primary-overlay)]",
      },
      {
        variant: "ghost",
        intent: "neutral",
        class:
          "text-[color:var(--foreground-neutral-strong)] hover:bg-[var(--fill-neutral-overlay)]",
      },
      {
        variant: "ghost",
        intent: "success",
        class: "text-[color:var(--foreground-success)] hover:bg-[var(--fill-success-overlay)]",
      },
      {
        variant: "ghost",
        intent: "warning",
        class: "text-[color:var(--foreground-warning)] hover:bg-[var(--fill-warning-overlay)]",
      },
      {
        variant: "ghost",
        intent: "error",
        class: "text-[color:var(--foreground-error)] hover:bg-[var(--fill-error-overlay)]",
      },
      {
        variant: "ghost",
        intent: "info",
        class: "text-[color:var(--foreground-info)] hover:bg-[var(--fill-info-overlay)]",
      },
      // Link — text only, underlined
      { variant: "link", intent: "primary", class: "text-[color:var(--foreground-primary)]" },
      {
        variant: "link",
        intent: "neutral",
        class: "text-[color:var(--foreground-neutral-strong)]",
      },
      { variant: "link", intent: "success", class: "text-[color:var(--foreground-success)]" },
      { variant: "link", intent: "warning", class: "text-[color:var(--foreground-warning)]" },
      { variant: "link", intent: "error", class: "text-[color:var(--foreground-error)]" },
      { variant: "link", intent: "info", class: "text-[color:var(--foreground-info)]" },
    ],
    defaultVariants: {
      intent: "primary",
      variant: "fill",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, intent, variant, size, loading, disabled, leftIcon, rightIcon, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ intent, variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
});
