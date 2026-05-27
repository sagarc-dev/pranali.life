"use client";
import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { SITE } from "@/lib/constants";

function SocialLink({
  href,
  icon,
  label,
  color,
}: {
  href: string;
  icon: string;
  label: string;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-3 px-6 py-3 rounded-full font-mono text-xs tracking-widest transition-all duration-300"
      style={{
        background: hovered ? color : "rgba(245,237,216,0.04)",
        border: `1px solid ${hovered ? color : "rgba(245,237,216,0.1)"}`,
        color: hovered ? "#0A0505" : "rgba(245,237,216,0.6)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? `0 8px 30px ${color}40` : "none",
        letterSpacing: "0.15em",
      }}
    >
      <span style={{ fontSize: "1rem" }}>{icon}</span>
      {label.toUpperCase()}
    </a>
  );
}

export default function FinalDestination() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cloudY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      id="final"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--color-dark)" }}
    >
      {/* Sunset clouds background */}
      <motion.div
        style={{ y: cloudY }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <Image
          src="/images/sunset-clouds.png"
          alt="Sunset above clouds"
          fill
          className="object-cover"
          style={{ opacity: 0.25 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(7,3,3,0.6) 60%, rgba(7,3,3,0.95) 100%), linear-gradient(to bottom, rgba(7,3,3,0.3) 0%, rgba(7,3,3,0.7) 70%, rgba(7,3,3,1) 100%)",
          }}
        />
      </motion.div>

      {/* Warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(201,149,42,0.08) 0%, transparent 60%)",
          zIndex: 1,
        }}
      />

      <div
        className="relative flex flex-col items-center text-center px-6 max-w-2xl mx-auto"
        style={{ zIndex: 2 }}
      >
        {/* Window frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="window-frame w-56 h-72 mb-12 relative overflow-hidden"
          style={{
            boxShadow: "0 0 60px rgba(201,149,42,0.2), inset 0 0 40px rgba(0,0,0,0.6)",
          }}
        >
          <Image
            src="/images/sunset-clouds.png"
            alt="Sunset view from aircraft window"
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 50%, rgba(7,3,3,0.6) 100%)",
            }}
          />
          <div
            className="absolute inset-0 rounded-[40%_40%_35%_35%_/_25%_25%_30%_30%]"
            style={{
              border: "8px solid #1a1108",
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.9)",
            }}
          />
        </motion.div>

        {/* Main quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-mono text-xs tracking-[0.4em] mb-6"
          style={{ color: "rgba(201,149,42,0.7)" }}
        >
          ✦ FINAL DESTINATION ✦
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-light mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#F5EDD8", lineHeight: 1.2 }}
        >
          "Some journeys begin
          <br />
          <span style={{ color: "#C9952A" }}>after turbulence."</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-serif italic text-base mb-12"
          style={{ color: "rgba(245,237,216,0.4)", lineHeight: 1.8 }}
        >
          She chose the sky and never looked back.
          <br />
          Every flight, a new chapter.
          <br />
          Every landing, a new lesson.
        </motion.p>

        <div className="divider-gold w-48 mx-auto mb-12" />

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-4 mb-14"
        >
          <SocialLink
            href={SITE.instagramUrl}
            icon="📸"
            label={SITE.instagram}
            color="#C9952A"
          />
          <SocialLink
            href={`mailto:${SITE.email}`}
            icon="✉️"
            label="Collaborate"
            color="#C41230"
          />
          <SocialLink
            href={SITE.instagramUrl}
            icon="✈"
            label="Work With Me"
            color="#4CAF50"
          />
        </motion.div>

        {/* Boarding stamp */}
        <motion.div
          initial={{ scale: 0, rotate: -25, opacity: 0 }}
          animate={isInView ? { scale: 1, rotate: -8, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="stamp px-8 py-4"
            style={{
              color: "#C9952A",
              borderWidth: "3px",
              transform: "rotate(-8deg)",
            }}
          >
            <p className="font-mono text-xs tracking-widest" style={{ fontSize: "0.65rem" }}>
              THANK YOU FOR FLYING WITH
            </p>
            <p
              className="font-serif text-xl font-light my-1"
              style={{ color: "#F0C060" }}
            >
              {SITE.name}
            </p>
            <p className="font-mono text-xs" style={{ fontSize: "0.6rem" }}>
              ✦ AIR INDIA · {new Date().getFullYear()} ✦
            </p>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="font-mono text-xs mt-16"
          style={{ color: "rgba(245,237,216,0.15)", letterSpacing: "0.2em", fontSize: "0.6rem" }}
        >
          PRANALI.LIFE · DESIGNED WITH LOVE & ALTITUDE
        </motion.p>
      </div>
    </section>
  );
}
