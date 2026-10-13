import { StructuredData } from "@/components/layout/StructuredData";
import { ComoTrabajamos } from "@/components/sections/ComoTrabajamos";
import { Contacto } from "@/components/sections/Contacto";
import { Equipo } from "@/components/sections/Equipo";
import { Hero } from "@/components/sections/Hero";
import { Manifiesto } from "@/components/sections/Manifiesto";
import { QuienesSomos } from "@/components/sections/QuienesSomos";
import { Servicios } from "@/components/sections/Servicios";

/*
 * Single landing page (D3). Section rhythm:
 * light (hero) → sand → dark → light (servicios) → dark (equipo) → sand (manifiesto) →
 * light (contacto) → dark footer.
 */
export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      <QuienesSomos />
      <ComoTrabajamos />
      <Servicios />
      <Equipo />
      <Manifiesto />
      <Contacto />
    </>
  );
}
