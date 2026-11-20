import type { Metadata, Viewport } from "next";
import { Anton, Bodoni_Moda, Manrope, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactOverlay } from "@/components/layout/ContactOverlay";
import { ContactProvider } from "@/components/layout/ContactProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Loader } from "@/components/motion/Loader";
import { PageTransition } from "@/components/motion/PageTransition";
import { Reveals } from "@/components/motion/Reveals";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { site } from "@/content/site";
import { routing } from "@/i18n/routing";
import "../globals.css";

// Headlines: Anton, condensed, all caps (N5). One weight.
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400", display: "swap" });

// "digital HOUSE" lettering of the artifact: "digital" = Bodoni Moda, "HOUSE" = Montserrat Black
// (also the walkers' signs).
const bodoni = Bodoni_Moda({ variable: "--font-bodoni", subsets: ["latin"], weight: "400", display: "swap" });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], weight: "900", display: "swap" });

// Body and menu: Manrope (variable 200–800).
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });

// Buttons and labels: Satoshi, self-hosted from Fontshare (ITF Free Font License, src/fonts/satoshi/README.txt).
const satoshi = localFont({
  variable: "--font-satoshi",
  src: [
    { path: "../../fonts/satoshi/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/satoshi/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/satoshi/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../fonts/satoshi/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// P1: base metadata only; per-page metadata, OG and hreflang come in P6.
export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL(site.url),
    title: { default: site.name, template: `%s · ${site.name}` },
    description: locale === "es" ? site.tagline : undefined,
    applicationName: site.name,
  };
}

export const viewport: Viewport = {
  themeColor: "#f7f3ea",
  viewportFit: "cover", // safe-area insets for the floating WhatsApp button (N7)
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const tA11y = await getTranslations("a11y");

  return (
    <html lang={locale} className={`${anton.variable} ${bodoni.variable} ${montserrat.variable} ${manrope.variable} ${satoshi.variable} h-full`}>
      <head>
        {/* without JS the loader could never leave, so it is not shown at all */}
        <noscript>
          <style>{".dh-loader{display:none}"}</style>
        </noscript>
      </head>
      <body className="min-h-full">
        <Loader />
        <NextIntlClientProvider>
          <ContactProvider>
            <SkipLink />
            <Header />
            <main id="contenido" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
            <ContactOverlay />
          </ContactProvider>
          {/* motion layer (P4): smooth scroll, scroll reveals, route transition */}
          <SmoothScroll />
          <Reveals />
          <PageTransition />
        </NextIntlClientProvider>
        {/* N7: visible at all times, on every page and breakpoint, above every layer */}
        <WhatsAppFloat label={tA11y("whatsapp")} />
      </body>
    </html>
  );
}
