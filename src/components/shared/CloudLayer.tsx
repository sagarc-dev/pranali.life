"use client";
import { motion } from "framer-motion";

interface CloudLayerProps {
  density?: "light" | "medium" | "heavy";
  className?: string;
}

const CLOUDS = [
  { w: 320, h: 80, top: "8%",  left: "-5%",  dur: 80, del: 0,   op: 0.06 },
  { w: 500, h: 120, top: "22%", left: "15%",  dur: 100, del: 20,  op: 0.05 },
  { w: 280, h: 70,  top: "38%", left: "60%",  dur: 90,  del: 10,  op: 0.07 },
  { w: 420, h: 100, top: "55%", left: "-10%", dur: 110, del: 35,  op: 0.04 },
  { w: 360, h: 90,  top: "72%", left: "40%",  dur: 95,  del: 15,  op: 0.06 },
  { w: 260, h: 60,  top: "85%", left: "75%",  dur: 85,  del: 45,  op: 0.05 },
];

export default function CloudLayer({ density = "medium", className = "" }: CloudLayerProps) {
  const clouds = density === "light" ? CLOUDS.slice(0, 3) : density === "heavy" ? CLOUDS : CLOUDS.slice(0, 4);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {clouds.map((c, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            top: c.top,
            left: c.left,
            width: c.w,
            height: c.h,
            opacity: c.op,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(245,237,216,0.9) 0%, rgba(245,237,216,0.3) 60%, transparent 100%)",
            filter: "blur(28px)",
          }}
          animate={{ x: [0, 60, 0], y: [0, -10, 0] }}
          transition={{
            duration: c.dur,
            delay: c.del,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
