import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { servicios } from "@/content/home";
import { reveal } from "@/lib/reveal";

/**
 * #servicios — the 5 pillars as stacked blocks, all content visible (D25, option a).
 * Option c (summary cards + expandable details) is kept for later in docs/IDEAS.txt (I-01).
 */
export function Servicios() {
  return (
    <Section id="servicios" theme="light" aria-labelledby="servicios-title">
      <Container className="flex flex-col gap-12 lg:gap-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-10">
          <SectionHeading
            eyebrow={servicios.eyebrow}
            title={servicios.title}
            titleId="servicios-title"
            lead={servicios.lead}
            className="lg:col-span-6"
          />

          {/* index: jump links to each pillar, with the short taglines */}
          <nav aria-label={servicios.indexLabel} {...reveal(1)} className="lg:col-span-6">
            <ol className="border-t border-line">
              {servicios.pillars.map((pillar, index) => (
                <li key={pillar.id} className="border-b border-line">
                  <a
                    href={`#${pillar.id}`}
                    className="group flex items-baseline gap-4 py-3 transition-colors duration-300 ease-soft hover:text-accent"
                  >
                    <span className="w-7 shrink-0 font-display text-[1rem] font-bold text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <span className="font-semibold">{pillar.title}</span>
                      <span className="text-sm text-fg-soft sm:text-right">{pillar.short}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <ol>
          {servicios.pillars.map((pillar, index) => {
            const number = String(index + 1).padStart(2, "0");
            return (
              <li
                key={pillar.id}
                id={pillar.id}
                aria-labelledby={`${pillar.id}-title`}
                {...reveal()}
                className="grid gap-6 border-t border-line py-12 lg:grid-cols-12 lg:gap-10 lg:py-20"
              >
                <div className="lg:col-span-4">
                  <span
                    aria-hidden="true"
                    className="block font-display text-[clamp(4rem,2.75rem+5vw,7.5rem)] font-extrabold leading-[0.85] tracking-[-0.04em] text-accent lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]"
                  >
                    {number}
                  </span>
                </div>

                <div className="flex flex-col gap-7 lg:col-span-8">
                  <header className="flex flex-col gap-3">
                    <h3
                      id={`${pillar.id}-title`}
                      className="font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-balance text-fg"
                    >
                      <span className="sr-only">Servicio {number}: </span>
                      {pillar.title}
                    </h3>
                    <p className="font-display text-[1.1875rem] leading-snug font-semibold text-accent">{pillar.tagline}</p>
                  </header>

                  <p className="max-w-[40rem] text-fg-soft">{pillar.description}</p>

                  <div className="flex flex-col gap-3">
                    <Eyebrow as="span">{servicios.includesLabel}</Eyebrow>
                    <ul className="flex flex-wrap gap-2">
                      {pillar.includes.map((item) => (
                        <li key={item} className="rounded-full border border-line px-4 py-1.5 text-sm text-fg">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="theme-dark flex flex-col gap-2 rounded-card bg-surface px-6 py-5 text-fg sm:flex-row sm:items-baseline sm:gap-5">
                    <Eyebrow as="span" className="shrink-0">
                      {servicios.deliverableLabel}
                    </Eyebrow>
                    <p className="text-[0.9375rem] leading-relaxed">{pillar.deliverable}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
