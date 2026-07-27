import { readSvg } from "@/lib/inline-svg";
import { FigmaEmbed } from "@/components/figma-embed";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

const sections = [
  { label: "Primary", file: "button-primary.svg" },
  { label: "Neutral", file: "button-neutral.svg" },
  { label: "Error", file: "button-error.svg" },
  { label: "Success", file: "button-success.svg" },
  { label: "Warning", file: "button-warning.svg" },
  { label: "Info", file: "button-info.svg" },
];

export const metadata: Metadata = buildMetadata({
  title: "Button — Venstra Design System",
  description:
    "The primary interactive element for triggering actions. Available in multiple styles, sizes, and states.",
  path: "/docs/components/button",
});

export default function ButtonPage() {
  const svgs = sections.map((s) => readSvg(`components/${s.file}`));

  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Button
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      The primary interactive element for triggering actions.
      Available in multiple styles, sizes, and states to cover every
      use case.
    </p>

    <FigmaEmbed nodeId="1-11" />

    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Example
      </h2>
      <div className="flex w-full flex-col gap-12">
        {sections.map((s, i) => (
          <div key={s.label} className="flex w-full flex-col gap-3">
            <h3 className="text-[16px] font-medium tracking-[-0.48px] text-ink-950">
              {s.label}
            </h3>
            <div
              className="example-zoom [&_svg]:h-auto [&_svg]:w-full"
              dangerouslySetInnerHTML={{ __html: svgs[i] }}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
    </>
  );
}
