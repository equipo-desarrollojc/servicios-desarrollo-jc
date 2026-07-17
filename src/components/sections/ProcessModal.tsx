"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { processSteps } from "@/lib/data";
import { processScenes } from "./ProcessScenes";

type ProcessModalProps = {
  /** Índice del paso inicial, o null si el modal está cerrado. */
  step: number | null;
  onClose: () => void;
};

/**
 * Modal con las 5 escenas ilustradas del proceso. Navegable con flechas
 * del teclado, cierra con Escape y devuelve el foco al elemento origen.
 */
export function ProcessModal({ step, onClose }: ProcessModalProps) {
  const [current, setCurrent] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = step !== null;

  useEffect(() => {
    if (step !== null) setCurrent(step);
  }, [step]);

  useEffect(() => {
    if (!open) return;

    const lastFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.documentElement.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        setCurrent((c) => (c + 1) % processSteps.length);
      }
      if (e.key === "ArrowLeft") {
        setCurrent((c) => Math.max(0, c - 1));
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.removeProperty("overflow");
      lastFocus?.focus();
    };
  }, [open, onClose]);

  const Scene = processScenes[current];
  const data = processSteps[current];
  const isLast = current === processSteps.length - 1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-80 grid place-items-center p-5"
          role="dialog"
          aria-modal="true"
          aria-label={`Paso ${current + 1} de ${processSteps.length}: ${data.title}`}
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-bg/85 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[calc(100dvh-40px)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-surface shadow-[0_40px_100px_-24px_rgba(0,0,0,0.75)]"
          >
            <header className="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
              <div>
                <span className="mb-1.5 block font-mono text-[11px] tracking-[0.12em] text-accent uppercase">
                  Paso {current + 1} de {processSteps.length}
                </span>
                <h3 className="font-display text-xl font-bold tracking-tight">
                  {data.title}
                </h3>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="grid size-10 flex-none place-items-center rounded-xl border border-line text-muted transition-colors duration-300 hover:border-accent hover:text-ink"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="size-4"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </header>

            <div className="border-y border-line bg-[radial-gradient(circle_at_50%_20%,rgba(79,140,255,0.08),transparent_60%)]">
              {/* key=current remonta la escena y reinicia sus animaciones CSS */}
              <div key={current}>
                <Scene />
              </div>
            </div>

            <footer className="flex flex-wrap items-center justify-between gap-4 px-6 pt-4 pb-6">
              <p className="max-w-[44ch] text-sm text-muted">{data.sceneDescription}</p>
              <div className="ml-auto flex gap-2.5">
                <button
                  type="button"
                  disabled={current === 0}
                  onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                  className="rounded-full border border-line px-5 py-2.5 font-display text-sm text-muted transition-colors duration-300 not-disabled:hover:border-accent not-disabled:hover:text-ink disabled:opacity-40"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={() => setCurrent((c) => (c + 1) % processSteps.length)}
                  className="rounded-full bg-accent px-5 py-2.5 font-display text-sm font-medium text-white transition-colors duration-300 hover:bg-accent/90"
                >
                  {isLast ? "Volver al inicio" : "Siguiente"}
                </button>
              </div>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
