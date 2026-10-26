import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { quienesSomos } from "@/content/home";
import { reveal } from "@/lib/reveal";

/**
 * #quienes-somos — positioning statement + the three differentiators as "pick cards" (D35):
 * the emphasized (middle) card is the chosen one and floats as if waiting to be picked; hovering
 * another card makes that one dark and lifted instead (globals.css, "Pick cards").
 * The reveal sits on the <li>, the card styles and motion on the inner <div>, so the two
 * transforms never fight.
 */
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

        <ul className="pick-group grid gap-5 pt-2 md:grid-cols-3 lg:gap-6">
          {quienesSomos.pillars.map((pillar, index) => (
            <li key={pillar.title} {...reveal(index)} className="flex">
              <div
                data-default={pillar.emphasis ? "" : undefined}
                className="pick-card flex w-full flex-col gap-5 rounded-card border bg-surface p-7 text-fg sm:p-8"
              >
                <span aria-hidden="true" className="font-display text-[2.5rem] font-extrabold leading-none text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="flex flex-col gap-1">
                  <span className="font-display text-h3 font-bold text-fg">{pillar.title}</span>
                  <span className="font-display text-[1.125rem] font-semibold text-accent">— {pillar.contrast}</span>
                </h3>
                <p className="text-[0.9375rem] leading-relaxed text-fg-soft">{pillar.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
