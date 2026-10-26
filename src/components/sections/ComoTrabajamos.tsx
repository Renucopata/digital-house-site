import type { CSSProperties } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/icons";
import { contact } from "@/content/contact";
import { comoTrabajamos } from "@/content/home";
import { reveal } from "@/lib/reveal";

/**
 * #como-trabajamos — the 5-step process. Vertical timeline on mobile, horizontal from 1024px.
 * Step 1 (Diagnóstico, the mandatory starting point) is filled to stand out. Hovering step K fills
 * the line up to it like a progress bar (D37, globals.css "Process line").
 */
export function ComoTrabajamos() {
  const steps = comoTrabajamos.steps;
  return (
    <Section id="como-trabajamos" theme="dark" aria-labelledby="como-trabajamos-title">
      <Container className="flex flex-col gap-14 lg:gap-20">
        <SectionHeading
          eyebrow={comoTrabajamos.eyebrow}
          title={comoTrabajamos.title}
          titleId="como-trabajamos-title"
        />

        <ol
          className="process relative grid gap-9 lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))] lg:gap-6"
          style={{ "--steps": steps.length } as CSSProperties}
        >
          {/* connecting hairline: vertical (mobile) through the circle centers, horizontal (desktop) */}
          <span aria-hidden="true" className="absolute top-7 bottom-7 left-7 w-px bg-line lg:hidden" />
          {/* desktop: from the first to the last circle center; the ivory fill grows on hover (D37) */}
          <span aria-hidden="true" className="process-track absolute top-7 hidden h-px bg-line lg:block">
            <span className="process-fill absolute top-1/2 left-0 h-0.5 -translate-y-1/2 rounded-full bg-accent" />
          </span>

          {steps.map((step, index) => (
            <li
              key={step.title}
              {...reveal(index, 110)}
              data-first={index === 0 ? "" : undefined}
              className="relative flex gap-6 lg:flex-col lg:items-center lg:gap-6 lg:text-center"
            >
              <span
                aria-hidden="true"
                style={{ "--k": index } as CSSProperties}
                className="process-dot relative grid size-14 shrink-0 place-items-center rounded-full border border-line bg-surface font-display text-[1.25rem] font-bold leading-none text-accent"
              >
                {index + 1}
              </span>
              <div className="flex flex-col gap-2 pt-2.5 lg:pt-0">
                <h3 className="font-display text-[1.125rem] font-bold text-fg">
                  <span className="sr-only">Paso {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="max-w-[22rem] text-[0.9375rem] leading-relaxed text-fg-soft lg:max-w-[13rem]">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div {...reveal()} className="flex justify-start lg:justify-center">
          <Button
            href={contact.whatsappUrl}
            external
            size="lg"
            icon={<WhatsAppIcon />}
            aria-label={comoTrabajamos.ctaAriaLabel}
          >
            {comoTrabajamos.cta}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
