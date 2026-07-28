import { readSvg } from "@/lib/inline-svg";
import type { Metadata } from "next";

// Internal-only testing page. Deliberately not linked from nav, footer,
// sidebar, or sitemap.xml — see robots.txt for the matching Disallow rule.
export const metadata: Metadata = {
  title: "Playground (internal)",
  robots: { index: false, follow: false, nocache: true },
};

const buttonSizes = [
  { key: "lg", label: "Large", padding: "px-6 py-3.5", text: "text-base" },
  { key: "md", label: "Medium", padding: "px-5 py-2.5", text: "text-[15px]" },
  { key: "sm", label: "Small", padding: "px-4 py-2", text: "text-sm" },
];

const buttonStyles = [
  {
    key: "primary",
    label: "Primary",
    className: "bg-primary text-white hover:opacity-90",
  },
  {
    key: "secondary",
    label: "Secondary",
    className: "bg-surface-subtle text-ink-950 hover:bg-surface-low",
  },
  {
    key: "outline",
    label: "Outline",
    className: "border border-stroke bg-transparent text-ink-950 hover:bg-surface-subtle",
  },
  {
    key: "ghost",
    label: "Ghost",
    className: "bg-transparent text-ink-950 hover:bg-surface-subtle",
  },
  {
    key: "destructive",
    label: "Destructive",
    className: "bg-[#FD3A36] text-white hover:opacity-90",
  },
  {
    key: "link",
    label: "Link",
    className: "bg-transparent px-0 py-0 text-primary underline-offset-4 hover:underline",
  },
];

const shortcuts = [
  ["⌘", "K"],
  ["⌘", "S"],
  ["⌘", "Z"],
];

function ComponentSection({
  name,
  bare = false,
  children,
}: {
  name: string;
  bare?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.6px] text-ink-950">
        {name}
      </h2>
      {bare ? (
        <div className="example-zoom flex w-full items-center justify-center">{children}</div>
      ) : (
        <div className="example-zoom flex w-full flex-wrap items-center justify-center gap-4 rounded-2xl border border-stroke px-10 py-20">
          {children}
        </div>
      )}
    </div>
  );
}

export default function PlaygroundPage() {
  const badgeDraftSvg = readSvg("components/badge-draft.svg");
  const badgeCompletedSvg = readSvg("components/badge-completed.svg");
  const badgePendingSvg = readSvg("components/badge-pending.svg");
  const badgeFailedSvg = readSvg("components/badge-failed.svg");
  const dividerSvg = readSvg("components/divider-example.svg");
  const labelSvg = readSvg("components/label-example.svg");

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-white px-4 py-16 md:px-10 lg:px-24">
      <div className="flex w-full max-w-[960px] flex-col gap-16">
        <div className="flex w-full flex-col gap-9">
          <div className="flex flex-col gap-2">
            <h1 className="text-[28px] font-semibold leading-none tracking-[-0.84px] text-ink-950">
              Playground
            </h1>
            <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-ink-600">
              Internal component testing. Not linked anywhere on the site.
            </p>
          </div>
          <div className="h-px w-full bg-stroke" />
        </div>

        <ComponentSection name="Badge">
          <div
            className="[&_svg]:h-6 [&_svg]:w-[49px]"
            dangerouslySetInnerHTML={{ __html: badgeDraftSvg }}
          />
          <div
            className="[&_svg]:h-6 [&_svg]:w-[103px]"
            dangerouslySetInnerHTML={{ __html: badgeCompletedSvg }}
          />
          <div
            className="[&_svg]:h-6 [&_svg]:w-[85px]"
            dangerouslySetInnerHTML={{ __html: badgePendingSvg }}
          />
          <div
            className="[&_svg]:h-6 [&_svg]:w-[55px]"
            dangerouslySetInnerHTML={{ __html: badgeFailedSvg }}
          />
        </ComponentSection>

        <ComponentSection name="Button">
          <div className="flex w-full flex-col items-center gap-8">
            {buttonSizes.map((size) => (
              <div key={size.key} className="flex flex-wrap items-center justify-center gap-4">
                {buttonStyles.map((style) => (
                  <button
                    key={style.key}
                    type="button"
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium tracking-[-0.02em] transition-colors ${size.padding} ${size.text} ${style.className}`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </ComponentSection>

        <ComponentSection name="Kbd">
          {shortcuts.map(([mod, key]) => (
            <div
              key={key}
              className="flex items-center gap-1 rounded-md border border-stroke bg-surface-subtle px-2 py-1"
            >
              <kbd className="font-sans text-sm font-medium text-ink-950">{mod}</kbd>
              <kbd className="font-sans text-sm font-medium text-ink-950">{key}</kbd>
            </div>
          ))}
        </ComponentSection>

        <ComponentSection name="Divider" bare>
          <div
            className="w-full max-w-[480px] [&_svg]:h-auto [&_svg]:w-full"
            dangerouslySetInnerHTML={{ __html: dividerSvg }}
          />
        </ComponentSection>

        <ComponentSection name="Label" bare>
          <div
            className="w-full max-w-[320px] [&_svg]:h-auto [&_svg]:w-full"
            dangerouslySetInnerHTML={{ __html: labelSvg }}
          />
        </ComponentSection>
      </div>
    </main>
  );
}
