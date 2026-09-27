import Reveal from "./Reveal";

const tiers = [
  {
    name: "Starter",
    price: "$1,500",
    desc: "For businesses that need a fast, professional online presence.",
    features: ["Custom 5-page website", "Mobile-first design", "Basic local SEO setup", "30-day support"],
  },
  {
    name: "Growth",
    price: "$3,500",
    desc: "Our most popular package for businesses ready to scale.",
    features: ["Everything in Starter", "Booking/ordering system", "Content CMS dashboard", "Local SEO + Google Business optimization", "90-day support"],
    highlight: true,
  },
  {
    name: "Scale",
    price: "Custom",
    desc: "For businesses ready to launch a full branded mobile app.",
    features: ["Everything in Growth", "iOS & Android app", "Push notifications & loyalty rewards", "Ongoing growth strategy & reporting"],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Transparent Packages. No Hidden Fees. No Surprises.
        </h2>
        <p className="mt-4 text-white/60">
          Every package includes HD performance optimization and a 30-day post-launch support window.
        </p>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {tiers.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <div
              className={`h-full rounded-2xl p-8 ${
                t.highlight ? "glass border-2 border-accent shadow-xl shadow-accent/20 md:-translate-y-4" : "glass"
              }`}
            >
              {t.highlight && (
                <span className="mb-4 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-semibold">{t.name}</h3>
              <p className="mt-2 font-display text-3xl font-bold">{t.price}</p>
              <p className="mt-3 text-sm text-white/60">{t.desc}</p>
              <ul className="mt-6 space-y-2 text-sm text-white/70">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold ${
                  t.highlight ? "bg-accent" : "border border-white/15 hover:bg-white/5"
                }`}
              >
                Get Started
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
