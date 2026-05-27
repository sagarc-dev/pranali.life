"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/constants";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"loading" | "ready" | "done">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("ready"), 300);
          return 100;
        }
        return p + Math.random() * 8 + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase === "ready") {
      setTimeout(() => {
        setPhase("done");
        setTimeout(onComplete, 600);
      }, 1200);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
          style={{ background: "var(--color-dark)" }}
        >
          {/* Airline Logo Mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 text-center"
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl"
              style={{
                background: "linear-gradient(135deg, #C41230 0%, #C9952A 100%)",
                boxShadow: "0 0 60px rgba(196,18,48,0.4)",
              }}
            >
              ✈
            </div>
            <p
              className="font-mono text-xs tracking-[0.4em] mb-1"
              style={{ color: "rgba(201,149,42,0.7)" }}
            >
              FLIGHT {SITE.flightNo}
            </p>
            <h1
              className="font-serif text-4xl font-light tracking-widest"
              style={{ color: "#F5EDD8" }}
            >
              {SITE.name.toUpperCase()}
            </h1>
            <p
              className="font-mono text-xs tracking-[0.3em] mt-2"
              style={{ color: "rgba(245,237,216,0.4)" }}
            >
              {SITE.airline.toUpperCase()} · {SITE.role.toUpperCase()}
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-64 mb-6">
            <div
              className="h-px rounded-full overflow-hidden"
              style={{ background: "rgba(201,149,42,0.15)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #C41230, #C9952A)",
                  width: `${Math.min(progress, 100)}%`,
                }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {phase === "loading" ? (
              <motion.p
                key="loading"
                exit={{ opacity: 0 }}
                className="font-mono text-xs tracking-[0.3em]"
                style={{ color: "rgba(245,237,216,0.35)" }}
              >
                PREPARING FOR DEPARTURE...
              </motion.p>
            ) : (
              <motion.p
                key="ready"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-xs tracking-[0.3em]"
                style={{ color: "#C9952A" }}
              >
                NOW BOARDING ✦
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
