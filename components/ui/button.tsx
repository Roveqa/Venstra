import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./button.module.css";

/**
 * Source: Figma "Button" component set (r2dbmly2FCs307sePH1Z9C, page 1:11).
 * See button.module.css for the full per-variant/intent color recipe and
 * node-by-node source comments — this file only handles structure
 * (icon slots, text nesting, content=icon square variant) and wiring
 * props to `data-variant`/`data-intent`/`data-size`/`data-content`
 * attributes that the stylesheet selects on.
 *
 * size  padding, Content=Text+Icon (node)         padding, Content=Icon (node)
 * ────  ───────────────────────────────────────   ────────────────────────────
 * lg    px-[spacing-10,20px] py-[spacing-6,12px]   p-[spacing-6,12px]  (1494:15895)
 *       (1494:15787)
 * md    px-[spacing-6,12px]  py-[spacing-5,10px]   p-[spacing-5,10px] (1164:4725)
 *       (1011:4227)
 * sm    px-[spacing-6,12px]  py-[spacing-4,8px]    p-[spacing-4,8px]  (1494:14431)
 *       (1494:14323)
 *
 * Focus-visible: ring 0 0 0 2px rgba(10,10,10,0.1) (1011:4268).
 * Disabled: opacity 0.4, colors unchanged (1011:4294). Loading: icon
 * replaced by a spinner, colors unchanged (1011:4281).
 */
export type ButtonVariant = "fill" | "light" | "outline" | "ghost" | "link";
export type ButtonIntent =
  | "primary"
  | "neutral"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "primary-inverse"
  | "neutral-inverse";
export type ButtonSize = "lg" | "md" | "sm";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  intent?: ButtonIntent;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Content=Icon in Figma — square button, icon only, no label. */
  iconOnly?: React.ReactNode;
}

function ButtonLabel({ variant, children }: { variant: ButtonVariant; children: React.ReactNode }) {
  return (
    <span className={styles.label}>
      <span className={variant === "link" ? styles.leadingRelaxed : styles.leadingCompact}>
        {children}
      </span>
    </span>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = "fill",
    intent = "primary",
    size = "md",
    loading,
    disabled,
    leftIcon,
    rightIcon,
    iconOnly,
    children,
    ...props
  },
  ref
) {
  if (iconOnly) {
    return (
      <button
        ref={ref}
        className={clsx(styles.button, className)}
        data-variant={variant}
        data-intent={intent}
        data-size={size}
        data-content="icon"
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? <Loader2 className={styles.spin} /> : iconOnly}
      </button>
    );
  }

  return (
    <button
      ref={ref}
      className={clsx(styles.button, className)}
      data-variant={variant}
      data-intent={intent}
      data-size={size}
      data-content="text"
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? <Loader2 className={styles.spin} /> : leftIcon}
      <ButtonLabel variant={variant}>{children}</ButtonLabel>
      {!loading && rightIcon}
    </button>
  );
});
