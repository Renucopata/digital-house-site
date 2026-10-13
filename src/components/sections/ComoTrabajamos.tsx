import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/icons";
import { contact } from "@/content/contact";
import { comoTrabajamos } from "@/content/home";
import { cn } from "@/lib/cn";
import { reveal } from "@/lib/reveal";

/**
 * #como-trabajamos — the 5-step process. Vertical timeline on mobile, horizontal from 1024px.
 * Step 1 (Diagnóstico, the mandatory starting point) is filled to stand out.
 */
export function ComoTrabajamos() {
  return (
    <Section id="como-trabajamos" theme="dark" aria-labelledby="como-trabajamos-title">
      <Container className="flex flex-col gap-14 lg:gap-20">
        <SectionHeading
          eyebrow={comoTrabajamos.eyebrow}
          title={comoTrabajamos.title}
          titleId="como-trabajamos-title"
        />

        <ol className="relative grid gap-9 lg:grid-cols-5 lg:gap-6">
          {/* connecting hairline: vertical (mobile) through the circle centers, horizontal (desktop) */}
          <span aria-hidden="true" className="absolute top-7 bottom-7 left-7 w-px bg-line lg:hidden" />
          <span aria-hidden="true" className="absolute top-7 right-[10%] left-[10%] hidden h-px bg-line lg:block" />

          {comoTrabajamos.steps.map((step, index) => (
            <li key={step.title} {...reveal(index, 110)} className="relative flex gap-6 lg:flex-col lg:items-center lg:gap-6 lg:text-center">
              <span
                aria-hidden="true"
                className={cn(
                  "relative grid size-14 shrink-0 place-items-center rounded-full border font-serif text-[1.5rem] leading-none",
                  index === 0 ? "border-accent bg-accent text-on-accent" : "border-line bg-surface text-accent",
                )}
              >
                {index + 1}
              </span>
              <div className="flex flex-col gap-2 pt-2.5 lg:pt-0">
                <h3 className="font-sans text-[1.125rem] font-medium text-fg">
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
