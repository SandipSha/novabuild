import Reveal from "./Reveal";

const supporting = [
  { quote: "They didn\u2019t just build us a website — they built us a growth engine.", name: "Priya Shah", biz: "Shah Family Dental" },
  { quote: "Our booking app paid for itself in six weeks.", name: "Diego Ramirez", biz: "FlexFit Studio" },
  { quote: "Finally, a dev team that understands small business budgets AND big business standards.", name: "Lena Kowalski", biz: "Bloom & Co. Florals" },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Trusted by Local Business Owners Who Wanted More.
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mx-auto mt-12 max-w-3xl rounded-2xl glass p-8 md:p-10 text-center">
        <p className="font-display text-xl leading-relaxed text-white/90 sm:text-2xl">
          &ldquo;Before NovaBuild, we were the best-kept secret on our block. Now we&rsquo;re fully
          booked two weeks out — and our new app means half our orders come in before customers even
          walk through the door.&rdquo;
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent to-accent-2" />
          <div className="text-left">
            <p className="font-semibold">James Okafor</p>
            <p className="text-sm text-white/50">Owner, Okafor&rsquo;s BBQ Smokehouse</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-accent-2">📈 +2.4x weekly orders · ⭐ 4.9 rating</p>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {supporting.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <div className="h-full rounded-2xl glass p-6">
              <p className="text-sm text-white/70">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-accent/70 to-accent-2/70" />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-white/50">{t.biz}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
