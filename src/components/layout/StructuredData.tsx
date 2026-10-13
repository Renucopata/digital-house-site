import { contact } from "@/content/contact";
import { site } from "@/content/site";

/**
 * JSON-LD for search engines (Phase 6): the organization and the website.
 * Only confirmed public data (D6, D7, D11, D24) — no address, prices or ratings.
 */
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#organizacion`,
      name: site.name,
      url: `${site.url}/`,
      description: `${site.tagline} ${site.statement}`,
      logo: `${site.url}/brand/logo-monogram-cream.png`,
      image: `${site.url}/opengraph-image.png`,
      email: contact.email,
      telephone: contact.phoneE164,
      sameAs: [contact.instagramUrl],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: contact.phoneE164,
        email: contact.email,
        availableLanguage: "es",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#sitio`,
      url: `${site.url}/`,
      name: site.name,
      inLanguage: "es",
      publisher: { "@id": `${site.url}/#organizacion` },
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // "<" escaped so the JSON can never close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
