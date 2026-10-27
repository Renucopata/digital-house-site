/**
 * Single-page anchor navigation (D3). Section ids are the anchors used in PLAN.md Phases 3–4.
 * Labels from PLAN.md Phase 2; CTA "Empecemos" from portfolio slide 11.
 */

export type NavItem = { id: string; label: string };

export const homeId = "inicio";

export const navItems: NavItem[] = [
  { id: "que-hacemos", label: "Qué hacemos" },
  { id: "como-trabajamos", label: "Cómo trabajamos" },
  { id: "servicios", label: "Servicios" },
  { id: "equipo", label: "Equipo" },
  { id: "contacto", label: "Contacto" },
];

export const navCopy = {
  navLabel: "Navegación principal",
  homeLabel: "DigitalHouse Growth Studio — ir al inicio",
  menuOpen: "Abrir menú",
  menuClose: "Cerrar menú",
  cta: "Empecemos",
  ctaAriaLabel: "Empecemos: escríbenos por WhatsApp",
  skipLink: "Saltar al contenido",
} as const;
