"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { useApp } from "@/components/effects/AppProvider";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroGlobe } from "./HeroGlobe";

const highlights = [
  { term: "Enfoque", detail: "Software 100% a tu medida" },
  { term: "Comunicación", detail: "Trato directo, sin tecnicismos" },
  { term: "Soporte", detail: "Acompañamiento tras el lanzamiento" },
] as const;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { ready } = useApp();
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      if (reduced) {
        gsap.set("[data-reveal]", { opacity: 1 });
        return;
      }
      if (!ready) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero-eyebrow]",
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.7 },
      );

      // Primera frase letra por letra; la segunda sube como cortina completa.
      const line1 = el.querySelector<HTMLElement>("[data-hero-line1]");
      if (line1) {
        SplitText.create(line1, {
          type: "chars",
          mask: "chars",
          autoSplit: true,
          onSplit(self) {
            gsap.set(line1, { opacity: 1 });
            return tl.from(
              self.chars,
              { yPercent: 118, duration: 0.85, stagger: 0.016 },
              "<0.05",
            );
          },
        });
      }

      tl.fromTo(
        "[data-hero-line2] > span",
        { yPercent: 118 },
        {
          yPercent: 0,
          duration: 0.95,
          ease: "power4.out",
          onStart: () => {
            gsap.set("[data-hero-line2]", { opacity: 1 });
          },
        },
        "-=0.55",
      )
        .fromTo(
          ["[data-hero-subtitle]", "[data-hero-actions]", "[data-hero-stats]"],
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 },
          "-=0.5",
        )
        .fromTo(
          "[data-hero-cue]",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.6 },
          "-=0.2",
        );

      // Parallax al hacer scroll: el contenido sube más lento que la página.
      gsap.to("[data-hero-content]", {
        yPercent: 14,
        autoAlpha: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root, dependencies: [ready, reduced] },
  );

  return (
    <section
      ref={root}
      id="inicio"
      aria-label="Portada"
      className="relative flex min-h-dvh items-center overflow-clip"
    >
      <div className="absolute inset-0">
        <HeroGlobe className="absolute inset-0" />
        {/* Oscurece bordes para asegurar contraste del texto sobre el globo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,13,0.55)_0%,rgba(5,7,13,0)_30%,rgba(5,7,13,0)_60%,rgba(5,7,13,0.9)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_60%,rgba(5,7,13,0.6),transparent_55%)]"
        />
      </div>

      <div className="container-x relative z-10" data-hero-content>
        <div className="max-w-4xl pt-36 pb-28 md:pt-40">
          <p
            data-hero-eyebrow
            data-reveal
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-line/80 bg-surface/50 px-5 py-2.5 font-mono text-[11px] tracking-[0.18em] text-muted uppercase backdrop-blur-sm"
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            Sitios web · Tiendas en línea · Software a la medida
          </p>

          <h1 className="font-display text-[clamp(2.6rem,7vw,5.4rem)] leading-[1.04] font-bold tracking-tight">
            <span data-hero-line1 data-reveal className="block">
              No compres software genérico.
            </span>
            <span data-hero-line2 data-reveal className="block overflow-clip">
              <span className="text-gradient block pb-2">
                Constrúyelo a tu medida.
              </span>
            </span>
          </h1>

          <p
            data-hero-subtitle
            data-reveal
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
          >
            En <strong className="font-semibold text-ink">Servicios y Desarrollo JC</strong>{" "}
            creamos sitios web, tiendas en línea y sistemas hechos exactamente para tu
            negocio. Nada de plantillas forzadas:{" "}
            <strong className="font-semibold text-ink">tecnología que se adapta a ti</strong>,
            y no al revés.
          </p>

          <div data-hero-actions data-reveal className="mt-10 flex flex-wrap gap-4">
            <MagneticButton href="#contacto">Cuéntanos tu proyecto</MagneticButton>
            <MagneticButton href="#proceso" variant="outline">
              Mira cómo trabajamos
              <svg
                aria-hidden="true"
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </MagneticButton>
          </div>

          <dl
            data-hero-stats
            data-reveal
            className="mt-16 grid max-w-2xl grid-cols-1 gap-6 border-t border-line/70 pt-8 sm:grid-cols-3"
          >
            {highlights.map((item) => (
              <div key={item.term}>
                <dt className="text-[11px] font-medium tracking-[0.25em] text-muted uppercase">
                  {item.term}
                </dt>
                <dd className="mt-2 font-display text-sm font-medium text-ink">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <a
        href="#servicios"
        data-hero-cue
        data-reveal
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] tracking-[0.3em] text-muted uppercase md:flex"
      >
        Scroll
        <span aria-hidden="true" className="block h-12 w-px overflow-clip bg-line">
          <span className="animate-scroll-cue block h-full w-full bg-accent" />
        </span>
      </a>
    </section>
  );
}
