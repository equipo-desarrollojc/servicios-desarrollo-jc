"use client";

import { createElement, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useMediaQuery";

type RevealTextProps = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  id?: string;
  /** "lines" para párrafos y títulos largos, "chars" para titulares cortos. */
  type?: "lines" | "words" | "chars";
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
};

/**
 * Texto que aparece por líneas/palabras/letras con máscara (efecto cortina),
 * disparado por ScrollTrigger. Usa autoSplit para resistir cambios de fuente
 * y de ancho de ventana sin romper las líneas.
 */
export function RevealText({
  children,
  as = "p",
  id,
  type = "lines",
  className,
  stagger,
  duration = 0.9,
  delay = 0,
  start = "top 85%",
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (reduced) {
        gsap.set(el, { opacity: 1 });
        return;
      }

      const split = SplitText.create(el, {
        type,
        mask: type,
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { opacity: 1 });
          const targets =
            type === "chars" ? self.chars : type === "words" ? self.words : self.lines;
          return gsap.from(targets, {
            yPercent: 115,
            duration,
            delay,
            ease: "power3.out",
            stagger: stagger ?? (type === "chars" ? 0.018 : 0.08),
            scrollTrigger: { trigger: el, start, once: true },
          });
        },
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [reduced] },
  );

  return createElement(as, { ref, id, className, "data-reveal": "" }, children);
}
