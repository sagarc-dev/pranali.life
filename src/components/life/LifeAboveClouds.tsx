"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import CloudLayer from "@/components/shared/CloudLayer";
import ScrambleText from "@/components/shared/ScrambleText";
import { CABIN_REALITIES } from "@/lib/constants";

function RealityCard({ item, index }: { item: (typeof CABIN_REALITIES)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="glass-dark rounded-2xl overflow-hidden"
      style={{ border: "1px solid rgba(201,149,42,0.12)" }}
    >
      <div style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <span
            className="font-mono"
            style={{
              background: "rgba(196,18,48,0.1)",
              color: "#DC0C2C",
              border: "1px solid rgba(196,18,48,0.2)",
              letterSpacing: "0.1em",
              fontSize: "0.65rem",
              padding: "3px 10px",
              borderRadius: "999px",
            }}
          >
            {item.time.toUpperCase()}
          </span>
          <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
        </div>

        <h3
          className="font-serif font-light"
          style={{ color: "#F0CF98", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "0.75rem" }}
        >
          {item.title}
        </h3>
        <p
          className="font-sans"
          style={{ color: "rgba(245,237,216,0.6)", lineHeight: 1.8, fontSize: "0.9rem" }}
        >
          {item.body}
        </p>

        <div
          style={{
            marginTop: "1.25rem",
            height: "1px",
            background: "linear-gradient(90deg, #B7925F, transparent)",
            opacity: 0.3,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function LifeAboveClouds() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="life"
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "8rem 0",
        background: "var(--color-dark)",
      }}
    >
      <CloudLayer density="heavy" />

      {/* Diagonal gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "linear-gradient(135deg, rgba(196,18,48,0.04) 0%, transparent 50%, rgba(13,24,42,0.3) 100%)",
          zIndex: 0,
        }}
      />

      {/* ── All content in one centered column ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            marginBottom: "4rem",
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
            ✦ LIFE ABOVE THE CLOUDS ✦
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-light"
            style={{
              fontSize: "clamp(2.2rem, 9vw, 4.5rem)",
              color: "#F0CF98",
              textAlign: "center",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            <ScrambleText text="Beyond the Uniform" />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif italic"
            style={{
              color: "rgba(245,237,216,0.45)",
              lineHeight: 1.8,
              textAlign: "center",
              fontSize: "clamp(0.95rem, 3.5vw, 1.1rem)",
              maxWidth: "36rem",
            }}
          >
            Flight attendants are not just faces in the aisle. They are first responders,
            safety officers, cultural ambassadors, and human beings carrying the weight of
            responsibility at 35,000 feet.
          </motion.p>
        </div>

        {/* Hero split image + statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          style={{
            position: "relative",
            borderRadius: "1.5rem",
            overflow: "hidden",
            marginBottom: "4rem",
            minHeight: "400px",
            width: "100%",
            border: "1px solid rgba(201,149,42,0.15)",
          }}
        >
          <Image
            src="/pranali/at_plane_door.jpg"
            alt="Pranali Chahande standing at the aircraft door in official Air India cabin crew uniform"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
            style={{ opacity: 0.45 }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, rgba(7,3,3,0.95) 0%, rgba(7,3,3,0.6) 50%, rgba(7,3,3,0.2) 100%)",
            }}
          />

          <div style={{ position: "relative", display: "flex", alignItems: "center", minHeight: "400px", padding: "2.5rem 2rem" }}>
            <div style={{ maxWidth: "32rem" }}>
              <span
                className="font-mono"
                style={{ color: "#B7925F", fontSize: "0.65rem", letterSpacing: "0.15em", display: "block", marginBottom: "1rem" }}
              >
                THE TRUTH BEHIND THE SMILE
              </span>
              <h3
                className="font-serif font-light"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "#F0CF98", lineHeight: 1.3, marginBottom: "1rem" }}
              >
                &ldquo;She is trained to keep you safe
                <br />
                <span style={{ color: "#B7925F" }}>before she is trained to smile.&rdquo;</span>
              </h3>
              <p
                className="font-sans"
                style={{ color: "rgba(245,237,216,0.6)", lineHeight: 1.9, fontSize: "0.9rem" }}
              >
                Every flight attendant undergoes rigorous safety training &mdash; fire drills,
                evacuation procedures, water landings, first aid. The uniform is not a costume.
                It is a promise.
              </p>
            </div>
          </div>

          {/* Portrait overlay on right — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.6 }}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "50%",
              pointerEvents: "none",
              display: "none",
            }}
            className="lg:block"
          >
            <Image
              src="/pranali/in_blue_air_india_uniform.jpg"
              alt="Pranali Chahande looking elegant in the Air India VISTA uniform"
              fill
              sizes="50vw"
              className="object-cover object-top"
              style={{ opacity: 0.55, maskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 40%)" }}
            />
          </motion.div>
        </motion.div>

        {/* Reality Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))",
            gap: "1.5rem",
            width: "100%",
          }}
        >
          {CABIN_REALITIES.map((item, i) => (
            <RealityCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ textAlign: "center", marginTop: "5rem", width: "100%" }}
        >
          <div className="divider-gold" style={{ width: "8rem", margin: "0 auto 2rem" }} />
          <p
            className="font-serif font-light italic"
            style={{ color: "rgba(245,237,216,0.5)", lineHeight: 1.7, fontSize: "clamp(1.1rem, 4vw, 1.5rem)", textAlign: "center" }}
          >
            &ldquo;She doesn&rsquo;t just serve meals at 35,000 feet.
            <br />
            <span style={{ color: "#B7925F" }}>She holds the sky together.&rdquo;</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
