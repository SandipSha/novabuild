import Reveal from "./Reveal";

const services = [
  {
    title: "High-Converting Websites",
    copy:
      "Custom-coded, mobile-first websites built for speed, SEO, and sales. No templates, no bloat — just a site that works as hard as you do.",
    features: ["Responsive design", "Built-in booking/ordering", "Real-time content editing", "Sub-1s load times"],
  },
  {
    title: "Native & Cross-Platform Apps",
    copy:
      "Give customers a direct line to your business with a branded iOS/Android app — loyalty rewards, push notifications, and one-tap ordering included.",
    features: ["React Native / Flutter builds", "Push notifications", "Offline mode", "App Store optimization"],
  },
  {
    title: "Local SEO & Growth Strategy",
    copy:
      'Rank #1 on Google Maps for the searches that matter — "near me," your category, your city — and convert that visibility into revenue.',
    features: ["Google Business Profile optimization", "Review generation systems", "Local keyword targeting", "Monthly growth reporting"],
  },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Everything Your Business Needs to Show Up, Stand Out, and Sell.
        </h2>
        <p className="mt-4 text-white/60">
          From your first click to your fifth order — one team, one system, zero guesswork.
        </p>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1}>
            <div className="group h-full rounded-2xl glass p-8 transition-transform duration-300 hover:-translate-y-2 hover:border-accent/40">
              <div className="mb-6 h-11 w-11 rounded-xl bg-gradient-to-br from-accent to-accent-2 transition-transform duration-300 group-hover:rotate-6" />
              <h3 className="font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm text-white/60">{s.copy}</p>
              <ul className="mt-6 space-y-2 text-sm text-white/50">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-14 rounded-2xl glass p-8 md:p-10 text-center md:text-left md:flex md:items-center md:justify-between gap-8">
        <div>
          <h3 className="font-display text-2xl font-bold">Update Anything, Anytime — No Developer Needed.</h3>
          <p className="mt-3 max-w-xl text-white/60">
            Every site and app we build comes with an intuitive dashboard so you can update menus,
            prices, hours, and promotions in seconds — from your phone.
          </p>
        </div>
        <a
          href="#contact"
          className="mt-6 inline-flex shrink-0 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold md:mt-0"
        >
          Get My Free Growth Audit
        </a>
      </Reveal>
    </section>
  );
}
