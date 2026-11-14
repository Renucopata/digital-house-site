import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { credenciales } from "@/content/home";
import { reveal } from "@/lib/reveal";

/**
 * #credenciales — web brief "Confían en nosotros" (D43): title, then the brands the team has
 * worked with passing on a full-width dark band (LogoMarquee). Replaces the text-only client
 * line that sat under Equipo (D13, D31). No bottom padding: the band closes the section (D44).
 */
export function Credenciales() {
  return (
    <Section id="credenciales" theme="light" aria-labelledby="credenciales-title" className="overflow-hidden pb-0">
      <Container>
        <SectionHeading
          eyebrow={credenciales.eyebrow}
          titleId="credenciales-title"
          title={
            <>
              {credenciales.title} <span className="font-medium whitespace-nowrap text-fg-soft">{credenciales.titleSoft}</span>{" "}
              {credenciales.titleAfter}
            </>
          }
        />
      </Container>
      <div {...reveal(1)} className="mt-12 lg:mt-16">
        <LogoMarquee brands={credenciales.brands} label={credenciales.eyebrow} />
      </div>
    </Section>
  );
}
