import { useLocale } from "next-intl";
import { contact } from "@/content/contact";
import { closing, tr } from "@/content/home";

/** Closing CTA before the footer (artifact "Entendamos tu negocio primero"). */
export function Closing() {
  const locale = useLocale();
  return (
    <section id="contacto" className="bg-hot px-[var(--gutter)] py-[var(--section-space)] text-center text-ivory">
      <h2 data-reveal="lines" className="font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.9] uppercase">
        {closing.titleLines.map((line) => (
          <span key={line.es} className="block">
            {tr(line, locale)}
          </span>
        ))}
      </h2>
      <p data-reveal="fade" className="mx-auto mt-6 max-w-2xl text-2xl">{tr(closing.text, locale)}</p>
      <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" data-reveal="pop" className="mt-8 inline-block rounded-full bg-ivory px-8 py-4 font-label text-xl font-bold text-hot transition-colors hover:bg-burgundy-deep hover:text-ivory">
        {tr(closing.cta, locale)}
      </a>
      <p className="mt-4 text-[19px] font-bold">
        {tr(closing.mailBefore, locale)}{" "}
        <a href={contact.mailto} className="font-bold underline-offset-4 hover:underline">
          {contact.email}
        </a>
      </p>
    </section>
  );
}
