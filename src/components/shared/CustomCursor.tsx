"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "image">("default");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for cursor position
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only run on desktop/devices with fine pointer
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable = 
        target.closest("button") || 
        target.closest("a") || 
        target.closest(".stamp") ||
        window.getComputedStyle(target).cursor === "pointer";

      const isImage = target.tagName === "IMG" && !target.closest(".stamp");

      if (isClickable) {
        setCursorType("hover");
      } else if (isImage) {
        setCursorType("image");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isVisible) return null;

  const variants = {
    default: {
      width: 12,
      height: 12,
      x: "-50%",
      y: "-50%",
      border: "1px solid #C9952A",
      backgroundColor: "rgba(201,149,42,0.5)",
      mixBlendMode: "normal" as any,
    },
    hover: {
      width: 40,
      height: 40,
      x: "-50%",
      y: "-50%",
      border: "1px dashed rgba(201,149,42,0.8)",
      backgroundColor: "rgba(201,149,42,0.1)",
      mixBlendMode: "difference" as any,
    },
    image: {
      width: 40,
      height: 40,
      x: "-50%",
      y: "-50%",
      border: "1px solid rgba(245,237,216,0.3)",
      backgroundColor: "rgba(0,0,0,0.2)",
      mixBlendMode: "normal" as any,
    },
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}} />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        variants={variants}
        animate={cursorType}
        transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: cursorType === "image" ? 1 : 0,
            scale: cursorType === "image" ? 1 : 0,
          }}
          className="text-[10px]"
          style={{ color: "#F5EDD8" }}
        >
          +
        </motion.div>
      </motion.div>
    </>
  );
}
