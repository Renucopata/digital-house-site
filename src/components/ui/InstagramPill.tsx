import { contact } from "@/content/contact";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { InstagramIcon } from "./icons";

type InstagramPillProps = {
  /** Show the "SÍGUENOS EN" label above the pill. */
  label?: boolean;
  className?: string;
};

/**
 * "SÍGUENOS EN" + outlined pill: IG glyph │ divider │ @digitalhouse.gs (from the IG stories).
 */
export function InstagramPill({ label = true, className }: InstagramPillProps) {
  return (
    <div className={cn("inline-flex flex-col items-center gap-3", className)}>
      {label ? <Eyebrow as="span">Síguenos en</Eyebrow> : null}
      <a
        href={contact.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Síguenos en Instagram: ${contact.instagramLabel}`}
        className={cn(
          "group inline-flex min-h-12 items-center gap-4 rounded-full border-[1.5px] border-accent px-6 text-accent",
          "transition-colors duration-300 ease-soft hover:bg-accent hover:text-on-accent",
        )}
      >
        <InstagramIcon className="size-5" />
        <span aria-hidden="true" className="h-6 w-px bg-current opacity-70" />
        <span className="font-label text-[0.95rem] font-medium tracking-[0.01em]">{contact.instagramLabel}</span>
      </a>
    </div>
  );
}
