<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Servicios y Desarrollo JC — Contexto del proyecto

Memoria compartida del equipo: Claude Code lee este archivo automáticamente
(vía `CLAUDE.md` → `@AGENTS.md`). Mantenlo al día cuando cambies algo grande.

## Qué es

Landing page del emprendimiento **Servicios y Desarrollo JC** (Honduras).
Eslogan: **"No compres software genérico. Constrúyelo a tu medida."**
Todo el contenido está en español, en lenguaje de cliente, sin tecnicismos.

- WhatsApp: +504 9507-6519 · Correo: contacto@serviciosydesarrollojc.com
- Dominio canónico en `src/lib/site.ts` (`site.url`).

## Historia (para entender el repo)

1. **v1 (Laravel)** — commits hasta `f0912eb`: Laravel 12 + Blade + CSS/JS sin
   build (`public/assets/`), formulario de contacto en SQLite, deploy en
   Coolify con Dockerfile PHP-FPM/Nginx. El hero ya tenía el globo 3D de
   partículas en canvas y un modal con 5 escenas SVG animadas del proceso.
2. **v2 (actual, julio 2026)** — **migración completa a Next.js**. Se eliminó
   todo Laravel y se rehizo la landing como experiencia premium tipo estudio
   (inspiración basement.studio) conservando la identidad: mismo eslogan,
   mismo globo 3D (portado a React) y las mismas 5 escenas del proceso.

## Stack v2

Next.js 16 (App Router, Turbopack, salida `standalone`) · TypeScript ·
Tailwind CSS 4 (tokens en `@theme` de `globals.css`) · GSAP 3.15
(ScrollTrigger + SplitText, plugins gratis desde 3.13) · Lenis (scroll suave)
· Framer Motion (menú móvil, modal, FAQ) · **sin Three.js** (el globo es
canvas 2D proyectado a mano, 240 puntos).

## Arquitectura

```
src/lib/site.ts             Datos del negocio (WhatsApp, correo, URL, nav)
src/lib/data.ts             TODO el contenido editable (servicios, pasos,
                            proyectos, stats, testimonios, FAQ)
src/lib/gsap.ts             Registro único de plugins GSAP
src/components/effects/     AppProvider (estado ready del preloader),
                            Preloader, SmoothScroll (Lenis), CustomCursor
src/components/ui/          Reveal, RevealText (SplitText), MagneticButton,
                            Marquee (CSS puro), AnimatedCounter, iconos
src/components/sections/    Hero + HeroGlobe, Services, Process +
                            ProcessModal + ProcessScenes (SVG), Portfolio,
                            Technologies, Stats, Testimonials, Faq, Contact
src/components/layout/      Header (oculta al bajar), Footer, WhatsAppButton
src/styles/process-modal.css  Keyframes de las 5 escenas (CSS global)
src/app/api/contact/route.ts  Guarda mensajes en data/messages.jsonl
```

## Convenciones y decisiones

- **Contenido**: nunca hardcodear textos en componentes; va en `src/lib/data.ts`.
- `data-reveal` arranca oculto solo si hay JS (`html.js` en `<html>`, script
  en layout con `suppressHydrationWarning`).
- Animaciones: ease `power3.out`, duraciones 0.4–1.2 s, `once: true` en
  reveals; todo respeta `prefers-reduced-motion` (hook `useReducedMotion`).
- El intro del hero espera al preloader vía contexto `useApp().ready`.
- Los **proyectos, cifras y testimonios son PLACEHOLDERS** — reemplazar por
  reales en `data.ts` cuando el cliente los entregue. `Project.video`
  acepta un mp4 en `public/videos/` que se reproduce al hover.
- Logos con fondo blanco en `public/brand/` (se muestran dentro de chips
  blancos redondeados en header/footer).

## Deploy (Coolify)

Dockerfile multi-stage Node 24 alpine, puerto **3000**, sin variables
obligatorias. Volumen opcional en `/app/data` para persistir los mensajes
del formulario (`data/messages.jsonl`). Ver README para el paso a paso.
