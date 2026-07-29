import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { BlurReveal } from "./blur-reveal";
import { HeroMockupReveal } from "./hero-mockup-reveal";
import { ScaledDesktopGrid } from "./scaled-desktop-grid";
import { ScrollReveal } from "./scroll-reveal";

function readMockupSvg(filename: string, className?: string) {
  const svg = fs.readFileSync(
    path.join(process.cwd(), "public", "images", "mockup", filename),
    "utf8"
  );
  return className ? svg.replace("<svg ", `<svg class="${className}" `) : svg;
}

export function Hero() {
  return (
    <section className="flex w-full flex-col items-center gap-[20px] px-4 pb-16 pt-[160px] md:px-10 md:pb-0 lg:px-[120px]">
      <ScrollReveal>
        <p className="w-full max-w-[376px] text-[16px] font-semibold tracking-[-0.48px] leading-[1.25] text-primary text-center">
          Venstra 1.0 is live!
        </p>
      </ScrollReveal>

      <div className="flex flex-col items-center gap-[28px]">
        <div className="flex flex-col items-center gap-[16px]">
          <h1 className="max-w-[760px] text-center text-4xl font-semibold leading-[1.08] tracking-[-1.2px] text-ink-950 sm:text-5xl md:text-[64px] md:tracking-[-1.92px]">
            <BlurReveal
              className="block"
              text="The design system built for real products"
            />
          </h1>

          <ScrollReveal delay={100}>
            <p className="w-full max-w-[376px] text-center text-[16px] leading-[1.25] tracking-[-0.48px] text-ink-600">
              Components that connect. Tokens that make sense. Themes that
              just work
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200}>
          <div className="flex items-center gap-[8px]">
            <Link
              href="https://www.figma.com/community/file/1663641390734733429"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[6px] rounded-md bg-primary px-5 py-3 text-sm font-medium tracking-[-0.14px] leading-[1.16] text-[#fefefe] transition-opacity hover:opacity-90"
            >
              <Image src="/images/figma-icon.svg" alt="" width={16} height={16} />
              Open in Figma
            </Link>
            <Link
              href="/docs/components/alert"
              className="rounded-md bg-overlay px-5 py-3 text-sm font-medium tracking-[-0.14px] leading-[1.16] text-ink-950 transition-colors hover:bg-[rgba(4,4,4,0.08)]"
            >
              View components
            </Link>
          </div>
        </ScrollReveal>
      </div>

      <HeroMockupReveal>
      <div className="mt-20 w-full max-w-[1221px]">
        <ScaledDesktopGrid>
          <div className="relative">
            <div className="flex w-full items-start gap-[20px]">
              <div
                className="hero-mockup-col flex-[352] shrink-0 flex flex-col gap-[20px]"
                dangerouslySetInnerHTML={{
                  __html: [
                    "01-invite-member.svg",
                    "02-avatar-stack.svg",
                    "03-profile-public.svg",
                    "Tabs.svg",
                    "04-startup-radio.svg",
                  ]
                    .map((name) => readMockupSvg(name))
                    .join(""),
                }}
              />
              <div
                className="hero-mockup-col flex-[476] shrink-0 flex flex-col gap-[20px]"
                dangerouslySetInnerHTML={{
                  __html: [
                    readMockupSvg("05-table.svg"),
                    readMockupSvg("06-budget-dialog.svg"),
                    readMockupSvg("Breadcrumb.svg"),
                    readMockupSvg("07-publish-dialog.svg", "no-shadow"),
                  ].join(""),
                }}
              />
              <div
                className="hero-mockup-col flex-[353] shrink-0 flex flex-col gap-[20px]"
                dangerouslySetInnerHTML={{
                  __html: [
                    "08-typography.svg",
                    "09-callback-form.svg",
                    "10-notifications.svg",
                  ]
                    .map((name) => readMockupSvg(name))
                    .join(""),
                }}
              />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[var(--surface-low)] md:h-[260px]" />
          </div>
        </ScaledDesktopGrid>
      </div>
      </HeroMockupReveal>
    </section>
  );
}
