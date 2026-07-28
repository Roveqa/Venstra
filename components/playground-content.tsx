"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Header } from "@/components/header";
import { PlaygroundSidebar } from "@/components/playground-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Divider } from "@/components/ui/divider";
import { Label } from "@/components/ui/label";

const sections = ["Badge", "Button", "Kbd", "Divider", "Label"];

const buttonVariants = [
  { key: "primary", label: "Primary" },
  { key: "secondary", label: "Secondary" },
  { key: "outline", label: "Outline" },
  { key: "ghost", label: "Ghost" },
  { key: "destructive", label: "Destructive" },
  { key: "link", label: "Link" },
] as const;

const buttonSizes = [
  { key: "lg", label: "Large" },
  { key: "md", label: "Medium" },
  { key: "sm", label: "Small" },
] as const;

const badgeStyles = [
  { key: "fill", label: "Fill" },
  { key: "light", label: "Light" },
  { key: "ghost", label: "Ghost" },
] as const;

const badgeSizes = [
  { key: "medium", label: "Medium" },
  { key: "small", label: "Small" },
] as const;

const badgeIntents = [
  { key: "neutral", label: "Neutral" },
  { key: "success", label: "Success" },
  { key: "warning", label: "Warning" },
  { key: "error", label: "Error" },
  { key: "info", label: "Info" },
] as const;

const kbdVariants = [
  { key: "background", label: "Background" },
  { key: "outline", label: "Outline" },
  { key: "ghost", label: "Ghost" },
] as const;

const shortcuts = [
  ["⌘", "K"],
  ["⌘", "S"],
  ["⌘", "Z"],
];

const dividerVariants = [
  { key: "horizontal", label: "Horizontally" },
  { key: "or", label: "Or" },
  { key: "vertical", label: "Vertically" },
] as const;

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium uppercase tracking-[0.08em] text-ink-600">
      {children}
    </span>
  );
}

function ComponentSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="example-zoom flex w-full flex-col gap-10 rounded-2xl border border-stroke px-8 py-16 sm:px-10 sm:py-20">
      {children}
    </div>
  );
}

type WithAll<T extends string> = T | "all";
const ALL_OPTION = { key: "all", label: "All" } as const;

function PlaygroundSelect<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: WithAll<T>;
  onChange: (value: WithAll<T>) => void;
  options: readonly { key: T; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] text-ink-600">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as WithAll<T>)}
        className="rounded-lg bg-surface-subtle px-3 py-2 text-[14px] text-ink-950 outline-none transition-colors hover:bg-[var(--surface-subtle-hover)] focus-visible:bg-[var(--surface-subtle-hover)]"
      >
        <option value={ALL_OPTION.key}>{ALL_OPTION.label}</option>
        {options.map((o) => (
          <option key={o.key} value={o.key}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ControlBar({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-end justify-center gap-4">{children}</div>;
}

const NONE_OPTION = { key: "none", label: "None" } as const;
type DotIconValue = "none" | "left" | "right" | "both";
const dotIconOptions = [
  { key: "left", label: "Left" },
  { key: "right", label: "Right" },
  { key: "both", label: "Both" },
] as const;

function SimpleSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: DotIconValue;
  onChange: (value: DotIconValue) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] text-ink-600">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as DotIconValue)}
        className="rounded-lg bg-surface-subtle px-3 py-2 text-[14px] text-ink-950 outline-none transition-colors hover:bg-[var(--surface-subtle-hover)] focus-visible:bg-[var(--surface-subtle-hover)]"
      >
        <option value={NONE_OPTION.key}>{NONE_OPTION.label}</option>
        {dotIconOptions.map((o) => (
          <option key={o.key} value={o.key}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function BadgeDemo() {
  const [variant, setVariant] = useState<WithAll<(typeof badgeStyles)[number]["key"]>>("all");
  const [size, setSize] = useState<WithAll<(typeof badgeSizes)[number]["key"]>>("all");
  const [intent, setIntent] = useState<WithAll<(typeof badgeIntents)[number]["key"]>>("all");
  const [dot, setDot] = useState<DotIconValue>("none");
  const [icon, setIcon] = useState<DotIconValue>("none");

  const variants = variant === "all" ? badgeStyles : badgeStyles.filter((v) => v.key === variant);
  const sizes = size === "all" ? badgeSizes : badgeSizes.filter((s) => s.key === size);
  const intents = intent === "all" ? badgeIntents : badgeIntents.filter((i) => i.key === intent);

  const dotLeft = dot === "left" || dot === "both";
  const dotRight = dot === "right" || dot === "both";
  const iconLeft = icon === "left" || icon === "both";
  const iconRight = icon === "right" || icon === "both";

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <ControlBar>
        <PlaygroundSelect label="Style" value={variant} onChange={setVariant} options={badgeStyles} />
        <PlaygroundSelect label="Size" value={size} onChange={setSize} options={badgeSizes} />
        <PlaygroundSelect label="Type" value={intent} onChange={setIntent} options={badgeIntents} />
        <SimpleSelect label="Dot" value={dot} onChange={setDot} />
        <SimpleSelect label="Icon" value={icon} onChange={setIcon} />
      </ControlBar>

      <ComponentSection>
        {variants.map((v) => (
          <div key={v.key} className="flex w-full flex-col items-center gap-10 text-center">
            {sizes.map((s) => (
              <div key={s.key} className="flex flex-col items-center gap-3 text-center">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {intents.map((i) => (
                    <Badge
                      key={i.key}
                      variant={v.key}
                      size={s.key}
                      intent={i.key}
                      dotLeft={dotLeft}
                      dotRight={dotRight}
                      iconLeft={iconLeft ? <Check /> : undefined}
                      iconRight={iconRight ? <Check /> : undefined}
                    >
                      {i.label}
                    </Badge>
                  ))}
                  {intents.map((i) => (
                    <Badge key={`${i.key}-number`} variant={v.key} size={s.key} intent={i.key} shape="number">
                      8
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </ComponentSection>
    </div>
  );
}

export function PlaygroundContent() {
  const [active, setActive] = useState(sections[0]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <Header />

      <div className="flex w-full max-w-[1710px] items-start gap-[83px] px-4 pt-[140px] md:px-10 lg:px-[244px]">
        <PlaygroundSidebar active={active} onSelect={setActive} />

        <div className="flex w-full max-w-[900px] flex-col gap-16 pb-24">
          <div className="flex w-full flex-col gap-9">
            <div className="flex flex-col gap-2">
              <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
                Playground
              </h1>
              <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
                Internal component testing. Real production components from{" "}
                <code className="text-[14px]">components/ui</code>. Not linked anywhere on the
                site.
              </p>
            </div>
            <div className="h-px w-full bg-stroke" />
          </div>

          <div className="flex w-full flex-col gap-6">
            <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
              {active}
            </h2>

            {active === "Badge" && <BadgeDemo />}

            {active === "Button" && (
              <ComponentSection>
                {buttonVariants.map((variant) => (
                  <div key={variant.key} className="flex w-full flex-col gap-6">
                    <GroupLabel>{variant.label}</GroupLabel>
                    <div className="flex flex-col gap-4">
                      {buttonSizes.map((size) => (
                        <div key={size.key} className="flex items-center gap-3">
                          <span className="w-16 shrink-0 text-[13px] text-ink-600">
                            {size.label}
                          </span>
                          <Button variant={variant.key} size={size.key}>
                            Button
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-3 border-t border-stroke pt-4">
                      <span className="text-[13px] text-ink-600">State (Medium)</span>
                      <div className="flex flex-wrap items-center gap-3">
                        <Button variant={variant.key} size="md">
                          Default
                        </Button>
                        <Button variant={variant.key} size="md" disabled>
                          Disabled
                        </Button>
                        <Button variant={variant.key} size="md" loading>
                          Loading
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </ComponentSection>
            )}

            {active === "Kbd" && (
              <ComponentSection>
                {kbdVariants.map((variant) => (
                  <div key={variant.key} className="flex w-full flex-col gap-3">
                    <GroupLabel>{variant.label}</GroupLabel>
                    <div className="flex flex-wrap items-center gap-6">
                      {shortcuts.map(([mod, key]) => (
                        <div key={key} className="flex items-center gap-1">
                          <Kbd variant={variant.key}>{mod}</Kbd>
                          <Kbd variant={variant.key}>{key}</Kbd>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </ComponentSection>
            )}

            {active === "Divider" && (
              <ComponentSection>
                {dividerVariants.map((variant) => (
                  <div key={variant.key} className="flex w-full flex-col gap-3">
                    <GroupLabel>{variant.label}</GroupLabel>
                    {variant.key === "vertical" ? (
                      <div className="flex h-[80px] items-center justify-center">
                        <Divider variant="vertical" />
                      </div>
                    ) : (
                      <div className="max-w-[420px]">
                        <Divider variant={variant.key} />
                      </div>
                    )}
                  </div>
                ))}
              </ComponentSection>
            )}

            {active === "Label" && (
              <ComponentSection>
                <div className="flex w-full flex-col gap-6">
                  <GroupLabel>Default</GroupLabel>
                  <Label htmlFor="playground-label-default">Email address</Label>
                </div>
                <div className="flex w-full flex-col gap-6">
                  <GroupLabel>Optional</GroupLabel>
                  <Label htmlFor="playground-label-optional" optional>
                    Company name
                  </Label>
                </div>
              </ComponentSection>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
