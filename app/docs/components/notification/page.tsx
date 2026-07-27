import { readSvg } from "@/lib/inline-svg";
import { FigmaEmbed } from "@/components/figma-embed";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Notification — Venstra Design System",
  description:
    "A persistent message that informs the user about an event or update until dismissed.",
  path: "/docs/components/notification",
});

export default function NotificationPage() {
  const notificationSvg = readSvg("components/notification-example.svg");

  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Notification
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      A message that informs the user about an event or update.
      Appears persistently until dismissed, unlike a toast which
      disappears automatically.
    </p>

    <FigmaEmbed nodeId="1-9" />

    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Example
      </h2>
      <div
        className="example-zoom [&_svg]:h-auto [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: notificationSvg }}
      />
    </div>
  </div>
    </>
  );
}
