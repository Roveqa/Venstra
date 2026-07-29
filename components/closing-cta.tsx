import Image from "next/image";
import Link from "next/link";
import { BlurReveal } from "./blur-reveal";
import { ScrollReveal } from "./scroll-reveal";

export function ClosingCta() {
  return (
    <section className="flex w-full flex-col items-center gap-10 px-4 py-20 md:px-10 lg:py-[160px]">
      <ScrollReveal>
        <Image
          src="/images/logo-mark.svg"
          alt=""
          width={80}
          height={61}
          className="h-auto w-16 sm:w-20"
        />
      </ScrollReveal>

      <div className="flex max-w-[500px] flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-medium !leading-[1.08] tracking-[-2px] text-ink-950 sm:text-4xl md:text-[52px] md:tracking-[-3.12px]">
          <BlurReveal className="block" text="The design system built for real products" />
        </h2>
        <ScrollReveal delay={100}>
          <p className="max-w-[346px] text-[16px] leading-[1.25] tracking-[-0.48px] text-ink-600">
            Free, open, and built to last. Follow for updates and new releases.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={200}>
        <Link
          href="https://www.figma.com/community/file/1663641390734733429"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-[6px] rounded-md bg-primary px-5 py-3 text-sm font-medium tracking-[-0.14px] leading-[1.16] text-[#fefefe] transition-opacity hover:opacity-90"
        >
          <Image src="/images/figma-icon.svg" alt="" width={16} height={16} />
          Open in Figma
        </Link>
      </ScrollReveal>
    </section>
  );
}
