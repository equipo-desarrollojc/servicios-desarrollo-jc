import { stats } from "@/lib/data";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";

export function Stats() {
  return (
    <section aria-label="Cifras del estudio" className="section-pad">
      <div className="container-x">
        <dl className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="border-l border-line pl-6">
                <dd className="font-display text-6xl font-bold tracking-tight text-transparent md:text-7xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="text-gradient tabular-nums"
                  />
                </dd>
                <dt className="mt-3 text-sm text-muted">{stat.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
