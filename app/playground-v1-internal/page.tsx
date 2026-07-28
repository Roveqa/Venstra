import { PlaygroundContent } from "@/components/playground-content";
import type { Metadata } from "next";

// Internal-only testing page. Deliberately not linked from nav, footer,
// sidebar, or sitemap.xml — see robots.txt for the matching Disallow rule.
export const metadata: Metadata = {
  title: "Playground (internal)",
  robots: { index: false, follow: false, nocache: true },
};

export default function PlaygroundPage() {
  return <PlaygroundContent />;
}
