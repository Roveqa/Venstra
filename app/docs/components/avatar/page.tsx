import { readSvg } from "@/lib/inline-svg";
import { FigmaEmbed } from "@/components/figma-embed";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Avatar — Venstra Design System",
  description:
    "Displays a user's profile image, initials, or fallback icon. Used to represent people across the interface.",
  path: "/docs/components/avatar",
});

export default function AvatarPage() {
  const avatarSingleSvg = readSvg("components/avatar-single.svg");
  const avatarGroupSvg = readSvg("components/avatar-group.svg");

  return (
    <>
  <div className="flex w-full flex-col gap-9">
    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
      Avatar
    </h1>
    <div className="h-px w-full bg-stroke" />
  </div>

  <div className="flex w-full flex-col gap-12">
    <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
      Displays a user&apos;s profile image, initials, or a fallback
      icon. Used to represent people across the interface.
    </p>

    <FigmaEmbed nodeId="1-10" />

    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        Example
      </h2>
      <div className="example-zoom flex w-full flex-col items-center justify-center gap-4 rounded-2xl border border-stroke px-10 py-20">
        <div
          className="[&_svg]:h-12 [&_svg]:w-12"
          dangerouslySetInnerHTML={{ __html: avatarSingleSvg }}
        />
        <div
          className="flex w-full justify-center [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-[158px]"
          dangerouslySetInnerHTML={{ __html: avatarGroupSvg }}
        />
      </div>
    </div>
  </div>
    </>
  );
}
