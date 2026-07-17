"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { site, navLinks } from "@/lib/site";
import { useApp } from "@/components/effects/AppProvider";
import { WhatsAppIcon } from "@/components/ui/icons";

/**
 * Cabecera fija: aparece tras el preloader, se oculta al bajar y reaparece
 * al subir. En móvil abre un menú a pantalla completa animado.
 */
export function Header() {
  const { ready } = useApp();
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (ref.current && !open) {
        const goingDown = y > lastY && y > 160;
        gsap.to(ref.current, {
          yPercent: goingDown ? -100 : 0,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        ref={ref}
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`fixed inset-x-0 top-0 z-70 transition-colors duration-500 ${
          scrolled && !open
            ? "border-b border-line/60 bg-bg/75 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="container-x flex h-20 items-center justify-between">
          <a
            href="#inicio"
            aria-label={`${site.name} — inicio`}
            className="flex items-center gap-3"
          >
            <span className="grid size-9 place-items-center overflow-clip rounded-xl bg-white">
              <Image
                src="/brand/isotipo.png"
                alt=""
                width={30}
                height={30}
                priority
              />
            </span>
            <span className="hidden font-display text-sm tracking-wide sm:block">
              Servicios y Desarrollo <strong className="font-bold">JC</strong>
            </span>
          </a>

          <nav aria-label="Navegación principal" className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm text-muted transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:text-ink hover:after:origin-left hover:after:scale-x-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-[#1fb355] px-5 py-2.5 font-display text-sm font-medium text-white transition-colors duration-300 hover:bg-[#25c95f] sm:inline-flex"
            >
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </a>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="relative z-90 flex size-11 flex-col items-center justify-center gap-1.5 rounded-full border border-line lg:hidden"
            >
              <span
                className={`block h-px w-5 bg-ink transition-transform duration-300 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-ink transition-transform duration-300 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-80 flex flex-col justify-between bg-bg px-6 pt-32 pb-10"
          >
            <nav aria-label="Navegación móvil" className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-line/60 py-4 font-display text-3xl font-bold tracking-tight"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1fb355] px-8 py-4 font-display text-sm font-medium text-white"
            >
              <WhatsAppIcon className="size-5" />
              Escríbenos por WhatsApp
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
