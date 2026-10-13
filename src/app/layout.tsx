import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Poppins } from "next/font/google";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { site } from "@/content/site";
import "./globals.css";

// Approved families (D15). Bodoni Moda = editorial display serif; Poppins = all sans roles.
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
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
  themeColor: "#f8f4e9",
  viewportFit: "cover", // needed for safe-area insets (floating WhatsApp button, D6)
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script adds the "js" class before React hydrates
    <html lang="es" className={`${bodoni.variable} ${poppins.variable} h-full`} suppressHydrationWarning>
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
