import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Portfolio } from "@/components/sections/Portfolio";
import { Technologies } from "@/components/sections/Technologies";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { getPublishedProjects } from "@/lib/projects";

export default async function Home() {
  // Se lee al generar la página; el panel dispara la regeneración al guardar.
  const projects = await getPublishedProjects();

  return (
    <>
      <a
        href="#servicios"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
      >
        Saltar al contenido
      </a>
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
        <Portfolio projects={projects} />
        <Technologies />
        <Stats />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
