import { contact } from "@/content/contact";
import { WhatsAppIcon } from "@/components/ui/icons";

/**
 * Floating WhatsApp button (D6): always visible, every breakpoint, above every layer.
 * Brand colors (burgundy + cream). The cream ring keeps it visible over dark sections.
 * Respects iOS safe-area insets (requires viewport-fit=cover, set in the root layout).
 */
export function WhatsAppFloat() {
  return (
    <a
      href={contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      title="Escríbenos por WhatsApp"
      className={[
        "theme-light fixed z-[1000] grid size-[var(--wa-size)] place-items-center rounded-full",
        "bg-burgundy text-cream ring-2 ring-cream/80",
        "shadow-[0_6px_20px_-6px_rgb(72_31_30/0.45)]",
        "transition-[transform,background-color] duration-300 ease-soft hover:-translate-y-0.5 hover:bg-burgundy-deep",
        "focus-visible:outline-burgundy motion-reduce:hover:translate-y-0",
        "right-[calc(var(--wa-offset)+env(safe-area-inset-right))] bottom-[calc(var(--wa-offset)+env(safe-area-inset-bottom))]",
      ].join(" ")}
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
