import { type VariantProps, cva } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Source: Figma "Badge" component set (r2dbmly2FCs307sePH1Z9C, page 903:5385).
 * Status × Style × Size variants — Content=Number uses the `shape="number"` prop.
 *
 * "Badge master" (node 887:4424) also exposes Dot left/right and Icon
 * left/right boolean properties (`dotLeft`/`dotRight`/`iconLeft`/`iconRight`
 * below) plus Avatar left/right, which aren't implemented here.
 */
const badgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[var(--radius-full)] font-normal",
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
        small: "text-[length:var(--text-xs)] tracking-[-0.2px]",
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
      // Outer padding — node 1801:1598 (Medium Text) and 1802:1600 (Medium
      // Number) both use p-[4px] on the outer element. Node 1802:14198
      // (Small Text): px-[4px] py-[2px]. Node 1802:14228 (Small Number):
      // h-[18px] min-w-[18px] px-[4px], no vertical padding (the fixed
      // height already gives it the right size). The extra ~4px of space
      // around the text itself comes from the "label" wrapper below, not
      // from here — that's what keeps a gap between icon/dot and text.
      { size: "medium", shape: "text", class: "p-[4px]" },
      { size: "small", shape: "text", class: "px-[4px] py-[2px]" },
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

// node 1538:8024 / 1538:8087 (Dot Left / Dot Right): a 4px circle centered
// in a 10x16 box, hugging the text side (justify-end on the left, justify-
// start on the right) — currentColor so it always matches the label text.
function BadgeDot({ side }: { side: "left" | "right" }) {
  return (
    <span
      className={cn(
        "flex h-[16px] w-[10px] shrink-0 items-center",
        side === "left" ? "justify-end" : "justify-start"
      )}
    >
      <span className="size-[4px] rounded-full bg-current" />
    </span>
  );
}

// node 865:6939 (text) + its child <p>: Figma wraps the label text in a
// styling span with leading-[0] (collapses the wrapper's own line-box so
// it doesn't add extra height), then applies the real line-height on the
// text itself — token-leading-compact (1.16) for Medium, token-leading-
// relaxed (1.4) for Small.
function BadgeText({
  size,
  children,
}: {
  size: BadgeProps["size"];
  children: React.ReactNode;
}) {
  return (
    <span className="flex flex-col justify-center leading-[0]">
      <span className={size === "small" ? "token-leading-relaxed" : "token-leading-compact"}>
        {children}
      </span>
    </span>
  );
}

// node 1538:8175 / 1538:8242 (Icon Left / Icon Right): 14px icon slot with
// 2px of padding on the outer side only (none between the icon and text).
function BadgeIcon({ side, children }: { side: "left" | "right"; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center [&_svg]:size-[14px]",
        side === "left" ? "pl-[2px]" : "pr-[2px]"
      )}
    >
      {children}
    </span>
  );
}

export interface BadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof badgeVariants> {
  children?: React.ReactNode;
  dotLeft?: boolean;
  dotRight?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export function Badge({
  className,
  intent,
  variant,
  size,
  shape = "text",
  dotLeft,
  dotRight,
  iconLeft,
  iconRight,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ intent, variant, size, shape }), className)} {...props}>
      {iconLeft && <BadgeIcon side="left">{iconLeft}</BadgeIcon>}
      {dotLeft && <BadgeDot side="left" />}
      {shape === "number" ? (
        <BadgeText size={size}>{children}</BadgeText>
      ) : (
        // node 1538:7950 "label": px-[4px] on its own, on top of the outer
        // padding — this is the gap between icon/dot and the text.
        <span className="flex shrink-0 items-center justify-center px-[4px]">
          <BadgeText size={size}>{children}</BadgeText>
        </span>
      )}
      {dotRight && <BadgeDot side="right" />}
      {iconRight && <BadgeIcon side="right">{iconRight}</BadgeIcon>}
    </span>
  );
}
