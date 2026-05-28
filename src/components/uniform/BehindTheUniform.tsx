"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import ScrambleText from "@/components/shared/ScrambleText";
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
      style={{
        position: "relative",
        minHeight: "55vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 1.5rem",
      }}
    >
      {/* Line number */}
      <span
        className="font-mono"
        style={{
          position: "absolute",
          top: "2rem",
          left: "1rem",
          color: "rgba(201,149,42,0.15)",
          fontSize: "0.6rem",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div style={{ maxWidth: "40rem", textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-light"
          style={{
            fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
            color: "rgba(245,237,216,0.75)",
            lineHeight: 1.3,
            letterSpacing: "0.02em",
            textAlign: "center",
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
            fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
            color: "#C9952A",
            lineHeight: 1.3,
            marginTop: "0.2em",
            textAlign: "center",
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
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "4rem",
            height: "1px",
            background: "rgba(201,149,42,0.2)",
          }}
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
      style={{ position: "relative", overflow: "hidden", background: "var(--color-dark)" }}
    >
      {/* Parallax warm light background */}
      <motion.div style={{ y: bgY, position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 40%, rgba(196,18,48,0.07) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 70%, rgba(201,149,42,0.04) 0%, transparent 50%)",
          }}
        />
      </motion.div>

      {/* Header */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          paddingTop: "8rem",
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
          style={{ color: "rgba(201,149,42,0.7)", textAlign: "center", letterSpacing: "0.4em", fontSize: "0.65rem", marginBottom: "1rem" }}
        >
          ✦ BEHIND THE UNIFORM ✦
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-light"
          style={{ fontSize: "clamp(2.2rem, 9vw, 4.5rem)", color: "#F5EDD8", textAlign: "center" }}
        >
          <ScrambleText text="Her Story" />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif italic"
          style={{ color: "rgba(245,237,216,0.4)", lineHeight: 1.8, textAlign: "center", fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)", marginTop: "0.75rem", maxWidth: "28rem" }}
        >
          The most honest section of this journey.
          <br />
          Read slowly.
        </motion.p>

        <div className="divider-gold" style={{ width: "8rem", margin: "2rem auto 0" }} />
      </div>

      {/* Quote Lines */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {UNIFORM_LINES.map((item, i) => (
          <UniformLine key={i} item={item} index={i} />
        ))}
      </div>

      {/* Final emotional close */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          paddingBottom: "7rem",
          paddingTop: "2rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <div className="divider-gold" style={{ width: "8rem", margin: "0 auto 3rem" }} />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-light"
          style={{
            fontSize: "clamp(1.1rem, 4.5vw, 1.7rem)",
            color: "rgba(245,237,216,0.5)",
            lineHeight: 1.8,
            maxWidth: "36rem",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          From nursing halls to aircraft aisles,
          <br />
          from government corridors to{" "}
          <span style={{ color: "#C9952A" }}>the open sky</span> &mdash;
          <br />
          this is not a career change.
          <br />
          <span style={{ color: "#F5EDD8" }}>This is a becoming.</span>
        </motion.p>
      </div>
    </section>
  );
}
