import Image from "next/image";
import { site, navLinks } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="border-t border-line/70">
      <div className="container-x py-16 md:py-20">
        <Reveal>
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center overflow-clip rounded-xl bg-white">
                  <Image
                    src="/brand/isotipo.png"
                    alt=""
                    width={32}
                    height={32}
                  />
                </span>
                <span className="font-display text-base font-bold">{site.name}</span>
              </div>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
                {site.slogan}
              </p>
              <p className="mt-3 text-sm text-muted">{site.location}</p>
            </div>

            <nav aria-label="Enlaces del pie de página" className="flex flex-col gap-3">
              <h2 className="mb-2 text-xs font-medium tracking-[0.25em] text-muted uppercase">
                Secciones
              </h2>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="w-fit text-sm text-muted transition-colors duration-300 hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-3">
              <h2 className="mb-2 text-xs font-medium tracking-[0.25em] text-muted uppercase">
                Contacto
              </h2>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-ink"
              >
                <WhatsAppIcon className="size-4 text-[#1fb355]" />
                {site.whatsapp}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="w-fit text-sm text-muted transition-colors duration-300 hover:text-ink"
              >
                {site.email}
              </a>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-line/60 pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
            </p>
            <p className="font-mono tracking-wide">
              Hecho a la medida con Next.js + GSAP
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
