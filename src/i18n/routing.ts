import { defineRouting } from "next-intl/routing";

/**
 * Locales and localized pathnames (CLAUDE.md N2). Spanish is the main language and has no prefix;
 * English lives under /en. Internal names (the keys) are the Spanish paths.
 */
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/proyectos": { es: "/proyectos", en: "/work" },
    "/proyectos/[slug]": { es: "/proyectos/[slug]", en: "/work/[slug]" },
    "/nosotros": { es: "/nosotros", en: "/about" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
