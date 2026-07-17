# Servicios y Desarrollo JC — Landing

Landing page inmersiva del emprendimiento **Servicios y Desarrollo JC**.
Eslogan: **"No compres software genérico. Constrúyelo a tu medida."**

Construida con **Next.js 16 + TypeScript + Tailwind CSS 4 + GSAP (ScrollTrigger/SplitText) + Lenis + Framer Motion**. Sin Three.js: el globo 3D del hero es un canvas 2D proyectado a mano (240 partículas conectadas, 60 FPS).

## Experiencia

- **Preloader** con contador y telón de salida.
- **Hero**: globo 3D de partículas reactivo al puntero, titular letra por letra, parallax al hacer scroll.
- **Cursor personalizado** (punto + anillo con etiqueta contextual) y **scroll suave** con Lenis.
- **Servicios**: 6 cards con hover de elevación e iconografía propia.
- **Proceso**: timeline de 5 pasos dibujada con el scroll + **modal con 5 escenas SVG animadas** (flechas del teclado para navegar).
- **Proyectos**: grid con zoom, fondo de sección que se tiñe al hover y soporte de video por proyecto.
- **Tecnologías**: marquesinas infinitas en direcciones opuestas.
- **Estadísticas** con contadores animados, **testimonios** en carrusel infinito, **FAQ** en acordeón y **contacto** con formulario + WhatsApp.
- Accesible (semántica, teclado, `prefers-reduced-motion`) y optimizado para SEO (metadata, JSON-LD, robots, sitemap).

## Desarrollo local

Requiere Node 20+.

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # build de producción (salida standalone)
```

## Estructura

```
src/app/                    Layout (SEO), página, API de contacto, robots, sitemap
src/components/effects/     Preloader, SmoothScroll (Lenis), CustomCursor, AppProvider
src/components/ui/          RevealText, Reveal, MagneticButton, Marquee, contador, etc.
src/components/sections/    Hero + globo, Servicios, Proceso + modal, Proyectos, ...
src/components/layout/      Header, Footer, botón flotante de WhatsApp
src/lib/                    site.ts (datos del negocio), data.ts (contenido), gsap.ts
src/styles/                 Animaciones CSS de las escenas del proceso
public/brand/               Isotipo, isologo y logo horizontal
```

Para cambiar textos, servicios, proyectos, cifras o testimonios edita
`src/lib/data.ts` y `src/lib/site.ts` (WhatsApp, correo, URL).

**Los proyectos, cifras y testimonios actuales son de muestra** — reemplázalos
por los reales en `src/lib/data.ts`. Para mostrar video al hacer hover en un
proyecto, coloca el archivo en `public/videos/` y apunta el campo `video`.

## Despliegue en Coolify

El repo incluye un `Dockerfile` multi-stage (Node alpine + salida standalone).

1. **Nueva aplicación → desde este repositorio**, build type: `Dockerfile`.
2. **Puerto expuesto**: `3000`.
3. **Volumen persistente** (opcional, para el formulario): monta en `/app/data`.
   Los mensajes se guardan en `/app/data/messages.jsonl`.
4. No requiere variables de entorno obligatorias. Opcional:
   - `CONTACT_DATA_DIR` — carpeta alternativa para los mensajes.

El dominio canónico está en `src/lib/site.ts` (`site.url`), usado por
metadata, sitemap y JSON-LD.
