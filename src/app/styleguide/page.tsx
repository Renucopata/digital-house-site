import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Section, type SectionTheme } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HandArrow, HandUnderline, Sparkle } from "@/components/ui/HandDrawn";
import { InstagramPill } from "@/components/ui/InstagramPill";
import { Logo, type LogoVariant } from "@/components/ui/Logo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/icons";
import { contact } from "@/content/contact";

// Internal review page (PLAN.md Phase 1.7). Hidden from search engines; not linked anywhere.
export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const colors = [
  { token: "--burgundy", hex: "#670812", use: "Monograma, titulares, botones", cls: "bg-burgundy", dark: true },
  { token: "--burgundy-deep", hex: "#51020C", use: "Secciones oscuras, tinta del wordmark", cls: "bg-burgundy-deep", dark: true },
  { token: "--cream", hex: "#F8F4E9", use: "Fondo principal", cls: "bg-cream" },
  { token: "--ivory", hex: "#F3EBE0", use: "Texto sobre oscuro, superficies", cls: "bg-ivory" },
  { token: "--sand", hex: "#EFE6DC", use: "Secciones kraft", cls: "bg-sand" },
  { token: "--sand-deep", hex: "#E7D8CA", use: "Manchas de pincel, acentos kraft", cls: "bg-sand-deep" },
  { token: "--ink", hex: "#481F1E", use: "Texto", cls: "bg-ink", dark: true },
  { token: "--ink-soft", hex: "#6B5552", use: "Texto secundario", cls: "bg-ink-soft", dark: true },
];

// WCAG contrast ratios computed in Phase 0 (docs/phase-0-discovery.txt §5.3).
const contrasts = [
  ["ink / cream", "12.8"],
  ["ink-soft / cream", "6.3"],
  ["ink-soft / sand", "5.6"],
  ["burgundy / cream", "11.8"],
  ["burgundy / sand", "10.5"],
  ["ivory / burgundy-deep", "13.0"],
  ["cream / burgundy", "11.8"],
];

const logos: { variant: LogoVariant; note: string; pending?: boolean }[] = [
  { variant: "wordmark-cream", note: "Oficial (IMG-5), colores normalizados a tokens" },
  { variant: "wordmark-burgundy", note: "Recolor D20 del lockup oficial — para el header", pending: true },
  { variant: "monogram", note: "Monograma dH (IMG-3), fondo normalizado a --cream", pending: true },
  { variant: "monogram-cream", note: "Monograma dH invertido para fondos oscuros", pending: true },
];

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-6 border-t border-line pt-8">
      <h2 className="font-sans text-xs font-medium uppercase tracking-label text-fg-soft">{title}</h2>
      {children}
    </div>
  );
}

function ThemeDemo({ theme, grain, shadow }: { theme: SectionTheme; grain?: boolean; shadow?: boolean }) {
  return (
    <Section theme={theme} grain={grain} windowShadow={shadow} className="rounded-card" flush>
      <div className="flex flex-col gap-6 p-8 sm:p-12">
        <SectionHeading
          eyebrow={`theme-${theme}${grain ? " · grain" : ""}${shadow ? " · window shadow" : ""}`}
          title={
            <>
              No vendemos estética. <em>Vendemos crecimiento.</em>
            </>
          }
          lead="Lo digital es el motor — la marca, el contenido y las herramientas son la consecuencia de entender primero cómo funciona y crece cada negocio, no el punto de partida."
        />
        <div className="flex flex-wrap gap-3">
          <Button href={contact.whatsappUrl} external icon={<WhatsAppIcon />}>
            Escríbenos por WhatsApp
          </Button>
          <Button href={contact.mailto} variant="outline">
            {contact.email}
          </Button>
        </div>
      </div>
    </Section>
  );
}

export default function StyleguidePage() {
  return (
    <main className="pb-32">
      <Section theme="light" grain windowShadow>
        <Container className="flex flex-col gap-4">
          <Eyebrow>Interno · noindex</Eyebrow>
          <h1 className="font-serif text-h1">Styleguide — Fase 1</h1>
          <p className="max-w-2xl text-fg-soft">
            Tokens, tipografía y componentes base del sitio DigitalHouse Growth Studio. Fuente de verdad:
            CLAUDE.md §4 y docs/phase-1-setup-design-system.txt.
          </p>
        </Container>
      </Section>

      <Container className="flex flex-col gap-16 py-12">
        <Block title="Colores">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {colors.map((c) => (
              <li key={c.token} className="overflow-hidden rounded-card border border-line">
                <div className={`${c.cls} h-20`} />
                <div className="flex flex-col gap-0.5 p-3 text-sm">
                  <code className="font-medium text-ink">{c.token}</code>
                  <span className="text-ink-soft">{c.hex}</span>
                  <span className="text-xs text-ink-soft">{c.use}</span>
                </div>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-fg-soft">
            {contrasts.map(([pair, ratio]) => (
              <li key={pair}>
                {pair}: <strong className="font-medium text-fg">{ratio}:1</strong> AA
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Tipografía">
          <div className="flex flex-col gap-6">
            <p className="font-serif text-display">digital estrategia</p>
            <p className="font-serif text-h1">Entendamos tu negocio primero.</p>
            <p className="font-serif text-h2">
              Un proceso, no una <em className="italic">improvisación</em>
            </p>
            <p className="font-sans text-h2 font-extrabold uppercase tracking-[-0.01em] text-accent">Crecimiento</p>
            <p className="font-sans text-h3 font-medium">Consultoría de Negocio &amp; Marca</p>
            <p className="max-w-2xl text-lead text-fg-soft">
              El primer paso siempre es el mismo: una consultoría para entender dónde estás y a dónde quieres llegar.
            </p>
            <p className="max-w-2xl">
              Cuerpo — Poppins 400, 16px, interlineado 1.7. Antes de cualquier pieza de marca o contenido, hay una
              consultoría que entiende cómo ese negocio específico genera valor, quién es su cliente y cuáles son sus
              cuellos de botella reales.
            </p>
            <Eyebrow>Growth studio · etiqueta 12px · tracking 0.35em</Eyebrow>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-1 text-sm text-fg-soft sm:grid-cols-2">
            <div>display — clamp(48px → 104px) · Bodoni Moda</div>
            <div>h1 — clamp(40px → 76px) · Bodoni Moda</div>
            <div>h2 — clamp(32px → 52px) · Bodoni Moda / Poppins 800</div>
            <div>h3 — clamp(20px → 24px) · Poppins 500</div>
            <div>lead — clamp(17px → 20px) · Poppins 400</div>
            <div>label — 12px · Poppins 400 · 0.35em</div>
          </dl>
        </Block>

        <Block title="Titular — patrón del post Ctrl + N (sans)">
          <SectionHeading
            font="sans"
            size="h2"
            title={
              <>
                <strong>Nuevas ideas.</strong>
                <br />
                <strong>Más estrategia.</strong>
                <br />
                Misma pasión por
                <br />
                <HandUnderline>hacer crecer</HandUnderline> tu negocio.
              </>
            }
          />
        </Block>

        <Block title="Botones">
          <div className="flex flex-wrap items-center gap-4">
            <Button href={contact.whatsappUrl} external icon={<WhatsAppIcon />} size="lg">
              Agenda tu consultoría
            </Button>
            <Button href={contact.whatsappUrl} external>
              Filled md
            </Button>
            <Button href={contact.mailto} variant="outline" size="lg">
              Outline lg
            </Button>
            <Button variant="outline">Outline md (button)</Button>
          </div>
        </Block>

        <Block title="Acentos dibujados a mano (SVG)">
          <div className="flex flex-wrap items-end gap-12">
            <p className="font-serif text-h2">
              Vendemos <HandUnderline>crecimiento</HandUnderline>
            </p>
            <HandArrow />
            <HandArrow className="-scale-x-100" />
            <Sparkle />
            <Sparkle className="size-16" strokeWidth={1.5} />
          </div>
        </Block>

        <Block title="Instagram pill">
          <div className="flex flex-wrap gap-10">
            <InstagramPill />
            <Section theme="dark" flush className="rounded-card px-10 py-8">
              <InstagramPill />
            </Section>
          </div>
        </Block>

        <Block title="Logos (public/brand)">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {logos.map((l) => (
              <li key={l.variant} className="flex flex-col gap-3">
                <div
                  className={`grid h-52 place-items-center rounded-card ${
                    l.variant.endsWith("cream") ? "bg-burgundy-deep" : "bg-cream ring-1 ring-line"
                  }`}
                >
                  <Logo variant={l.variant} width={l.variant.startsWith("monogram") ? 120 : 260} />
                </div>
                <p className="text-sm text-fg-soft">
                  <code className="text-fg">{l.variant}</code> — {l.note}
                  {l.pending ? (
                    <span className="ml-2 inline-block whitespace-nowrap rounded-full border border-accent px-2 py-0.5 text-xs text-accent">
                      Pendiente de aprobación
                    </span>
                  ) : null}
                </p>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Secciones (temas + texturas)">
          <div className="flex flex-col gap-6">
            <ThemeDemo theme="light" grain shadow />
            <ThemeDemo theme="sand" grain />
            <ThemeDemo theme="dark" grain />
          </div>
        </Block>

        <Block title="Botón flotante de WhatsApp">
          <p className="text-fg-soft">
            Global (root layout), fijo abajo a la derecha (ver esquina). Abre wa.me/{contact.whatsappNumber} en una pestaña
            nueva con el mensaje: “{contact.whatsappMessage}”
          </p>
        </Block>
      </Container>

    </main>
  );
}
