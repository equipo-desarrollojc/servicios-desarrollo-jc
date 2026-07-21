"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { processSteps } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessModal } from "./ProcessModal";

/**
 * Timeline vertical de 5 pasos: la línea central se dibuja con el scroll
 * y cada paso se activa al alcanzarla. Cada tarjeta abre su escena animada.
 */
export function Process() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [openStep, setOpenStep] = useState<number | null>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || reduced) return;

      gsap.fromTo(
        "[data-flow-line]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-flow]",
            start: "top 70%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-flow-node]").forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0.4, backgroundColor: "#0a0f1c", borderColor: "#1c2438" },
          {
            scale: 1,
            backgroundColor: "#4f8cff",
            borderColor: "#4f8cff",
            duration: 0.5,
            ease: "back.out(2.5)",
            scrollTrigger: { trigger: node, start: "top 62%", once: true },
          },
        );
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      id="proceso"
      aria-labelledby="proceso-titulo"
      className="section-pad bg-surface/40"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="Nuestro proceso"
          id="proceso-titulo"
          title="De la idea al lanzamiento en 5 pasos"
          lede="Trabajar con nosotros es simple y transparente: siempre sabrás en qué punto va tu proyecto y qué sigue después. Toca cualquier paso para ver su animación."
        />

        <div data-flow className="relative mt-20 md:mt-24">
          {/* Línea de progreso */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[13px] w-px bg-line md:left-1/2"
          >
            {/* Sin `scale-y-0`: en Tailwind 4 compila a la propiedad `scale`,
                que se multiplica con el `transform` que anima GSAP y dejaría
                la línea invisible. El estado inicial va en `style`. */}
            <div
              data-flow-line
              className="h-full w-full origin-top bg-gradient-to-b from-accent via-violet to-rose"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <ol className="space-y-14 md:space-y-24">
            {processSteps.map((step, i) => {
              const right = i % 2 === 1;
              return (
                <li key={step.number} className="relative md:grid md:grid-cols-2 md:gap-16">
                  <span
                    data-flow-node
                    aria-hidden="true"
                    className="absolute top-1.5 left-[6px] z-10 size-4 rounded-full border-2 border-line bg-surface md:left-1/2 md:-translate-x-1/2"
                  />
                  <div
                    className={`pl-12 md:pl-0 ${
                      right ? "md:col-start-2 md:pl-16" : "md:pr-16 md:text-right"
                    }`}
                  >
                    <Reveal y={40}>
                      <button
                        type="button"
                        onClick={() => setOpenStep(i)}
                        data-cursor-label="Ver"
                        className={`group w-full rounded-2xl border border-line/80 bg-bg/60 p-7 text-left transition-all duration-500 hover:-translate-y-1 hover:border-accent/50 hover:bg-elevated/60 md:max-w-md ${
                          right ? "" : "md:ml-auto md:text-right"
                        }`}
                        aria-label={`Ver animación del paso ${i + 1}: ${step.title}`}
                      >
                        <span className="font-display text-5xl font-bold text-line transition-colors duration-500 group-hover:text-accent/40 md:text-6xl">
                          {step.number}
                        </span>
                        <h3 className="mt-3 font-display text-xl font-bold tracking-tight md:text-2xl">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          {step.description}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-accent uppercase opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-3"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          Ver animación
                        </span>
                      </button>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <ProcessModal step={openStep} onClose={() => setOpenStep(null)} />
    </section>
  );
}
