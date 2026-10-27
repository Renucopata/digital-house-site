import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { RotatingWord } from "@/components/ui/RotatingWord";
import { soluciones } from "@/content/home";
import { reveal } from "@/lib/reveal";

/**
 * The "smaller hero" right under the hero (D40): "Soluciones digitales para que" + a word that
 * changes every 2.3 s in Playfair Display italic, guinda principal (web brief), and the subtitle.
 */
export function Soluciones() {
  return (
    <Section theme="light" aria-labelledby="soluciones-title" className="border-t border-line">
      <Container className="flex flex-col items-center gap-7 text-center">
        <h2
          id="soluciones-title"
          {...reveal()}
          className="flex flex-col items-center gap-1 font-display text-[clamp(1.5rem,1.15rem+1.5vw,2.5rem)] leading-tight font-bold tracking-[-0.02em] text-fg"
        >
          <span className="sr-only">{soluciones.srText}</span>
          <span aria-hidden="true">{soluciones.lead}</span>
          <RotatingWord
            words={soluciones.words}
            className="font-accent text-[clamp(2.75rem,1.4rem+5.6vw,6.25rem)] leading-[1.15] font-medium tracking-[-0.01em] whitespace-nowrap text-burgundy italic"
          />
        </h2>
        <p {...reveal(1)} className="max-w-[34rem] text-lead text-pretty text-fg-soft">
          {soluciones.subtitle}
        </p>
      </Container>
    </Section>
  );
}
