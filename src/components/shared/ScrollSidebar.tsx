"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SECTIONS = [
  "INTRO",
  "JOURNEY",
  "CABIN",
  "LIFE",
  "PASSPORT",
  "STORIES",
  "UNIFORM",
  "DESTINATION",
];

export default function ScrollSidebar() {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState(0);

  // Update active section based on scroll progress
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      // Map 0-1 to 0-7
      const index = Math.min(
        SECTIONS.length - 1,
        Math.max(0, Math.floor(latest * SECTIONS.length))
      );
      setActiveSection(index);
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed right-4 top-0 bottom-0 z-50 hidden lg:flex flex-col items-center justify-center pointer-events-none">
      <div className="relative h-[60vh] w-8 flex flex-col items-center">
        
        {/* Track Line */}
        <div className="absolute top-0 bottom-0 w-[1px] bg-[rgba(201,149,42,0.15)] left-1/2 -translate-x-1/2 rounded-full" />
        
        {/* Progress Line (Shooting Star Tail) */}
        <motion.div
          className="absolute top-0 bottom-0 w-[2px] left-1/2 -translate-x-1/2 origin-top rounded-full"
          style={{ 
            scaleY: scrollYProgress,
            background: "linear-gradient(to bottom, transparent, #C9952A, #F0C060)" 
          }}
        />

        {/* Airplane Head */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
          style={{ 
            top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
            marginTop: "-10px", // Center it properly on the progress tip
            zIndex: 10,
          }}
        >
          {/* Glow backdrop */}
          <div className="absolute w-4 h-4 bg-[#F0C060] rounded-full blur-[6px] opacity-70 animate-pulse-gold" />
          
          {/* Airplane SVG pointing downwards */}
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 text-[#F5EDD8]"
            style={{ 
              transform: "rotate(180deg)", // Point downwards
              filter: "drop-shadow(0px 0px 4px rgba(240,192,96,0.9))"
            }}
          >
            <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="currentColor"/>
          </svg>
        </motion.div>

        {/* Section Labels */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {SECTIONS.map((section, idx) => {
            const isActive = idx === activeSection;
            return (
              <div 
                key={section} 
                className="relative flex items-center justify-end w-full"
              >
                {/* Dot on the line */}
                <div 
                  className={`absolute right-1/2 translate-x-1/2 w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    isActive ? "bg-[#F0C060] shadow-[0_0_8px_rgba(240,192,96,0.8)]" : "bg-[#C9952A] opacity-20"
                  }`} 
                />
                
                {/* Text Label */}
                <span 
                  className={`font-mono text-[0.55rem] tracking-[0.2em] transition-all duration-300 whitespace-nowrap mr-6 ${
                    isActive ? "text-[#F0C060] opacity-100 font-bold" : "text-[#C9952A] opacity-30 font-normal"
                  }`}
                  style={{
                    textShadow: isActive ? "0 0 10px rgba(240,192,96,0.4)" : "none",
                  }}
                >
                  {section}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
