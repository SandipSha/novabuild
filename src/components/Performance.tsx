import Reveal from "./Reveal";

const bullets = [
  "⚡ Sub-1.5s load times (Core Web Vitals \u201cGood\u201d across the board)",
  "🖼️ Automatic AVIF/WebP conversion + responsive srcset",
  "🌍 Global CDN edge caching (Cloudinary / Imgix / Vercel Edge)",
  "📱 Lazy-loading + skeleton states for zero layout shift",
  "🔍 100/100 Lighthouse performance target on launch",
];

const stack = ["Next.js", "WebP / AVIF", "Cloudinary", "Vercel Edge CDN", "Lighthouse CI"];

export default function Performance() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
        <Reveal>
          <div className="rounded-2xl glass p-8">
            <p className="text-xs uppercase tracking-widest text-white/40">Load time comparison</p>
            <div className="mt-6 space-y-4">
              <div>
                <div className="mb-1 flex justify-between text-xs text-white/50">
                  <span>Typical agency site</span>
                  <span>4.8s</span>
                </div>
                <div className="h-3 w-full rounded-full bg-white/5">
                  <div className="h-3 w-[92%] rounded-full bg-white/20" />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs text-white/50">
                  <span>NovaBuild site</span>
                  <span>1.3s</span>
                </div>
                <div className="h-3 w-full rounded-full bg-white/5">
                  <div className="h-3 w-[26%] rounded-full bg-gradient-to-r from-accent to-accent-2" />
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {stack.map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Stunning HD Visuals. Zero Compromise on Speed.
          </h2>
          <p className="mt-4 text-white/60">
            Most &ldquo;beautiful&rdquo; websites are slow. Ours aren&rsquo;t — because speed <em>is</em> the design.
          </p>
          <p className="mt-4 text-white/60">
            We engineer every pixel for performance. Every image on your site is automatically
            converted to next-gen WebP/AVIF formats, compressed without visible quality loss, and
            served through a global CDN with dynamic resolution matching — so a customer on a slow
            4G connection sees the same crisp, high-definition experience as someone on fiber
            broadband.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/70">
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
