"use client";

import { useEffect, useState } from "react";
import { Check, Command } from "lucide-react";
import { Header } from "@/components/header";
import { PlaygroundSidebar } from "@/components/playground-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Divider } from "@/components/ui/divider";
import { Label } from "@/components/ui/label";
import { HintText } from "@/components/ui/hint-text";
import { Avatar, type AvatarSize } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Progress, type ProgressPercentPosition } from "@/components/ui/progress";

const sections = ["Avatar", "Badge", "Button", "Kbd", "Divider", "Label", "Progress"];

const avatarVariants = [
  { key: "text", label: "Text" },
  { key: "image", label: "Image" },
  { key: "icon", label: "Icon" },
] as const;

const avatarSizes = [
  { key: "14", label: "14" },
  { key: "16", label: "16" },
  { key: "24", label: "24" },
  { key: "32", label: "32" },
  { key: "40", label: "40" },
  { key: "48", label: "48" },
] as const;

const avatarBadgeStatuses = [
  { key: "none", label: "None" },
  { key: "neutral", label: "Neutral" },
  { key: "success", label: "Success" },
  { key: "warning", label: "Warning" },
  { key: "error", label: "Error" },
  { key: "info", label: "Info" },
] as const;

const progressPositions = [
  { key: "top", label: "Top" },
  { key: "right", label: "Right" },
] as const;

const progressHintVariants = [
  { key: "default", label: "Default" },
  { key: "error", label: "Error" },
] as const;

// The actual photo used in Figma's own Avatar Style=Image example
// (ComponentSet 1814:15928, node 1820:16638), downloaded and pre-cropped
// to a square centered on the face (source photo was a portrait shot,
// not square — plain object-fit:cover on the original would have shown
// the surrounding room since the image has no horizontal overflow to
// crop away).
const AVATAR_PLACEHOLDER_IMG = "/images/avatar-photo.png";

const buttonStyles = [
  { key: "fill", label: "Fill" },
  { key: "light", label: "Light" },
  { key: "outline", label: "Outline" },
  { key: "ghost", label: "Ghost" },
  { key: "link", label: "Link" },
] as const;

const buttonIntents = [
  { key: "primary", label: "Primary" },
  { key: "neutral", label: "Neutral" },
  { key: "success", label: "Success" },
  { key: "warning", label: "Warning" },
  { key: "error", label: "Error" },
  { key: "info", label: "Info" },
  { key: "primary-inverse", label: "Primary-inverse" },
  { key: "neutral-inverse", label: "Neutral-inverse" },
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

// The Command modifier goes through Kbd's icon slot, not as typed "⌘"
// text — Figma's anatomy renders it as an icon (squircle_12/14), same
// as any other modifier symbol would be.
const shortcuts = ["K", "S", "Z"];

const dividerVariants = [
  { key: "horizontal", label: "Horizontally" },
  { key: "or", label: "Or" },
  { key: "vertical", label: "Vertically" },
] as const;

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

type DotIconValue = "none" | "left" | "right" | "both";
const dotIconValues = [
  { key: "none", label: "None" },
  { key: "left", label: "Left" },
  { key: "right", label: "Right" },
  { key: "both", label: "Both" },
] as const;

const buttonStates = [
  { key: "default", label: "Default" },
  { key: "hover", label: "Hover" },
  { key: "active", label: "Active" },
  { key: "focus", label: "Focus" },
  { key: "disabled", label: "Disabled" },
  { key: "loading", label: "Loading" },
] as const;

// Maps a State option to the Button props that produce it. Hover/Active/
// Focus use `forceState` (rendered via a [data-force-state] CSS selector)
// since those are normally pointer/keyboard-only pseudo-classes.
function stateProps(state: (typeof buttonStates)[number]["key"]) {
  switch (state) {
    case "hover":
    case "active":
    case "focus":
      return { forceState: state } as const;
    case "disabled":
      return { disabled: true } as const;
    case "loading":
      return { loading: true } as const;
    default:
      return {} as const;
  }
}

// Like PlaygroundSelect but no built-in "All" option — for controls that
// aren't a matrix dimension (Dot/Icon/State are single toggles applied to
// every rendered instance, not exploded into rows).
function TinySelect<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: readonly { key: T; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] text-ink-600">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="rounded-lg bg-surface-subtle px-3 py-2 text-[14px] text-ink-950 outline-none transition-colors hover:bg-[var(--surface-subtle-hover)] focus-visible:bg-[var(--surface-subtle-hover)]"
      >
        {options.map((o) => (
          <option key={o.key} value={o.key}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function AvatarDemo() {
  const [variant, setVariant] = useState<WithAll<(typeof avatarVariants)[number]["key"]>>("text");
  const [size, setSize] = useState<WithAll<(typeof avatarSizes)[number]["key"]>>("40");
  const [dotBadge, setDotBadge] = useState(false);
  const [badgeStatus, setBadgeStatus] = useState<(typeof avatarBadgeStatuses)[number]["key"]>("none");
  const [badgeCount, setBadgeCount] = useState(8);

  const variants = variant === "all" ? avatarVariants : avatarVariants.filter((v) => v.key === variant);
  const sizes = size === "all" ? avatarSizes : avatarSizes.filter((s) => s.key === size);

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <ControlBar>
        <PlaygroundSelect label="Style" value={variant} onChange={setVariant} options={avatarVariants} />
        <PlaygroundSelect label="Size" value={size} onChange={setSize} options={avatarSizes} />
        <TinySelect label="Badge" value={badgeStatus} onChange={setBadgeStatus} options={avatarBadgeStatuses} />
        <label className="flex flex-col items-start gap-1.5">
          <span className="text-[13px] text-ink-600">Count</span>
          <input
            type="number"
            value={badgeCount}
            onChange={(e) => setBadgeCount(Number(e.target.value))}
            disabled={badgeStatus === "none"}
            className="w-16 rounded-lg bg-surface-subtle px-3 py-2 text-[14px] text-ink-950 outline-none transition-colors hover:bg-[var(--surface-subtle-hover)] disabled:opacity-40"
          />
        </label>
        <label className="flex flex-col items-start gap-1.5">
          <span className="text-[13px] text-ink-600">Dot</span>
          <input
            type="checkbox"
            checked={dotBadge}
            onChange={(e) => setDotBadge(e.target.checked)}
            className="h-4 w-4 shrink-0 cursor-pointer accent-primary"
          />
        </label>
      </ControlBar>

      <ComponentSection>
        {sizes.map((s) => (
          <div key={s.key} className="flex w-full flex-wrap items-center justify-center gap-6">
            {variants.map((v) => (
              <Avatar
                key={v.key}
                size={Number(s.key) as AvatarSize}
                variant={v.key}
                src={AVATAR_PLACEHOLDER_IMG}
                dotBadge={dotBadge}
                badge={badgeStatus === "none" ? undefined : badgeCount}
                badgeStatus={badgeStatus === "none" ? "neutral" : badgeStatus}
              >
                YB
              </Avatar>
            ))}
          </div>
        ))}

        <div className="flex w-full flex-col items-center gap-6">
          {sizes.map((s) => {
            const groupSize = Number(s.key) as AvatarSize;
            return (
              <AvatarGroup key={s.key} size={groupSize} max={3}>
                <Avatar size={groupSize} variant="text">
                  YB
                </Avatar>
                <Avatar size={groupSize} variant="image" src={AVATAR_PLACEHOLDER_IMG} />
                <Avatar size={groupSize} variant="icon" />
                <Avatar size={groupSize} variant="text">
                  AK
                </Avatar>
                <Avatar size={groupSize} variant="text">
                  MP
                </Avatar>
              </AvatarGroup>
            );
          })}
        </div>
      </ComponentSection>
    </div>
  );
}

function ProgressDemo() {
  const [position, setPosition] = useState<(typeof progressPositions)[number]["key"]>("top");
  const [value, setValue] = useState(50);
  const [showLabel, setShowLabel] = useState(true);
  const [labelOptional, setLabelOptional] = useState(true);
  const [showPercent, setShowPercent] = useState(true);
  const [hintVariant, setHintVariant] = useState<"none" | (typeof progressHintVariants)[number]["key"]>("default");

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <ControlBar>
        <TinySelect label="Position" value={position} onChange={setPosition} options={progressPositions} />
        <label className="flex flex-col items-start gap-1.5">
          <span className="text-[13px] text-ink-600">Value</span>
          <input
            type="number"
            min={0}
            max={100}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-16 rounded-lg bg-surface-subtle px-3 py-2 text-[14px] text-ink-950 outline-none transition-colors hover:bg-[var(--surface-subtle-hover)]"
          />
        </label>
        <TinySelect
          label="Hint"
          value={hintVariant}
          onChange={setHintVariant}
          options={[{ key: "none", label: "None" }, ...progressHintVariants]}
        />
        <label className="flex flex-col items-start gap-1.5">
          <span className="text-[13px] text-ink-600">Label</span>
          <input
            type="checkbox"
            checked={showLabel}
            onChange={(e) => setShowLabel(e.target.checked)}
            className="h-4 w-4 shrink-0 cursor-pointer accent-primary"
          />
        </label>
        <label className="flex flex-col items-start gap-1.5">
          <span className="text-[13px] text-ink-600">Optional</span>
          <input
            type="checkbox"
            checked={labelOptional}
            onChange={(e) => setLabelOptional(e.target.checked)}
            disabled={!showLabel}
            className="h-4 w-4 shrink-0 cursor-pointer accent-primary disabled:opacity-40"
          />
        </label>
        <label className="flex flex-col items-start gap-1.5">
          <span className="text-[13px] text-ink-600">Percent</span>
          <input
            type="checkbox"
            checked={showPercent}
            onChange={(e) => setShowPercent(e.target.checked)}
            className="h-4 w-4 shrink-0 cursor-pointer accent-primary"
          />
        </label>
      </ControlBar>

      <ComponentSection>
        <div className="mx-auto w-full max-w-[320px]">
          <Progress
            value={value}
            percentPosition={position as ProgressPercentPosition}
            label={showLabel ? "Uploading file" : undefined}
            labelOptional={labelOptional}
            showPercent={showPercent}
            hint={hintVariant === "none" ? undefined : hintVariant === "error" ? "Something went wrong" : "This may take a few minutes"}
            hintVariant={hintVariant === "error" ? "error" : "default"}
          />
        </div>
      </ComponentSection>
    </div>
  );
}

function BadgeDemo() {
  // Default to a single representative variant (Neutral/Primary, Medium)
  // rather than "All" — same convention for every future playground demo.
  const [variant, setVariant] = useState<WithAll<(typeof badgeStyles)[number]["key"]>>("fill");
  const [size, setSize] = useState<WithAll<(typeof badgeSizes)[number]["key"]>>("medium");
  const [intent, setIntent] = useState<WithAll<(typeof badgeIntents)[number]["key"]>>("neutral");
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
        <TinySelect label="Dot" value={dot} onChange={setDot} options={dotIconValues} />
        <TinySelect label="Icon" value={icon} onChange={setIcon} options={dotIconValues} />
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
                    <Badge key={`${i.key}-number`} variant={v.key} size={s.key} intent={i.key} type="number">
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

function ButtonDemo() {
  // Default to Fill/Primary/Medium/Default, not "All" — see feedback_playground_defaults.
  const [variant, setVariant] = useState<WithAll<(typeof buttonStyles)[number]["key"]>>("fill");
  const [intent, setIntent] = useState<WithAll<(typeof buttonIntents)[number]["key"]>>("primary");
  const [size, setSize] = useState<WithAll<(typeof buttonSizes)[number]["key"]>>("md");
  const [state, setState] = useState<WithAll<(typeof buttonStates)[number]["key"]>>("default");
  const [icon, setIcon] = useState<DotIconValue>("none");
  const [iconOnly, setIconOnly] = useState(false);

  const variants = variant === "all" ? buttonStyles : buttonStyles.filter((v) => v.key === variant);
  const intents = intent === "all" ? buttonIntents : buttonIntents.filter((i) => i.key === intent);
  const sizes = size === "all" ? buttonSizes : buttonSizes.filter((s) => s.key === size);
  const states = state === "all" ? buttonStates : buttonStates.filter((s) => s.key === state);

  const iconLeft = icon === "left" || icon === "both";
  const iconRight = icon === "right" || icon === "both";

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <ControlBar>
        <PlaygroundSelect label="Style" value={variant} onChange={setVariant} options={buttonStyles} />
        <PlaygroundSelect label="Type" value={intent} onChange={setIntent} options={buttonIntents} />
        <PlaygroundSelect label="Size" value={size} onChange={setSize} options={buttonSizes} />
        <PlaygroundSelect label="State" value={state} onChange={setState} options={buttonStates} />
        <TinySelect label="Icon" value={icon} onChange={setIcon} options={dotIconValues} />
        <label className="flex flex-col items-start gap-1.5">
          <span className="text-[13px] text-ink-600">Icon only</span>
          <input
            type="checkbox"
            checked={iconOnly}
            onChange={(e) => setIconOnly(e.target.checked)}
            className="h-4 w-4 shrink-0 cursor-pointer accent-primary"
          />
        </label>
      </ControlBar>

      {/* One row per Style, stacked in a column — keeps Fill/Outline/etc.
          from wrapping together into one jumbled line. */}
      <ComponentSection>
        {variants.map((v) => (
          <div key={v.key} className="flex flex-wrap items-center justify-center gap-3">
            {intents.map((i) =>
              sizes.map((s) =>
                states.map((st) => {
                  const key = `${v.key}-${i.key}-${s.key}-${st.key}`;
                  const button = iconOnly ? (
                    <Button
                      variant={v.key}
                      intent={i.key}
                      size={s.key}
                      iconOnly={<Check />}
                      aria-label="Button"
                      {...stateProps(st.key)}
                    />
                  ) : (
                    <Button
                      variant={v.key}
                      intent={i.key}
                      size={s.key}
                      leftIcon={iconLeft ? <Check /> : undefined}
                      rightIcon={iconRight ? <Check /> : undefined}
                      {...stateProps(st.key)}
                    >
                      Button
                    </Button>
                  );

                  // -inverse intents are designed to sit on an already-dark
                  // surface — their Fill is near-white, so on the white
                  // playground background they'd otherwise render as
                  // invisible/ghost-looking. Give them a dark backdrop so
                  // they're actually legible here.
                  const isInverse = i.key === "primary-inverse" || i.key === "neutral-inverse";
                  return isInverse ? (
                    <div
                      key={key}
                      className="flex items-center justify-center rounded-[10px] bg-[var(--surface-inverse)] p-3"
                    >
                      {button}
                    </div>
                  ) : (
                    <div key={key} className="flex items-center justify-center">
                      {button}
                    </div>
                  );
                })
              )
            )}
          </div>
        ))}
      </ComponentSection>
    </div>
  );
}

function KbdDemo() {
  const [showIcon, setShowIcon] = useState(false);

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <ControlBar>
        <label className="flex flex-col items-start gap-1.5">
          <span className="text-[13px] text-ink-600">Icon</span>
          <input
            type="checkbox"
            checked={showIcon}
            onChange={(e) => setShowIcon(e.target.checked)}
            className="h-4 w-4 shrink-0 cursor-pointer accent-primary"
          />
        </label>
      </ControlBar>

      <ComponentSection>
        {kbdVariants.map((variant) => (
          <div key={variant.key} className="flex w-full flex-col items-center gap-3 text-center">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {shortcuts.map((key) => (
                <Kbd key={key} variant={variant.key} icon={showIcon ? <Command /> : undefined}>
                  {key}
                </Kbd>
              ))}
            </div>
          </div>
        ))}
      </ComponentSection>
    </div>
  );
}

const ACTIVE_TAB_STORAGE_KEY = "playground-active-tab";

export function PlaygroundContent() {
  const [active, setActive] = useState(sections[0]);

  // Restore the last-viewed tab after mount (not during the initial render,
  // to avoid a server/client hydration mismatch — SSR has no localStorage).
  useEffect(() => {
    const stored = localStorage.getItem(ACTIVE_TAB_STORAGE_KEY);
    if (stored && sections.includes(stored)) setActive(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem(ACTIVE_TAB_STORAGE_KEY, active);
  }, [active]);

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

            {active === "Avatar" && <AvatarDemo />}

            {active === "Progress" && <ProgressDemo />}

            {active === "Badge" && <BadgeDemo />}

            {active === "Button" && <ButtonDemo />}

            {active === "Kbd" && <KbdDemo />}

            {active === "Divider" && (
              <ComponentSection>
                {dividerVariants.map((variant) =>
                  variant.key === "vertical" ? (
                    <div key={variant.key} className="flex h-[80px] w-full items-center justify-center">
                      <Divider variant="vertical" />
                    </div>
                  ) : (
                    <div key={variant.key} className="flex w-full justify-center">
                      <div className="w-full max-w-[420px]">
                        <Divider variant={variant.key} />
                      </div>
                    </div>
                  )
                )}
              </ComponentSection>
            )}

            {active === "Label" && (
              <ComponentSection>
                <div className="flex w-full flex-col items-center gap-6">
                  <Label htmlFor="playground-label-default">Email address</Label>
                </div>
                <div className="flex w-full flex-col items-center gap-6">
                  <Label htmlFor="playground-label-optional" optional>
                    Company name
                  </Label>
                </div>
                <div className="flex w-full flex-col items-center gap-6">
                  <HintText>Hint text</HintText>
                </div>
                <div className="flex w-full flex-col items-center gap-6">
                  <HintText variant="error">Hint text</HintText>
                </div>
              </ComponentSection>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
