"use client";

import { cloneElement, isValidElement, useEffect, useRef, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function ScrollReveal3D({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLElement>(null);
  const targetRef = useRef(0);
  const smoothRef = useRef(0);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    let raf = 0;

    function computeTarget() {
      const rect = el!.getBoundingClientRect();
      const range = 500;
      const startAt = window.innerHeight * 0.55;
      const raw = (startAt - rect.top) / range;
      targetRef.current = clamp(raw, 0, 1);
    }

    function tick() {
      smoothRef.current += (targetRef.current - smoothRef.current) * 0.09;
      if (Math.abs(targetRef.current - smoothRef.current) < 0.0005) {
        smoothRef.current = targetRef.current;
      }
      setProgress(smoothRef.current);
      raf = requestAnimationFrame(tick);
    }

    function onScroll() {
      computeTarget();
    }

    computeTarget();
    smoothRef.current = targetRef.current;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!isValidElement(children)) return children;

  const props = children.props as { style?: React.CSSProperties };
  const eased = easeOutCubic(progress);

  const translateY = 20 * (1 - eased);
  const rotateX = 22 * (1 - eased);
  const scale = 0.8 + 0.2 * eased;
  const opacity = 0.55 + 0.45 * eased;

  return cloneElement(children, {
    ref,
    style: {
      ...props.style,
      opacity,
      transform: `perspective(1600px) rotateX(${rotateX}deg) translateY(${translateY}px) scale(${scale})`,
      transformOrigin: "top center",
      willChange: "opacity, transform",
    },
  } as Partial<unknown> & React.Attributes);
}
