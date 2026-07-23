"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Faq as FaqType } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Acordeón de preguntas frecuentes con apertura animada. Las preguntas
 *  llegan por prop: se leen de la base que administra el panel. */
export function Faq({ faqs }: { faqs: FaqType[] }) {
  const [open, setOpen] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <section id="faq" aria-labelledby="faq-titulo" className="section-pad">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          id="faq-titulo"
          title="Todo lo que quizá te estés preguntando"
        />

        <Reveal className="lg:pt-2">
          <div className="divide-y divide-line/70 border-y border-line/70">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-base font-medium tracking-tight transition-colors duration-300 group-hover:text-accent md:text-lg">
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`relative grid size-9 flex-none place-items-center rounded-full border transition-all duration-400 ${
                        isOpen
                          ? "rotate-45 border-accent text-accent"
                          : "border-line text-muted group-hover:border-accent/60"
                      }`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="size-4"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-clip"
                      >
                        <p className="max-w-2xl pb-7 text-sm leading-relaxed text-muted">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
