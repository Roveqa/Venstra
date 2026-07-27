import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { ComponentsSection } from "@/components/components-section";
import { LightDark } from "@/components/light-dark";
import { CtaBanner } from "@/components/cta-banner";
import { Faq } from "@/components/faq";
import { ClosingCta } from "@/components/closing-cta";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Venstra — Free Figma Design System",
  description:
    "Free Figma design system with 27 components, semantic tokens, and light/dark mode. Built for product designers who care about consistency.",
  path: "/",
});

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Venstra",
  description:
    "Free Figma design system with 27 components, semantic tokens, and light/dark mode. Built for product designers who care about consistency.",
  url: "https://venstra.design",
};

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Header />
      <Hero />
      <Stats />
      <ComponentsSection />
      <LightDark />
      <CtaBanner />
      <Faq />
      <ClosingCta />
      <Footer />
    </main>
  );
}
