import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// /styleguide is not blocked here on purpose: it carries a noindex tag, and crawlers must be
// able to fetch the page to see it (a robots.txt block could still get the bare URL indexed).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
