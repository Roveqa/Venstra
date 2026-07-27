"use client";

import { ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { docsItemHrefs, docsNavGroups, type DocsNavGroup } from "@/lib/docs-nav";

const groups: DocsNavGroup[] = docsNavGroups.map((group) =>
  group.label === "Components" ? { ...group, label: "All Components" } : group
);

function SidebarGroup({ group, activeItem }: { group: DocsNavGroup; activeItem: string }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex w-full flex-col gap-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between"
      >
        <span className="text-sm font-medium leading-[1.4] tracking-[-0.14px] text-ink-600">
          {group.label}
        </span>
        <ChevronUp
          size={16}
          className={`text-ink-600 transition-transform duration-200 ${open ? "" : "rotate-180"}`}
        />
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="flex min-h-0 flex-col gap-1 overflow-hidden">
          {group.items.map((item) => (
            <Link
              key={item}
              href={docsItemHrefs[item] || "#"}
              className={`rounded-md px-3 py-2 text-sm font-medium leading-[1.16] tracking-[-0.14px] text-[#0f0f0f] transition-colors ${
                item === activeItem ? "bg-overlay" : "hover:bg-overlay"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DocsSidebar() {
  const pathname = usePathname();
  const activeItem =
    Object.entries(docsItemHrefs).find(([, href]) => href === pathname)?.[0] ?? "";

  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLElement>(null);

  return (
    <div className="sticky top-[140px] hidden w-[228px] shrink-0 lg:block">
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-[var(--surface-low)] to-transparent transition-opacity duration-200 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        ref={scrollRef}
        onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 0)}
        className="scrollbar-hide flex max-h-[calc(100vh_-_140px)] w-full flex-col gap-5 overflow-y-auto pb-10"
      >
        {groups.map((group, i) => (
          <div key={group.label} className="flex flex-col gap-5">
            <SidebarGroup group={group} activeItem={activeItem} />
            {i < groups.length - 1 && <div className="h-px w-full bg-stroke" />}
          </div>
        ))}
      </aside>
    </div>
  );
}
