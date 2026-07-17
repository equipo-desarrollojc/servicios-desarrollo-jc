"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useIsTouch, useReducedMotion } from "@/hooks/useMediaQuery";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "whatsapp";
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

const variants = {
  primary:
    "bg-accent text-white hover:bg-accent/90 shadow-[0_0_40px_-12px] shadow-accent/60",
  outline:
    "border border-line bg-transparent text-ink hover:border-accent/60 hover:text-white",
  whatsapp:
    "bg-[#1fb355] text-white hover:bg-[#25c95f] shadow-[0_0_40px_-12px] shadow-[#1fb355]/60",
} as const;

/**
 * Botón magnético: se inclina hacia el cursor y vuelve con rebote elástico.
 * En táctil o con reduced motion se comporta como un botón normal.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  external,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const touch = useIsTouch();
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || touch || reduced) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
      const inner = el.querySelector("span");
      const xInner = inner && gsap.quickTo(inner, "x", { duration: 0.4, ease: "power3.out" });
      const yInner = inner && gsap.quickTo(inner, "y", { duration: 0.4, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        xTo(dx * 0.35);
        yTo(dy * 0.35);
        xInner?.(dx * 0.12);
        yInner?.(dy * 0.12);
      };

      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });
        if (inner) {
          gsap.to(inner, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });
        }
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref, dependencies: [touch, reduced] },
  );

  const base = `inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-display text-sm font-medium tracking-wide transition-colors duration-300 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        className={base}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span className="inline-flex items-center gap-2">{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={base}
    >
      <span className="inline-flex items-center gap-2">{children}</span>
    </button>
  );
}
