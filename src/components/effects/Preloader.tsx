"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useApp } from "./AppProvider";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { site } from "@/lib/site";

/**
 * Duración total del preloader, en segundos. El resto de los tiempos se
 * derivan de aquí, así que para acortarlo o alargarlo basta tocar este valor.
 */
const TOTAL = 10;
/** Salida: desvanecido de los textos + telón que sube. */
const FADE = 0.4;
const CURTAIN = 0.85;
/** Momento en que el logo termina de saltar y arranca la salida. */
const HOLD = TOTAL - FADE - CURTAIN;
/** El logo emerge enmascarado antes de empezar a saltar. */
const REVEAL = 0.7;
/** Medio salto (subida); la bajada es el yoyo. */
const HOP = 0.5;
const HOPS = Math.round((HOLD - REVEAL) / (HOP * 2));

/**
 * Pantalla de carga: logotipo que emerge y salta, contador 000→100 y barra de
 * progreso; al completar sube como telón y libera el scroll.
 */
export function Preloader() {
  const { setReady } = useApp();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;

      const finish = () => {
        setReady(true);
        setVisible(false);
        document.documentElement.style.removeProperty("overflow");
        // En el frame siguiente: el preloader (fixed inset-0, scroll bloqueado)
        // ya salió del DOM, así que ScrollTrigger mide el layout real.
        requestAnimationFrame(() => ScrollTrigger.refresh());
      };

      document.documentElement.style.overflow = "hidden";
      window.scrollTo(0, 0);

      if (reduced) {
        finish();
        return;
      }

      const counter = { value: 0 };
      const tl = gsap.timeline({ onComplete: finish });

      tl.from("[data-loader-mark]", {
        yPercent: 120,
        duration: REVEAL,
        ease: "power3.out",
      })
        // El reveal necesita la máscara; el salto no cabe dentro de ella.
        .set("[data-loader-mask]", { overflow: "visible" })
        .to(
          "[data-loader-mark]",
          {
            yPercent: -22,
            duration: HOP,
            ease: "power2.out",
            yoyo: true,
            repeat: HOPS * 2 - 1,
          },
          REVEAL,
        )
        .to(
          counter,
          {
            value: 100,
            duration: HOLD - 0.2,
            ease: "power1.inOut",
            onUpdate: () => {
              const v = Math.round(counter.value);
              const num = root.current?.querySelector("[data-loader-count]");
              const fill = root.current?.querySelector<HTMLElement>("[data-loader-fill]");
              if (num) num.textContent = String(v).padStart(3, "0");
              // El logotipo ES la barra: se llena de abajo hacia arriba.
              if (fill) fill.style.clipPath = `inset(${100 - v}% 0 0 0)`;
            },
          },
          0.2,
        )
        .to(
          "[data-loader-fade]",
          {
            autoAlpha: 0,
            y: -14,
            duration: FADE,
            ease: "power2.in",
          },
          HOLD,
        )
        .to(
          root.current,
          {
            yPercent: -100,
            duration: CURTAIN,
            ease: "power4.inOut",
          },
          HOLD + FADE,
        );
    },
    { scope: root, dependencies: [reduced] },
  );

  if (!visible) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-80 flex flex-col justify-between bg-bg px-6 py-8 md:px-12"
    >
      <div className="flex items-center justify-between" data-loader-fade>
        <span className="text-xs tracking-[0.3em] uppercase text-muted">
          {site.name}
        </span>
        <span className="hidden text-xs tracking-[0.3em] uppercase text-muted sm:block">
          Cargando
        </span>
      </div>

      <div className="self-center overflow-clip" data-loader-fade data-loader-mask>
        <span
          data-loader-mark
          className="relative block font-display text-[clamp(5.5rem,24vw,15rem)] leading-none font-bold tracking-tight"
        >
          {/* Capa apagada: el logo todavía "sin cargar" */}
          <span className="text-muted/25">JC.</span>
          {/* Capa de marca: se revela de abajo hacia arriba al ritmo del contador */}
          <span
            data-loader-fill
            className="text-gradient absolute inset-0"
            style={{ clipPath: "inset(100% 0 0 0)" }}
          >
            JC.
          </span>
        </span>
      </div>

      {/* Sin barra: el progreso lo cuenta el propio logotipo al llenarse. */}
      <div data-loader-fade className="flex items-end justify-between gap-6">
        <span className="text-xs tracking-[0.3em] uppercase text-muted">
          Software a tu medida
        </span>
        <span
          data-loader-count
          className="font-display text-5xl leading-none font-semibold tabular-nums md:text-7xl"
        >
          000
        </span>
      </div>
    </div>
  );
}
