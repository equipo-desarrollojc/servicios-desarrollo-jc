import { RevealText } from "./RevealText";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  id?: string;
  className?: string;
};

/** Encabezado de sección: kicker pequeño + título grande con reveal por líneas. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  id,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`max-w-4xl ${className}`}>
      <Reveal y={16}>
        <p className="mb-6 flex items-center gap-3 text-xs font-medium tracking-[0.3em] uppercase text-muted">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          {eyebrow}
        </p>
      </Reveal>
      <RevealText
        as="h2"
        id={id}
        type="lines"
        className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance md:text-6xl"
      >
        {title}
      </RevealText>
      {lede ? (
        <RevealText
          type="lines"
          delay={0.15}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
        >
          {lede}
        </RevealText>
      ) : null}
    </div>
  );
}
