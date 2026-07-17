type MarqueeProps = {
  children: React.ReactNode;
  /** Segundos por vuelta completa. */
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
};

/**
 * Marquesina infinita por CSS (solo transform → 60 FPS sin tocar el hilo
 * principal). El contenido se duplica para lograr el bucle perfecto.
 */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  pauseOnHover = false,
  className = "",
}: MarqueeProps) {
  return (
    <div
      className={`group flex overflow-clip ${className}`}
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div
        className={`animate-marquee flex w-max shrink-0 items-center ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        }`}
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex w-max shrink-0 items-center">{children}</div>
        <div aria-hidden="true" className="flex w-max shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
