import { readSvg } from "@/lib/inline-svg";
import { FigmaEmbed } from "@/components/figma-embed";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Alert Dialog — Venstra Design System",
  description:
    "A modal dialog that interrupts the user and requires a response. Used for confirmations that cannot be undone.",
  path: "/docs/components/alert-dialog",
});

export default function AlertDialogPage() {
  const alertDialogSvg = readSvg("components/alert-dialog-example.svg");

  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Alert Dialog
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      A modal dialog that interrupts the user and requires a response
      before continuing. Used for confirmations that cannot be undone
      or actions with significant consequences.
    </p>

    <FigmaEmbed nodeId="2060-23629" />

    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Example
      </h2>
      <div
        className="example-zoom flex w-full items-center justify-center rounded-2xl border border-stroke px-10 py-20 [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-[452px]"
        dangerouslySetInnerHTML={{ __html: alertDialogSvg }}
      />
    </div>
  </div>
    </>
  );
}
