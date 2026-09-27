"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const cases = [
  {
    client: "Maria's Trattoria",
    type: "Local Restaurant",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    alt: "Warmly lit modern restaurant interior with set dining tables",
    tags: ["📈 +150% Local Foot Traffic", "🛍️ 2x Online Order Bookings", "⭐ 4.8★ (from 3.9★)"],
    blurb: "A full site rebuild + ordering app took Maria's from a hidden gem to the busiest table in town.",
  },
  {
    client: "Bright Smile Dental",
    type: "Professional Clinic",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09",
    alt: "Bright, modern dental clinic treatment room",
    tags: ["📅 +80% New Patient Bookings", "📉 -35% No-Shows via App Reminders"],
    blurb: "A branded booking app with automated reminders filled the calendar and cut no-shows in half.",
  },
  {
    client: "Urban Fit Studio",
    type: "Fitness Studio",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
    alt: "Clients training in a modern boutique fitness studio",
    tags: ["🏋️ 3x Class Sign-ups", "📲 +200% Instagram-to-Booking Conversion"],
    blurb: "A slick mobile-first booking site turned social followers into paying members.",
  },
];

export default function CaseStudies() {
  return (
    <section id="work" className="border-y border-white/5 bg-surface/40 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Real Businesses. Real Results. Real ROI.
          </h2>
          <p className="mt-4 text-white/60">
            Drag, rotate, and explore the work — then see the numbers behind it.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={c.client} delay={i * 0.1}>
              <motion.div
                whileHover={{ rotateX: -4, rotateY: 6, translateY: -6 }}
                style={{ transformStyle: "preserve-3d" }}
                className="tilt-scene h-full rounded-2xl glass p-7"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10">
                  <Image
                    src={`${c.image}?q=100&w=2000&auto=format&fit=crop`}
                    alt={c.alt}
                    fill
                    quality={95}
                    sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 90vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/10" />
                </div>
                <p className="mt-6 text-xs uppercase tracking-wide text-white/40">{c.type}</p>
                <h3 className="mt-1 font-display text-lg font-semibold">{c.client}</h3>
                <p className="mt-3 text-sm text-white/60">{c.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                      {t}
                    </span>
                  ))}
                </div>
                <a href="#contact" className="mt-6 inline-block text-sm font-semibold text-accent-2 hover:underline">
                  View Full Case Study ▸
                </a>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
