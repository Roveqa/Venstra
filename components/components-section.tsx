"use client";

import { useEffect, useRef, useState } from "react";
import { BlurReveal } from "./blur-reveal";

export function ComponentsSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: isDesktop ? "0px 0px -15% 0px" : "0px 0px -30% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="flex w-full flex-col items-center px-4 py-16 md:px-10 lg:px-[240px] lg:py-[200px]"
    >
      <h2 className="w-full text-center text-3xl font-medium !leading-[1.24] tracking-[-2px] text-ink-950 sm:text-4xl md:text-[60px] md:tracking-[-3.6px]">
        <BlurReveal
          active={visible}
          text="Everything you need. Nothing you don't. 34 components with full anatomy, all states, and semantic token bindings."
        />
      </h2>
    </section>
  );
}
