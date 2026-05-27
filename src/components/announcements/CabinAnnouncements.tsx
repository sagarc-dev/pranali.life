"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ANNOUNCEMENTS } from "@/lib/constants";

function PACard({ item, index }: { item: (typeof ANNOUNCEMENTS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="glass-dark rounded-xl p-6 relative overflow-hidden group"
      style={{
        border: "1px solid rgba(201,149,42,0.12)",
        maxWidth: "640px",
        marginLeft: index % 2 === 0 ? "0" : "auto",
        marginRight: index % 2 === 0 ? "auto" : "0",
      }}
    >
      {/* Gold accent line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 group-hover:opacity-100 opacity-40 transition-opacity duration-500"
        style={{ background: "linear-gradient(to bottom, transparent, #C9952A, transparent)" }}
      />

      {/* PA Speaker Icon */}
      <div className="flex items-start gap-4">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(196,18,48,0.15)",
            border: "1px solid rgba(196,18,48,0.3)",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
            style={{ fontSize: "1rem" }}
          >
            📢
          </motion.div>
        </div>

        <div className="flex-1">
          {/* Time indicator */}
          <div className="flex items-center gap-3 mb-3">
            <span
              className="font-mono text-xs px-2 py-0.5 rounded"
              style={{
                background: "rgba(201,149,42,0.1)",
                color: "#C9952A",
                border: "1px solid rgba(201,149,42,0.2)",
                letterSpacing: "0.1em",
              }}
            >
              PA {item.time}
            </span>

            {/* Waveform animation */}
            <div className="flex items-end gap-0.5 h-4">
              {Array.from({ length: 8 }, (_, j) => (
                <motion.div
                  key={j}
                  animate={{ height: [`${20 + Math.random() * 80}%`, `${20 + Math.random() * 80}%`] }}
                  transition={{
                    duration: 0.4 + Math.random() * 0.4,
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: j * 0.05,
                  }}
                  className="rounded-full"
                  style={{
                    width: "2px",
                    background: "rgba(201,149,42,0.5)",
                    minHeight: "2px",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Main announcement */}
          <p
            className="font-serif text-xl font-light mb-2"
            style={{ color: "#F5EDD8", lineHeight: 1.4 }}
          >
            "{item.message}"
          </p>

          {/* Subtext */}
          <p
            className="font-mono text-xs tracking-wider"
            style={{ color: "rgba(245,237,216,0.4)", letterSpacing: "0.05em" }}
          >
            — {item.subtext}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function CabinAnnouncements() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="announcements"
      ref={sectionRef}
      className="relative min-h-screen py-28 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--color-dark) 0%, #08030d 50%, var(--color-dark) 100%)",
      }}
    >
      {/* Background ambience */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "600px",
            height: "600px",
            background: "radial-gradient(ellipse, rgba(196,18,48,0.05) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto" style={{ zIndex: 1 }}>
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-px w-12" style={{ background: "rgba(201,149,42,0.4)" }} />
            <span className="font-mono text-xs tracking-[0.4em]" style={{ color: "rgba(201,149,42,0.7)" }}>
              CABIN ANNOUNCEMENTS
            </span>
            <div className="h-px w-12" style={{ background: "rgba(201,149,42,0.4)" }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-light"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#F5EDD8" }}
          >
            Ladies &amp; Gentlemen,
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif italic text-lg mt-3"
            style={{ color: "rgba(245,237,216,0.4)" }}
          >
            Welcome aboard this extraordinary story.
          </motion.p>
        </div>

        {/* PA Cards */}
        <div className="flex flex-col gap-6">
          {ANNOUNCEMENTS.map((item, i) => (
            <PACard key={i} item={item} index={i} />
          ))}
        </div>

        {/* End note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="divider-gold mx-auto w-48 mb-8" />
          <p
            className="font-serif italic text-xl"
            style={{ color: "rgba(245,237,216,0.35)" }}
          >
            "Cabin crew, prepare for takeoff."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
