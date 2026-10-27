import { StructuredData } from "@/components/layout/StructuredData";
import { ComoTrabajamos } from "@/components/sections/ComoTrabajamos";
import { Contacto } from "@/components/sections/Contacto";
import { Equipo } from "@/components/sections/Equipo";
import { Hero } from "@/components/sections/Hero";
import { Manifiesto } from "@/components/sections/Manifiesto";
import { QueHacemos } from "@/components/sections/QueHacemos";
import { Servicios } from "@/components/sections/Servicios";
import { Soluciones } from "@/components/sections/Soluciones";

/*
 * Single landing page (D3). Section rhythm:
 * light (hero) → light (soluciones, rotating word) → sand (qué hacemos) → dark → light (servicios) → dark (equipo) → sand (manifiesto) →
 * light (contacto) → dark footer.
 */
export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      <Soluciones />
      <QueHacemos />
      <ComoTrabajamos />
      <Servicios />
      <Equipo />
      <Manifiesto />
      <Contacto />
    </>
  );
}
