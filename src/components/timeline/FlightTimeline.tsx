"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { JOURNEY_STOPS } from "@/lib/constants";
import CloudLayer from "@/components/shared/CloudLayer";

type Stop = (typeof JOURNEY_STOPS)[0];

function JourneyStopMarker({
  stop,
  isActive,
  onClick,
}: {
  stop: Stop;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.3 }}
      whileTap={{ scale: 0.9 }}
      className="absolute flex flex-col items-center gap-1 group"
      style={{
        left: `${stop.position.x}%`,
        top: `${stop.position.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: isActive ? 10 : 5,
      }}
    >
      {/* Pulse rings */}
      {isActive && (
        <>
          <motion.div
            animate={{ scale: [1, 2], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute w-8 h-8 rounded-full"
            style={{ background: stop.color, zIndex: -1 }}
          />
          <motion.div
            animate={{ scale: [1, 2.8], opacity: [0.3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            className="absolute w-8 h-8 rounded-full"
            style={{ background: stop.color, zIndex: -1 }}
          />
        </>
      )}

      {/* Dot */}
      <div
        className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300"
        style={{
          background: isActive ? stop.color : "rgba(10,5,5,0.8)",
          borderColor: stop.color,
          boxShadow: isActive ? `0 0 20px ${stop.color}80` : "none",
        }}
      >
        {isActive && (
          <div className="w-2 h-2 rounded-full" style={{ background: "#F5EDD8" }} />
        )}
      </div>

      {/* Label */}
      <span
        className="font-mono text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          fontSize: "0.6rem",
          color: stop.color,
          letterSpacing: "0.1em",
          whiteSpace: "nowrap",
          position: "absolute",
          top: "100%",
          marginTop: "6px",
        }}
      >
        {stop.year}
      </span>
    </motion.button>
  );
}

function AnimatedFlightPath() {
  // SVG path connecting the journey stops
  const pathPoints = JOURNEY_STOPS.map((s) => `${s.position.x},${s.position.y}`).join(" L ");

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ zIndex: 2 }}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Dashed route line */}
      <motion.path
        d={`M ${pathPoints.split(" L ").join(" L ")}`}
        fill="none"
        stroke="rgba(201,149,42,0.35)"
        strokeWidth="0.3"
        strokeDasharray="1.5 1"
        filter="url(#glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Solid animated segment */}
      <motion.path
        d={`M ${pathPoints.split(" L ").join(" L ")}`}
        fill="none"
        stroke="rgba(196,18,48,0.6)"
        strokeWidth="0.15"
        filter="url(#glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3.5, ease: "easeInOut", delay: 0.8 }}
      />
    </svg>
  );
}

export default function FlightTimeline() {
  const [activeStop, setActiveStop] = useState<Stop | null>(JOURNEY_STOPS[0]);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--color-dark) 0%, #0d0818 60%, var(--color-dark) 100%)" }}
    >
      <CloudLayer density="medium" />

      {/* Header */}
      <div className="relative z-10 text-center pt-24 pb-12 px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="font-mono text-xs tracking-[0.4em] mb-4"
          style={{ color: "rgba(201,149,42,0.7)" }}
        >
          ✦ FLIGHT ROUTE ✦
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-light text-center"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color: "#F5EDD8",
            lineHeight: 1.1,
          }}
        >
          The Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif italic text-lg mt-3 text-center"
          style={{ color: "rgba(245,237,216,0.45)" }}
        >
          Every great story begins with a decision.
        </motion.p>
      </div>

      <div className="relative flex-1 flex flex-col lg:flex-row items-stretch gap-0 max-w-7xl mx-auto w-full px-4 pb-20">
        {/* Map Area */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:flex-1 rounded-xl overflow-hidden"
          style={{
            minHeight: "400px",
            background: "rgba(13,24,42,0.6)",
            border: "1px solid rgba(201,149,42,0.15)",
          }}
        >
          {/* World map SVG background */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* Simplified world outline dots */}
              {Array.from({ length: 300 }, (_, i) => (
                <circle
                  key={i}
                  cx={Math.random() * 100}
                  cy={Math.random() * 60 + 15}
                  r="0.2"
                  fill="rgba(201,149,42,0.5)"
                />
              ))}
            </svg>
          </div>

          {/* Grid overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(rgba(201,149,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,149,42,0.04) 1px, transparent 1px)",
              backgroundSize: "10% 10%",
            }}
          />

          <AnimatedFlightPath />

          {/* Stop Markers */}
          {JOURNEY_STOPS.map((stop) => (
            <JourneyStopMarker
              key={stop.id}
              stop={stop}
              isActive={activeStop?.id === stop.id}
              onClick={() => setActiveStop(stop)}
            />
          ))}

          {/* Year labels along the path */}
          {JOURNEY_STOPS.map((stop) => (
            <div
              key={`label-${stop.id}`}
              className="absolute pointer-events-none"
              style={{
                left: `${stop.position.x}%`,
                top: `${stop.position.y + 7}%`,
                transform: "translateX(-50%)",
                zIndex: 3,
              }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: "0.55rem",
                  color: activeStop?.id === stop.id ? stop.color : "rgba(245,237,216,0.2)",
                  letterSpacing: "0.1em",
                  display: "block",
                  textAlign: "center",
                }}
              >
                {stop.year}
              </span>
            </div>
          ))}

          {/* Horizontal stops list */}
          <div className="absolute bottom-0 left-0 right-0 flex overflow-x-auto gap-2 p-3" style={{ zIndex: 5 }}>
            {JOURNEY_STOPS.map((stop) => (
              <button
                key={stop.id}
                onClick={() => setActiveStop(stop)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full font-mono text-xs transition-all duration-300"
                style={{
                  background: activeStop?.id === stop.id ? stop.color : "rgba(10,5,5,0.7)",
                  color: activeStop?.id === stop.id ? "#0A0505" : "rgba(245,237,216,0.5)",
                  border: `1px solid ${activeStop?.id === stop.id ? stop.color : "rgba(201,149,42,0.15)"}`,
                  fontSize: "0.65rem",
                  letterSpacing: "0.05em",
                }}
              >
                {stop.icon} {stop.year}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Detail Panel */}
        <div className="lg:w-96 relative" style={{ zIndex: 10 }}>
          <AnimatePresence mode="wait">
            {activeStop && (
              <motion.div
                key={activeStop.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="h-full glass-dark rounded-xl overflow-hidden lg:ml-4"
                style={{ border: `1px solid ${activeStop.color}40` }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={activeStop.image}
                    alt={activeStop.title}
                    fill
                    className="object-cover"
                    style={{ opacity: 0.7 }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, ${activeStop.color}30 0%, rgba(10,5,5,0.95) 100%)`,
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{activeStop.icon}</span>
                      <span
                        className="font-mono text-xs tracking-widest px-2 py-0.5 rounded-full"
                        style={{
                          background: `${activeStop.color}25`,
                          color: activeStop.color,
                          border: `1px solid ${activeStop.color}50`,
                        }}
                      >
                        {activeStop.year}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-light" style={{ color: "#F5EDD8" }}>
                      {activeStop.title}
                    </h3>
                    <p className="font-mono text-xs mt-1" style={{ color: "rgba(245,237,216,0.5)" }}>
                      {activeStop.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="p-5">
                  <p
                    className="font-serif text-base leading-relaxed"
                    style={{ color: "rgba(245,237,216,0.8)", lineHeight: 1.8 }}
                  >
                    {activeStop.description}
                  </p>

                  {/* Navigation arrows */}
                  <div className="flex justify-between items-center mt-6">
                    <button
                      onClick={() => {
                        const idx = JOURNEY_STOPS.findIndex((s) => s.id === activeStop.id);
                        if (idx > 0) setActiveStop(JOURNEY_STOPS[idx - 1]);
                      }}
                      className="font-mono text-xs tracking-widest transition-colors duration-200"
                      style={{ color: "rgba(201,149,42,0.5)", fontSize: "0.65rem" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#C9952A")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(201,149,42,0.5)")}
                    >
                      ← PREV
                    </button>

                    <div className="flex gap-1.5">
                      {JOURNEY_STOPS.map((s) => (
                        <div
                          key={s.id}
                          className="rounded-full transition-all duration-300"
                          style={{
                            width: s.id === activeStop.id ? "20px" : "5px",
                            height: "5px",
                            background: s.id === activeStop.id ? activeStop.color : "rgba(201,149,42,0.2)",
                          }}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        const idx = JOURNEY_STOPS.findIndex((s) => s.id === activeStop.id);
                        if (idx < JOURNEY_STOPS.length - 1) setActiveStop(JOURNEY_STOPS[idx + 1]);
                      }}
                      className="font-mono text-xs tracking-widest transition-colors duration-200"
                      style={{ color: "rgba(201,149,42,0.5)", fontSize: "0.65rem" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#C9952A")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(201,149,42,0.5)")}
                    >
                      NEXT →
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
