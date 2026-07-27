"use client";

import { cloneElement, isValidElement, useEffect, useRef, useState } from "react";

export function ScrollReveal({
  children,
  delay = 0,
}: {
  children: React.ReactElement;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
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

  if (!isValidElement(children)) return children;

  const props = children.props as { className?: string; style?: React.CSSProperties };
  const revealClass = `transition-all duration-700 ease-out ${
    visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-md"
  }`;

  return cloneElement(children, {
    ref,
    className: `${props.className || ""} ${revealClass}`.trim(),
    style: { ...props.style, transitionDelay: `${delay}ms` },
  } as Partial<unknown> & React.Attributes);
}
