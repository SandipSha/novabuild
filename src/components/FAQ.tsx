"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "How fast will my website actually load?",
    a: "We target sub-1.5s load times on mobile by using next-gen image formats (AVIF/WebP), lazy-loading, and global CDN caching — verified with Lighthouse before every launch.",
  },
  {
    q: "Do I need a mobile app, or is a website enough?",
    a: "Most businesses start with a high-converting website. We recommend a companion app once you have repeat customers who'd benefit from push notifications, loyalty rewards, or one-tap ordering.",
  },
  {
    q: "Can I update content myself after launch?",
    a: "Yes. Every project includes an easy-to-use content dashboard so you can update menus, prices, hours, and promotions in seconds — no developer required.",
  },
  {
    q: "How do you measure ROI on local SEO?",
    a: "We track Google Business Profile views, map-pack rankings, call clicks, direction requests, and booking/order conversions, delivered in a monthly growth report.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-y border-white/5 bg-surface/40 py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className="rounded-xl glass overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="font-medium">{f.q}</span>
                    <span className={`text-accent-2 transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                  </button>
                  {isOpen && <p className="px-6 pb-5 text-sm text-white/60">{f.a}</p>}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
