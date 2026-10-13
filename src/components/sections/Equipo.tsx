import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Sparkle } from "@/components/ui/HandDrawn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { equipo } from "@/content/home";
import { reveal } from "@/lib/reveal";

/**
 * #equipo — the three specialists with initials avatars (D14, photos later), the
 * Eventos & Patrocinios band and the text-only client line (D13).
 */
export function Equipo() {
  return (
    <Section id="equipo" theme="dark" aria-labelledby="equipo-title">
      <Container className="flex flex-col gap-12 lg:gap-16">
        <SectionHeading eyebrow={equipo.eyebrow} title={equipo.title} titleId="equipo-title" lead={equipo.lead} />

        <ul className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {equipo.members.map((member, index) => (
            <li key={member.name} {...reveal(index)} className="flex flex-col gap-5 rounded-card border border-line p-7 sm:p-8">
              {/* initials avatar until the team photos arrive (D14) */}
              <span
                aria-hidden="true"
                className="grid size-16 place-items-center rounded-full bg-accent font-serif text-[1.5rem] tracking-[0.04em] text-on-accent"
              >
                {member.initials}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-sans text-h3 font-semibold text-fg">{member.name}</h3>
                <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-fg-soft">{member.role}</p>
              </div>
              <p className="font-serif text-[1.1875rem] leading-snug italic text-fg">{member.summary}</p>
              <p className="text-[0.9375rem] leading-relaxed text-fg-soft">{member.bio}</p>
            </li>
          ))}
        </ul>

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
          <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-2 font-serif text-[clamp(1.5rem,1.2rem+1.2vw,2.125rem)] text-fg">
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
