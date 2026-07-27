"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { BlurReveal } from "./blur-reveal";
import { ScrollReveal } from "./scroll-reveal";

const questions = [
  {
    q: "What is Venstra?",
    a: "Venstra is a free Figma design system with 27 components, semantic tokens, and light/dark mode — built for product designers who care about consistency.",
  },
  {
    q: "Is Venstra really free?",
    a: "Yes, completely. Open the Figma file, duplicate it, and start using it right away — no payment required. You get access to all 27 components, semantic tokens, light and dark mode, and all future updates at no cost.",
  },
  {
    q: "Do I need a paid Figma account?",
    a: "No. Venstra works with any Figma plan, including the free tier. You can duplicate the file, use all components, and publish the library to your team without any restrictions.",
  },
  {
    q: "Can I use Venstra in commercial projects?",
    a: "Yes, without any restrictions. Venstra is free for both personal and commercial use. The only restriction is that you cannot resell Venstra itself or redistribute it as your own design system.",
  },
  {
    q: "Will there be updates?",
    a: "Yes — Venstra is actively maintained and will receive regular updates. New components, improvements, and bug fixes will be added over time. All updates are free and available in the same Figma file.",
  },
  {
    q: "Will there be a code version?",
    a: "Yes — a React component library based on Venstra is currently in development. You'll be able to install components with a single command and own the code completely.",
  },
  {
    q: "What is the difference between a UI kit and a design system?",
    a: "A UI kit is just visual assets. A design system includes logic — tokens, rules, states, and guidelines that explain how and why components work. Venstra is a design system, not just a UI kit — every component has a reason, and every color has a rule.",
  },
  {
    q: "How do I install a Figma design system?",
    a: "Open the Venstra Figma file and click Duplicate to your drafts. Once duplicated, go to Assets, publish it as a library, and connect it to any project file — all 27 components will be available instantly.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="flex w-full flex-col items-center gap-[48px] px-4 pt-24 pb-16 md:px-10 md:py-16 md:gap-[60px] lg:px-[207px] lg:py-[120px]">
      <h2 className="text-center text-3xl font-medium leading-[1.24] tracking-[-1.8px] text-ink-950 md:text-[48px] md:tracking-[-2.88px]">
        <BlurReveal className="block" text="Frequently asked questions" />
      </h2>

      <div className="flex w-full max-w-[808px] flex-col gap-[8px]">
        {questions.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <ScrollReveal key={item.q} delay={Math.min(index, 5) * 60}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full flex-col rounded-2xl bg-surface-subtle p-6 text-left md:p-8"
              >
                <div className="flex w-full items-center justify-between gap-10">
                  <span className="text-[16px] font-medium leading-[1.32] tracking-[-0.48px] text-ink-950 md:text-[18px] md:tracking-[-0.54px]">
                    {item.q}
                  </span>
                  <Plus
                    size={24}
                    strokeWidth={2}
                    className={`shrink-0 text-[#b3b3b3] transition-transform duration-300 ${
                      isOpen ? "-rotate-45" : ""
                    }`}
                  />
                </div>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="pt-[16px] text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
                      {item.a}
                    </p>
                  </div>
                </div>
              </button>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
