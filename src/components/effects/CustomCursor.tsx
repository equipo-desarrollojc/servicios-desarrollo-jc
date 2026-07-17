"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsTouch, useReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Cursor personalizado: punto preciso + anillo con retardo.
 * Sobre enlaces y botones el anillo crece; sobre elementos con
 * `data-cursor-label` muestra una etiqueta (ej. "Ver").
 * Se desactiva en táctil y con prefers-reduced-motion.
 */
export function CustomCursor() {
  const touch = useIsTouch();
  const reduced = useReducedMotion();
  const enabled = !touch && !reduced;

  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;

    document.documentElement.classList.add("custom-cursor");

    const dotX = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power2.out" });
    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.35, ease: "power3.out" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.35, ease: "power3.out" });

    const show = gsap.to([dot.current, ring.current], {
      autoAlpha: 1,
      duration: 0.25,
      paused: true,
    });

    const onMove = (e: MouseEvent) => {
      show.play();
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "a, button, [role='button'], [data-cursor-label]",
      );
      const text = target?.dataset.cursorLabel ?? "";
      setLabel(text);
      gsap.to(ring.current, {
        scale: text ? 2.4 : target ? 1.7 : 1,
        backgroundColor: text ? "rgba(79,140,255,0.95)" : "rgba(79,140,255,0)",
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot.current, { scale: target ? 0 : 1, duration: 0.25 });
    };

    const onLeave = () => show.reverse();

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-90 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink opacity-0"
      />
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-90 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/40 opacity-0"
      >
        <span className="text-[9px] font-medium tracking-wide text-white uppercase">
          {label}
        </span>
      </div>
    </>
  );
}
