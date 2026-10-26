"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { InstagramPill } from "@/components/ui/InstagramPill";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/icons";
import { contact } from "@/content/contact";
import { homeId, navCopy, navItems } from "@/content/navigation";
import { cn } from "@/lib/cn";

const sectionIds = navItems.map((item) => item.id);
const MENU_ID = "menu-movil";
/** Elements made inert while the mobile menu is open (the WhatsApp button stays reachable). */
const INERT_WHILE_MENU_OPEN = ["contenido", "site-footer"];

/**
 * Id of the nav section crossing the middle band of the viewport. Null above the first
 * section (hero); the last section stays active while the footer is in view.
 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        const current = ids.find((id) => visible.get(id));
        if (current) return setActive(current);
        const pastLast = elements[elements.length - 1].getBoundingClientRect().bottom < window.innerHeight / 2;
        setActive(pastLast ? ids[ids.length - 1] : null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu open: lock scroll, make the page behind inert, focus the first link,
  // close on Escape or when the viewport grows to the desktop layout.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const outside = INERT_WHILE_MENU_OPEN.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    outside.forEach((el) => (el.inert = true));
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onDesktop = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);

    return () => {
      root.style.overflow = previousOverflow;
      outside.forEach((el) => (el.inert = false));
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  // Menu links: close first (restores scrolling), then scroll and move focus to the section.
  function goToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
      history.pushState(null, "", `#${id}`);
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  }

  return (
    <header
      className={cn(
        "theme-light sticky top-0 z-50 bg-cream transition-shadow duration-300 ease-soft",
        (scrolled || open) && "shadow-[0_1px_0_var(--line)]",
      )}
    >
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-6">
        <a href={`#${homeId}`} aria-label={navCopy.homeLabel} className="-mx-1 shrink-0 rounded-md px-1">
          <Logo variant="wordmark-burgundy" width={168} animated preload className="h-auto w-[136px] lg:w-[168px]" />
        </a>

        <nav aria-label={navCopy.navLabel} className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative py-2 text-[0.6875rem] whitespace-nowrap uppercase tracking-[0.2em] transition-colors duration-300 ease-soft",
                      "after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:bg-accent",
                      "after:transition-transform after:duration-500 after:ease-soft",
                      isActive
                        ? "text-accent after:scale-x-100"
                        : "text-fg-soft after:scale-x-0 hover:text-accent hover:after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* header CTA from 1280px; below that the floating WhatsApp button covers it */}
        <div className="hidden xl:block">
          <Button href={contact.whatsappUrl} external icon={<WhatsAppIcon />} aria-label={navCopy.ctaAriaLabel}>
            {navCopy.cta}
          </Button>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={open}
          aria-controls={MENU_ID}
          aria-label={open ? navCopy.menuClose : navCopy.menuOpen}
          onClick={() => setOpen((value) => !value)}
          className="-mr-2 grid size-11 place-items-center rounded-full text-accent lg:hidden"
        >
          <span aria-hidden="true" className="relative block h-3 w-6">
            <span
              className={cn(
                "absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-300 ease-soft",
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-300 ease-soft",
                open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
              )}
            />
          </span>
        </button>
      </Container>

      {open ? (
        <div
          id={MENU_ID}
          ref={panelRef}
          className={cn(
            "fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 overflow-y-auto bg-cream lg:hidden",
            "transition-[opacity,transform] duration-300 ease-soft starting:-translate-y-2 starting:opacity-0",
          )}
        >
          <Container className="flex min-h-full flex-col gap-10 pt-8 pb-[calc(var(--wa-size)+var(--wa-offset)*2+env(safe-area-inset-bottom))]">
            <nav aria-label={navCopy.navLabel}>
              <ul className="flex flex-col">
                {navItems.map((item) => (
                  <li key={item.id} className="border-b border-line">
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => goToSection(event, item.id)}
                      aria-current={active === item.id ? "true" : undefined}
                      className="flex items-center justify-between py-4 font-display text-[1.5rem] font-semibold leading-tight text-fg aria-[current=true]:text-accent"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col items-start gap-8">
              <Button
                href={contact.whatsappUrl}
                external
                size="lg"
                icon={<WhatsAppIcon />}
                aria-label={navCopy.ctaAriaLabel}
              >
                {navCopy.cta}
              </Button>
              <InstagramPill className="items-start" />
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
