import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

const getStartedLinks = [
  { label: "Browse Components", href: "/docs/components/alert" },
  { label: "Foundations", href: "/docs/foundations/color" },
  { label: "Open in Figma", href: "#" },
];

export const metadata: Metadata = buildMetadata({
  title: "Introduction — Venstra Design System",
  description:
    "Get started with Venstra — a free Figma design system with 27 components, semantic tokens, and light/dark mode built for product designers.",
  path: "/docs/introduction",
});

export default function IntroductionPage() {
  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Introduction
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <div className="flex flex-col gap-4 text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      <p>
        Venstra is a free Figma design system built for product
        designers working on SaaS apps and dashboards. It includes 27
        components, a semantic token architecture, and full light and
        dark mode support.
      </p>
      <p>
        Every component is built on four token layers — Surface,
        Fill, Foreground, and Stroke — each with a clear rule for when
        and how it&apos;s used. No hardcoded colors, no guessing.
        <br />
        Venstra is actively maintained. New components and
        improvements are added regularly — check the Changelog to see
        what&apos;s new.
      </p>
    </div>

    <div className="flex w-full flex-col gap-5">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Get started
      </h2>
      <div className="flex w-full flex-col gap-3 sm:flex-row">
        {getStartedLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="flex flex-1 items-center justify-center gap-[6px] whitespace-nowrap rounded-md bg-overlay px-3 py-[10px] text-sm font-medium leading-[1.16] tracking-[-0.14px] text-[#0f0f0f] transition-colors hover:bg-[rgba(4,4,4,0.08)]"
          >
            {link.label}
            <ArrowRight size={16} />
          </Link>
        ))}
      </div>
    </div>
  </div>
    </>
  );
}
