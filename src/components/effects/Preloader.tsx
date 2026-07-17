"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useApp } from "./AppProvider";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { site } from "@/lib/site";

/**
 * Pantalla de carga: logotipo que emerge, contador 000→100 y barra de
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
        ScrollTrigger.refresh();
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
        duration: 0.7,
        ease: "power3.out",
      })
        .to(
          counter,
          {
            value: 100,
            duration: 1.7,
            ease: "power2.inOut",
            onUpdate: () => {
              const v = Math.round(counter.value);
              const num = root.current?.querySelector("[data-loader-count]");
              const bar = root.current?.querySelector<HTMLElement>("[data-loader-bar]");
              if (num) num.textContent = String(v).padStart(3, "0");
              if (bar) bar.style.transform = `scaleX(${v / 100})`;
            },
          },
          "<0.2",
        )
        .to("[data-loader-fade]", {
          autoAlpha: 0,
          y: -14,
          duration: 0.4,
          ease: "power2.in",
        })
        .to(root.current, {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
        });
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

      <div className="self-center overflow-clip" data-loader-fade>
        <span
          data-loader-mark
          className="block font-display text-[clamp(4rem,18vw,11rem)] leading-none font-bold tracking-tight"
        >
          JC<span className="text-gradient">.</span>
        </span>
      </div>

      <div data-loader-fade>
        <div className="mb-4 flex items-end justify-between">
          <span className="text-xs tracking-[0.3em] uppercase text-muted">
            Software a tu medida
          </span>
          <span
            data-loader-count
            className="font-display text-2xl font-medium tabular-nums"
          >
            000
          </span>
        </div>
        <div className="h-px w-full bg-line">
          <div
            data-loader-bar
            className="h-px w-full origin-left scale-x-0 bg-accent"
          />
        </div>
      </div>
    </div>
  );
}
