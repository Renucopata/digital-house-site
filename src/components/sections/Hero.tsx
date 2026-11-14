import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Sparkle } from "@/components/ui/HandDrawn";
import { SelectionBox } from "@/components/ui/SelectionBox";
import { WhatsAppIcon } from "@/components/ui/icons";
import { contact } from "@/content/contact";
import { hero } from "@/content/home";
import { homeId } from "@/content/navigation";

const heroSizes = "(min-width: 1024px) 40vw, (min-width: 768px) 38vw, 1px";

/**
 * #inicio — "GROWTH STUDIO" pill, headline (D32), CTAs and, on tablets and computers only (D45),
 * the laptop image that rises into place (D38). Phones get the text alone.
 */
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
      <Container className="grid items-center gap-14 md:grid-cols-12 md:gap-8 lg:gap-10">
        <div className="flex flex-col gap-7 md:col-span-7">
          <Eyebrow pill>{hero.eyebrow}</Eyebrow>
          {/* D32/D34: Manrope headline; "crecimiento" is typed in a growing selection box, repeating after 1 s */}
          <h1
            id="inicio-title"
            className="font-display text-[clamp(2.5rem,1.3rem+4.6vw,5.25rem)] leading-[1.05] font-extrabold tracking-[-0.035em] text-fg"
          >
            <span className="block">{hero.title[0][0]}</span>{" "}
            <span className="block">{hero.title[0][1]}</span>{" "}
            <span className="block text-accent">{hero.title[1][0]}</span>{" "}
            <span className="block">
              <SelectionBox text={hero.selected.text} after={hero.selected.after} typing repeat hold={1000} />
            </span>
          </h1>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button href={contact.whatsappUrl} external size="lg" icon={<WhatsAppIcon />}>
              {hero.primaryCta}
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        {/* Hidden on phones (D45). Lazy + display:none → phones never download the two layers. */}
        <figure className="relative hidden w-full md:col-span-5 md:block">
          {/* offset hairline frame, editorial detail */}
          <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-card border border-line" />
          {/* D38: wall photo + cutout of the laptop on the sneakers, which slides up into place
              with a small wobble on load (globals.css "Hero rise"). The frame clips it. */}
          <div className="relative overflow-hidden rounded-card">
            <Image
              src={hero.media.background}
              width={hero.media.width}
              height={hero.media.height}
              alt=""
              sizes={heroSizes}
              loading="lazy"
              fetchPriority="high"
              className="h-auto w-full"
            />
            <Image
              src={hero.media.foreground}
              width={hero.media.width}
              height={hero.media.height}
              alt={hero.media.alt}
              sizes={heroSizes}
              loading="lazy"
              fetchPriority="high"
              className="hero-rise absolute inset-0 h-full w-full"
            />
          </div>
          <Sparkle className="absolute -top-5 -left-5 size-11 md:-left-7" strokeWidth={1.75} />
        </figure>
      </Container>
    </Section>
  );
}
