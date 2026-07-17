import { technologies } from "@/lib/data";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";

/** Marquesinas infinitas en direcciones opuestas con el stack del estudio. */
export function Technologies() {
  return (
    <section aria-label="Tecnologías que usamos" className="border-y border-line/60 py-20 md:py-28">
      <Reveal>
        <p className="container-x mb-12 flex items-center gap-3 text-xs font-medium tracking-[0.3em] text-muted uppercase">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          Tecnología que nos respalda
        </p>

        <div className="space-y-8">
          {technologies.map((row, i) => (
            <Marquee key={i} duration={38 + i * 8} reverse={i % 2 === 1} pauseOnHover>
              {row.map((tech) => (
                <span
                  key={tech}
                  className="mx-7 flex items-center gap-7 font-display text-4xl font-bold tracking-tight text-line transition-colors duration-500 hover:text-ink md:text-6xl"
                >
                  {tech}
                  <span aria-hidden="true" className="size-2 rounded-full bg-accent/50" />
                </span>
              ))}
            </Marquee>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
