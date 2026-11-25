/**
 * Content of /proyectos, /proyectos/[slug] and /nosotros (P5, 2026-11-20).
 * Only copy that already exists in the reference artifact (user decision: reuse it, invent nothing).
 * Office rules = the five team mottos; story = the artifact's statements; capabilities = services +
 * team specialties.
 */
import { about, hero, process, services, team, works, type L } from "./home";

/* ---------- /proyectos ---------- */
export const workPage = {
  label: works.label,
  title: works.title,
  pills: [works.items[2].pill, works.items[5].pill], // "Spoiler: funcionó", "Y hay más"
  intro: services.note,
  listTitle: works.more, // "Y la lista sigue."
};

/* ---------- /proyectos/[slug] (case study) ---------- */
export const caseStudy = {
  /** Shown while a project has no case-study text yet (visible only with launch.placeholders). */
  textPending: { es: "[PENDIENTE: texto del caso]", en: "[PENDING: case study text]" } as L,
  mediaPending: works.imagePending,
  labels: {
    client: { es: "Cliente", en: "Client" } as L,
    field: { es: "Rubro", en: "Industry" } as L,
    did: { es: "Qué hicimos", en: "What we did" } as L,
  },
  /** Sponsors section (artifact: Fury Cup). EN = draft translation, pending approval. */
  sponsors: {
    label: { es: "Patrocinadores", en: "Sponsors" } as L,
    title: { es: "Las marcas que se sumaron", en: "The brands that joined" } as L,
  },
};

/** A sponsor logo: file in public/works/<slug>/sponsors/, display height in px (the artifact's). */
export type SponsorLogo = { file: string; name: string; h: number; width: number; height: number };

export type CaseData = {
  /** Client's full name (case-study meta). */
  client: string;
  /** Industry, short (label + meta). */
  field: L;
  services: L[];
  intro: L;
  /** Per image, in the numbered order: true = full width, false = half (artifact layout). */
  wide: boolean[];
  /** "Las marcas que se sumaron" (artifact), in the artifact's order and sizes. */
  sponsors?: SponsorLogo[];
};

/** Case studies, copied from the reference artifact (2026-11-20). Order = the artifact's. */
export const caseOrder = ["vida", "fury-cup", "zareliz", "canel-roll", "bosque-sur", "guinness", "carabao", "bendita"];

const s = (es: string, en: string): L => ({ es, en });

export const cases: Record<string, CaseData> = {
  vida: {
    client: "VIDA Indoor Cycling",
    field: s("Fitness", "Fitness"),
    services: [s("Identidad de marca", "Brand identity"), s("Brandboard", "Brandboard"), s("Aplicaciones", "Applications")],
    intro: s(
      "Para VIDA Indoor Cycling creamos una marca con la energía de una clase: un logotipo de trazo firme, una paleta de amarillo vibrante y negro carbón, pensada para transmitir conexión, energía, motivación y transformación. La llevamos a señalética iluminada, merch, toallas y botellas.",
      "For VIDA Indoor Cycling we created a brand with the energy of a class: a bold-stroke logo and a palette of vibrant yellow and charcoal black, designed to convey connection, energy, motivation and transformation. We took it to illuminated signage, merch, towels and bottles.",
    ),
    wide: [true, false, false, true, true],
  },
  "fury-cup": {
    client: "Fury Cup de Altura",
    field: s("Deportes", "Sports"),
    services: [s("Patrocinios", "Sponsorships"), s("Activaciones de marca", "Brand activations"), s("Experiencias", "Experiences")],
    intro: s(
      "Fury Cup de Altura fue el primer campeonato de fútbol amateur en reunir a las mejores marcas como sponsors. Sumamos a los patrocinadores, diseñamos sus activaciones y creamos experiencias para que cada marca se viviera dentro de la cancha: arcos inflables, zonas de marca, cobertura de Tigo Sports y hasta un dispensador de protector solar para jugadores y público. Un torneo que se jugó en serio y se vivió como un evento.",
      "Fury Cup de Altura was the first amateur football championship to bring together top brands as sponsors. We brought in the sponsors, designed their activations and created experiences so every brand was lived on the pitch: inflatable arches, brand zones, Tigo Sports coverage and even a sunscreen dispenser for players and fans. A tournament played for real and lived as an event.",
    ),
    wide: [true, false, false, true, false, false],
    sponsors: [
      { file: "dxt", name: "DXT Magazine", h: 62, width: 511, height: 220 },
      { file: "la-republica", name: "La República Ginebra", h: 50, width: 560, height: 156 },
      { file: "check", name: "Check · Seguros Digitales Crediseguro", h: 61, width: 533, height: 220 },
      { file: "bago", name: "Bagó", h: 55, width: 560, height: 186 },
      { file: "fury-energy", name: "Fury Energy", h: 96, width: 152, height: 220 },
      { file: "amstel", name: "Amstel", h: 46, width: 560, height: 134 },
      { file: "tigo-sports", name: "Tigo Sports", h: 44, width: 560, height: 118 },
      { file: "powerade", name: "Powerade", h: 55, width: 560, height: 185 },
    ],
  },
  zareliz: {
    client: "Zareliz Modas",
    field: s("Moda", "Fashion"),
    services: [s("Identidad de marca", "Brand identity"), s("Packaging", "Packaging"), s("Aplicaciones", "Applications")],
    intro: s(
      "Para Zareliz Modas creamos una identidad tan expresiva como su ropa: un logotipo manuscrito, una paleta naranja y lila, y un sistema de flores que vive en etiquetas, bolsas y piezas para redes. Todo gira alrededor de su lema: el arte de vestirse diferente.",
      "For Zareliz Modas we created an identity as expressive as their clothes: a handwritten logo, an orange and lilac palette, and a system of flowers that lives on tags, bags and social media pieces. It all revolves around their motto: the art of dressing differently.",
    ),
    wide: [true, true, false, false, false, false, true, true, true],
  },
  "canel-roll": {
    client: "Canel Roll",
    field: s("Pastelería", "Bakery"),
    services: [s("Identidad de marca", "Brand identity"), s("Packaging", "Packaging"), s("Patrones", "Patterns")],
    intro: s(
      "Para Canel Roll diseñamos una identidad cálida y artesanal: un logotipo caligráfico, sellos circulares con sus frases, una paleta de vino y tonos crema, y patrones para envolver cada pedido. Endulza tu día, disfruta el momento.",
      "For Canel Roll we designed a warm, handcrafted identity: a calligraphic logo, circular stamps with their phrases, a palette of wine and cream tones, and patterns to wrap every order. Sweeten your day, enjoy the moment.",
    ),
    wide: [true, true, false, false, true, true, false, false, true],
  },
  "bosque-sur": {
    client: "Bosque Sur",
    field: s("Inmobiliaria", "Real estate"),
    services: [s("Identidad de marca", "Brand identity"), s("Señalética", "Signage"), s("Aplicaciones", "Applications")],
    intro: s(
      "Bosque Sur une naturaleza y ciudad en un solo símbolo: un árbol que crece junto a la silueta de un edificio. Lo acompañamos con una paleta de verdes y lo llevamos a señalética, papelería, vidrios y a los renders de los espacios interiores.",
      "Bosque Sur brings nature and city together in one symbol: a tree growing beside the silhouette of a building. We paired it with a palette of greens and took it to signage, stationery, glass and the renders of the interior spaces.",
    ),
    wide: [true, true, true, false, false, true, false, false],
  },
  guinness: {
    client: "Guinness",
    field: s("Bebidas", "Beverages"),
    services: [s("Punto de venta", "Point of sale"), s("Redes sociales", "Social media"), s("Campañas", "Campaigns")],
    intro: s(
      "Material de punto de venta y contenido para redes: displays de mesa con notas de cata para Guinness Draught y Foreign Extra Stout, y piezas de campaña como Saint Patrick’s.",
      "Point-of-sale material and social media content: table displays with tasting notes for Guinness Draught and Foreign Extra Stout, and campaign pieces such as Saint Patrick’s.",
    ),
    wide: [false, false, true, false, false],
  },
  carabao: {
    client: "Carabao Energy Drink",
    field: s("Bebidas", "Beverages"),
    services: [s("Campaña de lanzamiento", "Launch campaign"), s("Redes sociales", "Social media"), s("Material POP", "POP material")],
    intro: s(
      "Acompañamos la llegada de Carabao a Bolivia con una campaña de expectativa, piezas de bienvenida, promociones para redes y material para el punto de venta.",
      "We supported Carabao’s arrival in Bolivia with a teaser campaign, welcome pieces, social media promotions and point-of-sale material.",
    ),
    wide: [false, false, true, false, false, true],
  },
  bendita: {
    client: "Bendita",
    field: s("Cervecería", "Brewery"),
    services: [s("Redes sociales", "Social media"), s("Lanzamientos", "Launches"), s("Promociones", "Promotions")],
    intro: s(
      "Contenido para redes de Bendita: lanzamientos de nuevas cervezas como su India Pale Ale y su Hoppy Lager, y piezas de promoción para el día a día.",
      "Social media content for Bendita: launches of new beers such as their India Pale Ale and Hoppy Lager, and everyday promotional pieces.",
    ),
    wide: [true, false, false],
  },
};

/* ---------- /nosotros ---------- */
export const aboutPage = {
  label: about.label,
  title: team.title, // "Las personas detrás"
  pills: hero.pills,
  intro: team.intro,
  /** Story blocks, in order (artifact copy). */
  story: [
    {
      tag: hero.pills[0], // "Growth studio"
      title: { es: "Somos un growth studio", en: "We are a growth studio" } as L,
      text: { es: hero.statement.after.es.replace(/^\. /, ""), en: hero.statement.after.en.replace(/^\. /, "") } as L,
    },
    {
      tag: about.label,
      title: about.parts[1].text, // "estrategia, marca y tecnología reman hacia el mismo lado"
      text: {
        es: about.parts.map((p) => p.text.es).join(""),
        en: about.parts.map((p) => p.text.en).join(""),
      } as L,
    },
    { tag: process.label, title: process.title, text: process.intro },
  ],
  rulesLabel: { es: "Las reglas de la casa", en: "House rules" } as L,
  capabilitiesLabel: services.label,
  capabilitiesTitle: services.titleLines,
  /** Behind-the-scenes photos for the moodboard strips; the section is hidden while empty. */
  behindPhotos: [] as { src: string; width: number; height: number; alt: L }[],
};

/** Capabilities cloud: the 7 services + every team specialty (deduplicated). */
export const capabilities: L[] = (() => {
  const items: L[] = services.items.map((s) => ({
    es: [s.before?.es, s.after.es].filter(Boolean).join(" "),
    en: [s.before?.en, s.after.en].filter(Boolean).join(" "),
  }));
  for (const m of team.members) for (const s of m.skills) if (!items.some((i) => i.es === s.es)) items.push(s);
  return items;
})();
