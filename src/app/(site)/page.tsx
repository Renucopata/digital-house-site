import { Container } from "@/components/layout/Container";
import { Section, type SectionTheme } from "@/components/layout/Section";
import { ComoTrabajamos } from "@/components/sections/ComoTrabajamos";
import { Hero } from "@/components/sections/Hero";
import { QuienesSomos } from "@/components/sections/QuienesSomos";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { navItems } from "@/content/navigation";

/*
 * Phase 4 sections are still empty anchor targets (navigation keeps working).
 * Themes alternate after the dark #como-trabajamos; final themes are chosen in Phase 4.
 */
const pendingSections: Record<string, SectionTheme> = {
  servicios: "light",
  equipo: "sand",
  contacto: "light",
};

export default function Home() {
  return (
    <>
      <Hero />
      <QuienesSomos />
      <ComoTrabajamos />

      {navItems
        .filter((item) => item.id in pendingSections)
        .map((item) => (
          <Section
            key={item.id}
            id={item.id}
            theme={pendingSections[item.id]}
            aria-labelledby={`${item.id}-title`}
            className="min-h-[60vh]"
          >
            <Container className="flex flex-col gap-4">
              <Eyebrow>{item.label}</Eyebrow>
              <h2 id={`${item.id}-title`} className="font-serif text-h2 text-fg">
                [PENDIENTE: {item.label} — Fase 4]
              </h2>
            </Container>
          </Section>
        ))}
    </>
  );
}
