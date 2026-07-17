import { testimonials } from "@/lib/data";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Carrusel infinito de testimonios; se pausa al pasar el cursor. */
export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonios-titulo"
      className="section-pad bg-surface/40 overflow-clip"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="Testimonios"
          id="testimonios-titulo"
          title="Lo que dicen quienes ya trabajan con nosotros"
        />
      </div>

      <Reveal className="mt-16 md:mt-20">
        <Marquee duration={55} pauseOnHover>
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="mx-4 flex w-[20rem] flex-col justify-between rounded-2xl border border-line/80 bg-bg/70 p-8 sm:w-[26rem]"
            >
              <blockquote className="text-base leading-relaxed text-ink">
                <span aria-hidden="true" className="text-gradient mb-4 block font-display text-4xl leading-none">
                  “
                </span>
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-line/60 pt-5">
                <p className="font-display text-sm font-bold">{t.name}</p>
                <p className="mt-1 text-xs text-muted">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
