import Link from "next/link";
import { Logo } from "./logo";

const columns = [
  { heading: "Docs", links: ["Introduction", "Theming", "Changelog"] },
  {
    heading: "Foundations",
    links: ["Colors", "Typography", "Spacing", "Border Radius", "Effects"],
  },
  { heading: "Quick links", links: ["Browse Components", "Open in Figma"] },
  { heading: "Legal", links: ["License"] },
];

const linkHrefs: Record<string, string> = {
  Introduction: "/docs/introduction",
  Theming: "/docs/theming",
  Changelog: "/docs/changelog",
  Colors: "/docs/foundations/color",
  Typography: "/docs/foundations/typography",
  Spacing: "/docs/foundations/spacing",
  "Border Radius": "/docs/foundations/border-radius",
  Effects: "/docs/foundations/effects",
  "Browse Components": "/docs/components/alert",
  License: "/docs/license",
};

const columnWidths = ["lg:w-[228px]", "lg:w-[228px]", "lg:w-[229px]", "lg:w-[104px]"];

export function Footer() {
  return (
    <footer className="w-full border-t border-stroke px-4 pb-7 pt-12 md:px-10 md:pb-16 lg:px-[244px] lg:py-[60px]">
      <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex shrink-0 flex-col items-start gap-3">
          <Logo />
          <div className="flex flex-col items-start gap-2">
            <a
              href="https://www.behance.net/YanBogdanov"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap text-[16px] leading-[1.25] tracking-[-0.48px] text-ink-700 transition-colors hover:text-ink-950"
            >
              Made by Yan Bogdanov
            </a>
            <span className="whitespace-nowrap text-[16px] leading-[1.25] tracking-[-0.48px] text-ink-700 opacity-40">
              Copyright © 2026 Venstra
            </span>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:flex lg:w-auto lg:grid-cols-none lg:items-start lg:gap-[20px]">
          {columns.map((column, i) => (
            <div
              key={column.heading}
              className={`flex flex-col items-start gap-3 ${columnWidths[i]}`}
            >
              <span className="text-[16px] font-medium leading-[1.25] tracking-[-0.48px] text-ink-950">
                {column.heading}
              </span>
              <ul className="flex flex-col items-start gap-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href={linkHrefs[link] || "#"}
                      className="text-[16px] leading-[1.25] tracking-[-0.48px] text-ink-700 transition-colors hover:text-ink-950"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
