/**
 * Home content, copied from the user's reference artifact (2026-11-19). Spanish is the approved
 * source; English is a draft translation pending approval (CLAUDE.md §4.1).
 * `L` = one text in both languages; pick it with `tr(text, locale)`.
 */

export type L = { es: string; en: string };
export const tr = (text: L, locale: string): string => (locale === "en" ? text.en : text.es);

/* ---------- Hero ---------- */
export const hero = {
  pills: [
    { es: "Growth studio", en: "Growth studio" },
    { es: "Hecho en Bolivia", en: "Made in Bolivia" },
    { es: "Cero improvisación", en: "Zero improvisation" },
  ] as L[],
  titleLines: [
    { es: "Crecer", en: "Growing" },
    { es: "se ve", en: "looks" },
    { es: "muy bien", en: "really good" },
  ] as L[],
  statement: {
    before: { es: "Somos un ", en: "We are a " },
    strong: { es: "growth studio", en: "growth studio" },
    after: {
      es: ". Reunimos a los especialistas en estrategia, marca, sistemas y experiencias que tu negocio necesita, y los ponemos a trabajar como tu propio equipo de crecimiento.",
      en: ". We bring together the strategy, brand, systems and experience specialists your business needs, and put them to work as your own growth team.",
    },
  },
  illustrationAlt: {
    es: "Dos personajes caminando con carteles que dicen Digital y House",
    en: "Two characters walking with signs that read Digital and House",
  },
};

/* ---------- Ribbon marquee ---------- */
export const ribbon: L[] = [
  { es: "Primero entendemos", en: "First we understand" },
  { es: "Después crecemos", en: "Then we grow" },
  { es: "Nuevas ideas", en: "New ideas" },
  { es: "Más estrategia", en: "More strategy" },
];

/* ---------- About (read-along) ---------- */
export const about = {
  label: { es: "Un poco de nosotros", en: "A bit about us" },
  /** `em` parts are the highlighted ones. */
  parts: [
    { text: { es: "Creemos que un negocio crece cuando ", en: "We believe a business grows when " } },
    { text: { es: "estrategia, marca y tecnología reman hacia el mismo lado", en: "strategy, brand and technology row in the same direction" }, em: true },
    { text: { es: ". Medimos todo lo que hacemos y construimos marcas desde cero o ", en: ". We measure everything we do, and we build brands from scratch or " } },
    { text: { es: "hacemos crecer las que ya existen", en: "grow the ones that already exist" }, em: true },
    { text: { es: ".", en: "." } },
  ] as { text: L; em?: boolean }[],
  keywords: [
    { es: "Datos", en: "Data" },
    { es: "Creatividad", en: "Creativity" },
    { es: "Sistemas", en: "Systems" },
    { es: "Experiencias", en: "Experiences" },
  ] as L[],
};

/* ---------- Selected works ---------- */
export type WorkItem = {
  slug: string;
  client: string;
  category: L;
  /** Playful pill shown on hover. */
  pill: L;
  /** Grid size, as in the artifact. */
  size: "feature" | "wide" | "regular";
  /** Photo path in /public/works (pending: the artifact's photos are not in the repo yet). */
  image?: string;
  imageAlt: L;
};

export const works = {
  label: { es: "Proyectos destacados", en: "Featured projects" },
  title: { es: "Marcas que confiaron", en: "Brands that trusted us" },
  items: [
    {
      slug: "fury-cup",
      client: "Fury Cup de Altura",
      category: { es: "Deportes · Patrocinios y activaciones", en: "Sports · Sponsorships and activations" },
      pill: { es: "Evento de principio a fin", en: "Event from start to finish" },
      size: "feature",
      imageAlt: { es: "Cancha de la Fury Cup de Altura vista a través del arco inflable de Colnatur Sport, con banderas de Check", en: "Fury Cup de Altura pitch seen through the Colnatur Sport inflatable arch, with Check flags" },
    },
    {
      slug: "vida",
      client: "VIDA",
      category: { es: "Fitness · Identidad de marca", en: "Fitness · Brand identity" },
      pill: { es: "Energía de marca", en: "Brand energy" },
      size: "wide",
      imageAlt: { es: "Letrero iluminado de VIDA Indoor Cycling en la pared del estudio", en: "Illuminated VIDA Indoor Cycling sign on the studio wall" },
    },
    {
      slug: "zareliz",
      client: "Zareliz",
      category: { es: "Moda · Identidad de marca", en: "Fashion · Brand identity" },
      pill: { es: "Spoiler: funcionó", en: "Spoiler: it worked" },
      size: "regular",
      imageAlt: { es: "Bolsa con la identidad de Zareliz Modas", en: "Bag with the Zareliz Modas identity" },
    },
    {
      slug: "canel-roll",
      client: "Canel Roll",
      category: { es: "Pastelería · Identidad y packaging", en: "Bakery · Identity and packaging" },
      pill: { es: "Hecho a medida", en: "Made to measure" },
      size: "regular",
      imageAlt: { es: "Identidad y packaging de Canel Roll", en: "Canel Roll identity and packaging" },
    },
    {
      slug: "bosque-sur",
      client: "Bosque Sur",
      category: { es: "Inmobiliaria · Identidad de marca", en: "Real estate · Brand identity" },
      pill: { es: "Con datos de por medio", en: "Backed by data" },
      size: "regular",
      imageAlt: { es: "Logo y aplicaciones de Bosque Sur", en: "Bosque Sur logo and applications" },
    },
    {
      slug: "guinness",
      client: "Guinness",
      category: { es: "Bebidas · Punto de venta y redes", en: "Beverages · Point of sale and social" },
      pill: { es: "Y hay más", en: "And there's more" },
      size: "regular",
      imageAlt: { es: "Material de punto de venta de Guinness", en: "Guinness point-of-sale material" },
    },
    {
      slug: "carabao",
      client: "Carabao",
      category: { es: "Bebidas · Campaña y redes", en: "Beverages · Campaign and social" },
      pill: { es: "Spoiler: funcionó", en: "Spoiler: it worked" },
      size: "regular",
      imageAlt: { es: "Campaña de Carabao", en: "Carabao campaign" },
    },
    {
      slug: "bendita",
      client: "Bendita",
      category: { es: "Cervecería · Redes y lanzamientos", en: "Brewery · Social and launches" },
      pill: { es: "Con datos de por medio", en: "Backed by data" },
      size: "wide",
      imageAlt: { es: "Lanzamientos de Bendita", en: "Bendita launches" },
    },
  ] as WorkItem[],
  more: { es: "Y la lista sigue.", en: "And the list goes on." },
  moreCta: { es: "Ver proyectos →", en: "See projects →" },
  imagePending: { es: "[PENDIENTE: foto del proyecto]", en: "[PENDING: project photo]" },
};

/* ---------- Client logos (two rows, opposite directions) ---------- */
export type ClientLogo = { name: string; logo?: { src: string; width: number; height: number } };

export const clientsLabel: L = { es: "Marcas con las que trabajamos", en: "Brands we have worked with" };

export const clientRows: ClientLogo[][] = [
  [
    { name: "Technogym", logo: { src: "/clients/technogym.png", width: 928, height: 160 } },
    { name: "Guinness", logo: { src: "/clients/guinness.png", width: 727, height: 160 } },
    { name: "Carabao", logo: { src: "/clients/carabao.png", width: 472, height: 160 } },
    { name: "Universidad Católica Boliviana", logo: { src: "/clients/ucb.png", width: 367, height: 160 } },
    { name: "Zareliz", logo: { src: "/clients/zareliz.png", width: 439, height: 160 } },
    { name: "Totto", logo: { src: "/clients/totto.png", width: 474, height: 160 } },
    { name: "VIDA" },
  ],
  [
    { name: "Fury Cup", logo: { src: "/clients/fury-cup.png", width: 739, height: 160 } },
    { name: "Cámara Italia Bolivia", logo: { src: "/clients/italia-bolivia.png", width: 402, height: 160 } },
    { name: "La Suprema", logo: { src: "/clients/la-suprema.png", width: 373, height: 160 } },
    { name: "Aster Surgery", logo: { src: "/clients/aster-surgery.png", width: 1701, height: 160 } },
    { name: "Burguesa", logo: { src: "/clients/burguesa.png", width: 737, height: 160 } },
    { name: "Schmidts Pharma", logo: { src: "/clients/schmidts-pharma.png", width: 478, height: 160 } },
    { name: "IALS", logo: { src: "/clients/ials.png", width: 281, height: 160 } },
  ],
];

/* ---------- Services ---------- */
export type ServiceIcon = "strategy" | "intelligence" | "identity" | "social" | "systems" | "merch" | "events";

export const services = {
  label: { es: "Servicios", en: "Services" },
  titleLines: [
    { es: "Lo que hacemos", en: "What we do" },
    { es: "(y hacemos bien)", en: "(and do well)" },
  ] as L[],
  items: [
    { icon: "strategy", before: { es: "Brand", en: "Brand" }, after: { es: "Strategy", en: "Strategy" }, desc: { es: "Entendemos tu negocio y trazamos la ruta: diagnóstico, posicionamiento y concepto.", en: "We understand your business and map the route: diagnosis, positioning and concept." }, x: "40%" },
    { icon: "intelligence", before: { es: "Business", en: "Business" }, after: { es: "Intelligence", en: "Intelligence" }, desc: { es: "Dashboards y métricas para decidir con números, no con corazonadas.", en: "Dashboards and metrics to decide with numbers, not hunches." }, x: "3%" },
    { icon: "identity", before: { es: "Brand", en: "Brand" }, after: { es: "Identity", en: "Identity" }, desc: { es: "Logo, sistema visual y contenido para que te reconozcan a la primera.", en: "Logo, visual system and content so people recognize you at first sight." }, x: "30%" },
    { icon: "social", before: { es: "Content &", en: "Content &" }, after: { es: "Social Media", en: "Social Media" }, desc: { es: "Creamos el contenido y manejamos tus redes: calendario, publicaciones, comunidad y reportes.", en: "We create the content and run your social media: calendar, posts, community and reports." }, x: "44%" },
    { icon: "systems", before: { es: "Digital", en: "Digital" }, after: { es: "Systems", en: "Systems" }, desc: { es: "Webs, apps, CRMs y automatizaciones que trabajan por ti.", en: "Websites, apps, CRMs and automations that work for you." }, x: "6%" },
    { icon: "merch", after: { es: "Merchandising", en: "Merchandising" }, desc: { es: "Impresos, merch y piezas que la gente se lleva a casa.", en: "Print, merch and pieces people take home." }, x: "36%" },
    { icon: "events", before: { es: "Events &", en: "Events &" }, after: { es: "Experiences", en: "Experiences" }, desc: { es: "Activaciones, patrocinios y eventos que la gente cuenta.", en: "Activations, sponsorships and events people talk about." }, x: "8%" },
  ] as { icon: ServiceIcon; before?: L; after: L; desc: L; x: string }[],
  note: {
    before: { es: "Nos cuentas tu negocio y armamos una propuesta ", en: "You tell us about your business and we put together a proposal " },
    strong: { es: "hecha a medida", en: "made to measure" },
    after: { es: ".", en: "." },
  },
};

/* ---------- How we work ---------- */
export const process = {
  label: { es: "Cómo trabajamos", en: "How we work" },
  title: { es: "Entender primero lo cambia todo", en: "Understanding first changes everything" },
  intro: {
    es: "Cada negocio tiene desafíos distintos. Por eso, antes de proponer cualquier acción, analizamos tu contexto, detectamos oportunidades y definimos lo que de verdad necesitas para avanzar.",
    en: "Every business has different challenges. That's why, before proposing anything, we analyze your context, spot opportunities and define what you really need to move forward.",
  },
  steps: [
    { title: { es: "Entender", en: "Understand" }, desc: { es: "Diagnosticamos tu negocio, tu cliente y lo que hoy te frena.", en: "We diagnose your business, your customer and what holds you back today." } },
    { title: { es: "Definir", en: "Define" }, desc: { es: "Trazamos la estrategia y ordenamos las prioridades.", en: "We map the strategy and set the priorities." } },
    { title: { es: "Resolver", en: "Solve" }, desc: { es: "Ejecutamos con los especialistas que tu proyecto necesita.", en: "We execute with the specialists your project needs." } },
    { title: { es: "Evolucionar", en: "Evolve" }, desc: { es: "Medimos, damos seguimiento y encontramos nuevas oportunidades de mejora.", en: "We measure, follow up and find new opportunities to improve." } },
  ] as { title: L; desc: L }[],
  goal: { es: "Meta", en: "Goal" },
};

/* ---------- Team ---------- */
export type TeamMember = {
  name: string;
  firstName: string;
  role: L;
  /** Badge shown on the card (only the founder has one). */
  badge?: L;
  quote: L;
  bio: L;
  skills: L[];
  portfolio?: string;
};

export const team = {
  label: { es: "El equipo", en: "The team" },
  title: { es: "Las personas detrás", en: "The people behind" },
  intro: { es: "Cada proyecto arma su propio equipo. Estos son los especialistas que pueden entrar en el tuyo.", en: "Every project builds its own team. These are the specialists who can join yours." },
  skillsLabel: { es: "Especialista en", en: "Specialist in" },
  talkTo: { es: "Hablar con", en: "Talk to" },
  portfolio: { es: "Ver portafolio →", en: "See portfolio →" },
  prev: { es: "Persona anterior", en: "Previous person" },
  next: { es: "Persona siguiente", en: "Next person" },
  members: [
    {
      name: "Nicole Pantoja",
      firstName: "Nicole",
      role: { es: "Fundadora y Directora de Estrategia", en: "Founder and Strategy Director" },
      badge: { es: "Fundadora", en: "Founder" },
      quote: { es: "Cada proyecto necesita a alguien que no pierda de vista la meta.", en: "Every project needs someone who never loses sight of the goal." },
      bio: { es: "Fundadora de Digital House. Consultora de negocio y directora estratégica: diagnostica dónde está cada empresa, define a dónde tiene que llegar y se asegura de que cada proyecto cumpla esa meta.", en: "Founder of Digital House. Business consultant and strategy director: she diagnoses where each company stands, defines where it needs to go and makes sure every project reaches that goal." },
      skills: [
        { es: "Consultoría de negocio", en: "Business consulting" },
        { es: "Dirección estratégica", en: "Strategic direction" },
        { es: "Gestión de proyectos", en: "Project management" },
      ],
    },
    {
      name: "Nicole Vidaurre",
      firstName: "Nicole",
      role: { es: "Directora Creativa", en: "Creative Director" },
      quote: { es: "Si se ve genérico, todavía no está listo.", en: "If it looks generic, it isn't ready yet." },
      bio: { es: "Directora creativa del estudio, especializada en identidad visual y contenido para marcas. Su trabajo incluye marcas nacionales e internacionales.", en: "The studio's creative director, specialized in visual identity and content for brands. Her work includes national and international brands." },
      skills: [
        { es: "Identidad visual", en: "Visual identity" },
        { es: "Dirección de arte", en: "Art direction" },
        { es: "Contenido para redes", en: "Social media content" },
      ],
      portfolio: "https://www.behance.net/nicolevilld04a",
    },
    {
      name: "Rene Rengel",
      firstName: "Rene",
      role: { es: "Director de Desarrollo y Soluciones Digitales", en: "Director of Development and Digital Solutions" },
      quote: { es: "Si una tarea se repite, se puede automatizar.", en: "If a task repeats, it can be automated." },
      bio: { es: "Director de desarrollo y soluciones digitales. Diseña y desarrolla las herramientas de cada proyecto, desde la web hasta los sistemas internos, para que el negocio funcione mejor.", en: "Director of development and digital solutions. He designs and builds each project's tools, from the website to internal systems, so the business runs better." },
      skills: [
        { es: "Desarrollo web y apps", en: "Web and app development" },
        { es: "CRMs", en: "CRMs" },
        { es: "Automatización de procesos", en: "Process automation" },
      ],
    },
    {
      name: "Michelle Vidaurre",
      firstName: "Michelle",
      role: { es: "Directora de Eventos y BTL", en: "Events and BTL Director" },
      quote: { es: "Las marcas también se viven en persona.", en: "Brands are also lived in person." },
      bio: { es: "Especialista en eventos y marketing BTL. Diseña activaciones, gestiona patrocinios y coordina la logística para que cada experiencia salga como se planeó.", en: "Specialist in events and BTL marketing. She designs activations, manages sponsorships and coordinates logistics so every experience goes as planned." },
      skills: [
        { es: "Eventos corporativos", en: "Corporate events" },
        { es: "Activaciones BTL", en: "BTL activations" },
        { es: "Patrocinios", en: "Sponsorships" },
      ],
    },
    {
      name: "Matias Rossel",
      firstName: "Matias",
      role: { es: "Socio de Producción y Merchandising", en: "Production and Merchandising Partner" },
      quote: { es: "Lo que se puede tocar, se recuerda.", en: "What you can touch, you remember." },
      bio: { es: "Especialista en producción gráfica y merchandising. Convierte la identidad de una marca en impresos, merch y materiales para eventos, cuidando calidad y acabados.", en: "Specialist in graphic production and merchandising. He turns a brand's identity into print, merch and event materials, taking care of quality and finishes." },
      skills: [
        { es: "Producción gráfica", en: "Graphic production" },
        { es: "Merchandising", en: "Merchandising" },
        { es: "Materiales POP", en: "POP materials" },
      ],
    },
  ] as TeamMember[],
  closing: { es: "¿Quién entra en tu proyecto? Lo decidimos juntos, después de escucharte.", en: "Who joins your project? We decide together, after listening to you." },
  cta: { es: "Arma tu equipo →", en: "Build your team →" },
  ctaMessage: { es: "Hola, quiero armar un equipo para mi proyecto", en: "Hi, I'd like to build a team for my project" },
  talkMessage: { es: "Hola, quiero hablar con", en: "Hi, I'd like to talk to" },
};

/* ---------- FAQ ---------- */
export const faq = {
  label: { es: "Preguntas frecuentes", en: "Frequently asked questions" },
  title: { es: "Antes de que preguntes", en: "Before you ask" },
  items: [
    { q: { es: "¿Qué tipo de proyectos hacen?", en: "What kind of projects do you do?" }, a: { es: "Desde ordenar la estrategia de un negocio hasta lanzar una marca, una web, un sistema o un evento. Muchas veces, todo junto.", en: "From sorting out a business's strategy to launching a brand, a website, a system or an event. Often, all at once." } },
    { q: { es: "¿Cuánto cuesta?", en: "How much does it cost?" }, a: { es: "Depende del alcance. Después del diagnóstico te pasamos una propuesta clara, sin sorpresas.", en: "It depends on the scope. After the diagnosis we send you a clear proposal, no surprises." } },
    { q: { es: "¿Trabajan con marcas que ya existen?", en: "Do you work with brands that already exist?" }, a: { es: "Sí. A veces se construye desde cero y a veces se ordena lo que ya hay.", en: "Yes. Sometimes we build from scratch and sometimes we sort out what's already there." } },
    { q: { es: "¿Tengo que contratar todos los servicios?", en: "Do I have to hire every service?" }, a: { es: "No. Armamos solo lo que tu negocio necesita.", en: "No. We put together only what your business needs." } },
    { q: { es: "¿Cuánto me tengo que involucrar?", en: "How involved do I need to be?" }, a: { es: "Al inicio, bastante: nadie conoce tu negocio mejor que tú. Después nos encargamos nosotros y te mantenemos al tanto.", en: "Quite a lot at the start: nobody knows your business better than you. After that we take over and keep you posted." } },
    { q: { es: "¿Cuándo podemos empezar?", en: "When can we start?" }, a: { es: "Escríbenos y agendamos el diagnóstico.", en: "Write to us and we'll schedule the diagnosis." } },
    { q: { es: "¿Trabajan con negocios pequeños?", en: "Do you work with small businesses?" }, a: { es: "Sí. Crecer no es solo para los grandes.", en: "Yes. Growing isn't just for the big ones." } },
  ] as { q: L; a: L }[],
};

/* ---------- Closing CTA (before the footer) ---------- */
export const closing = {
  titleLines: [
    { es: "Entendamos tu", en: "Let's understand your" },
    { es: "negocio primero", en: "business first" },
  ] as L[],
  text: { es: "El primer paso siempre es una conversación: dónde estás y a dónde quieres llegar.", en: "The first step is always a conversation: where you are and where you want to go." },
  cta: { es: "Hablemos por WhatsApp →", en: "Let's talk on WhatsApp →" },
  mailBefore: { es: "o escríbenos a", en: "or write to us at" },
};
