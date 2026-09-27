import DeviceMockup from "./DeviceMockup";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="mesh-bg pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <div>
          <Reveal>
            <p className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-2 uppercase">
              Website &amp; App Development for Local Businesses
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Turn Local Searches Into <span className="text-gradient">Loyal Customers.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-lg text-white/70">
              We design and build blazing-fast websites and mobile apps that make your business
              impossible to ignore — so you dominate your neighborhood, not just your niche.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold shadow-lg shadow-accent/30 transition-transform hover:-translate-y-0.5"
            >
              Get My Free Growth Audit
            </a>
            <a
              href="#work"
              className="inline-flex items-center rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:bg-white/5"
            >
              View Our Work ▸
            </a>
          </Reveal>

          <Reveal delay={0.4} className="mt-10 text-sm text-white/50">
            ⭐ 4.9/5 average client rating · 50+ local businesses scaled · Avg. +120% online
            visibility in 90 days
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="relative flex h-[420px] items-center justify-center">
            <DeviceMockup variant="laptop" />
            <DeviceMockup variant="phone" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
