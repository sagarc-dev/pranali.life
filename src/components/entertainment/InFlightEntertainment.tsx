"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import ScrambleText from "@/components/shared/ScrambleText";
import { IFE_CATEGORIES, IFE_CONTENT } from "@/lib/constants";

function IFECard({ item, index }: { item: (typeof IFE_CONTENT)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="ife-screen rounded-xl overflow-hidden cursor-pointer group"
      style={{
        background: "#0a0410",
        border: "1px solid rgba(201,149,42,0.12)",
        transition: "border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovered ? "0 0 30px rgba(201,149,42,0.15), 0 20px 60px rgba(0,0,0,0.5)" : "0 8px 30px rgba(0,0,0,0.3)",
      }}
    >
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)", opacity: 0.7 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 40%, rgba(10,4,16,0.95) 100%)",
          }}
        />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.6 }}
            transition={{ duration: 0.3 }}
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(201,149,42,0.85)",
              backdropFilter: "blur(4px)",
            }}
          >
            <span style={{ fontSize: "1.1rem", marginLeft: "3px" }}>▶</span>
          </motion.div>
        </div>

        {/* Duration badge */}
        <div
          className="absolute bottom-2 right-2 font-mono text-xs px-2 py-0.5 rounded"
          style={{
            background: "rgba(7,3,3,0.85)",
            color: "rgba(245,237,216,0.8)",
            backdropFilter: "blur(4px)",
          }}
        >
          {item.duration}
        </div>

        {/* Category badge */}
        <div
          className="absolute top-2 left-2 font-mono px-2 py-0.5 rounded"
          style={{
            background: "rgba(196,18,48,0.75)",
            color: "#F5EDD8",
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
            backdropFilter: "blur(4px)",
          }}
        >
          {item.category.toUpperCase()}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3
          className="font-serif text-base font-light mb-2"
          style={{ color: "#F5EDD8", lineHeight: 1.3 }}
        >
          {item.title}
        </h3>
        <div className="flex items-center justify-between">
          <span
            className="font-mono text-xs"
            style={{ color: "rgba(201,149,42,0.6)", fontSize: "0.65rem" }}
          >
            {item.views} VIEWS
          </span>
          <span className="text-xs" style={{ color: "rgba(245,237,216,0.2)" }}>
            ↗
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function InFlightEntertainment() {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filtered =
    activeCategory === "All"
      ? IFE_CONTENT
      : IFE_CONTENT.filter((c) => c.category === activeCategory);

  return (
    <section
      id="ife"
      ref={sectionRef}
      className="relative min-h-screen py-36 overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--color-dark) 0%, #080412 50%, var(--color-dark) 100%)" }}
    >
      {/* Screen bezel frame at top */}
      <div
        className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(201,149,42,0.4), transparent)",
          zIndex: 5,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "0 1rem",
        }}
      >
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            marginBottom: "2.5rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "1.25rem", width: "100%" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                borderRadius: "999px",
                background: "rgba(201,149,42,0.08)",
                border: "1px solid rgba(201,149,42,0.2)",
              }}
            >
              <span style={{ fontSize: "0.875rem" }}>📺</span>
              <span
                className="font-mono"
                style={{ color: "#C9952A", fontSize: "0.6rem", letterSpacing: "0.1em" }}
              >
                IN-FLIGHT ENTERTAINMENT SYSTEM
              </span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-light"
            style={{
              fontSize: "clamp(2.2rem, 9vw, 4rem)",
              color: "#F5EDD8",
              textAlign: "center",
              width: "100%",
              lineHeight: 1.15,
            }}
          >
            <ScrambleText text="Content & Stories" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif italic"
            style={{
              color: "rgba(245,237,216,0.4)",
              textAlign: "center",
              width: "100%",
              fontSize: "clamp(0.9rem, 3vw, 1rem)",
              marginTop: "0.5rem",
            }}
          >
            Life above the clouds, curated for you.
          </motion.p>
        </div>

        {/* Category Selector — IFE-style tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {IFE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full font-mono text-xs tracking-widest transition-all duration-300"
              style={{
                background: activeCategory === cat ? "#C9952A" : "rgba(10,4,16,0.8)",
                color: activeCategory === cat ? "#0A0505" : "rgba(245,237,216,0.5)",
                border:
                  activeCategory === cat
                    ? "1px solid #C9952A"
                    : "1px solid rgba(201,149,42,0.15)",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* Content Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((item, i) => (
            <IFECard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-center mt-20"
        >
          <p className="font-serif italic mb-5" style={{ color: "rgba(245,237,216,0.4)" }}>
            Follow the journey on Instagram
          </p>
          <a
            href="https://www.instagram.com/__pranaliii___"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-mono text-xs tracking-widest transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(196,18,48,0.15), rgba(201,149,42,0.15))",
              border: "1px solid rgba(201,149,42,0.3)",
              color: "#C9952A",
              letterSpacing: "0.15em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, #C41230, #C9952A)";
              (e.currentTarget as HTMLElement).style.color = "#0A0505";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(196,18,48,0.15), rgba(201,149,42,0.15))";
              (e.currentTarget as HTMLElement).style.color = "#C9952A";
            }}
          >
            📸 @__PRANALIII___
          </a>
        </motion.div>
      </div>
    </section>
  );
}
