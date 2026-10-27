import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Sparkle } from "@/components/ui/HandDrawn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SelectionBox } from "@/components/ui/SelectionBox";
import { TeamCard } from "@/components/ui/TeamCard";
import { equipo } from "@/content/home";
import { reveal } from "@/lib/reveal";

/**
 * #equipo — web brief Equipo: title with "tu crecimiento" in the selection box, the flip cards
 * (TeamCard: big initials until approved photos, specialty on the back), the closing line, the
 * Eventos & Patrocinios band and the text-only client line (D13).
 */
export function Equipo() {
  return (
    <Section id="equipo" theme="dark" aria-labelledby="equipo-title">
      <Container className="flex flex-col gap-12 lg:gap-16">
        <SectionHeading
          eyebrow={equipo.eyebrow}
          titleId="equipo-title"
          title={
            <>
              {equipo.title} <SelectionBox text={equipo.titleSelected} after={equipo.titleAfter} />
            </>
          }
        />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-5 xl:gap-5">
          {equipo.members.map((member, index) => (
            <li key={member.name} {...reveal(index)} className="flex">
              <TeamCard member={member} flipLabel={equipo.flipLabel} askLabel={equipo.askLabel} />
            </li>
          ))}
        </ul>

        <p {...reveal()} className="-mt-4 flex flex-col gap-1 text-fg-soft lg:-mt-8">
          <span className="text-[0.9375rem]">{equipo.closing.hint}</span>
          <span className="font-display text-[1.125rem] font-semibold text-fg">
            {equipo.closing.question} {equipo.closing.answer}
          </span>
        </p>

        <p {...reveal()} className="flex items-start gap-4 rounded-card border border-line px-6 py-5">
          <Sparkle className="mt-0.5 size-5 shrink-0" strokeWidth={1.5} />
          <span className="text-fg-soft">
            <strong className="font-medium text-fg">{equipo.extra.title}:</strong> {equipo.extra.text}
          </span>
        </p>

        <div {...reveal()} className="flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-baseline sm:gap-8">
          <Eyebrow as="span" className="shrink-0">
            {equipo.clients.label}
          </Eyebrow>
          <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-2 font-display font-bold text-[clamp(1.375rem,1.1rem+1.1vw,2rem)] text-fg">
            {equipo.clients.names.map((name, index) => (
              <li key={name} className="flex items-baseline gap-5">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-accent">
                    ·
                  </span>
                ) : null}
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
