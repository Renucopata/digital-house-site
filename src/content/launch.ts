/**
 * What is public on production (user, 2026-11-20: hide the unfinished parts for the first launch).
 * Flip a switch to true when that part is ready; nothing else needs to change.
 */
export const launch = {
  /** /proyectos page (P5). Off: "Trabajos" links scroll to the home section instead. */
  workPage: true, // on since 2026-11-21: all 8 case studies have photos and texts
  /** /nosotros page (P5). Off: "Nosotros" links scroll to the home section instead. */
  aboutPage: false,
  /** English version (translations pending approval). Off: the EN switch is hidden. */
  english: false,
  /** Visible "[PENDIENTE: …]" notes for missing photos / illustrations. Off: neutral boxes only. */
  placeholders: false,
};

export const workHref = launch.workPage ? ("/proyectos" as const) : ({ pathname: "/", hash: "trabajos" } as const);
export const aboutHref = launch.aboutPage ? ("/nosotros" as const) : ({ pathname: "/", hash: "nosotros" } as const);
