"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BlurReveal } from "./blur-reveal";
import { DirectionalReveal } from "./directional-reveal";

function FigmaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2H8.5C7.57174 2 6.6815 2.36875 6.02513 3.02513C5.36875 3.6815 5 4.57174 5 5.5C5 6.42826 5.36875 7.3185 6.02513 7.97487C6.6815 8.63125 7.57174 9 8.5 9M12 2V9M12 2H15.5C15.9596 2 16.4148 2.09053 16.8394 2.26642C17.264 2.44231 17.6499 2.70012 17.9749 3.02513C18.2999 3.35013 18.5577 3.73597 18.7336 4.16061C18.9095 4.58525 19 5.04037 19 5.5C19 5.95963 18.9095 6.41475 18.7336 6.83939C18.5577 7.26403 18.2999 7.64987 17.9749 7.97487C17.6499 8.29988 17.264 8.55769 16.8394 8.73358C16.4148 8.90947 15.9596 9 15.5 9M12 9H8.5M12 9H15.5M12 9V16M8.5 9C7.57174 9 6.6815 9.36875 6.02513 10.0251C5.36875 10.6815 5 11.5717 5 12.5C5 13.4283 5.36875 14.3185 6.02513 14.9749C6.6815 15.6313 7.57174 16 8.5 16M15.5 9C15.0404 9 14.5852 9.09053 14.1606 9.26642C13.736 9.44231 13.3501 9.70012 13.0251 10.0251C12.7001 10.3501 12.4423 10.736 12.2664 11.1606C12.0905 11.5852 12 12.0404 12 12.5C12 12.9596 12.0905 13.4148 12.2664 13.8394C12.4423 14.264 12.7001 14.6499 13.0251 14.9749C13.3501 15.2999 13.736 15.5577 14.1606 15.7336C14.5852 15.9095 15.0404 16 15.5 16C15.9596 16 16.4148 15.9095 16.8394 15.7336C17.264 15.5577 17.6499 15.2999 17.9749 14.9749C18.2999 14.6499 18.5577 14.264 18.7336 13.8394C18.9095 13.4148 19 12.9596 19 12.5C19 12.0404 18.9095 11.5852 18.7336 11.1606C18.5577 10.736 18.2999 10.3501 17.9749 10.0251C17.6499 9.70012 17.264 9.44231 16.8394 9.26642C16.4148 9.09053 15.9596 9 15.5 9ZM8.5 16C7.57174 16 6.6815 16.3687 6.02513 17.0251C5.36875 17.6815 5 18.5717 5 19.5C5 20.4283 5.36875 21.3185 6.02513 21.9749C6.6815 22.6313 7.57174 23 8.5 23C9.42826 23 10.3185 22.6313 10.9749 21.9749C11.6313 21.3185 12 20.4283 12 19.5V16M8.5 16H12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CtaBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="flex w-full justify-center px-3 py-8 md:px-10 lg:py-16">
      <div
        ref={ref}
        className="relative flex aspect-[7/10] w-full max-w-[1222px] flex-col overflow-hidden rounded-xl p-8 sm:aspect-auto md:p-[52px] lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:h-[240px]"
        style={{
          background:
            "linear-gradient(-72.03deg, rgb(47,120,248) 0%, rgb(10,97,249) 100%)",
        }}
      >
        <DirectionalReveal direction="bottom-left" active={visible}>
          <Image
            src="/images/cta-shape-1.svg"
            alt=""
            width={228}
            height={183}
            className="pointer-events-none absolute left-[-71px] top-[168px] w-[239px] h-auto lg:left-[434px] lg:top-[119.9px] lg:w-[228px]"
          />
        </DirectionalReveal>
        <DirectionalReveal direction="top-right" delay={150} active={visible}>
          <Image
            src="/images/cta-shape-2.svg"
            alt=""
            width={188}
            height={185}
            className="pointer-events-none absolute bottom-[-26px] left-[193px] w-[191px] h-auto lg:bottom-[76.1px] lg:left-[707px] lg:w-[188px]"
          />
        </DirectionalReveal>

        {/* Mobile/tablet layout: heading + paragraph grouped at top, button pinned to bottom */}
        <div className="relative z-10 flex h-full w-full flex-col justify-between gap-10 lg:hidden">
          <div className="flex flex-col gap-3">
            <h2 className="text-[32px] font-medium leading-[1.08] tracking-[-1.92px] text-white">
              <BlurReveal active={visible} className="block" text="Code components are on the way" />
            </h2>
            <p className="text-[16px] leading-[1.25] tracking-[-0.48px] text-white/80">
              In the meantime, the full design system is available in Figma
            </p>
          </div>
          <Link
            href="#"
            className="flex w-full items-center justify-center gap-[6px] rounded-md bg-[#fefefe] px-5 py-3 text-sm font-medium tracking-[-0.14px] leading-[1.16] text-primary transition-opacity hover:opacity-90"
          >
            <FigmaIcon />
            Open in Figma
          </Link>
        </div>

        {/* Desktop layout: heading on the left, paragraph + button stacked on the right */}
        <h2 className="relative z-10 hidden max-w-[433px] text-3xl font-medium leading-[1.08] tracking-[-1.8px] text-white md:text-[48px] md:tracking-[-2.88px] lg:block">
          <BlurReveal active={visible} className="block" text="Code components are on the way" />
        </h2>

        <div
          className={`relative z-10 hidden flex-col items-start gap-[16px] transition-all duration-700 ease-out lg:flex ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <p className="max-w-[230px] text-[16px] leading-[1.25] tracking-[-0.48px] text-white/80">
            In the meantime, the full design system is available in Figma
          </p>
          <Link
            href="#"
            className="flex items-center gap-[6px] whitespace-nowrap rounded-md bg-[#fefefe] px-5 py-3 text-sm font-medium tracking-[-0.14px] leading-[1.16] text-primary transition-opacity hover:opacity-90"
          >
            <FigmaIcon />
            Open in Figma
          </Link>
        </div>
      </div>
    </section>
  );
}
