import { services, type Service } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRightIcon } from "@/components/ui/icons";

const iconPaths: Record<Service["icon"], React.ReactNode> = {
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4M8.5 9l-2 2 2 2M15.5 9l2 2-2 2" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
      <path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.47 1.19h7.53a1.5 1.5 0 0 0 1.46-1.14L20 8H6" />
    </>
  ),
  braces: (
    <>
      <path d="M8 4c-2 0-3 1-3 3v2c0 1.5-.8 2.5-2 3 1.2.5 2 1.5 2 3v2c0 2 1 3 3 3" />
      <path d="M16 4c2 0 3 1 3 3v2c0 1.5.8 2.5 2 3-1.2.5-2 1.5-2 3v2c0 2-1 3-3 3" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a4.5 4.5 0 0 0-6 5.6L3 17.6V21h3.4l5.7-5.7a4.5 4.5 0 0 0 5.6-6L14.5 12l-2.5-2.5 2.7-3.2Z" />
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5M16 5.5a3 3 0 0 1 0 5.6M18.5 15.5c1.6.8 2.6 2.3 3 4.5" />
    </>
  ),
  bolt: <path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2Z" />,
};

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="section-pad">
      <div className="container-x">
        <SectionHeading
          eyebrow="Servicios"
          id="servicios-titulo"
          title="Todo lo que tu negocio necesita para crecer en internet"
          lede="Desde la primera línea de código hasta el soporte post-lanzamiento, cubrimos cada capa del proceso de desarrollo."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={(i % 3) * 0.08} className="h-full">
              <article className="group relative flex h-full flex-col rounded-2xl border border-line/80 bg-surface/60 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/50 hover:bg-elevated/70 hover:shadow-[0_24px_60px_-24px_rgba(79,140,255,0.35)]">
                <span className="mb-6 inline-flex size-12 items-center justify-center rounded-xl border border-line bg-bg text-muted transition-colors duration-500 group-hover:border-accent/60 group-hover:text-accent">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-6"
                  >
                    {iconPaths[service.icon]}
                  </svg>
                </span>

                <h3 className="font-display text-lg font-bold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>

                <span
                  aria-hidden="true"
                  className="mt-auto pt-6 text-muted opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:text-accent group-hover:opacity-100"
                >
                  <ArrowUpRightIcon className="size-5" />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
