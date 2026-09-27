import Reveal from "./Reveal";

const steps = [
  { title: "Discover", copy: "Free growth audit of your current online presence & competitors." },
  { title: "Design", copy: "Custom UI/UX mockups tailored to your brand, reviewed with you in real time." },
  { title: "Build", copy: "Development + rigorous performance/QA testing across devices." },
  { title: "Grow", copy: "Launch, plus ongoing SEO, analytics, and optimization support." },
];

export default function Process() {
  return (
    <section id="process" className="border-y border-white/5 bg-surface/40 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">How We Work</h2>
        </Reveal>

        <div className="relative mt-16 grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-white/10 md:block" />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1} className="relative text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-[#0b0d10] font-display font-bold text-accent-2">
                {i + 1}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-white/60">{s.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
