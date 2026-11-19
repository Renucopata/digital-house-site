import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/** Locale-aware Link / router: pass the internal (Spanish) pathname, get the localized URL. */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
