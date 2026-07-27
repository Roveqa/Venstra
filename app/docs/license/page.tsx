import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
const canDo = [
  "Use Venstra in personal and commercial projects",
  "Modify components and tokens to fit your needs",
  "Share Venstra with your team",
  "Build products and ship them to clients",
];

const cannotDo = [
  "Resell Venstra as a standalone product",
  "Redistribute Venstra as your own design system",
  "Remove the copyright notice",
];

export const metadata: Metadata = buildMetadata({
  title: "License — Venstra Design System",
  description:
    "Venstra is free to use for personal and commercial projects under the MIT License. Read the full terms here.",
  path: "/docs/license",
});

export default function LicensePage() {
  return (
    <>
      <div className="flex w-full flex-col gap-9">
        <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
          License
        </h1>
        <div className="h-px w-full bg-stroke" />
      </div>

      <div className="flex w-full flex-col gap-12">
        <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
          Venstra is free and open for everyone to use.
        </p>

        <div className="flex w-full flex-col gap-9">
          <div className="flex w-full flex-col gap-3">
            <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
              What you can do:
            </h2>
            <ul className="flex list-disc flex-col gap-1 pl-5 text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
              {canDo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="flex w-full flex-col gap-3">
            <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
              What you cannot do:
            </h2>
            <ul className="flex list-disc flex-col gap-1 pl-5 text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
              {cannotDo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="flex w-full flex-col gap-3">
            <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
              MIT License
            </h2>
            <div className="flex flex-col gap-4 text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
              <p>Copyright © 2026 Venstra</p>
              <p>
                Permission is hereby granted, free of charge, to any person
                obtaining a copy of this design system and associated files,
                to use, copy, modify, merge, publish, and distribute it,
                subject to the following conditions:
              </p>
              <p>
                The above copyright notice and this permission notice shall
                be included in all copies or substantial portions of the
                work.
              </p>
              <p>
                The design system is provided &quot;as is&quot;, without
                warranty of any kind, express or implied, including but not
                limited to the warranties of merchantability, fitness for a
                particular purpose, and non-infringement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
