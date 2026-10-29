import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AreasShelf } from "@/components/ui/AreasShelf";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { servicios } from "@/content/home";
import { reveal } from "@/lib/reveal";

/**
 * #servicios — web brief "Seis áreas. Un solo equipo." (D42): the six work areas as a shelf of
 * panels (AreasShelf) and the closing line. Replaces the 5 stacked pillars (D25).
 */
export function Servicios() {
  return (
    <Section id="servicios" theme="light" aria-labelledby="servicios-title">
      <Container className="flex flex-col gap-10 lg:gap-12">
        <SectionHeading
          eyebrow={servicios.eyebrow}
          titleId="servicios-title"
          title={
            <>
              {servicios.title} <strong>{servicios.titleStrong}</strong>
            </>
          }
        />

        <div {...reveal(1)}>
          <AreasShelf areas={servicios.areas} linkLabel={servicios.linkLabel} />
        </div>

        <p {...reveal()} className="max-w-[40rem] font-display text-[clamp(1.25rem,1rem+1.1vw,1.875rem)] leading-snug font-semibold text-balance text-fg">
          {servicios.closing}
        </p>
      </Container>
    </Section>
  );
}
