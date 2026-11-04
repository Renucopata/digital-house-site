import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SelectionBox } from "@/components/ui/SelectionBox";
import { WhatsAppIcon } from "@/components/ui/icons";
import { contact } from "@/content/contact";
import { hero } from "@/content/home";
import { homeId } from "@/content/navigation";

/** #inicio — "GROWTH STUDIO" pill, headline (D32) and CTAs. The laptop image was removed (D44). */
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
      <Container>
        <div className="flex flex-col gap-7">
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
      </Container>
    </Section>
  );
}
