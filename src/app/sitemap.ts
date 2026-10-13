import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Single landing page (D3). /styleguide is internal and left out on purpose.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${site.url}/`, changeFrequency: "monthly", priority: 1 }];
}
