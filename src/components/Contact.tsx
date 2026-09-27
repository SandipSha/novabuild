"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Reveal from "./Reveal";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TIME_SLOTS: Record<string, string[]> = {
  Mon: ["10:00 AM", "1:30 PM", "4:00 PM"],
  Tue: ["9:30 AM", "2:00 PM", "4:30 PM"],
  Wed: ["10:00 AM", "12:30 PM", "3:00 PM"],
  Thu: ["9:00 AM", "1:00 PM", "4:30 PM"],
  Fri: ["10:30 AM", "2:00 PM", "5:00 PM"],
  Sat: ["11:00 AM", "1:00 PM"],
};

// Deterministic "spots left" flavor per day so it feels live without a real booking backend.
function spotsLeft(day: string) {
  let hash = 0;
  for (const char of day) hash = (hash * 31 + char.charCodeAt(0)) % 97;
  return (hash % 4) + 1;
}

type FormData = {
  name: string;
  business: string;
  phone: string;
  industry: string;
  challenge: string;
};

const EMPTY_FORM: FormData = { name: "", business: "", phone: "", industry: "", challenge: "" };
const LEAD_ENDPOINT = "/api/lead-capture";
const AUTOSAVE_DEBOUNCE_MS = 3000;

// Requires at least 7 digits so partial/placeholder typing doesn't count as a real number.
function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7;
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const sessionIdRef = useRef<string>("");
  const lastSentSnapshotRef = useRef<string>("");
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stateRef = useRef({ formData, selectedDay, selectedTime });

  useEffect(() => {
    if (!sessionIdRef.current) {
      sessionIdRef.current =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `session-${Date.now()}-${Math.random()}`;
    }
  }, []);

  useEffect(() => {
    stateRef.current = { formData, selectedDay, selectedTime };
  }, [formData, selectedDay, selectedTime]);

  const nextAvailable = useMemo(() => {
    const today = new Date().getDay(); // 0 = Sun
    const nextIndex = today % DAYS.length; // roll Sun -> Mon slot
    const day = DAYS[nextIndex];
    return { day, time: TIME_SLOTS[day][0] };
  }, []);

  const buildPayload = useCallback((type: "abandoned" | "submitted") => {
    const { formData: fd, selectedDay: day, selectedTime: time } = stateRef.current;
    return {
      type,
      sessionId: sessionIdRef.current,
      name: fd.name,
      business: fd.business,
      phone: fd.phone,
      industry: fd.industry,
      challenge: fd.challenge,
      bookingDay: day ?? undefined,
      bookingTime: time ?? undefined,
    };
  }, []);

  function payloadHasContent(payload: ReturnType<typeof buildPayload>) {
    return Boolean(
      payload.name.trim() ||
        payload.business.trim() ||
        payload.phone.trim() ||
        payload.industry.trim() ||
        payload.challenge.trim() ||
        payload.bookingDay
    );
  }

  const flushLead = useCallback(
    (type: "abandoned" | "submitted" = "abandoned") => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }

      const payload = buildPayload(type);
      if (!payloadHasContent(payload)) return;
      // Abandonment emails only fire once a real phone number has been entered.
      if (type === "abandoned" && !isValidPhone(payload.phone)) return;

      const snapshot = JSON.stringify(payload);
      if (type === "abandoned" && snapshot === lastSentSnapshotRef.current) return;
      lastSentSnapshotRef.current = snapshot;

      fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: snapshot,
        keepalive: true,
      }).catch(() => {
        /* best-effort — abandoned lead capture should never block the UI */
      });
    },
    [buildPayload]
  );

  // Debounced autosave: 3s after the user stops typing in any field (phone number required, see flushLead).
  useEffect(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => flushLead("abandoned"), AUTOSAVE_DEBOUNCE_MS);
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [formData, selectedDay, selectedTime, flushLead]);

  // Capture on tab close / navigation away via sendBeacon (more reliable than fetch during unload).
  useEffect(() => {
    function handleBeforeUnload() {
      const payload = buildPayload("abandoned");
      if (!payloadHasContent(payload) || !isValidPhone(payload.phone)) return;
      const snapshot = JSON.stringify(payload);
      if (snapshot === lastSentSnapshotRef.current) return;
      lastSentSnapshotRef.current = snapshot;
      navigator.sendBeacon?.(LEAD_ENDPOINT, new Blob([snapshot], { type: "application/json" }));
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [buildPayload]);

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function selectTime(day: string, time: string) {
    setSelectedDay(day);
    setSelectedTime(time);
    // Flush right away so the chosen slot reaches the inbox even if the visitor leaves immediately after.
    setTimeout(() => flushLead("abandoned"), 0);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    flushLead("submitted");
    setSubmitted(true);
  }

  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <div className="mesh-bg pointer-events-none absolute inset-0 -z-10 opacity-60" />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Ready to Become the Obvious Choice in Your Area?
          </h2>
          <p className="mt-4 text-white/60">
            Book a free 20-minute growth audit — we&rsquo;ll show you exactly what&rsquo;s costing
            you customers online, and how to fix it.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl glass p-8">
              <p className="text-xs uppercase tracking-widest text-white/40 text-center">Book directly</p>
              <p className="mt-3 text-center font-display text-xl font-semibold">
                Pick a time that works for you
              </p>

              <p className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-accent-2/30 bg-accent-2/10 px-4 py-1.5 text-xs font-medium text-accent-2">
                ⚡ Next Available: {nextAvailable.day === "Mon" ? "Monday" : nextAvailable.day} at{" "}
                {nextAvailable.time}
              </p>

              <div className="mt-6 grid w-full grid-cols-3 gap-2">
                {DAYS.map((d) => {
                  const isSelected = selectedDay === d;
                  const spots = spotsLeft(d);
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        setSelectedDay(d);
                        setSelectedTime(null);
                      }}
                      className={`flex flex-col items-center gap-1 rounded-lg border py-3 text-sm transition-colors ${
                        isSelected
                          ? "border-accent bg-accent/20 text-white shadow-md shadow-accent/20"
                          : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                      }`}
                    >
                      <span className="font-medium">{d}</span>
                      <span className="text-[10px] text-white/40">{spots} left</span>
                    </button>
                  );
                })}
              </div>

              {selectedDay && (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {TIME_SLOTS[selectedDay].map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => selectTime(selectedDay, time)}
                        className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                          isSelected
                            ? "border-accent bg-accent text-white"
                            : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              )}

              {selectedDay && selectedTime && (
                <p className="mt-5 text-center text-xs text-accent-2">
                  ✓ Locked in: {selectedDay} at {selectedTime} — we&rsquo;ll confirm by phone or email.
                </p>
              )}

              <p className="mt-auto pt-6 text-center text-xs text-white/40">
                Prefer your own calendar? A live Calendly / Cal.com embed can replace this widget.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl glass p-8">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-display text-xl font-semibold">Thanks — we got it! 🎉</p>
                  <p className="mt-2 text-sm text-white/60">
                    We&rsquo;ll be in touch within one business day with your free growth audit.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      required
                      placeholder="Full name"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      onBlur={() => flushLead("abandoned")}
                      className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-accent"
                    />
                    <input
                      required
                      placeholder="Business name"
                      value={formData.business}
                      onChange={(e) => updateField("business", e.target.value)}
                      onBlur={() => flushLead("abandoned")}
                      className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-accent"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      required
                      type="tel"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      onBlur={() => flushLead("abandoned")}
                      className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-accent"
                    />
                    <select
                      required
                      value={formData.industry}
                      onChange={(e) => updateField("industry", e.target.value)}
                      onBlur={() => flushLead("abandoned")}
                      className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-accent"
                    >
                      <option value="" disabled>
                        Industry
                      </option>
                      <option>Retail</option>
                      <option>Restaurant</option>
                      <option>Professional Clinic</option>
                      <option>Other Service Business</option>
                    </select>
                  </div>
                  <textarea
                    required
                    rows={4}
                    placeholder="What's your biggest challenge?"
                    value={formData.challenge}
                    onChange={(e) => updateField("challenge", e.target.value)}
                    onBlur={() => flushLead("abandoned")}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-accent"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-accent px-6 py-3.5 text-sm font-semibold shadow-lg shadow-accent/30"
                  >
                    Book My Free Audit
                  </button>
                  <p className="text-center text-xs text-white/40">
                    No pressure, no obligation. Just a clear, honest plan.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

