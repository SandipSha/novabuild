"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";

type TabId = "fresh-start" | "growth" | "operations" | "retention";

const AUTO_ROTATE_MS = 5000;

const tabs: {
  id: TabId;
  label: string;
  eyebrow: string;
  headline: string;
  description: string;
  cta: string;
}[] = [
  {
    id: "fresh-start",
    label: "Fresh Start",
    eyebrow: "Foundation & Rebranding",
    headline: "Modernize Your Brand Presence",
    description:
      "Shed outdated systems and redefine your digital identity with a modern, high-converting experience built for scale.",
    cta: "Start Your Refresh",
  },
  {
    id: "growth",
    label: "Accelerated Growth",
    eyebrow: "Scale & Reach",
    headline: "Expand Your Reach & Drive Revenue",
    description:
      "Unlock exponential growth using automated marketing, targeted customer acquisition tools, and streamlined lead funnels.",
    cta: "Explore Growth Tools",
  },
  {
    id: "operations",
    label: "Smart Operations",
    eyebrow: "Efficiency & Automation",
    headline: "Streamline Operations with AI & Automation",
    description:
      "Free up vital hours by automating repetitive tasks, inventory tracking, and client communications so you can focus on core vision.",
    cta: "Automate Workflows",
  },
  {
    id: "retention",
    label: "Customer Retention",
    eyebrow: "LTV & Engagement",
    headline: "Turn One-Time Buyers into Lifelong Advocates",
    description:
      "Build deeper relationships with automated email sequences, personal loyalty perks, and dedicated support channels.",
    cta: "Boost Loyalty",
  },
];

/** Fresh Start: before/after brand split visual */
function FreshStartVisual() {
  return (
    <div className="grid h-full grid-cols-2 gap-3">
      <div className="flex flex-col justify-end gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 grayscale">
        <p className="text-[10px] uppercase tracking-widest text-white/40">Before</p>
        <div className="h-3 w-3/4 rounded bg-white/20" />
        <div className="h-3 w-1/2 rounded bg-white/10" />
        <div className="mt-2 h-16 rounded-lg bg-white/10" />
      </div>
      <div className="flex flex-col justify-end gap-2 rounded-xl border border-accent/40 bg-gradient-to-br from-accent/25 to-accent-2/15 p-4">
        <p className="text-[10px] uppercase tracking-widest text-accent-2">After</p>
        <div className="h-3 w-3/4 rounded bg-white/70" />
        <div className="h-3 w-1/2 rounded bg-white/40" />
        <div className="mt-2 h-16 rounded-lg bg-gradient-to-br from-accent to-accent-2" />
      </div>
    </div>
  );
}

/** Accelerated Growth: analytics dashboard with upward trend */
function GrowthVisual() {
  const bars = [30, 45, 40, 60, 55, 78, 92];
  return (
    <div className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-widest text-white/40">Monthly Revenue</p>
        <span className="rounded-full bg-accent-2/15 px-2 py-0.5 text-[10px] font-semibold text-accent-2">
          +64%
        </span>
      </div>
      <p className="mt-2 font-display text-2xl font-bold">$48,290</p>
      <div className="mt-5 flex flex-1 items-end gap-2">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
            className="flex-1 rounded-t-md bg-gradient-to-t from-accent to-accent-2"
          />
        ))}
      </div>
    </div>
  );
}

/** Smart Operations: automated workflow process map */
function OperationsVisual() {
  const steps = ["Order In", "Auto-Sort", "AI Reply", "Synced"];
  return (
    <div className="flex h-full flex-col justify-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-[10px] uppercase tracking-widest text-white/40">Automated Workflow</p>
      <div className="flex items-center">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-accent/15 text-xs font-semibold text-accent-2">
                {i + 1}
              </div>
              <p className="text-[11px] text-white/60">{s}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="mx-1 h-px flex-1 bg-gradient-to-r from-accent/60 to-accent-2/30 mb-6" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 rounded-lg bg-white/5 p-3 text-xs text-white/60">
        🤖 AI Assistant handled <span className="text-accent-2 font-semibold">128 tasks</span> this week — 0 missed replies.
      </div>
    </div>
  );
}

/** Customer Retention: engagement & loyalty dashboard */
function RetentionVisual() {
  return (
    <div className="flex h-full flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-[10px] uppercase tracking-widest text-white/40">Customer Journey</p>
      <div className="flex items-center gap-4">
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-accent-2/30">
          <div className="absolute inset-0 rounded-full border-4 border-accent-2 [clip-path:polygon(0_0,100%_0,100%_78%,0_78%)]" />
          <span className="font-display text-sm font-bold">82%</span>
        </div>
        <div>
          <p className="font-display text-lg font-semibold">Engagement Score</p>
          <p className="text-xs text-white/50">Based on repeat visits &amp; loyalty activity</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-white/5 p-3">
          <p className="font-display text-xl font-bold text-accent-2">3.4x</p>
          <p className="text-[11px] text-white/50">Repeat orders</p>
        </div>
        <div className="rounded-lg bg-white/5 p-3">
          <p className="font-display text-xl font-bold text-accent-2">92%</p>
          <p className="text-[11px] text-white/50">Loyalty opt-in</p>
        </div>
      </div>
    </div>
  );
}

const visuals: Record<TabId, () => React.JSX.Element> = {
  "fresh-start": FreshStartVisual,
  growth: GrowthVisual,
  operations: OperationsVisual,
  retention: RetentionVisual,
};

export default function TransformShowcase() {
  const [active, setActive] = useState<TabId>("fresh-start");
  const [isPaused, setIsPaused] = useState(false);
  const [manuallySelected, setManuallySelected] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIndex = tabs.findIndex((t) => t.id === active);
  const activeTab = tabs[activeIndex];
  const ActiveVisual = visuals[active];

  // Auto-rotate every 5s, looping, unless paused by interaction or a manual selection was made.
  useEffect(() => {
    if (isPaused || manuallySelected) return;

    const timer = setInterval(() => {
      setActive((current) => {
        const nextIndex = (tabs.findIndex((t) => t.id === current) + 1) % tabs.length;
        return tabs[nextIndex].id;
      });
    }, AUTO_ROTATE_MS);

    return () => clearInterval(timer);
  }, [isPaused, manuallySelected, active]);

  const selectTab = useCallback((id: TabId, manual: boolean) => {
    setActive(id);
    if (manual) setManuallySelected(true);
  }, []);

  function handleContainerFocusLeave(e: React.FocusEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setIsPaused(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      selectTab(tabs[nextIndex].id, true);
      tabRefs.current[nextIndex]?.focus();
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Transform Your Business: <span className="text-gradient">Growth &amp; New Beginnings.</span>
        </h2>
        <p className="mt-4 text-white/60">
          Pick a path — see exactly how NovaBuild moves the needle for your business.
        </p>
      </Reveal>

      <Reveal
        delay={0.1}
        className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr] md:gap-10"
      >
        <div
          className="contents"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={handleContainerFocusLeave}
        >
          {/* Control bar */}
          <div
            role="tablist"
            aria-label="Business transformation paths"
            aria-orientation="vertical"
            className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0"
          >
            {tabs.map((t, i) => {
              const isActive = t.id === active;
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`transform-tab-${t.id}`}
                  aria-selected={isActive}
                  aria-controls={`transform-panel-${t.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectTab(t.id, true)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={`shrink-0 rounded-xl px-5 py-4 text-left text-sm transition-all md:w-full ${
                    isActive
                      ? "bg-accent font-semibold text-white shadow-lg shadow-accent/30"
                      : "border border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="block whitespace-nowrap md:whitespace-normal">{t.label}</span>
                  {isActive && (
                    <span className="mt-1 hidden text-xs font-normal text-white/80 md:block">{t.eyebrow}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Preview panel */}
          <div className="relative overflow-hidden rounded-2xl glass p-8 md:p-10">
            <div className="mesh-bg pointer-events-none absolute inset-0 -z-10 opacity-40" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                role="tabpanel"
                id={`transform-panel-${active}`}
                aria-labelledby={`transform-tab-${active}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 items-center gap-8 md:grid-cols-2"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-accent-2">{activeTab.eyebrow}</p>
                  <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{activeTab.headline}</h3>
                  <p className="mt-4 text-white/60">{activeTab.description}</p>
                  <a
                    href="#contact"
                    className="mt-7 inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold shadow-lg shadow-accent/30 transition-transform hover:-translate-y-0.5"
                  >
                    {activeTab.cta}
                  </a>
                </div>
                <div className="aspect-[4/3]">
                  <ActiveVisual />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

