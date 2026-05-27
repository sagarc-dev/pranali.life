"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { UNIFORM_LINES } from "@/lib/constants";

function UniformLine({ item, index }: { item: (typeof UNIFORM_LINES)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.5, delay: 0.1 }}
      className="relative min-h-[50vh] flex items-center justify-center px-6 py-16"
    >
      {/* Subtle line number */}
      <span
        className="absolute top-8 left-8 font-mono"
        style={{ color: "rgba(201,149,42,0.15)", fontSize: "0.65rem" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="text-center max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-light"
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
            color: "rgba(245,237,216,0.75)",
            lineHeight: 1.3,
            letterSpacing: "0.02em",
          }}
        >
          {item.line}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-light italic"
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
            color: "#C9952A",
            lineHeight: 1.3,
            marginTop: "0.2em",
          }}
        >
          {item.continuation}
        </motion.p>
      </div>

      {/* Separator */}
      {index < UNIFORM_LINES.length - 1 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px"
          style={{ background: "rgba(201,149,42,0.2)" }}
        />
      )}
    </motion.div>
  );
}

export default function BehindTheUniform() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      id="uniform"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "var(--color-dark)" }}
    >
      {/* Parallax warm light background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 40%, rgba(196,18,48,0.08) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 70%, rgba(201,149,42,0.05) 0%, transparent 50%)",
          }}
        />
      </motion.div>

      {/* Header */}
      <div className="relative text-center pt-32 pb-12 px-6" style={{ zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="font-mono text-xs tracking-[0.4em] mb-4"
          style={{ color: "rgba(201,149,42,0.7)" }}
        >
          ✦ BEHIND THE UNIFORM ✦
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-light"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "#F5EDD8" }}
        >
          Her Story
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif italic text-lg mt-4 max-w-lg mx-auto"
          style={{ color: "rgba(245,237,216,0.4)", lineHeight: 1.8 }}
        >
          The most honest section of this journey.
          <br />
          Read slowly.
        </motion.p>

        <div className="divider-gold mx-auto w-48 mt-8" />
      </div>

      {/* Quote Lines */}
      <div className="relative" style={{ zIndex: 1 }}>
        {UNIFORM_LINES.map((item, i) => (
          <UniformLine key={i} item={item} index={i} />
        ))}
      </div>

      {/* Final emotional close */}
      <div className="relative text-center pb-32 pt-8 px-6" style={{ zIndex: 1 }}>
        <div className="divider-gold mx-auto w-48 mb-12" />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-light"
          style={{
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            color: "rgba(245,237,216,0.5)",
            lineHeight: 1.8,
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          From nursing halls to aircraft aisles,
          <br />
          from government corridors to{" "}
          <span style={{ color: "#C9952A" }}>the open sky</span> —
          <br />
          this is not a career change.
          <br />
          <span style={{ color: "#F5EDD8" }}>This is a becoming.</span>
        </motion.p>
      </div>
    </section>
  );
}
