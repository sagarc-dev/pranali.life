"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { JOURNEY_STOPS } from "@/lib/constants";
import CloudLayer from "@/components/shared/CloudLayer";
import ScrambleText from "@/components/shared/ScrambleText";

type Stop = (typeof JOURNEY_STOPS)[0];

export default function FlightTimeline() {
  const [activeStop, setActiveStop] = useState<Stop | null>(JOURNEY_STOPS[0]);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Determine active stop based on scroll progress
    const index = Math.min(
      JOURNEY_STOPS.length - 1,
      Math.max(0, Math.floor(latest * JOURNEY_STOPS.length))
    );
    if (activeStop?.id !== JOURNEY_STOPS[index].id) {
      setActiveStop(JOURNEY_STOPS[index]);
    }
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const planeY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      style={{
        position: "relative",
        height: "300vh", // The pinned scroll distance
        background: "linear-gradient(180deg, var(--color-dark) 0%, #0d0818 60%, var(--color-dark) 100%)",
      }}
    >
      {/* ── Sticky Container ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
      <CloudLayer density="medium" />

      {/* ── Background Animated Flight Path ── */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          bottom: "15%",
          left: "10%",
          width: "80%",
          zIndex: 1,
          pointerEvents: "none",
          opacity: 0.15,
        }}
        className="hidden md:block"
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          {/* Base dashed path */}
          <path
            d="M 50 0 C 80 20, 20 50, 50 80 C 80 110, 50 150, 50 150"
            fill="none"
            stroke="#C9952A"
            strokeWidth="0.5"
            strokeDasharray="2 4"
            vectorEffect="non-scaling-stroke"
          />
          {/* Animated solid path */}
          <motion.path
            d="M 50 0 C 80 20, 20 50, 50 80 C 80 110, 50 150, 50 150"
            fill="none"
            stroke="#C9952A"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength }}
          />
        </svg>
      </div>

      {/* Airplane Icon Following Scroll (Approximate Vertical) */}
      <motion.div
        className="hidden md:flex absolute left-[50%] -translate-x-1/2 z-[2]"
        style={{
          top: "15%",
          bottom: "15%",
          y: planeY,
          color: "#C9952A",
          fontSize: "1.5rem",
          textShadow: "0 0 20px rgba(201,149,42,0.5)",
          rotate: 90, // point down
          marginLeft: "-3rem", // visual offset to align with curve roughly
        }}
      >
        ✈
      </motion.div>

      {/* ── Header ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          paddingTop: "7rem",
          paddingBottom: "3rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="font-mono"
          style={{
            color: "rgba(201,149,42,0.7)",
            textAlign: "center",
            letterSpacing: "0.4em",
            fontSize: "0.65rem",
            marginBottom: "1rem",
          }}
        >
          ✦ FLIGHT ROUTE ✦
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-light"
          style={{
            fontSize: "clamp(2.2rem, 10vw, 4.5rem)",
            color: "#F5EDD8",
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          <ScrambleText text="The Journey" />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif italic"
          style={{
            color: "rgba(245,237,216,0.45)",
            textAlign: "center",
            fontSize: "clamp(0.95rem, 4vw, 1.1rem)",
            marginTop: "0.75rem",
            maxWidth: "28rem",
          }}
        >
          Every great story begins with a decision.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          style={{
            width: "6rem",
            height: "1px",
            marginTop: "1.5rem",
            background: "linear-gradient(90deg, transparent, #C9952A, transparent)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "42rem",
          margin: "0 auto",
          padding: "0 1rem 4rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {/* Active Stop Card */}
        <AnimatePresence mode="wait">
          {activeStop && (
            <motion.div
              key={activeStop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="glass-dark rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${activeStop.color}50` }}
            >
              {/* Photo */}
              <div style={{ position: "relative", height: "14rem", overflow: "hidden" }}>
                <Image
                  src={activeStop.image}
                  alt={activeStop.title}
                  fill
                  sizes="(max-width: 672px) 100vw, 672px"
                  className="object-cover"
                  style={{ opacity: 0.75 }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(to bottom, ${activeStop.color}20 0%, rgba(10,5,5,0.95) 100%)`,
                  }}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>{activeStop.icon}</span>
                    <span
                      className="font-mono"
                      style={{
                        background: `${activeStop.color}22`,
                        color: activeStop.color,
                        border: `1px solid ${activeStop.color}50`,
                        fontSize: "0.6rem",
                        letterSpacing: "0.1em",
                        padding: "2px 10px",
                        borderRadius: "999px",
                      }}
                    >
                      {activeStop.year}
                    </span>
                  </div>
                  <h3
                    className="font-serif font-light"
                    style={{ color: "#F5EDD8", fontSize: "clamp(1.4rem, 5vw, 1.75rem)", lineHeight: 1.2 }}
                  >
                    {activeStop.title}
                  </h3>
                  <p
                    className="font-mono"
                    style={{ color: "rgba(245,237,216,0.5)", fontSize: "0.65rem", marginTop: "0.25rem" }}
                  >
                    {activeStop.subtitle}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "1.25rem" }}>
                <p
                  className="font-serif"
                  style={{ color: "rgba(245,237,216,0.82)", lineHeight: 1.9, fontSize: "0.975rem" }}
                >
                  {activeStop.description}
                </p>

                {/* Nav */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.5rem" }}>
                  <button
                    onClick={() => {
                      const idx = JOURNEY_STOPS.findIndex((s) => s.id === activeStop.id);
                      if (idx > 0) setActiveStop(JOURNEY_STOPS[idx - 1]);
                    }}
                    className="font-mono"
                    style={{
                      color: "rgba(201,149,42,0.7)",
                      border: "1px solid rgba(201,149,42,0.25)",
                      borderRadius: "999px",
                      padding: "0.5rem 1rem",
                      fontSize: "0.65rem",
                      letterSpacing: "0.08em",
                      cursor: "pointer",
                      background: "transparent",
                    }}
                  >
                    ← PREV
                  </button>

                  <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                    {JOURNEY_STOPS.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setActiveStop(s)}
                        style={{
                          width: s.id === activeStop.id ? "1.25rem" : "0.5rem",
                          height: "0.5rem",
                          borderRadius: "999px",
                          background: s.id === activeStop.id ? activeStop.color : "rgba(201,149,42,0.2)",
                          transition: "all 0.3s",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      const idx = JOURNEY_STOPS.findIndex((s) => s.id === activeStop.id);
                      if (idx < JOURNEY_STOPS.length - 1) setActiveStop(JOURNEY_STOPS[idx + 1]);
                    }}
                    className="font-mono"
                    style={{
                      color: "rgba(201,149,42,0.7)",
                      border: "1px solid rgba(201,149,42,0.25)",
                      borderRadius: "999px",
                      padding: "0.5rem 1rem",
                      fontSize: "0.65rem",
                      letterSpacing: "0.08em",
                      cursor: "pointer",
                      background: "transparent",
                    }}
                  >
                    NEXT →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stop Selector Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "center",
          }}
        >
          {JOURNEY_STOPS.map((stop) => (
            <button
              key={stop.id}
              onClick={() => {
                // When clicked, scroll the window to the rough position
                const idx = JOURNEY_STOPS.findIndex(s => s.id === stop.id);
                if (sectionRef.current) {
                  const sectionTop = sectionRef.current.offsetTop;
                  const sectionHeight = sectionRef.current.offsetHeight;
                  const scrollPos = sectionTop + (idx / JOURNEY_STOPS.length) * (sectionHeight - window.innerHeight);
                  window.scrollTo({ top: scrollPos, behavior: 'smooth' });
                }
              }}
              className="font-mono"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.45rem 0.9rem",
                borderRadius: "999px",
                background: activeStop?.id === stop.id ? stop.color : "rgba(10,5,5,0.7)",
                color: activeStop?.id === stop.id ? "#0A0505" : "rgba(245,237,216,0.6)",
                border: `1px solid ${activeStop?.id === stop.id ? stop.color : "rgba(201,149,42,0.2)"}`,
                fontSize: "0.65rem",
                letterSpacing: "0.04em",
                cursor: "pointer",
                transition: "all 0.25s",
              }}
            >
              {stop.icon} {stop.year}
            </button>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
