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
 * Phase 4
 * ---------------------------------------------------------------------------------------- */

export type ServicePillar = {
  /** Anchor id inside #servicios, e.g. "servicio-01". */
  id: string;
  title: string;
  /** Short tagline (portfolio slide 05). */
  short: string;
  /** Long tagline (portfolio slides 06–10). */
  tagline: string;
  /** Internal PDF p5 description (D21), rewritten for the client. */
  description: string;
  includes: string[];
  deliverable: string;
};

export const servicios = {
  eyebrow: "Qué ofrecemos",
  // Portfolio slide 05 title + internal PDF p5 subtitle (D21)
  title: "5 pilares de servicio",
  lead: "Cada uno alimenta al siguiente.",
  includesLabel: "Incluye",
  deliverableLabel: "Entregable",
  indexLabel: "Pilares de servicio",
  pillars: [
    {
      id: "servicio-01",
      title: "Consultoría de Negocio & Marca",
      short: "El punto de partida.",
      tagline: "El punto de partida obligatorio de cualquier proyecto.",
      description:
        "Diagnosticamos tu modelo de negocio — cómo gana dinero, tu público, tus diferenciales y tus cuellos de botella — y definimos una estrategia y un concepto de marca alineados a ese entendimiento.",
      includes: ["Diagnóstico de modelo de negocio", "Cuellos de botella reales", "Estrategia de marca", "Ruta y objetivos"],
      deliverable: "Estrategia inicial (ruta + objetivo) + primera visualización de marca, si aplica.",
    },
    {
      id: "servicio-02",
      title: "Gestión de Marca & Contenido",
      short: "Ejecutado sobre estrategia real.",
      tagline: "Todo lo de una agencia de marketing — sobre una estrategia real.",
      description:
        "Todo lo que implicaría contratar una agencia de marketing — contenido, redes, calendario, pauta — ejecutado sobre la estrategia del pilar 01, no de forma aislada.",
      includes: [
        "Producción de contenido",
        "Calendario editorial",
        "Copywriting",
        "Dirección de arte",
        "Pauta publicitaria",
        "Reportes",
      ],
      deliverable: "Plan mensual ajustable según volumen de contenido y canales — se cotiza a medida.",
    },
    {
      id: "servicio-03",
      title: "Procesos & Sistemas Digitales",
      short: "Lo que existe, o lo que falta construir.",
      tagline: "Con lo que ya existe, o con lo que hay que construir.",
      description:
        "Diagnosticamos los flujos de trabajo de tu equipo y aplicamos la solución que corresponda: implementación y capacitación en herramientas digitales que ya tienes pero no aprovechas, o una herramienta a medida cuando no existe una adecuada.",
      includes: [
        "Diagnóstico de workflows",
        "Implementación de CRM",
        "Capacitación de equipo",
        "Herramientas a medida",
        "Protocolos de trabajo",
      ],
      deliverable: "Herramienta implementada y equipo capacitado, o desarrollo a medida.",
    },
    {
      id: "servicio-04",
      title: "Business Intelligence",
      short: "Resultados de negocio, no vanidad.",
      tagline: "Medimos resultados de negocio real, no solo alcance.",
      description: "Métricas de negocio real — conversión, retención, ROI — no solo métricas de vanidad.",
      includes: ["Dashboards de KPIs", "Medición de ROI", "Reportes ejecutivos", "Recomendaciones con datos"],
      deliverable: "Complementa cualquier pilar — demuestra en números que la estrategia funciona.",
    },
    {
      id: "servicio-05",
      title: "Eventos & Patrocinios",
      short: "Activaciones con experiencia real.",
      tagline: "Activaciones de marca con respaldo de experiencia real.",
      description:
        "Diseño y ejecución de eventos, búsqueda y negociación de auspicios — una línea complementaria que refuerza tu marca y tu comunidad.",
      includes: ["Diseño de eventos", "Negociación de auspicios", "Logística integral"],
      deliverable: "Con experiencia propia comprobada: campeonato deportivo con auspicios conseguidos de punta a punta.",
    },
  ] satisfies ServicePillar[],
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
