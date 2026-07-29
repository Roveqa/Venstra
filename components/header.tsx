"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { docsItemHrefs, docsNavGroups } from "@/lib/docs-nav";
import { Logo } from "./logo";

const navLinks = ["Components", "Foundations", "Changelog", "Docs"];
const navHrefs: Record<string, string> = {
  Components: "/docs/components/alert",
  Foundations: "/docs/foundations/color",
  Changelog: "/docs/changelog",
  Docs: "/docs/introduction",
};

function MobileNavGroup({ label, items, onNavigate }: { label: string; items: string[]; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full flex-col">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4"
      >
        <span className="text-lg font-semibold tracking-[-0.14px] text-ink-950">{label}</span>
        {open ? (
          <ChevronDown size={20} className="text-ink-950" />
        ) : (
          <ChevronRight size={20} className="text-ink-950" />
        )}
      </button>

      <div
        className="overflow-hidden transition-[max-height] duration-200 ease-out"
        style={{ maxHeight: open ? 999 : 0 }}
      >
        <div className="flex flex-col gap-6 pb-4 pl-6 pt-3">
          {items.map((item) => (
            <Link
              key={item}
              href={docsItemHrefs[item] || "#"}
              onClick={onNavigate}
              className="text-sm font-medium tracking-[-0.14px] text-ink-700"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <header className="fixed inset-x-0 top-0 z-50 w-full bg-[var(--header-bg)] backdrop-blur-header">
        <div className="mx-auto flex w-full max-w-[1710px] items-center justify-between px-4 py-4 md:px-10 lg:px-[244px]">
          <Link href="/" aria-label="Venstra home">
            <Logo />
          </Link>

          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-3 lg:flex">
              {navLinks.map((label) => (
                <Link
                  key={label}
                  href={navHrefs[label] || "#"}
                  className="shrink-0 whitespace-nowrap rounded-md px-3 py-[10px] text-sm font-medium tracking-[-0.14px] leading-[1.16] text-ink-950 transition-colors hover:bg-overlay"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <Link
              href="https://www.figma.com/community/file/1663641390734733429"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden shrink-0 items-center gap-[6px] whitespace-nowrap rounded-md bg-primary px-3 py-[10px] text-sm font-medium tracking-[-0.14px] leading-[1.16] text-[#fefefe] transition-opacity hover:opacity-90 lg:flex"
            >
              <Image src="/images/figma-icon.svg" alt="" width={16} height={16} />
              <span className="hidden sm:inline">Open in Figma</span>
            </Link>

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="flex h-9 w-11 items-center justify-center text-ink-950 lg:hidden"
            >
              <svg width="44" height="18" viewBox="0 0 44 18" fill="none">
                <path d="M0 0.5H44M0 17.5H44" stroke="currentColor" strokeWidth="1" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] flex w-full flex-col bg-[var(--surface-low)] transition-transform duration-300 ease-out lg:hidden ${
          menuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between px-4 py-4">
          <Link href="/" aria-label="Venstra home" onClick={() => setMenuOpen(false)}>
            <Logo />
          </Link>

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="flex h-9 w-11 items-center justify-center text-ink-950"
          >
            <svg width="44" height="18" viewBox="0 0 44 18" fill="none">
              <path d="M0 0.5L44 17.5M44 0.5L0 17.5" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-8 pb-10 pt-8">
          {docsNavGroups.map((group) => (
            <MobileNavGroup
              key={group.label}
              label={group.label}
              items={group.items}
              onNavigate={() => setMenuOpen(false)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
