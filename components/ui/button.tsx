import { type VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Source: Figma "Button" component set (r2dbmly2FCs307sePH1Z9C, page 1:11).
 * Every value below was read directly from a Figma component instance via
 * get_design_context — node IDs are noted per variant so they can be
 * re-verified if the design changes.
 *
 *  variant     Figma Style × Type          node (Default / Hover)
 *  ─────────   ──────────────────────────  ──────────────────────────
 *  primary     Fill      × Primary         1011:4227 / 1011:4242
 *  secondary   Light     × Neutral         1943:8782 / 1943:8786
 *  outline     Outline   × Neutral         1602:9288 / 1602:9304
 *  ghost       Ghost     × Neutral         1602:9292 / 1602:9308
 *  destructive Fill      × Error           1609:8162 / 1609:8178
 *  link        Link      × Primary         1602:8995 / 1602:8999
 *
 *  size  padding (Figma "Button master")        node
 *  ────  ────────────────────────────────────   ─────────
 *  lg    px-[spacing-10,20px] py-[spacing-6,12px]  1494:15787
 *  md    px-[spacing-6,12px]  py-[spacing-5,10px]  1011:4227
 *  sm    px-[spacing-6,12px]  py-[spacing-4,8px]   1494:14323
 *
 * All sizes: gap-[spacing-3,6px] between icon/text, 16px icons,
 * rounded-[md,8px], text-[size-md,14px]/tracking[-0.14px]/leading[1.16]
 * (leading[1.4] for the underlined "link" variant — node 1602:8995).
 *
 * Active: fill-primary-active #0753d8 (1011:4255) / fill-error-active
 * #e7000b (1609:8194). Focus-visible: ring 0 0 0 2px rgba(10,10,10,0.1)
 * (1011:4268). Disabled: opacity 0.4, colors unchanged (1011:4294,
 * 1609:8242). Loading: icon replaced by a spinner, colors unchanged
 * (1011:4281).
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-[var(--spacing-3,6px)] whitespace-nowrap rounded-[var(--radius-md)] font-medium leading-[1.16] tracking-[-0.14px] transition-colors disabled:pointer-events-none disabled:opacity-[0.4] focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(10,10,10,0.1)]",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--fill-primary)] text-[color:var(--foreground-inverse)] hover:bg-[var(--fill-primary-hover)] active:bg-[var(--fill-primary-active)]",
        secondary:
          "bg-[var(--fill-neutral-overlay)] text-[color:var(--foreground-neutral)] hover:bg-[var(--fill-neutral-overlay-hover)]",
        outline:
          "border border-solid border-[var(--stroke-neutral)] text-[color:var(--foreground-neutral)] hover:border-[var(--stroke-neutral-subtle)] hover:text-[color:var(--foreground-neutral-subtle)]",
        ghost:
          "text-[color:var(--foreground-neutral)] hover:bg-[var(--fill-neutral-overlay-hover)] hover:text-[color:var(--foreground-neutral-subtle)]",
        destructive:
          "bg-[var(--fill-error)] text-[color:var(--foreground-inverse)] hover:bg-[var(--fill-error-hover)] active:bg-[var(--fill-error-active)]",
        link: "!p-0 !leading-[1.4] text-[color:var(--foreground-primary)] underline decoration-solid underline-offset-[from-font] hover:text-[color:var(--foreground-primary-subtle)]",
      },
      size: {
        lg: "px-[var(--spacing-10,20px)] py-[var(--spacing-6,12px)] text-[length:var(--text-md)] [&_svg]:size-[16px]",
        md: "px-[var(--spacing-6,12px)] py-[var(--spacing-5,10px)] text-[length:var(--text-md)] [&_svg]:size-[16px]",
        sm: "px-[var(--spacing-6,12px)] py-[var(--spacing-4,8px)] text-[length:var(--text-md)] [&_svg]:size-[16px]",
      },
    },
    defaultVariants: {
      variant: "primary",
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
  { className, variant, size, loading, disabled, leftIcon, rightIcon, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
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
