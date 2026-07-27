"use client";

import { cloneElement, isValidElement, useEffect, useRef, useState } from "react";

const directionTransforms: Record<string, string> = {
  left: "translate(-70px, 0)",
  right: "translate(70px, 0)",
  top: "translate(0, -70px)",
  bottom: "translate(0, 70px)",
  "top-left": "translate(-70px, -70px)",
  "top-right": "translate(70px, -70px)",
  "bottom-left": "translate(-70px, 70px)",
  "bottom-right": "translate(70px, 70px)",
};

export function DirectionalReveal({
  children,
  direction = "left",
  delay = 0,
  active,
}: {
  children: React.ReactElement;
  direction?:
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  delay?: number;
  active?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
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

  if (!isValidElement(children)) return children;

  const props = children.props as { className?: string; style?: React.CSSProperties };

  return cloneElement(children, {
    ref,
    className: `${props.className || ""} transition-all duration-700 ease-out`.trim(),
    style: {
      ...props.style,
      opacity: visible ? 1 : 0,
      transform: visible ? "translate(0, 0)" : directionTransforms[direction],
      transitionDelay: `${delay}ms`,
    },
  } as Partial<unknown> & React.Attributes);
}
