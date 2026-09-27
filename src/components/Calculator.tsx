"use client";

import { useMemo, useState } from "react";
import Reveal from "./Reveal";

export default function Calculator() {
  const [customerValue, setCustomerValue] = useState(45);
  const [visitors, setVisitors] = useState(800);
  const [visibilityLift, setVisibilityLift] = useState(40);

  const additionalRevenue = useMemo(() => {
    const conversionLift = 0.02; // 2% of extra visitors convert to customers
    const extraVisitors = visitors * (visibilityLift / 100);
    return Math.round(extraVisitors * conversionLift * customerValue);
  }, [customerValue, visitors, visibilityLift]);

  return (
    <section className="border-y border-white/5 bg-surface/40 py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            See What Better Digital Presence Is Actually Worth.
          </h2>
          <p className="mt-4 text-white/60">
            Move the sliders. Watch your potential revenue update in real time.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 rounded-2xl glass p-8 md:p-10 text-left">
          <div className="space-y-8">
            <div>
              <div className="flex justify-between text-sm text-white/70">
                <span>Average Customer Value</span>
                <span className="font-semibold text-accent-2">${customerValue}</span>
              </div>
              <input
                type="range"
                min={10}
                max={300}
                value={customerValue}
                onChange={(e) => setCustomerValue(Number(e.target.value))}
                className="mt-3 w-full accent-accent"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm text-white/70">
                <span>Current Monthly Site Visitors</span>
                <span className="font-semibold text-accent-2">{visitors.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={100}
                max={10000}
                step={100}
                value={visitors}
                onChange={(e) => setVisitors(Number(e.target.value))}
                className="mt-3 w-full accent-accent"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm text-white/70">
                <span>Target Visibility Increase</span>
                <span className="font-semibold text-accent-2">{visibilityLift}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={200}
                value={visibilityLift}
                onChange={(e) => setVisibilityLift(Number(e.target.value))}
                className="mt-3 w-full accent-accent"
              />
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-accent/30 bg-accent/10 p-6 text-center">
            <p className="text-xs uppercase tracking-widest text-white/50">
              Estimated Additional Monthly Revenue
            </p>
            <p className="mt-2 font-display text-4xl font-bold text-gradient">
              ${additionalRevenue.toLocaleString()}
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-white/40">
            Estimates based on average conversion lift (18–35%) observed across NovaBuild client
            projects. Actual results vary by industry and market.
          </p>

          <div className="mt-8 text-center">
            <a
              href="#contact"
              className="inline-flex items-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold shadow-lg shadow-accent/30"
            >
              Get My Personalized Growth Plan
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
