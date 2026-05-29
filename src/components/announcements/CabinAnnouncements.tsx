"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ANNOUNCEMENTS } from "@/lib/constants";
import ScrambleText from "@/components/shared/ScrambleText";

function PACard({ item, index }: { item: (typeof ANNOUNCEMENTS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="glass-dark rounded-xl relative overflow-hidden"
      style={{
        border: "1px solid rgba(201,149,42,0.12)",
        padding: "1.5rem",
        width: "100%",
        maxWidth: "600px",
      }}
    >
      {/* Gold accent left line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "2px",
          background: "linear-gradient(to bottom, transparent, #B7925F, transparent)",
          opacity: 0.5,
        }}
      />

      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
        {/* Icon */}
        <div
          style={{
            flexShrink: 0,
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(196,18,48,0.12)",
            border: "1px solid rgba(196,18,48,0.25)",
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
            style={{ fontSize: "1rem" }}
          >
            📢
          </motion.span>
        </div>

        <div style={{ flex: 1 }}>
          {/* Time badge + waveform */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <span
              className="font-mono"
              style={{
                background: "rgba(201,149,42,0.1)",
                color: "#B7925F",
                border: "1px solid rgba(201,149,42,0.2)",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                padding: "2px 8px",
                borderRadius: "4px",
              }}
            >
              PA {item.time}
            </span>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "1rem" }}>
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
                  style={{
                    width: "2px",
                    background: "rgba(201,149,42,0.45)",
                    borderRadius: "999px",
                    minHeight: "2px",
                  }}
                />
              ))}
            </div>
          </div>

          <p
            className="font-serif font-light"
            style={{ color: "#F0CF98", lineHeight: 1.5, fontSize: "clamp(1rem, 4vw, 1.2rem)", marginBottom: "0.4rem" }}
          >
            &ldquo;{item.message}&rdquo;
          </p>
          <p
            className="font-mono"
            style={{ color: "rgba(245,237,216,0.4)", fontSize: "0.65rem", letterSpacing: "0.05em" }}
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
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "8rem 1rem",
        marginTop: "-25vh", // Pull it up over the empty bottom half of the pinned timeline
        zIndex: 10,
        background: "linear-gradient(180deg, transparent 0%, #08030d 20%, var(--color-dark) 100%)",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "40rem",
            height: "40rem",
            background: "radial-gradient(ellipse, rgba(196,18,48,0.04) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "40rem", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "4rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}
          >
            <div style={{ height: "1px", width: "3rem", background: "rgba(201,149,42,0.4)" }} />
            <span
              className="font-mono"
              style={{ color: "rgba(201,149,42,0.7)", fontSize: "0.6rem", letterSpacing: "0.4em" }}
            >
              CABIN ANNOUNCEMENTS
            </span>
            <div style={{ height: "1px", width: "3rem", background: "rgba(201,149,42,0.4)" }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-light"
            style={{
              fontSize: "clamp(2.2rem, 9vw, 4.5rem)",
              color: "#F0CF98",
              textAlign: "center",
            }}
          >
            <ScrambleText text="Ladies & Gentlemen," />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif italic"
            style={{
              color: "rgba(245,237,216,0.4)",
              textAlign: "center",
              fontSize: "clamp(0.95rem, 3.5vw, 1.1rem)",
              marginTop: "0.75rem",
            }}
          >
            Welcome aboard this extraordinary story.
          </motion.p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            alignItems: "center",
          }}
        >
          {ANNOUNCEMENTS.map((item, i) => (
            <PACard key={i} item={item} index={i} />
          ))}
        </div>

        {/* End note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          style={{ textAlign: "center", marginTop: "4rem" }}
        >
          <div className="divider-gold" style={{ width: "8rem", margin: "0 auto 2rem" }} />
          <p
            className="font-serif italic"
            style={{ color: "rgba(245,237,216,0.35)", fontSize: "clamp(1rem, 4vw, 1.2rem)" }}
          >
            &ldquo;Cabin crew, prepare for takeoff.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
