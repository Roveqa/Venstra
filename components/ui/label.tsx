import type { LabelHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Source: Figma "Label" component set (r2dbmly2FCs307sePH1Z9C, page 1:13).
 * Variant: Optional Text = Yes/No.
 */
export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  optional?: boolean;
}

export function Label({ className, optional = false, children, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "inline-flex flex-wrap items-center gap-[var(--spacing-1,4px)] text-[length:var(--text-md)] font-medium leading-[1.4] tracking-[-0.14px] text-[color:var(--foreground)]",
        className
      )}
      {...props}
    >
      {children}
      {optional && (
        <span className="font-normal italic leading-[1.16] text-[color:var(--foreground-base-muted)]">
          (Optional)
        </span>
      )}
    </label>
  );
}
