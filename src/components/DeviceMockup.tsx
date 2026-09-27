"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

/** Draggable/rotatable 3D device frame that tilts toward the cursor (Spline-style, dependency-free). */
export default function DeviceMockup({ variant = "phone" }: { variant?: "phone" | "laptop" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: py * -18, y: px * 22 });
  }

  function handleLeave() {
    setRotate({ x: 0, y: 0 });
  }

  if (variant === "laptop") {
    return (
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="tilt-scene absolute -left-6 bottom-0 w-[340px] max-w-[70vw] cursor-grab active:cursor-grabbing"
      >
        <motion.div
          className="tilt-object animate-float-slow"
          style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
        >
          <div className="rounded-t-xl border border-white/10 bg-gradient-to-b from-[#1b1f27] to-[#0d0f13] p-2 shadow-2xl shadow-black/60">
            <div className="rounded-lg bg-gradient-to-br from-accent/30 via-[#0b0d10] to-accent-2/20 aspect-video flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-accent-2/80 animate-pulse" />
            </div>
          </div>
          <div className="h-3 rounded-b-2xl bg-gradient-to-b from-[#1b1f27] to-[#050607] border-x border-b border-white/10" />
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="tilt-scene relative w-[240px] max-w-[60vw] mx-auto cursor-grab active:cursor-grabbing"
    >
      <motion.div
        className="tilt-object animate-float"
        style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
      >
        <div className="rounded-[2.5rem] border-[6px] border-[#1b1f27] bg-[#050607] shadow-2xl shadow-accent/20 overflow-hidden">
          <div className="aspect-[9/19] bg-gradient-to-br from-accent/25 via-[#0b0d10] to-accent-2/25 flex flex-col p-4">
            <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-white/20" />
            <div className="flex-1 space-y-3">
              <div className="h-20 rounded-2xl glass" />
              <div className="h-10 rounded-xl bg-white/10" />
              <div className="h-10 rounded-xl bg-white/5" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-16 rounded-xl bg-accent/30" />
                <div className="h-16 rounded-xl bg-accent-2/20" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
