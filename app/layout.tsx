import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// TODO: replace with the real production domain once the site is deployed.
export const metadata: Metadata = {
  metadataBase: new URL("https://venstra.design"),
  title: "Venstra — The design system built for real products",
  description:
    "Components that connect. Tokens that make sense. Themes that just work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
