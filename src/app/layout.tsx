import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { site } from "@/content/site";
import "./globals.css";

// Web brief fonts (D26). Manrope = headlines, body and menu (variable 200–800).
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

// Satoshi = buttons, labels, short highlighted texts. Self-hosted copy from Fontshare
// (ITF Free Font License, see src/fonts/satoshi/README.txt).
const satoshi = localFont({
  variable: "--font-satoshi",
  src: [
    { path: "../fonts/satoshi/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/satoshi/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/satoshi/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/satoshi/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  display: "swap",
});

const description = `${site.tagline} ${site.statement}`;

// Icons and the share image come from the file conventions in src/app ({favicon.ico, icon.png,
// apple-icon.png, opengraph-image.png, twitter-image.png}); sitemap.ts / robots.ts beside them.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.name,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ea",
  viewportFit: "cover", // needed for safe-area insets (floating WhatsApp button, D6)
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script adds the "js" class before React hydrates
    <html lang="es" className={`${manrope.variable} ${satoshi.variable} h-full`} suppressHydrationWarning>
      <head>
        {/* enables scroll-reveal styles only when JS runs (content stays visible without JS) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-full">
        {children}
        <RevealObserver />
        {/* D6: visible at all times, on every page and breakpoint */}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
