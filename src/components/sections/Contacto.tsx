import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HandArrow, HandUnderline } from "@/components/ui/HandDrawn";
import { InstagramPill } from "@/components/ui/InstagramPill";
import { WhatsAppIcon } from "@/components/ui/icons";
import { contact } from "@/content/contact";
import { contacto } from "@/content/home";
import { reveal } from "@/lib/reveal";

/** #contacto — closing call to action: WhatsApp (primary), email, Instagram. No form (D16). */
export function Contacto() {
  return (
    <Section id="contacto" theme="light" windowShadow="left" aria-labelledby="contacto-title">
      <Container width="narrow">
        <div {...reveal()} className="flex flex-col items-center gap-8 text-center">
          <Eyebrow>{contacto.eyebrow}</Eyebrow>
          <h2
            id="contacto-title"
            className="font-serif text-[clamp(2.5rem,1.6rem+3.6vw,4.5rem)] leading-[1.05] tracking-[-0.015em] text-balance text-fg"
          >
            {contacto.titleBefore}{" "}
            <HandUnderline strokeWidth={2.5}>
              <em className="text-accent italic">{contacto.titleUnderlined}</em>
            </HandUnderline>
          </h2>
          <p className="max-w-[34rem] text-lead text-fg-soft text-pretty">{contacto.lead}</p>

          <div className="relative mt-2">
            <HandArrow className="absolute top-1/2 right-full mr-4 hidden w-32 -translate-y-1/2 md:block" />
            <Button href={contact.whatsappUrl} external size="lg" icon={<WhatsAppIcon />}>
              {contacto.primaryCta}
            </Button>
          </div>

          <p className="text-fg-soft">
            {contacto.emailLabel}{" "}
            <a
              href={contact.mailto}
              className="text-fg underline decoration-line underline-offset-4 transition-colors duration-300 ease-soft hover:text-accent hover:decoration-current"
            >
              {contact.email}
            </a>
          </p>

          <InstagramPill className="mt-4" />
        </div>
      </Container>
    </Section>
  );
}
