"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import CloudLayer from "@/components/shared/CloudLayer";
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
      className="glass-dark rounded-2xl overflow-hidden group hover:border-gold-dim transition-all duration-500"
      style={{
        border: "1px solid rgba(201,149,42,0.12)",
      }}
    >
      <div className="p-6">
        {/* Time badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="font-mono text-xs px-3 py-1 rounded-full"
            style={{
              background: "rgba(196,18,48,0.1)",
              color: "#C41230",
              border: "1px solid rgba(196,18,48,0.2)",
              letterSpacing: "0.1em",
            }}
          >
            {item.time.toUpperCase()}
          </span>
          <span className="text-2xl">{item.icon}</span>
        </div>

        <h3
          className="font-serif text-xl font-light mb-3"
          style={{ color: "#F5EDD8" }}
        >
          {item.title}
        </h3>
        <p
          className="font-sans text-sm leading-relaxed"
          style={{ color: "rgba(245,237,216,0.6)", lineHeight: 1.8 }}
        >
          {item.body}
        </p>

        {/* Gold hover line */}
        <motion.div
          className="mt-5 h-px"
          style={{
            background: "linear-gradient(90deg, #C9952A, transparent)",
            opacity: 0,
          }}
          whileHover={{ opacity: 1 }}
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
      className="relative min-h-screen py-28 overflow-hidden"
      style={{ background: "var(--color-dark)" }}
    >
      <CloudLayer density="heavy" />

      {/* Diagonal gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(196,18,48,0.04) 0%, transparent 50%, rgba(13,24,42,0.3) 100%)",
          zIndex: 0,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6" style={{ zIndex: 1 }}>
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="font-mono text-xs tracking-[0.4em] mb-4"
            style={{ color: "rgba(201,149,42,0.7)" }}
          >
            ✦ LIFE ABOVE THE CLOUDS ✦
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-light mb-4"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "#F5EDD8" }}
          >
            Beyond the Uniform
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif italic text-lg max-w-2xl mx-auto"
            style={{ color: "rgba(245,237,216,0.45)", lineHeight: 1.8 }}
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
          className="relative rounded-3xl overflow-hidden mb-16"
          style={{
            minHeight: "420px",
            border: "1px solid rgba(201,149,42,0.15)",
          }}
        >
          <Image
            src="/pranali/at_plane_door.jpg"
            alt="Airport terminal atmosphere"
            fill
            className="object-cover"
            style={{ opacity: 0.3 }}
          />

          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, rgba(7,3,3,0.95) 0%, rgba(7,3,3,0.6) 50%, rgba(7,3,3,0.2) 100%)",
            }}
          />

          <div className="relative flex items-center h-full min-h-[420px] p-12">
            <div className="max-w-xl">
              <span
                className="font-mono text-xs tracking-widest mb-6 block"
                style={{ color: "#C9952A" }}
              >
                THE TRUTH BEHIND THE SMILE
              </span>
              <h3
                className="font-serif font-light mb-6"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#F5EDD8", lineHeight: 1.2 }}
              >
                "She is trained to keep you safe
                <br />
                <span style={{ color: "#C9952A" }}>before she is trained to smile."</span>
              </h3>
              <p
                className="font-sans text-sm leading-relaxed"
                style={{ color: "rgba(245,237,216,0.6)", lineHeight: 1.9 }}
              >
                Every flight attendant undergoes rigorous safety training — fire drills, 
                evacuation procedures, water landings, first aid. The uniform is not a costume. 
                It is a promise.
              </p>
            </div>
          </div>

          {/* Portrait overlay on right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block"
            style={{ pointerEvents: "none" }}
          >
            <Image
              src="/pranali/in_blue_air_india_uniform.jpg"
              alt="Pranali in uniform"
              fill
              className="object-cover object-top"
              style={{ opacity: 0.55, maskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 40%)" }}
            />
          </motion.div>
        </motion.div>

        {/* Reality Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CABIN_REALITIES.map((item, i) => (
            <RealityCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="divider-gold mx-auto w-48 mb-8" />
          <p
            className="font-serif text-2xl font-light italic"
            style={{ color: "rgba(245,237,216,0.5)", lineHeight: 1.6 }}
          >
            "She doesn't just serve meals at 35,000 feet.
            <br />
            <span style={{ color: "#C9952A" }}>She holds the sky together."</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
