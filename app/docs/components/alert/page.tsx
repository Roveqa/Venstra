import { FigmaEmbed } from "@/components/figma-embed";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Alert — Venstra Design System",
  description:
    "A short, important message that communicates status, feedback, or system information without interrupting the current flow.",
  path: "/docs/components/alert",
});

export default function AlertPage() {
  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Alert
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      Displays a short, important message to the user. Used to
      communicate status, feedback, or system information without
      interrupting the current flow.
    </p>

    <FigmaEmbed nodeId="2060-23628" />

    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Example
      </h2>
      <div className="example-zoom flex w-full items-center justify-center rounded-2xl border border-stroke px-10 py-20">
        <div className="flex w-full max-w-[400px] flex-col items-start gap-[10px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/components/alert-success.svg"
            alt="Success alert"
            width={400}
            height={56}
            className="h-auto w-full"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/components/alert-warning.svg"
            alt="Warning alert"
            width={400}
            height={56}
            className="h-auto w-full"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/components/alert-error.svg"
            alt="Error alert"
            width={400}
            height={56}
            className="h-auto w-full"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/components/alert-info.svg"
            alt="Info alert"
            width={400}
            height={56}
            className="h-auto w-full"
          />
        </div>
      </div>
    </div>
  </div>
    </>
  );
}
