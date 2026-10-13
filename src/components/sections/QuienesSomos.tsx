import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { quienesSomos } from "@/content/home";
import { cn } from "@/lib/cn";

/** #quienes-somos — positioning statement + the three differentiators (middle card emphasized). */
export function QuienesSomos() {
  return (
    <Section id="quienes-somos" theme="sand" grain aria-labelledby="quienes-somos-title">
      <Container className="flex flex-col gap-14 lg:gap-16">
        <SectionHeading
          eyebrow={quienesSomos.eyebrow}
          title={quienesSomos.title}
          titleId="quienes-somos-title"
          lead={quienesSomos.lead}
        />

        <ul className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {quienesSomos.pillars.map((pillar, index) => (
            <li
              key={pillar.title}
              className={cn(
                pillar.emphasis ? "theme-dark border-transparent" : "theme-light border-line",
                "flex flex-col gap-5 rounded-card border bg-surface p-7 text-fg sm:p-8",
              )}
            >
              <span aria-hidden="true" className="font-serif text-[2.75rem] leading-none text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="flex flex-col gap-1">
                <span className="font-sans text-h3 font-semibold text-fg">{pillar.title}</span>
                <span className="font-serif text-[1.3125rem] italic text-accent">— {pillar.contrast}</span>
              </h3>
              <p className="text-[0.9375rem] leading-relaxed text-fg-soft">{pillar.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
