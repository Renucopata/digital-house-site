/**
 * Site-wide copy. Sources: CLAUDE.md §1 positioning (public), D2 brand name, D24 production URL.
 */

export const site = {
  name: "DigitalHouse Growth Studio",
  /** D24 — Vercel production address (until a domain is bought, D11). No trailing slash. */
  url: "https://digital-house-site-indol.vercel.app",
  /** CLAUDE.md §1 — positioning line. */
  tagline: "No vendemos estética. Vendemos crecimiento.",
  /** CLAUDE.md §1 — second positioning line (also portfolio slide 01, short form). */
  statement: "Entendemos tu negocio primero. Todo lo demás — marca, contenido, sistema — nace de ahí.",
} as const;

export const footerCopy = {
  contactTitle: "Contacto",
  whatsappLabel: "WhatsApp",
  emailLabel: "Correo",
  navTitle: "Secciones",
  rights: "Todos los derechos reservados.",
} as const;
