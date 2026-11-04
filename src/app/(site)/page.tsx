import { StructuredData } from "@/components/layout/StructuredData";
import { ComoTrabajamos } from "@/components/sections/ComoTrabajamos";
import { Contacto } from "@/components/sections/Contacto";
import { Credenciales } from "@/components/sections/Credenciales";
import { Equipo } from "@/components/sections/Equipo";
import { Hero } from "@/components/sections/Hero";
import { Manifiesto } from "@/components/sections/Manifiesto";
import { Servicios } from "@/components/sections/Servicios";
import { Soluciones } from "@/components/sections/Soluciones";

/*
 * Single landing page (D3). Section rhythm:
 * light (hero) → light (soluciones, rotating word) → dark (cómo trabajamos) → light (servicios, work-area shelf) → dark (equipo) → light (credenciales, logo marquee) → sand (manifiesto) →
 * light (contacto) → dark footer. Qué hacemos was removed (D44).
 */
export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      <Soluciones />
      <ComoTrabajamos />
      <Servicios />
      <Equipo />
      <Credenciales />
      <Manifiesto />
      <Contacto />
    </>
  );
}
