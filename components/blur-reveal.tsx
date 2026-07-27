"use client";

import { useEffect, useRef, useState } from "react";

export function BlurReveal({
  text,
  className = "",
  stagger = 16,
  baseDelay = 0,
  active,
}: {
  text: string;
  className?: string;
  stagger?: number;
  baseDelay?: number;
  active?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [selfVisible, setSelfVisible] = useState(false);

  useEffect(() => {
    if (active !== undefined) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSelfVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [active]);

  const visible = active !== undefined ? active : selfVisible;
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <span ref={ref} className={className}>
      {words.map((word, wordIndex) => {
        const letters = Array.from(word);
        const wordSpan = (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {letters.map((char, i) => {
              const delay = baseDelay + charIndex * stagger;
              charIndex += 1;
              return (
                <span
                  key={i}
                  className="inline-block transition-[filter,opacity] duration-500 ease-out"
                  style={{
                    filter: visible ? "blur(0px)" : "blur(10px)",
                    opacity: visible ? 1 : 0,
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
        charIndex += 1;
        return (
          <span key={`w-${wordIndex}`}>
            {wordSpan}
            {wordIndex < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
}
