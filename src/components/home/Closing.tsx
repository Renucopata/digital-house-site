import { useLocale } from "next-intl";
import { contact } from "@/content/contact";
import { closing, tr } from "@/content/home";

/** Closing CTA before the footer (artifact "Entendamos tu negocio primero"). */
export function Closing() {
  const locale = useLocale();
  return (
    <section id="contacto" className="px-[var(--gutter)] py-[var(--section-space)] text-center">
      <h2 className="font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.9] text-hot uppercase">
        {closing.titleLines.map((line) => (
          <span key={line.es} className="block">
            {tr(line, locale)}
          </span>
        ))}
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-lg text-burgundy-deep">{tr(closing.text, locale)}</p>
      <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-full bg-hot px-7 py-3.5 font-label text-lg font-bold text-ivory transition-colors hover:bg-burgundy-deep">
        {tr(closing.cta, locale)}
      </a>
      <p className="mt-4 text-burgundy-deep">
        {tr(closing.mailBefore, locale)}{" "}
        <a href={contact.mailto} className="font-bold underline-offset-4 hover:underline">
          {contact.email}
        </a>
      </p>
    </section>
  );
}
