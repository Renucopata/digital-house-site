import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/** Locale routing (Next 16 "proxy", formerly middleware): / = Spanish, /en = English. */
export default createMiddleware(routing);

export const config = {
  // every path except API, Next internals, Vercel internals and files with an extension
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
