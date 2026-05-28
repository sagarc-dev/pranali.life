"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ParticleField from "@/components/shared/ParticleField";
import CloudLayer from "@/components/shared/CloudLayer";
import { FlipChar } from "@/components/shared/ScrambleText";
import MagneticButton from "@/components/shared/MagneticButton";
import { SITE } from "@/lib/constants";
function DepartureBoard() {
  const rows = [
    { flight: "AI-271", destination: "DREAMS", time: "NOW", status: "BOARDING", statusColor: "#C9952A" },
    { flight: "AI-110", destination: "LONDON", time: "23:15", status: "ON TIME", statusColor: "#4CAF50" },
    { flight: "AI-302", destination: "DUBAI",  time: "00:30", status: "ON TIME", statusColor: "#4CAF50" },
    { flight: "AI-888", destination: "TOKYO",  time: "01:45", status: "DELAYED", statusColor: "#C41230" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="w-full max-w-2xl mx-auto mb-10"
      style={{
        background: "rgba(6,2,2,0.85)",
        border: "1px solid rgba(201,149,42,0.25)",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      {/* Board Header */}
      <div
        className="flex items-center justify-between px-5 py-2"
        style={{
          background: "rgba(196,18,48,0.15)",
          borderBottom: "1px solid rgba(201,149,42,0.2)",
        }}
      >
        <span className="font-mono text-xs tracking-widest" style={{ color: "#C9952A" }}>
          ✈ {SITE.airline.toUpperCase()} · DEPARTURES
        </span>
        <span className="font-mono text-xs" style={{ color: "rgba(245,237,216,0.4)" }}>
          BOM INTL
        </span>
      </div>

      {/* Rows */}
      {rows.map((row, i) => (
        <motion.div
          key={row.flight}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.15 }}
          className="flex items-center px-5 py-2 gap-4"
          style={{
            borderBottom: i < rows.length - 1 ? "1px solid rgba(201,149,42,0.08)" : "none",
            background: i === 0 ? "rgba(201,149,42,0.06)" : "transparent",
          }}
        >
          <span className="font-mono text-xs w-16" style={{ color: "rgba(245,237,216,0.5)" }}>
            {row.flight}
          </span>
          <span className="font-mono text-sm flex-1 tracking-wide" style={{ color: "#F5EDD8" }}>
            {i === 0
              ? row.destination.split("").map((c, j) => (
                  <FlipChar key={j} char={c} delay={j * 80} />
                ))
              : row.destination}
          </span>
          <span className="font-mono text-xs w-12" style={{ color: "rgba(245,237,216,0.5)" }}>
            {row.time}
          </span>
          <span
            className="font-mono text-xs w-20 text-right animate-glow-pulse"
            style={{ color: row.statusColor }}
          >
            {row.status}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

function BoardingPass({ onBoard }: { onBoard: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-xl mx-auto"
    >
      <div
        className="boarding-pass rounded-lg overflow-hidden gold-glow"
        style={{ boxShadow: hovered ? "0 0 60px rgba(201,149,42,0.4), 0 20px 80px rgba(0,0,0,0.6)" : "0 0 30px rgba(201,149,42,0.2), 0 20px 60px rgba(0,0,0,0.5)" }}
      >
        {/* Top Red Bar */}
        <div
          className="px-6 py-3 flex items-center justify-between"
          style={{ background: "linear-gradient(90deg, #C41230 0%, #8B0D22 100%)" }}
        >
          <span className="font-mono text-xs tracking-widest" style={{ color: "rgba(245,237,216,0.9)" }}>
            {SITE.airline.toUpperCase()}
          </span>
          <span className="font-serif text-sm italic" style={{ color: "rgba(245,237,216,0.7)" }}>
            Cabin Crew
          </span>
          <span className="font-mono text-xs" style={{ color: "rgba(245,237,216,0.6)" }}>
            ✈
          </span>
        </div>

        {/* Main Content */}
        <div className="px-6 py-5">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="font-mono text-xs tracking-widest mb-1" style={{ color: "rgba(201,149,42,0.6)" }}>
                PASSENGER
              </p>
              <h2
                className="font-serif"
                style={{ color: "#F5EDD8", fontSize: "clamp(1.4rem, 5vw, 1.75rem)", fontWeight: 500, letterSpacing: "0.02em" }}
              >
                {SITE.name.toUpperCase()}
              </h2>
              <p className="font-mono text-xs tracking-widest mt-1" style={{ color: "rgba(245,237,216,0.4)" }}>
                {SITE.role.toUpperCase()}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs tracking-widest mb-1" style={{ color: "rgba(201,149,42,0.6)" }}>
                FLIGHT
              </p>
              <p className="font-mono text-2xl font-bold" style={{ color: "#C9952A" }}>
                {SITE.flightNo}
              </p>
            </div>
          </div>

          {/* Route */}
          <div className="flex items-center justify-between mb-5">
            <div className="text-center">
              <p className="font-mono text-3xl font-bold" style={{ color: "#F5EDD8" }}>BOM</p>
              <p className="font-mono text-xs tracking-widest mt-1" style={{ color: "rgba(245,237,216,0.4)" }}>ORIGIN</p>
            </div>
            <div className="flex-1 flex items-center justify-center px-4">
              <div className="h-px flex-1" style={{ background: "rgba(201,149,42,0.3)" }} />
              <span className="mx-3 text-gold" style={{ color: "#C9952A" }}>✈</span>
              <div className="h-px flex-1" style={{ background: "rgba(201,149,42,0.3)" }} />
            </div>
            <div className="text-center">
              <p className="font-mono text-3xl font-bold" style={{ color: "#F5EDD8" }}>∞</p>
              <p className="font-mono text-xs tracking-widest mt-1" style={{ color: "rgba(245,237,216,0.4)" }}>DESTINATION</p>
            </div>
          </div>

          {/* Stats Row */}
          <div
            className="grid grid-cols-3 gap-4 py-4 mb-5"
            style={{
              borderTop: "1px solid rgba(201,149,42,0.15)",
              borderBottom: "1px solid rgba(201,149,42,0.15)",
            }}
          >
            {[
              { label: "EXPERIENCE", value: SITE.yearsExperience + " YRS" },
              { label: "CITIES", value: SITE.citiesCount },
              { label: "AIRLINE", value: "AIR INDIA" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-mono text-xs tracking-widest mb-1" style={{ color: "rgba(201,149,42,0.6)", fontSize: "0.6rem" }}>
                  {stat.label}
                </p>
                <p className="font-mono text-sm font-bold" style={{ color: "#F5EDD8" }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <MagneticButton
            id="board-flight-btn"
            onClick={onBoard}
            className="w-full py-3.5 rounded font-mono text-sm tracking-widest transition-all duration-300 group"
            style={{
              border: "1px solid rgba(201,149,42,0.3)",
              background: "linear-gradient(135deg, #C41230, #8B0D22)",
              letterSpacing: "0.2em",
            }}
          >
            <span className="text-[#F5EDD8] group-hover:text-[#0A0505] transition-colors duration-300">
              <span className="group-hover:hidden">BEGIN JOURNEY</span>
              <span className="hidden group-hover:inline">✈ BOARD NOW</span>
            </span>
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
}

export default function AirportIntro() {
  const [boarded, setBoarded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleBoard = () => {
    const next = document.querySelector("#timeline");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise"
      style={{ background: "var(--color-dark)" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Image
          src="/pranali/at_sea.jpg"
          alt="Luxury airport terminal"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ opacity: 0.12 }}
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(196,18,48,0.15) 0%, transparent 60%), linear-gradient(to bottom, rgba(7,3,3,0.6) 0%, rgba(7,3,3,0.3) 40%, rgba(7,3,3,0.9) 100%)",
          }}
        />
      </div>

      <ParticleField />
      <CloudLayer density="light" />

      {/* Content */}
      <div
        className="relative w-full max-w-2xl mx-auto px-6 flex flex-col items-center text-center"
        style={{ zIndex: 2 }}
      >
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="mb-6"
        >
          <span
            className="font-mono text-xs tracking-[0.4em]"
            style={{ color: "rgba(201,149,42,0.7)" }}
          >
            ✦ NOW BOARDING ✦
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif mb-2"
          style={{
            fontSize: "clamp(2.8rem, 9vw, 5.5rem)",
            lineHeight: 1.05,
            color: "#F5EDD8",
            fontWeight: 400,
            letterSpacing: "0.04em",
            textAlign: "center",
          }}
        >
          {SITE.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-mono text-xs tracking-[0.35em] mb-2"
          style={{ color: "rgba(201,149,42,0.8)" }}
        >
          {SITE.role.toUpperCase()} · {SITE.airline.toUpperCase()}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-serif italic mb-10"
          style={{ color: "rgba(245,237,216,0.5)", fontSize: "clamp(1rem, 3.5vw, 1.15rem)", fontStyle: "italic", textAlign: "center" }}
        >
          &ldquo;A journey of transformation through the skies.&rdquo;
        </motion.p>

        {/* Gold Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="w-32 h-px mb-10"
          style={{ background: "linear-gradient(90deg, transparent, #C9952A, transparent)" }}
        />

        {/* Departure Board */}
        <DepartureBoard />

        {/* Boarding Pass */}
        <BoardingPass onBoard={handleBoard} />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 2 }}
      >
        <span className="font-mono text-xs tracking-widest" style={{ color: "rgba(201,149,42,0.5)", fontSize: "0.6rem" }}>
          SCROLL TO BOARD
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ color: "rgba(201,149,42,0.5)" }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
