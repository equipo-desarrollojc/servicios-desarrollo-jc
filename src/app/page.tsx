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
import { getPublishedTestimonials } from "@/lib/testimonials";
import { getPublishedFaqs } from "@/lib/faqs";

// Lectura en tiempo de ejecución, no de compilación: Coolify compila en un
// entorno sin acceso a la base, así que un prerender horneaba los datos
// de respaldo de data.ts. Así la página lee la base en cada visita —consultas
// indexadas, milisegundos— y siempre refleja lo que dice el panel.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, testimonials, faqs] = await Promise.all([
    getPublishedProjects(),
    getPublishedTestimonials(),
    getPublishedFaqs(),
  ]);

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
        <Testimonials testimonials={testimonials} />
        <Faq faqs={faqs} />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
