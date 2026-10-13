/**
 * Landing-page copy (Phase 3). Spanish, tú form (D12).
 * Sources: portfolio PDF (public) slides 02–03 and 11; internal PDF p2 descriptions approved for
 * publication (D21) and rewritten for the client; CLAUDE.md §1 positioning; IMG-2 photo (D22).
 */

export const hero = {
  // Eyebrow: brand descriptor + "100 % remoto" (CLAUDE.md §1, D21)
  eyebrow: "Growth Studio · Servicio 100% remoto",
  // Portfolio slide 02 headline. Fixed 4-line composition (each sentence breaks after its verb);
  // the second sentence is emphasized and "crecimiento." gets the hand-drawn underline.
  title: [
    ["No vendemos", "estética."],
    ["Vendemos", "crecimiento."],
  ],
  // Portfolio slide 02
  lead: "Lo digital es el motor — la marca, el contenido y las herramientas son la consecuencia de entender primero cómo funciona y crece cada negocio, no el punto de partida.",
  primaryCta: "Escríbenos por WhatsApp",
  secondaryCta: { label: "Cómo trabajamos", href: "#como-trabajamos" },
  image: {
    src: "/images/hero-camara-dh.jpg",
    width: 900,
    height: 1200,
    alt: "Cámara digital con el monograma dH de DigitalHouse Growth Studio en la pantalla, sobre una pared con sombras de ventana.",
  },
} as const;

export type Pillar = {
  title: string;
  contrast: string;
  description: string;
  emphasis?: boolean;
};

export const quienesSomos = {
  eyebrow: "Quiénes somos",
  // CLAUDE.md §1 positioning line, split into title + lead
  title: "Entendemos tu negocio primero.",
  lead: "Todo lo demás — marca, contenido, sistema — nace de ahí.",
  // Titles + contrasts: portfolio slide 02. Descriptions: internal PDF p2 (D21), rewritten in tú.
  pillars: [
    {
      title: "Mentalidad de negocio",
      contrast: "no solo visual",
      description:
        "Antes de cualquier pieza de marca o contenido, hay una consultoría que entiende cómo genera valor tu negocio, quién es tu cliente y cuáles son tus cuellos de botella reales.",
    },
    {
      title: "Lo digital al centro",
      contrast: "no como canal aparte",
      description:
        "Marca, contenido y operación pensados para ser accesibles, rápidos y eficientes — porque el negocio que no piensa en digital primero pierde velocidad frente al que sí.",
      emphasis: true,
    },
    {
      title: "Equipo de especialistas",
      contrast: "no una sola persona",
      description:
        "Un equipo coordinado de especialistas por área, en lugar de una sola persona resolviéndolo todo. Eso da confianza y credibilidad a cada proyecto.",
    },
  ] satisfies Pillar[],
} as const;

export type ProcessStep = { title: string; description: string };

export const comoTrabajamos = {
  eyebrow: "Cómo trabajamos",
  // Portfolio slide 03
  title: "Un proceso, no una improvisación.",
  steps: [
    { title: "Diagnóstico", description: "Entendemos tu negocio, tu público y tus cuellos de botella." },
    { title: "Estrategia", description: "Definimos objetivo, ruta y concepto de marca." },
    { title: "Ejecución", description: "El equipo especializado produce lo que el proyecto necesite." },
    // "no solo vanidad" → "no solo métricas de vanidad" for clarity (internal PDF p5 wording)
    { title: "Medición", description: "Reportamos resultados de negocio, no solo métricas de vanidad." },
    { title: "Optimización", description: "Ajustamos con datos reales, de forma continua." },
  ] satisfies ProcessStep[],
  cta: "Empecemos",
  ctaAriaLabel: "Empecemos: escríbenos por WhatsApp",
} as const;
