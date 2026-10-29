/**
 * Landing-page copy (Phase 3). Spanish, tú form (D12).
 * Sources: portfolio PDF (public) slides 02–03 and 11; internal PDF p2 descriptions approved for
 * publication (D21) and rewritten for the client; CLAUDE.md §1 positioning; IMG-2 photo (D22).
 */

export const hero = {
  // Brand descriptor, shown as a pill above the headline (D38)
  eyebrow: "Growth Studio",
  // Portfolio slide 02 / web brief headline. Fixed 4-line composition (each sentence breaks after
  // its verb). The 4th line is the selected word (D32): typed letter by letter in a selection box.
  title: [
    ["No vendemos", "estética."],
    ["Vendemos"],
  ],
  selected: { text: "crecimiento", after: "." },
  // (the paragraph under the headline was removed at the user's request, D38)
  primaryCta: "Escríbenos por WhatsApp",
  secondaryCta: { label: "Cómo trabajamos", href: "#como-trabajamos" },
  // D38: user-provided pair (brand-assets/digital-house_background.png + _foreground.png), same
  // 736×920 frame; the foreground is a cutout that slides up over the background on load.
  media: {
    width: 736,
    height: 920,
    background: "/images/hero-laptop-fondo.png",
    foreground: "/images/hero-laptop-frente.png",
    alt: "Laptop con el logo de DigitalHouse Growth Studio sostenida sobre unas zapatillas, frente a una pared con sombras de hojas.",
  },
} as const;

// Below the hero: the "smaller hero" with the rotating word (web brief / prototype, D40).
export const soluciones = {
  lead: "Soluciones digitales para que",
  // Order chosen by the user (2026-10-26). Each one replaces the previous every 2.3 s.
  words: ["escalen", "te encuentren", "funcionen", "te elijan", "te recuerden"],
  // Read once by screen readers instead of the changing word
  srText: "Soluciones digitales para que escalen, te encuentren, funcionen, te elijan y te recuerden.",
  subtitle: "Estrategia, marca y sistemas, con un equipo de especialistas que trabaja contigo.",
} as const;

export type QueHacemosRow = { label: string; text: string };

// Web brief "Qué hacemos": three big phrases, no paragraph (D41). Replaces Quiénes somos.
export const queHacemos = {
  eyebrow: "Qué hacemos",
  rows: [
    { label: "Primero", text: "Entendemos tu negocio." },
    { label: "Después", text: "Lo volvemos estrategia, marca y sistemas." },
    { label: "Y siempre", text: "Lo ejecuta un equipo de especialistas." },
  ] satisfies QueHacemosRow[],
  // Brief: the camera with the dH monogram goes next to "Qué hacemos" (IMG-2, D22)
  image: {
    src: "/images/hero-camara-dh.jpg",
    width: 900,
    height: 1200,
    alt: "Cámara digital con el monograma dH de DigitalHouse Growth Studio en la pantalla, sobre una pared con sombras de ventana.",
  },
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

/* ------------------------------------------------------------------------------------------
 * Servicios — web brief "Seis áreas. Un solo equipo." (D42): six vertical panels in a row, like
 * books on a shelf; one open, the others show their name on the spine. Replaces the 5 stacked
 * pillars (D25).
 * ---------------------------------------------------------------------------------------- */

export type WorkArea = {
  /** Panel name, on the spine (brief "Tarjeta"). */
  name: string;
  /** Service line, shown as a pill when open. */
  area: string;
  /** Short description (brief "Descripción corta", after the service line). */
  text: string;
  /** Brief "Al abrir, incluye". */
  includes: string[];
  icon: "lens" | "sparkle" | "cursor" | "bars" | "burst" | "box";
  tone: "burgundy-deep" | "beige" | "burgundy" | "yellow" | "sky";
};

export const servicios = {
  eyebrow: "Áreas de trabajo",
  title: "Seis áreas.",
  titleStrong: "Un solo equipo.",
  linkLabel: "Hablemos de esto",
  areas: [
    {
      name: "Entender",
      area: "Consultoría de negocio",
      text: "La radiografía de tu negocio y una ruta clara.",
      includes: ["Diagnóstico del modelo de negocio", "Estrategia y ruta de trabajo", "Concepto de marca"],
      icon: "lens",
      tone: "burgundy-deep",
    },
    {
      name: "Que se note",
      area: "Marca y contenido",
      text: "Identidad y gestión mensual, con estrategia detrás.",
      includes: ["Contenido y calendario editorial", "Copywriting y dirección de arte", "Pauta y reportes"],
      icon: "sparkle",
      tone: "beige",
    },
    {
      name: "Que funcione",
      area: "Sistemas digitales",
      text: "Webs, CRMs, apps y herramientas a medida.",
      includes: ["Implementación de herramientas existentes", "Capacitación a tu equipo", "Desarrollo a medida"],
      icon: "cursor",
      tone: "burgundy",
    },
    {
      name: "Que se mida",
      area: "Business Intelligence",
      text: "Tableros y datos para decidir con números.",
      includes: ["Tableros de KPIs", "Medición de ROI", "Reportes ejecutivos"],
      icon: "bars",
      tone: "yellow",
    },
    {
      name: "Que se viva",
      area: "Eventos y BTL",
      text: "Activaciones, experiencias y patrocinios.",
      includes: ["Diseño de eventos y activaciones", "Negociación de auspicios", "Logística"],
      icon: "burst",
      tone: "burgundy-deep",
    },
    {
      name: "Que se toque",
      area: "Producción y merchandising",
      text: "Con nuestro aliado de imprenta.",
      includes: ["Impresos y material de marca", "Merchandising", "Piezas para eventos"],
      icon: "box",
      tone: "sky",
    },
  ] satisfies WorkArea[],
  closing: "No eliges de un menú. Nos cuentas tu negocio y armamos la propuesta.",
} as const;

export type TeamMember = {
  name: string;
  initials: string;
  /** Front: what they specialize in (web brief: a specialty, not a CV). */
  role: string;
  /** Front: one-line phrase under the role. */
  phrase: string;
  /** Back: their specialty in one sentence. */
  specialty: string;
  /** Back: the "Pídele" list. */
  ask: string[];
  /** Color of the initials panel on the front (photos may replace it later). */
  tone: "yellow" | "sky" | "beige";
  /** Optional approved portrait (e.g. "/images/equipo-nicole.jpg"); without it, big initials. */
  photo?: string;
};

export const equipo = {
  eyebrow: "Equipo",
  // Web brief, Equipo. "tu crecimiento" is shown in the selection box.
  title: "Un equipo de especialistas. Un solo objetivo:",
  titleSelected: "tu crecimiento",
  titleAfter: ".",
  // Shown on the toggle button for screen readers / keyboard (the card flips on hover, tap, Enter/Space)
  flipLabel: "Ver especialidad de",
  askLabel: "Pídele",
  // Web brief table (Equipo). Spelling per D30: Rene (no accent), Matias Rossel.
  members: [
    {
      name: "Nicole Pantoja",
      initials: "NP",
      role: "Fundadora · Directora de Estrategia",
      phrase: "La que dirige la orquesta.",
      specialty: "Piensa la estrategia y dirige a todo el equipo hacia tu objetivo.",
      ask: ["Diagnóstico y ruta", "Estrategia de marca", "Dirección de cada proyecto"],
      tone: "yellow",
    },
    {
      name: "Nicole Vidaurre",
      initials: "NV",
      role: "Directora Creativa",
      phrase: "La que hace sentir y da vida a la personalidad visual.",
      specialty: "Da forma visual a lo que tu marca es.",
      ask: ["Identidad visual", "Contenido de marca", "Dirección de arte"],
      tone: "sky",
    },
    {
      name: "Rene Rengel",
      initials: "RR",
      role: "Director de Desarrollo y Soluciones Digitales",
      phrase: "El que crea la solución digital.",
      specialty: "Construye lo digital que tu negocio necesita.",
      ask: ["Webs y apps", "CRMs y automatizaciones", "Herramientas a medida"],
      tone: "beige",
    },
    {
      name: "Michelle Vidaurre",
      initials: "MV",
      role: "Directora de Eventos y BTL",
      phrase: "La que hace que se experimente.",
      specialty: "Hace que tu marca se viva en persona.",
      ask: ["Eventos y activaciones", "Patrocinios", "Experiencias de marca"],
      tone: "sky",
    },
    {
      // Brief: an ally (own print shop), not a director or staff (D33)
      name: "Matias Rossel",
      initials: "MR",
      role: "Aliado · Producción y Merchandising",
      phrase: "El que lo hace tangible.",
      specialty: "Lleva tu marca al mundo físico.",
      ask: ["Impresos", "Merchandising", "Material de marca"],
      tone: "yellow",
    },
  ] satisfies TeamMember[],
  // Web brief closing line under the cards ("juntos", D30); the hint comes from the prototype (D36)
  closing: {
    hint: "Pasa el cursor o toca una tarjeta para darle la vuelta.",
    question: "¿Quién participa en tu proyecto?",
    answer: "Lo decidimos juntos después de escucharte.",
  },
  // Portfolio slide 04 band
  extra: {
    title: "Eventos & Patrocinios",
    text: "Diseño y ejecución de eventos y negociación de auspicios, a cargo del equipo estratégico.",
  },
  // D13: text only, no logos, no results
  clients: {
    label: "Han confiado en nosotros",
    names: ["Fair Play Élite", "VIDA"],
  },
} as const;

export const manifiesto = {
  // IMG-0 "Ctrl + N" post (D22), set as live text
  strongLines: ["Nuevas ideas.", "Más estrategia."],
  regularBefore: "Misma pasión por",
  underlined: "hacer crecer",
  regularAfter: "tu negocio.",
  image: {
    src: "/images/manifiesto-ctrl-n.jpg",
    width: 1060,
    height: 590,
    alt: "Teclas Ctrl y N sobre papel kraft, con la anotación a mano «Creando nuevas estrategias.»",
  },
} as const;

export const contacto = {
  // Portfolio slide 11
  eyebrow: "Empecemos",
  titleBefore: "Entendamos tu negocio",
  titleUnderlined: "primero.",
  lead: "El primer paso siempre es el mismo: una consultoría para entender dónde estás y a dónde quieres llegar.",
  primaryCta: "Escríbenos por WhatsApp",
  emailLabel: "o escríbenos a",
} as const;
