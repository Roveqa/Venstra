import { readSvg } from "@/lib/inline-svg";
import { FigmaEmbed } from "@/components/figma-embed";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Dropdown — Venstra Design System",
  description:
    "A contextual menu that presents a list of actions or options below a trigger element.",
  path: "/docs/components/dropdown",
});

export default function DropdownPage() {
  const dropdownSvg = readSvg("components/dropdown-example.svg");

  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Dropdown
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      A contextual menu that appears below a trigger element and
      presents a list of actions or options. Closes when the user
      selects an item or clicks outside.
    </p>

    <FigmaEmbed nodeId="2014-1667" />

    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Example
      </h2>
      <div
        className="example-zoom [&_svg]:h-auto [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: dropdownSvg }}
      />
    </div>
  </div>
    </>
  );
}
