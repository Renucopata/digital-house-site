import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HandUnderline, Sparkle } from "@/components/ui/HandDrawn";
import { WhatsAppIcon } from "@/components/ui/icons";
import { contact } from "@/content/contact";
import { hero } from "@/content/home";
import { homeId } from "@/content/navigation";

/** #inicio — positioning headline, lead, WhatsApp CTA and the "dH" camera photo. */
export function Hero() {
  return (
    <Section
      id={homeId}
      theme="light"
      windowShadow
      flush
      aria-labelledby="inicio-title"
      className="flex min-h-[calc(100svh-var(--header-h))] items-center py-[clamp(3rem,2rem+5vw,6.5rem)]"
    >
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col gap-7 lg:col-span-7">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1
            id="inicio-title"
            className="font-serif text-[clamp(2.75rem,1.4rem+5vw,5.75rem)] leading-[1.02] font-normal tracking-[-0.015em] text-fg"
          >
            <span className="block">{hero.title[0][0]}</span>{" "}
            <span className="block">{hero.title[0][1]}</span>{" "}
            <span className="block text-accent">{hero.title[1][0]}</span>{" "}
            <span className="block text-accent">
              <HandUnderline strokeWidth={2.5}>
                <em className="italic">{hero.title[1][1]}</em>
              </HandUnderline>
            </span>
          </h1>
          <p className="max-w-[34rem] text-lead text-fg-soft text-pretty">{hero.lead}</p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button href={contact.whatsappUrl} external size="lg" icon={<WhatsAppIcon />}>
              {hero.primaryCta}
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <figure className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:col-span-5 lg:max-w-none">
          {/* offset hairline frame, editorial detail */}
          <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-card border border-line" />
          <Image
            src={hero.image.src}
            width={hero.image.width}
            height={hero.image.height}
            alt={hero.image.alt}
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 26rem, 22rem"
            preload
            className="relative h-auto w-full rounded-card"
          />
          <Sparkle className="absolute -top-5 -left-5 size-11 sm:-left-7" strokeWidth={1.75} />
        </figure>
      </Container>
    </Section>
  );
}
