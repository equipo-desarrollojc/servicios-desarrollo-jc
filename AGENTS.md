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
  reales en `data.ts` cuando el cliente los entregue. Cada proyecto enlaza a
  una **demo HTML ilustrativa en `public/demos/`** (estáticas, autocontenidas,
  con banner "DEMO ILUSTRATIVA"); cuando haya proyectos reales, apunta
  `Project.url` al sitio en vivo y borra la demo. `Project.video` acepta un
  mp4 en `public/videos/` que se reproduce al hover.
- Logos con fondo blanco en `public/brand/` (se muestran dentro de chips
  blancos redondeados en header/footer).
- ⚠️ **Nunca combinar una clase `scale-*` de Tailwind con una animación GSAP
  de `scale`/`scaleX`/`scaleY` en el mismo elemento.** En Tailwind 4 (no en la
  3) `scale-x-0` compila a la propiedad independiente `scale: 0 1`, mientras
  GSAP escribe en `transform`. El navegador aplica las dos y las multiplica:
  cualquier valor × 0 = 0 y el elemento queda invisible, sin error ni aviso.
  El estado inicial va en `style={{ transform: "scaleX(0)" }}`. Este fallo
  mantuvo invisibles la barra del preloader y la línea de progreso de
  `Process.tsx` desde la migración a Tailwind 4.
- **Preloader**: dura 10 s (constante `TOTAL`, de la que se derivan los demás
  tiempos). El logotipo "JC." **es** la barra de progreso — se llena del
  degradado de marca de abajo hacia arriba al ritmo del contador `000→100`, y
  salta mientras tanto. No hay barra aparte. Contador, relleno y cualquier
  indicador se mueven desde un único valor en el `onUpdate` del contador.
- **`prefers-reduced-motion` reduce el movimiento, no elimina la pantalla.**
  Con esa preferencia el preloader conserva el relleno del logo y el contador
  —que no desplazan nada— y quita el salto y el telón deslizante. Antes se
  cancelaba entero y quien la tuviera activada no veía nunca la marca.
- Al decidir según `prefers-reduced-motion` dentro de un efecto, **leer la media
  query en ese momento** (`window.matchMedia(...).matches`) y no fiarse solo del
  hook: `useSyncExternalStore` devuelve el snapshot de servidor (`false`) en el
  primer render cliente, así que la animación se arma como si no hubiera
  preferencia y el `revert` de GSAP no siempre mata los tweens ya lanzados.
- Para verificar animaciones hace falta un navegador real (Playwright con
  `reducedMotion` en `"no-preference"` **y** en `"reduce"`): `tsc` en verde no
  prueba nada visual, y quien revisa puede tener los efectos del sistema
  desactivados.

## Protocolo "guardalo todo dev 1 / dev 2"

Cuando alguien del equipo escriba **"guardalo todo dev 1"** o **"dev 2"**,
el asistente debe hacer, sin preguntar:

1. Guardar lo relevante de la sesión en su memoria y actualizar este
   `AGENTS.md` si cambió la arquitectura o alguna convención.
2. Commit descriptivo con la línea `Developer: <nombre> (dev N)` en el cuerpo:
   - **dev 1 = Josue Fellmann** · **dev 2 = Cristopher Valle**
   - más el trailer `Co-Authored-By:` del asistente.
3. `git push` a `origin/main` y reportar el hash.

## Deploy (Coolify)

Dockerfile multi-stage Node 24 alpine, puerto **3000**, sin variables
obligatorias. Volumen opcional en `/app/data` para persistir los mensajes
del formulario (`data/messages.jsonl`). Ver README para el paso a paso.
