"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { contactServiceOptions } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WhatsAppIcon } from "@/components/ui/icons";

type FormStatus = "idle" | "sending" | "success" | "error";

const inputClasses =
  "w-full rounded-xl border border-line bg-surface/60 px-4 py-3.5 text-sm text-ink placeholder:text-muted/60 transition-colors duration-300 focus:border-accent focus:outline-none";

/** Gran CTA final + formulario que guarda el mensaje vía /api/contact. */
export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="section-pad bg-surface/40">
      <div className="container-x grid gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Contacto"
            id="contacto-titulo"
            title="Hablemos de tu proyecto"
            lede="Cuéntanos qué necesitas y te respondemos con los siguientes pasos. Sin compromiso."
          />

          <Reveal delay={0.2} className="mt-10 space-y-4">
            <div className="flex flex-wrap gap-4">
              <MagneticButton href={site.whatsappUrl} external variant="whatsapp">
                <WhatsAppIcon className="size-5" />
                WhatsApp directo
              </MagneticButton>
              <MagneticButton href={`mailto:${site.email}`} variant="outline">
                {site.email}
              </MagneticButton>
            </div>
            <p className="text-sm text-muted">{site.location}</p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-line/80 bg-bg/60 p-7 md:p-9" noValidate>
            <div>
              <label htmlFor="name" className="mb-2 block text-xs font-medium tracking-[0.15em] text-muted uppercase">
                Nombre
              </label>
              <input id="name" name="name" type="text" required maxLength={120} className={inputClasses} />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-medium tracking-[0.15em] text-muted uppercase">
                  Correo
                </label>
                <input id="email" name="email" type="email" required maxLength={190} className={inputClasses} />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-xs font-medium tracking-[0.15em] text-muted uppercase">
                  Teléfono (opcional)
                </label>
                <input id="phone" name="phone" type="tel" maxLength={40} className={inputClasses} />
              </div>
            </div>

            <div>
              <label htmlFor="service" className="mb-2 block text-xs font-medium tracking-[0.15em] text-muted uppercase">
                Servicio de interés
              </label>
              <select id="service" name="service" defaultValue="" className={inputClasses}>
                <option value="" disabled>
                  Selecciona una opción
                </option>
                {contactServiceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-xs font-medium tracking-[0.15em] text-muted uppercase">
                Cuéntanos sobre tu proyecto
              </label>
              <textarea id="message" name="message" rows={4} required maxLength={4000} className={inputClasses} />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-accent py-4 font-display text-sm font-medium tracking-wide text-white transition-all duration-300 hover:bg-accent/90 disabled:opacity-60"
            >
              {status === "sending" ? "Enviando…" : "Enviar mensaje"}
            </button>

            <div aria-live="polite">
              {status === "success" && (
                <p className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                  ¡Mensaje recibido! Te responderemos muy pronto.
                </p>
              )}
              {status === "error" && (
                <p className="rounded-xl border border-rose/40 bg-rose/10 px-4 py-3 text-sm text-rose">
                  No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
