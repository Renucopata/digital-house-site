import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";

/** Public site chrome: skip link, sticky header, main content, footer. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="contenido" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
