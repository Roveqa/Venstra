"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { PlaygroundSidebar } from "@/components/playground-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Divider } from "@/components/ui/divider";
import { Label } from "@/components/ui/label";

const sections = ["Badge", "Button", "Kbd", "Divider", "Label"];

const buttonVariants = [
  { key: "fill", label: "Fill" },
  { key: "light", label: "Light" },
  { key: "outline", label: "Outline" },
  { key: "ghost", label: "Ghost" },
  { key: "link", label: "Link" },
] as const;

const buttonSizes = [
  { key: "lg", label: "Large" },
  { key: "md", label: "Medium" },
  { key: "sm", label: "Small" },
] as const;

const buttonIntents = [
  { key: "primary", label: "Primary" },
  { key: "neutral", label: "Neutral" },
  { key: "success", label: "Success" },
  { key: "warning", label: "Warning" },
  { key: "error", label: "Error" },
  { key: "info", label: "Info" },
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
    <div className="example-zoom flex w-full flex-col gap-10 rounded-2xl border border-stroke p-8 sm:p-10">
      {children}
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

            {active === "Badge" && (
              <ComponentSection>
                {badgeStyles.map((style) => (
                  <div key={style.key} className="flex w-full flex-col gap-6">
                    <GroupLabel>{style.label}</GroupLabel>
                    {badgeSizes.map((size) => (
                      <div key={size.key} className="flex flex-col gap-3">
                        <span className="text-[13px] text-ink-600">{size.label}</span>
                        <div className="flex flex-wrap items-center gap-3">
                          {badgeIntents.map((intent) => (
                            <Badge key={intent.key} variant={style.key} size={size.key} intent={intent.key}>
                              {intent.label}
                            </Badge>
                          ))}
                          <Badge variant={style.key} size={size.key} shape="number">
                            8
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </ComponentSection>
            )}

            {active === "Button" && (
              <ComponentSection>
                {buttonVariants.map((variant) => (
                  <div key={variant.key} className="flex w-full flex-col gap-6">
                    <GroupLabel>{variant.label}</GroupLabel>
                    {buttonSizes.map((size) => (
                      <div key={size.key} className="flex flex-col gap-3">
                        <span className="text-[13px] text-ink-600">{size.label}</span>
                        <div className="flex flex-wrap items-center gap-3">
                          {buttonIntents.map((intent) => (
                            <Button
                              key={intent.key}
                              variant={variant.key}
                              size={size.key}
                              intent={intent.key}
                            >
                              {intent.label}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="flex flex-col gap-3">
                      <span className="text-[13px] text-ink-600">State</span>
                      <div className="flex flex-wrap items-center gap-3">
                        <Button variant={variant.key} size="md" intent="primary">
                          Default
                        </Button>
                        <Button variant={variant.key} size="md" intent="primary" disabled>
                          Disabled
                        </Button>
                        <Button variant={variant.key} size="md" intent="primary" loading>
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
