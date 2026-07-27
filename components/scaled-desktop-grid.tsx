"use client";

import { useEffect, useRef, useState } from "react";

const NATURAL_WIDTH = 1221;

export function ScaledDesktopGrid({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    function update() {
      const s = Math.min(1, outer!.clientWidth / NATURAL_WIDTH);
      setScale(s);
      setHeight(inner!.offsetHeight * s);
    }

    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outerRef} className="relative w-full" style={{ height }}>
      <div
        ref={innerRef}
        className="absolute left-1/2 top-0"
        style={{
          width: NATURAL_WIDTH,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
