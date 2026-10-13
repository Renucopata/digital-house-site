import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { InstagramPill } from "@/components/ui/InstagramPill";
import { Logo } from "@/components/ui/Logo";
import { contact } from "@/content/contact";
import { navItems } from "@/content/navigation";
import { footerCopy, site } from "@/content/site";

const linkClass =
  "underline decoration-line underline-offset-4 transition-colors duration-300 ease-soft hover:text-fg hover:decoration-current";

/**
 * Site footer: cream logo on burgundy (D20), positioning line, sections, contact, IG pill.
 * No grain here: the logo file has its background baked in and must sit on a flat surface.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <Section as="footer" id="site-footer" theme="dark" className="pb-[calc(var(--wa-size)+var(--wa-offset)*2)]">
      <Container className="flex flex-col gap-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div className="flex flex-col gap-6">
            <Logo variant="wordmark-cream" width={240} className="h-auto w-[200px] sm:w-[240px]" />
            <p className="max-w-sm font-serif text-[1.375rem] leading-snug text-fg">{site.statement}</p>
          </div>

          <nav aria-labelledby="footer-nav-title" className="flex flex-col gap-5">
            <Eyebrow as="span">
              <span id="footer-nav-title">{footerCopy.navTitle}</span>
            </Eyebrow>
            <ul className="flex flex-col gap-2.5 text-fg-soft">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="transition-colors duration-300 ease-soft hover:text-fg">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-5">
            <Eyebrow as="span">{footerCopy.contactTitle}</Eyebrow>
            <dl className="flex flex-col gap-3 text-fg-soft">
              <div>
                <dt className="text-sm">{footerCopy.whatsappLabel}</dt>
                <dd>
                  <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm">{footerCopy.emailLabel}</dt>
                <dd>
                  <a href={contact.mailto} className={linkClass}>
                    {contact.email}
                  </a>
                </dd>
              </div>
            </dl>
            <InstagramPill className="mt-2 items-start" />
          </div>
        </div>

        <p className="border-t border-line pt-6 text-sm text-fg-soft">
          © {year} {site.name}. {footerCopy.rights}
        </p>
      </Container>
    </Section>
  );
}
