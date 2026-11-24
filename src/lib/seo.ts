import type { Metadata } from "next";
import { launch } from "@/content/launch";
import { site } from "@/content/site";
import { getPathname } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";

/*
 * Page metadata in one place (P6): canonical URL, Open Graph / Twitter title + description,
 * and hreflang alternates once the English version is switched on (src/content/launch.ts).
 * Share image: public/share/og.png (made by tools/share_image.mjs), listed on every page because a
 * page's own openGraph block replaces the layout's.
 */
type Href = AppPathname | { pathname: "/proyectos/[slug]"; params: { slug: string } };
type Locale = "es" | "en";

const shareImage = { url: "/share/og.png", width: 1200, height: 630, alt: `${site.name}: No vendemos estética. Vendemos crecimiento.` };

const path = (href: Href, locale: Locale) => getPathname({ href, locale } as Parameters<typeof getPathname>[0]);

export function pageMetadata({
  href,
  locale,
  title,
  description,
  index = true,
}: {
  href: Href;
  locale: string;
  /** Page title (the layout adds " · DigitalHouse Growth Studio"); omit on the home page. */
  title?: string;
  description: string;
  /** false = keep the page out of search engines (unfinished pages). */
  index?: boolean;
}): Metadata {
  const loc: Locale = locale === "en" ? "en" : "es";
  const url = path(href, loc);
  const shareTitle = title ? `${title} · ${site.name}` : site.name;
  return {
    // no title key on the home page: the layout's default title must stay
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: url,
      ...(launch.english ? { languages: { es: path(href, "es"), en: path(href, "en"), "x-default": path(href, "es") } } : {}),
    },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: shareTitle,
      description,
      locale: loc === "en" ? "en_US" : "es_BO",
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: [shareImage] },
    robots: index ? undefined : { index: false, follow: false },
  };
}
