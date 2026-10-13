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
  role: string;
  /** Short line (portfolio slide 04). */
  summary: string;
  /** Longer bio (internal PDF p4, D21), rewritten for the client. */
  bio: string;
};

export const equipo = {
  eyebrow: "Equipo",
  // Portfolio slide 04
  title: "Un equipo de especialistas detrás de cada proyecto.",
  lead: "Lo mostramos abierto porque es lo que nos hace distintos: no trabajas con una sola persona haciendo de todo.",
  members: [
    {
      name: "Nicole Pantoja",
      initials: "NP",
      role: "Consultoría de Negocio & Estrategia",
      summary: "Estratega digital: marketing, marca y procesos.",
      bio: "Lidera el diagnóstico de negocio y la estrategia de marca, y coordina el proyecto completo. Ex Directora de Marketing de Technogym.",
    },
    {
      name: "Nicole Vidaurre",
      initials: "NV",
      role: "Diseño & Gestión de Contenido",
      summary: "Identidad visual y contenido para marca.",
      bio: "Diseño de identidad visual, creación de contenido y ejecución de la gestión de marca mensual. Experiencia previa como freelancer con clientes del exterior.",
    },
    {
      name: "Rene Rengel",
      initials: "RR",
      // D14: public title
      role: "Herramientas digitales",
      summary: "CRMs, apps y herramientas a medida.",
      bio: "Construye la solución técnica de Procesos & Sistemas Digitales: implementación y capacitación en herramientas existentes (CRM, gestión de tareas) o desarrollo de sistemas a medida cuando no hay una solución adecuada en el mercado.",
    },
  ] satisfies TeamMember[],
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
