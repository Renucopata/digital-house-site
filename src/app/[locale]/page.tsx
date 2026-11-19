import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { About } from "@/components/home/About";
import { Clients } from "@/components/home/Clients";
import { Closing } from "@/components/home/Closing";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { Ribbon } from "@/components/home/Ribbon";
import { Services } from "@/components/home/Services";
import { Team } from "@/components/home/Team";
import { Works } from "@/components/home/Works";
import { StructuredData } from "@/components/layout/StructuredData";

/** Home: the artifact's content and order, laid out two26-style (motion layer in P4). */
export default function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return (
    <>
      <StructuredData />
      <Hero />
      <Ribbon />
      <About />
      <Works />
      <Clients />
      <Services />
      <Process />
      <Team />
      <Faq />
      <Closing />
    </>
  );
}
