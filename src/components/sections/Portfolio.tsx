"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { projects, type Project } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { useReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Grid de proyectos: zoom de portada al hover, video opcional que se
 * reproduce al pasar el mouse y fondo de sección que se tiñe con el
 * color del proyecto activo.
 */
export function Portfolio() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const tintBackground = (color: string | null) => {
    if (!root.current || reduced) return;
    gsap.to(root.current, {
      backgroundColor: color ?? "transparent",
      duration: 0.7,
      ease: "power2.out",
    });
  };

  const playVideo = (e: React.MouseEvent<HTMLElement>, play: boolean) => {
    const video = e.currentTarget.querySelector("video");
    if (!video) return;
    if (play) void video.play().catch(() => {});
    else video.pause();
  };

  return (
    <section
      ref={root}
      id="proyectos"
      aria-labelledby="proyectos-titulo"
      className="section-pad transition-colors"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="Proyectos"
          id="proyectos-titulo"
          title="Trabajo hecho a la medida de cada negocio"
          lede="Una muestra de lo que construimos: cada proyecto nace de un problema real y termina en una herramienta que se usa todos los días."
        />

        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 0.1}>
              <article
                data-cursor-label="Ver"
                onMouseEnter={(e) => {
                  tintBackground(project.hue.glow);
                  playVideo(e, true);
                }}
                onMouseLeave={(e) => {
                  tintBackground(null);
                  playVideo(e, false);
                }}
                className="group"
              >
                <div className="relative aspect-[4/3] overflow-clip rounded-2xl border border-line/70">
                  <ProjectCover project={project} index={i} />
                  {project.video ? (
                    <video
                      muted
                      loop
                      playsInline
                      preload="none"
                      src={project.video}
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute right-5 bottom-5 grid size-11 translate-y-3 place-items-center rounded-full bg-ink text-bg opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRightIcon className="size-5" />
                  </span>
                </div>

                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-lg font-bold tracking-tight transition-colors duration-300 group-hover:text-accent md:text-xl">
                    {project.title}
                  </h3>
                  <p className="shrink-0 font-mono text-xs tracking-wide text-muted">
                    {project.category} · {project.year}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Portada generada por código: degradado de marca + retícula + numeral. */
function ProjectCover({ project, index }: { project: Project; index: number }) {
  return (
    <div
      className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      style={{
        background: `linear-gradient(135deg, ${project.hue.from} 0%, ${project.hue.to} 100%)`,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-bg/35" />
      <span
        aria-hidden="true"
        className="absolute bottom-4 left-6 font-display text-[7rem] leading-none font-bold text-white/12 select-none md:text-[9rem]"
      >
        0{index + 1}
      </span>
    </div>
  );
}
