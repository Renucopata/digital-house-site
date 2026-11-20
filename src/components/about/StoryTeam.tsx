"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Pill } from "@/components/ui/Pill";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { contact } from "@/content/contact";
import { team, tr, type TeamMember } from "@/content/home";
import { aboutPage } from "@/content/pages";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/*
 * /nosotros story → team (two26 effects 20 + 21).
 * Story: three blocks of the artifact's copy, alternating sides. A thick burgundy line draws through
 * them with the scroll (scrub .8; 100 / 75 / 50 px wide) and, at the end, swells until it floods
 * the team section, which turns burgundy.
 * Team: five cards; clicking one opens a dialog that grows from the card (back.out(1.4), .65 s)
 * with bio, specialties and a WhatsApp link; Esc, the close button or the backdrop close it.
 * Avatars are initials until approved portraits exist. Reduced motion: no line, instant dialog.
 */
const wa = (text: string) => `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

export function StoryTeam() {
  const locale = useLocale();
  const t = useTranslations("about");
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);
  const teamRef = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [member, setMember] = useState<TeamMember | null>(null);
  /** Box of the card that was clicked; the dialog grows from it. */
  const fromBox = useRef<DOMRect | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const wrap = root.current!;
      const w = window.innerWidth;
      const base = w < 768 ? 50 : w < 992 ? 75 : 100;

      // path through the story blocks (measured), then down into the team section
      const build = () => {
        const box = wrap.getBoundingClientRect();
        svg.current!.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
        const pts = gsap.utils.toArray<HTMLElement>("[data-story]", wrap).map((el, i) => {
          const r = el.getBoundingClientRect();
          return { x: i % 2 ? r.left - box.left - 40 : r.right - box.left + 40, y: r.top - box.top + r.height / 2 };
        });
        const teamTop = teamRef.current!.getBoundingClientRect().top - box.top;
        let d = `M ${box.width * 0.85} 0`;
        let prev = { x: box.width * 0.85, y: 0 };
        for (const p of [...pts, { x: box.width / 2, y: teamTop + 200 }]) {
          const dy = (p.y - prev.y) * 0.6;
          d += ` C ${prev.x} ${prev.y + dy}, ${p.x} ${p.y - dy}, ${p.x} ${p.y}`;
          prev = p;
        }
        path.current!.setAttribute("d", d);
      };
      build();

      // 1) the line draws through the story while it is on screen
      gsap.fromTo(
        path.current,
        { drawSVG: "0% 0.1%", strokeWidth: base },
        { drawSVG: "0% 100%", ease: "none", scrollTrigger: { trigger: wrap, start: "top 80%", endTrigger: teamRef.current, end: "top 55%", scrub: 0.8, invalidateOnRefresh: true, onRefreshInit: build } },
      );
      // 2) only once the story has scrolled away does the line swell and flood the team section
      gsap
        .timeline({ scrollTrigger: { trigger: teamRef.current, start: "top 40%", end: "top 5%", scrub: 0.8 } })
        .fromTo(path.current, { strokeWidth: base }, { strokeWidth: 2600, ease: "power2.inOut" }, 0)
        .fromTo(teamRef.current, { backgroundColor: "rgba(121, 11, 26, 0)" }, { backgroundColor: "rgba(121, 11, 26, 1)", ease: "power2.inOut", duration: 0.4 }, 0.6);
    },
    { scope: root, dependencies: [locale], revertOnUpdate: true },
  );

  const open = (m: TeamMember, card: HTMLElement) => {
    fromBox.current = card.getBoundingClientRect();
    setMember(m);
  };

  // once the member's content is rendered: open the dialog and grow it from the clicked card
  useGSAP(
    () => {
      const d = dialog.current;
      if (!member || !d) return;
      if (!d.open) d.showModal();
      const from = fromBox.current;
      if (prefersReducedMotion() || !from) return;
      const panel = d.firstElementChild as HTMLElement;
      const to = panel.getBoundingClientRect();
      gsap.fromTo(
        panel,
        { x: from.left + from.width / 2 - (to.left + to.width / 2), y: from.top + from.height / 2 - (to.top + to.height / 2), scale: Math.max(0.3, from.width / to.width), opacity: 0.4 },
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.65, ease: "back.out(1.4)" },
      );
    },
    { dependencies: [member] },
  );

  return (
    // clip: the swollen flood stroke must not spill into the next section
    <div ref={root} className="relative overflow-clip">
      <svg ref={svg} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 size-full overflow-visible" fill="none">
        <path ref={path} stroke="var(--hot)" strokeLinecap="round" strokeWidth="0" />
      </svg>

      {/* story */}
      <div className="relative z-[1] mx-auto flex max-w-[90rem] flex-col gap-[clamp(5rem,12vw,10rem)] px-[var(--gutter)] py-[var(--section-space)]">
        {aboutPage.story.map((block, i) => (
          <section key={block.tag.es} data-story className={`max-w-xl ${i % 2 ? "md:ml-auto" : ""}`}>
            <div data-reveal="pop" className="w-fit">
              <Pill rotate={i % 2 ? 4 : -4}>{tr(block.tag, locale)}</Pill>
            </div>
            <h2 data-reveal="lines" className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.92] text-burgundy-deep uppercase">
              {tr(block.title, locale)}
            </h2>
            <p data-reveal="fade" className="mt-4 text-lg text-burgundy-deep">
              {tr(block.text, locale)}
            </p>
          </section>
        ))}
      </div>

      {/* team */}
      <section ref={teamRef} id="equipo" className="relative z-[1] bg-hot py-[var(--section-space)] text-ivory">
        <div className="mx-auto max-w-[90rem] px-[var(--gutter)]">
          <SectionLabel tone="dark">{tr(team.label, locale)}</SectionLabel>
          <h2 data-reveal="lines" className="mt-3 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] uppercase">
            {tr(team.title, locale)}
          </h2>
          <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {team.members.map((m) => (
              <li key={m.name}>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-label={`${t("openMember")} ${m.name}`}
                  onClick={(e) => open(m, e.currentTarget)}
                  className="group flex h-full w-full flex-col rounded-[var(--radius-card)] bg-ivory p-4 text-left text-burgundy-deep transition-transform hover:-rotate-1"
                >
                  <span aria-hidden="true" className="grid aspect-square w-full place-items-center rounded-2xl bg-beige font-display text-6xl">
                    {initials(m.name)}
                  </span>
                  <span className="mt-4 text-lg font-bold">{m.name}</span>
                  <span className="text-sm text-fg-soft">{tr(m.role, locale)}</span>
                  {m.badge ? <span className="mt-2 w-fit rounded-full bg-hot px-2.5 py-0.5 font-label text-xs font-bold text-ivory uppercase">{tr(m.badge, locale)}</span> : null}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* team member dialog (native <dialog>: focus trap, Esc) */}
      <dialog
        ref={dialog}
        aria-labelledby="member-name"
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        onClose={() => setMember(null)}
        data-lenis-prevent
        className="m-auto max-h-[90svh] w-[min(42rem,92vw)] overflow-visible bg-transparent p-0 backdrop:bg-charcoal/60"
      >
        {member ? (
          <div className="theme-dark max-h-[90svh] overflow-y-auto rounded-[var(--radius-card)] bg-surface p-6 text-fg md:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="member-name" className="text-3xl font-bold">
                  {member.name}
                </h2>
                <p className="text-fg-soft">{tr(member.role, locale)}</p>
              </div>
              <button type="button" onClick={() => dialog.current?.close()} className="rounded-full bg-ivory px-4 py-2 font-label text-sm font-bold text-burgundy-deep">
                {t("close")} ✕
              </button>
            </div>
            <p className="mt-6 font-display text-3xl leading-[1.05] uppercase">“{tr(member.quote, locale)}”</p>
            <p className="mt-4">{tr(member.bio, locale)}</p>
            <p className="mt-6 font-label text-label tracking-[0.2em] text-fg-soft uppercase">{tr(team.skillsLabel, locale)}</p>
            <ol className="mt-2 flex flex-wrap gap-2">
              {member.skills.map((s, i) => (
                <li key={s.es} className="rounded-full border border-line px-3.5 py-1.5 text-sm">
                  {String(i + 1).padStart(2, "0")} {tr(s, locale)}
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={wa(`${tr(team.talkMessage, locale)} ${member.name}`)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-ivory px-5 py-2 font-label font-bold text-burgundy-deep">
                {tr(team.talkTo, locale)} {member.firstName} →
              </a>
              {member.portfolio ? (
                <a href={member.portfolio} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-5 py-2 font-label font-bold">
                  {tr(team.portfolio, locale)}
                </a>
              ) : null}
            </div>
          </div>
        ) : (
          <div />
        )}
      </dialog>
    </div>
  );
}
