"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { useApp } from "@/components/effects/AppProvider";
import { WhatsAppIcon } from "@/components/ui/icons";

/** Botón flotante de WhatsApp, visible tras el preloader. */
export function WhatsAppButton() {
  const { ready } = useApp();

  return (
    <motion.a
      href={site.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={ready ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed right-5 bottom-5 z-70 flex size-14 items-center justify-center rounded-full bg-[#1fb355] text-white shadow-[0_10px_40px_-8px_rgba(31,179,85,0.7)] md:right-8 md:bottom-8"
    >
      <WhatsAppIcon className="size-7" />
    </motion.a>
  );
}
