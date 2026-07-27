"use client";

import { useEffect, useRef, useState } from "react";

export function UnderlineTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: readonly string[];
  active: string;
  onChange: (tab: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeEl = container.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (activeEl) {
      setIndicator({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
    }
  }, [active]);

  return (
    <div ref={containerRef} className="relative flex w-fit items-center gap-1 rounded-lg p-[2px]">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          data-tab={tab}
          onClick={() => onChange(tab)}
          className={`px-2 py-[6px] text-sm font-medium leading-[20px] tracking-[-0.14px] transition-colors ${
            active === tab ? "text-ink-950" : "text-ink-600"
          }`}
        >
          {tab}
        </button>
      ))}
      {indicator && (
        <div
          className="pointer-events-none absolute bottom-[2px] h-[1px] bg-[#040404] transition-[left,width] duration-200 ease-out"
          style={{ left: indicator.left, width: indicator.width }}
        />
      )}
    </div>
  );
}
