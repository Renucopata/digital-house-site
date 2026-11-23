import type { MetadataRoute } from "next";
import { launch } from "@/content/launch";
import { caseOrder } from "@/content/pages";
import { site } from "@/content/site";
import { getPathname } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";

/*
 * Sitemap: only the pages that are public (src/content/launch.ts).
 * Home always; /proyectos and the case studies when workPage is on; /nosotros when aboutPage is on.
 * English URLs (and hreflang alternates) are added once the English version is switched on.
 */
type Entry = { href: AppPathname | { pathname: "/proyectos/[slug]"; params: { slug: string } }; priority: number; changeFrequency: "monthly" | "yearly" };

const url = (href: Entry["href"], locale: "es" | "en") => `${site.url}${getPathname({ href, locale } as Parameters<typeof getPathname>[0])}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [{ href: "/", priority: 1, changeFrequency: "monthly" }];
  if (launch.workPage) {
    entries.push({ href: "/proyectos", priority: 0.8, changeFrequency: "monthly" });
    for (const slug of caseOrder) entries.push({ href: { pathname: "/proyectos/[slug]", params: { slug } }, priority: 0.6, changeFrequency: "yearly" });
  }
  if (launch.aboutPage) entries.push({ href: "/nosotros", priority: 0.7, changeFrequency: "yearly" });

  return entries.map(({ href, priority, changeFrequency }) => ({
    url: url(href, "es"),
    changeFrequency,
    priority,
    ...(launch.english ? { alternates: { languages: { es: url(href, "es"), en: url(href, "en") } } } : {}),
  }));
}
