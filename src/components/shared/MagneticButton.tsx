"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function MagneticButton({
  children,
  onClick,
  className = "",
  style = {},
  id,
  hoverBackground,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  hoverBackground?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2); // Magnetic pull strength
    y.set(middleY * 0.2);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      style={{
        x: smoothX,
        y: smoothY,
        ...style,
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Background ripple on hover */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: hovered ? 1 : 0, 
          opacity: hovered ? 1 : 0 
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: hoverBackground || "linear-gradient(135deg, #B7925F, #F0C060)",
          borderRadius: "inherit",
          transformOrigin: "center",
        }}
      />
      
      {/* Content wrapper to pull separately from button bounding box */}
      <motion.div
        className="relative z-10 w-full h-full flex items-center justify-center"
        style={{
          x: useTransform(smoothX, (v) => v * 0.5),
          y: useTransform(smoothY, (v) => v * 0.5),
        }}
      >
        {children}
      </motion.div>
    </motion.button>
  );
}
