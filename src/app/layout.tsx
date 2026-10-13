import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Poppins } from "next/font/google";
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

// Icons come from src/app/{favicon.ico,icon.png,apple-icon.png}. Open Graph, canonical URL,
// sitemap and JSON-LD are added in Phase 6.
export const metadata: Metadata = {
  title: { default: site.name, template: `%s · ${site.name}` },
  description: `${site.tagline} ${site.statement}`,
  applicationName: site.name,
};

export const viewport: Viewport = {
  themeColor: "#f8f4e9",
  viewportFit: "cover", // needed for safe-area insets (floating WhatsApp button, D6)
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${bodoni.variable} ${poppins.variable} h-full`}>
      <body className="min-h-full">
        {children}
        {/* D6: visible at all times, on every page and breakpoint */}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
