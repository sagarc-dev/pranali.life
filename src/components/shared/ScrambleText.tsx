"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

// Individual animated flip-board style character
export function FlipChar({ char, delay, onComplete }: { char: string; delay: number; onComplete?: () => void }) {
  const [current, setCurrent] = useState("_");
  // IATA codes and flight numbers typically use these characters
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 -:".split("");
  const isSpace = char === " ";

  useEffect(() => {
    if (isSpace) {
      setCurrent(" ");
      if (onComplete) onComplete();
      return;
    }

    let count = 0;
    const target = char.toUpperCase();
    const maxFlips = 8; // Number of random chars before settling

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (count >= maxFlips) {
          setCurrent(target);
          clearInterval(interval);
          if (onComplete) onComplete();
          return;
        }
        setCurrent(chars[Math.floor(Math.random() * chars.length)]);
        count++;
      }, 60);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [char, delay, isSpace]);

  return (
    <span
      className={current === char.toUpperCase() && !isSpace ? "opacity-100" : "opacity-70"}
      style={{
        display: "inline-block",
        transition: "color 0.1s, opacity 0.1s",
        minWidth: isSpace ? "0.3em" : "auto", // Narrower space to prevent gaps in normal words
      }}
    >
      {current}
    </span>
  );
}

// Wrapper to scramble a whole word or sentence when it comes into view
export default function ScrambleText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <span ref={ref} className={className} style={style}>
      {isInView ? (
        text.split("").map((c, j) => (
          <FlipChar key={j} char={c} delay={j * 40} /> // Faster delay for whole sentences
        ))
      ) : (
        // Invisible placeholder to maintain layout before scroll
        <span style={{ opacity: 0 }}>{text}</span>
      )}
    </span>
  );
}
