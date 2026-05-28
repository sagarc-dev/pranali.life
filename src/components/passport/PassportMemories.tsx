"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { PASSPORT_STAMPS } from "@/lib/constants";

type Stamp = (typeof PASSPORT_STAMPS)[0];

function PassportStamp({
  stamp,
  index,
  onClick,
}: {
  stamp: Stamp;
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5, rotate: stamp.rotation - 10 }}
      animate={inView ? { opacity: 1, scale: 1, rotate: stamp.rotation } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        scale: 1.12,
        rotate: 0,
        zIndex: 20,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      className="cursor-pointer select-none"
      style={{ position: "relative", display: "inline-block" }}
    >
      <div
        className="flex flex-col items-center justify-center gap-1 px-4 py-3 rounded"
        style={{
          border: `2.5px solid ${stamp.color}`,
          opacity: hovered ? 1 : 0.8,
          background: hovered ? `${stamp.color}12` : "transparent",
          transition: "all 0.3s ease",
          minWidth: "90px",
          position: "relative",
        }}
      >
        {/* Double border effect */}
        <div
          className="absolute inset-1 rounded-sm pointer-events-none"
          style={{ border: `1px solid ${stamp.color}40` }}
        />

        <span style={{ fontSize: "1.4rem" }}>{stamp.emoji}</span>
        <span
          className="font-mono font-bold text-center"
          style={{ color: stamp.color, fontSize: "0.8rem", letterSpacing: "0.1em" }}
        >
          {stamp.city.toUpperCase()}
        </span>
        <span
          className="font-mono text-center"
          style={{ color: `${stamp.color}90`, fontSize: "0.55rem", letterSpacing: "0.15em" }}
        >
          {stamp.country.toUpperCase()}
        </span>
        <div
          className="font-mono"
          style={{ color: `${stamp.color}60`, fontSize: "0.5rem" }}
        >
          ✈ AIR INDIA
        </div>
      </div>
    </motion.div>
  );
}

export default function PassportMemories() {
  const [activeStamp, setActiveStamp] = useState<Stamp | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="passport"
      ref={sectionRef}
      className="relative min-h-screen py-36 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--color-dark) 0%, #080510 50%, var(--color-dark) 100%)",
      }}
    >
      {/* Passport texture background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Image
          src="/images/passport.png"
          alt="Passport texture"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ opacity: 0.05, filter: "blur(2px)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(7,3,3,0.95) 80%)" }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(201,149,42,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 1rem",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            marginBottom: "3rem",
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
              width: "100%",
              letterSpacing: "0.4em",
              fontSize: "0.65rem",
              marginBottom: "1rem",
            }}
          >
            ✦ PASSPORT MEMORIES ✦
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-light"
            style={{
              fontSize: "clamp(2.2rem, 9vw, 4.5rem)",
              color: "#F5EDD8",
              textAlign: "center",
              width: "100%",
              lineHeight: 1.15,
            }}
          >
            Cities &amp; Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-mono"
            style={{
              color: "rgba(201,149,42,0.5)",
              textAlign: "center",
              width: "100%",
              letterSpacing: "0.1em",
              fontSize: "0.65rem",
              marginTop: "0.75rem",
            }}
          >
            CLICK A STAMP TO OPEN A MEMORY
          </motion.p>
        </div>

        {/* Passport Book */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl overflow-hidden mx-auto"
          style={{
            background: "linear-gradient(135deg, #0a0410 0%, #120618 50%, #08030d 100%)",
            border: "1px solid rgba(201,149,42,0.2)",
            maxWidth: "800px",
            minHeight: "500px",
            padding: "40px",
          }}
        >
          {/* Passport header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded flex items-center justify-center text-lg"
                style={{ background: "linear-gradient(135deg, #C41230, #8B0D22)" }}
              >
                🇮🇳
              </div>
              <div>
                <p
                  className="font-mono text-xs tracking-widest"
                  style={{ color: "rgba(201,149,42,0.8)", fontSize: "0.6rem" }}
                >
                  REPUBLIC OF INDIA · PASSPORT
                </p>
                <p className="font-serif text-lg" style={{ color: "#F5EDD8" }}>
                  Travel Memories
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
                className="font-mono text-xs"
                style={{ color: "rgba(245,237,216,0.3)", fontSize: "0.6rem" }}
              >
                TYPE / TYPE
              </p>
              <p className="font-mono text-sm" style={{ color: "#C9952A" }}>
                P · IND
              </p>
            </div>
          </div>

          <div
            className="divider-gold mb-8"
            style={{ background: "linear-gradient(90deg, #C9952A, transparent)" }}
          />

          {/* Stamps Grid */}
          <div className="flex flex-wrap gap-5 justify-center">
            {PASSPORT_STAMPS.map((stamp, i) => (
              <PassportStamp
                key={stamp.city}
                stamp={stamp}
                index={i}
                onClick={() => setActiveStamp(stamp)}
              />
            ))}
          </div>

          {/* Page lines decoration */}
          <div className="mt-8">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className="h-px mb-5"
                style={{ background: "rgba(201,149,42,0.08)" }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Memory Modal */}
      <AnimatePresence>
        {activeStamp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(7,3,3,0.85)", backdropFilter: "blur(20px)" }}
            onClick={() => setActiveStamp(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-lg w-full rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0a0410 0%, #120618 100%)",
                border: `1px solid ${activeStamp.color}50`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="px-8 py-6"
                style={{
                  background: `linear-gradient(135deg, ${activeStamp.color}20, transparent)`,
                  borderBottom: `1px solid ${activeStamp.color}30`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: "2rem" }}>{activeStamp.emoji}</span>
                    <div>
                      <h3
                        className="font-serif text-2xl font-light"
                        style={{ color: "#F5EDD8" }}
                      >
                        {activeStamp.city}
                      </h3>
                      <p
                        className="font-mono text-xs tracking-widest"
                        style={{ color: `${activeStamp.color}`, opacity: 0.8 }}
                      >
                        {activeStamp.country.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  {/* Stamp visual */}
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: activeStamp.rotation }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div
                      className="stamp"
                      style={{ color: activeStamp.color, fontSize: "0.6rem", padding: "6px 12px" }}
                    >
                      <span>✦ VISITED ✦</span>
                      <span style={{ fontSize: "1rem" }}>{activeStamp.emoji}</span>
                      <span>AIR INDIA</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Photo + Memory */}
              <div className="px-0 pb-0">
                {activeStamp.photo && (
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={activeStamp.photo}
                      alt={activeStamp.city}
                      fill
                      sizes="(max-width: 768px) 100vw, 512px"
                      className="object-cover"
                      style={{ opacity: 0.85 }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to bottom, transparent 40%, rgba(10,4,16,1) 100%)`,
                      }}
                    />
                  </div>
                )}
                <div className="px-8 pb-6 pt-4">
                  <p
                    className="font-serif text-base leading-relaxed italic"
                    style={{ color: "rgba(245,237,216,0.85)", lineHeight: 1.9 }}
                  >
                    “{activeStamp.memory}”
                  </p>

                  <div className="mt-5 pt-4" style={{ borderTop: `1px solid ${activeStamp.color}20` }}>
                    <p
                      className="font-mono text-xs tracking-widest text-center"
                      style={{ color: `${activeStamp.color}60` }}
                    >
                      ✈ AIR INDIA · LAYOVER MEMORY
                    </p>
                  </div>
                </div>
              </div>

              {/* Close */}
              <button
                onClick={() => setActiveStamp(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs transition-all duration-200"
                style={{
                  background: "rgba(245,237,216,0.06)",
                  color: "rgba(245,237,216,0.5)",
                  border: "1px solid rgba(245,237,216,0.1)",
                }}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
