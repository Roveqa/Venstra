import fs from "node:fs";
import path from "node:path";
import { LightDarkSlider } from "@/components/light-dark-slider";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

function readMockupSvg(filename: string) {
  const svg = fs.readFileSync(
    path.join(process.cwd(), "public", "images", filename),
    "utf8"
  );
  return svg.replace(/ filter="url\(#filter0_d_[^)]*\)"/, "");
}

export const metadata: Metadata = buildMetadata({
  title: "Theming — Venstra Design System",
  description:
    "Venstra supports light and dark mode out of the box using Figma Variables. Switch themes with one click — no duplicate files, no manual overrides.",
  path: "/docs/theming",
});

export default function ThemingPage() {
  const lightSvg = readMockupSvg("dashboard-mockup-light.svg");
  const darkSvg = readMockupSvg("dashboard-mockup-dark.svg");

  return (
    <>
      <div className="flex w-full flex-col gap-9">
        <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
          Theming
        </h1>
        <div className="h-px w-full bg-stroke" />
      </div>

      <div className="flex w-full flex-col gap-12">
        <LightDarkSlider lightSvg={lightSvg} darkSvg={darkSvg} />

        <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
          Venstra supports light and dark mode out of the box, powered by
          Figma Variables. Every component is connected to the token system —
          not hardcoded colors. Switching modes updates every Surface, Fill,
          Foreground, and Stroke value at once, across the entire file.
        </p>

        <div className="flex w-full flex-col gap-3">
          <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
            How to switch
          </h2>
          <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
            Open the Variables panel, select the Venstra collection, and
            toggle between Light and Dark mode. The change applies instantly
            to every component using the system. No duplicate components. No
            manual overrides. One system, two themes.
          </p>
        </div>
      </div>
    </>
  );
}
