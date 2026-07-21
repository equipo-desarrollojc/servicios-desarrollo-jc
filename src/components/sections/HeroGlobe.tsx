"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useMediaQuery";

const POINT_COUNT = 240;
const LINK_NEIGHBORS = 3;
const FOV = 2.4;
const BASE_SPEED = 0.0032;
const BASE_TILT = -0.35;
/** Con `prefers-reduced-motion` el globo gira a esta fracción y deja de
 *  reaccionar al puntero: movimiento reducido, no ausencia de movimiento. */
const SLOW_FACTOR = 0.4;

const COLORS = [
  "79, 140, 255",
  "79, 140, 255",
  "110, 120, 250",
  "168, 85, 247",
  "255, 77, 126",
];

type Point = {
  x: number;
  y: number;
  z: number;
  size: number;
  twinkle: number;
  color: string;
};

type Projected = {
  sx: number;
  sy: number;
  size: number;
  alpha: number;
  depth: number;
  color: string;
};

/**
 * Globo 3D de partículas conectadas dibujado en canvas 2D (sin Three.js:
 * 240 puntos proyectados a mano rinden 60 FPS con una fracción del bundle).
 * Reacciona al puntero (velocidad e inclinación) y se pausa fuera de
 * pantalla o con la pestaña oculta.
 */
export function HeroGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let radius = 0;
    let rafId: number | null = null;
    let inView = true;

    // Se lee la media query aquí y no solo del estado de React: el hook va por
    // `useSyncExternalStore`, cuyo snapshot de servidor es `false`, así que en
    // el primer render cliente llega `false` aunque el sistema pida lo contrario.
    const sinMovimiento =
      reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cruise = BASE_SPEED * (sinMovimiento ? SLOW_FACTOR : 1);

    let rotY = 0;
    let tiltX = BASE_TILT;
    let targetTiltX = BASE_TILT;
    let speedY = cruise;
    let targetSpeedY = cruise;

    // Esfera de Fibonacci: distribución uniforme de puntos.
    const points: Point[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < POINT_COUNT; i++) {
      const t = i / (POINT_COUNT - 1);
      const y = 1 - t * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      points.push({
        x: Math.cos(theta) * r,
        y,
        z: Math.sin(theta) * r,
        size: 1.5 + Math.random() * 2.1,
        twinkle: Math.random() * Math.PI * 2,
        color: COLORS[(Math.random() * COLORS.length) | 0],
      });
    }

    // Cada punto se enlaza con sus vecinos más cercanos, sin duplicados.
    const links: Array<[number, number]> = [];
    const seen = new Set<string>();
    for (let a = 0; a < points.length; a++) {
      const dists: Array<{ b: number; d: number }> = [];
      for (let b = 0; b < points.length; b++) {
        if (a === b) continue;
        const dx = points[a].x - points[b].x;
        const dy = points[a].y - points[b].y;
        const dz = points[a].z - points[b].z;
        dists.push({ b, d: dx * dx + dy * dy + dz * dz });
      }
      dists.sort((m, n) => m.d - n.d);
      for (let k = 0; k < LINK_NEIGHBORS; k++) {
        const other = dists[k].b;
        const key = `${Math.min(a, other)}-${Math.max(a, other)}`;
        if (!seen.has(key)) {
          seen.add(key);
          links.push([a, other]);
        }
      }
    }

    const projected: Projected[] = new Array(points.length);

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = width * 0.5;
      cy = height * 0.47;
      radius = Math.max(Math.min(width * 0.36, height * 0.44), 170);
    };

    const drawGlow = () => {
      const glow = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius * 1.6);
      glow.addColorStop(0, "rgba(79, 140, 255, 0.14)");
      glow.addColorStop(0.55, "rgba(120, 90, 240, 0.07)");
      glow.addColorStop(1, "rgba(5, 6, 11, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
    };

    const step = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      drawGlow();

      speedY += (targetSpeedY - speedY) * 0.04;
      tiltX += (targetTiltX - tiltX) * 0.06;
      rotY += speedY;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosT = Math.cos(tiltX);
      const sinT = Math.sin(tiltX);
      const globeScale = radius / 320;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y1 = p.y * cosT - z1 * sinT;
        const z2 = p.y * sinT + z1 * cosT;

        const pers = FOV / (FOV + z2);
        const depth = (z2 + 1) / 2;
        let alpha = 0.2 + depth * 0.8;
        alpha *= 0.82 + 0.18 * Math.sin(now * 0.0022 + p.twinkle);

        projected[i] = {
          sx: cx + x1 * radius * pers,
          sy: cy + y1 * radius * pers,
          size: p.size * (0.55 + depth * 1.05) * globeScale,
          alpha,
          depth,
          color: p.color,
        };
      }

      for (const [a, b] of links) {
        const pa = projected[a];
        const pb = projected[b];
        const avg = (pa.depth + pb.depth) / 2;
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.strokeStyle = `rgba(125, 155, 230, ${(0.04 + avg * 0.3).toFixed(3)})`;
        ctx.lineWidth = 0.6 + avg * 0.9;
        ctx.stroke();
      }

      for (const q of projected) {
        ctx.beginPath();
        ctx.arc(q.sx, q.sy, q.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${q.color}, ${(q.alpha * 0.14).toFixed(3)})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(q.sx, q.sy, q.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${q.color}, ${q.alpha.toFixed(3)})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(step);
    };

    const play = () => {
      if (rafId === null && inView && !document.hidden) {
        rafId = requestAnimationFrame(step);
      }
    };

    const pause = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetSpeedY = BASE_SPEED + nx * 0.007;
      targetTiltX = BASE_TILT + ny * 0.55;
    };

    const onPointerLeave = () => {
      targetSpeedY = BASE_SPEED;
      targetTiltX = BASE_TILT;
    };

    const onVisibility = () => (document.hidden ? pause() : play());

    resize();

    play();

    // El giro lento se conserva siempre; lo que se quita con la preferencia es
    // la reacción al puntero, que es la parte brusca: acelera e inclina el globo
    // siguiendo el mouse.
    if (!sinMovimiento) {
      host.addEventListener("pointermove", onPointerMove);
      host.addEventListener("pointerleave", onPointerLeave);
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) play();
      else pause();
    });
    observer.observe(host);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      pause();
      observer.disconnect();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
