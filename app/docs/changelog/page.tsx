import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
const whatsIncluded = [
  "27 production-ready components",
  "Semantic token architecture — Surface, Fill, Foreground, Stroke",
  "Full light and dark mode support",
  "Built entirely with Figma Variables",
  "Free for personal and commercial use",
];

export const metadata: Metadata = buildMetadata({
  title: "Changelog — Venstra Design System",
  description:
    "All updates to Venstra listed by version. See what's new, what's improved, and what's coming next.",
  path: "/docs/changelog",
});

export default function ChangelogPage() {
  return (
    <>
      <div className="flex w-full flex-col gap-9">
        <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
          Changelog
        </h1>
        <div className="h-px w-full bg-stroke" />
      </div>

      <div className="flex w-full flex-col gap-12">
        <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
          All updates to Venstra, listed by version.
        </p>

        <div className="flex w-full flex-col gap-6">
          <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
            July 2026 — Venstra is live
          </h2>

          <div className="flex w-full flex-col gap-5">
            <div
              className="flex h-[400px] w-full items-center justify-center overflow-hidden rounded-2xl px-10 py-6"
              style={{
                backgroundImage:
                  "linear-gradient(-61.11deg, rgb(63, 130, 248) 0%, rgb(10, 97, 249) 100%)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Union.png"
                alt="Venstra"
                width={256}
                height={41}
              />
            </div>

            <div className="flex w-full flex-col gap-4 text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
              <p>
                Venstra is officially live. After months of building,
                refining, and testing, the first complete version of the
                design system is ready to use.
                <br />
                This release includes 27 production-ready components — from
                basic elements like Button and Input to more complex ones
                like Table, Select, and Dialog. Every component is built on a
                semantic token architecture with four layers — Surface, Fill,
                Foreground, and Stroke — giving you a consistent, predictable
                system instead of a pile of disconnected styles.
              </p>
              <p>
                Light and dark mode are supported from day one, powered
                entirely by Figma Variables. Switch themes with one click and
                every component updates instantly — no duplicate files, no
                manual overrides.
                <br />
                Venstra is free to use for personal and commercial projects,
                and it&apos;s just getting started. More components,
                refinements, and a future code version are already in the
                works.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3">
              <h3 className="text-[16px] font-semibold leading-[1.19] text-ink-950">
                What&apos;s included:
              </h3>
              <ul className="flex list-disc flex-col gap-1 pl-5 text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
                {whatsIncluded.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
