"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useMediaQuery";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Desplazamiento vertical inicial en px. */
  y?: number;
  delay?: number;
  duration?: number;
  start?: string;
};

/** Bloque que entra con fade + desplazamiento al alcanzar el viewport. */
export function Reveal({
  children,
  className,
  y = 36,
  delay = 0,
  duration = 0.9,
  start = "top 88%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!ref.current) return;
      if (reduced) {
        gsap.set(ref.current, { opacity: 1 });
        return;
      }
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start, once: true },
        },
      );
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <div ref={ref} data-reveal="" className={className}>
      {children}
    </div>
  );
}
