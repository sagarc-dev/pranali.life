"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/constants";

const NAV_ITEMS = [
  { label: "Boarding", href: "#intro" },
  { label: "Journey", href: "#timeline" },
  { label: "The Skies", href: "#life" },
  { label: "Passport", href: "#passport" },
  { label: "Stories", href: "#ife" },
  { label: "Connect", href: "#final" },
];

export default function Navigation() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeSection, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-dark py-3" : "py-5"
        }`}
        style={{ borderBottom: scrolled ? "1px solid rgba(201,149,42,0.15)" : "none" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav("#intro")}
            className="flex items-center gap-3 group"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono"
              style={{
                background: "linear-gradient(135deg, #DC0C2C, #B7925F)",
                color: "#F0CF98",
              }}
            >
              ✈
            </div>
            <span
              className="font-serif text-lg tracking-widest"
              style={{ color: "#F0CF98", letterSpacing: "0.2em" }}
            >
              {SITE.name.toUpperCase()}
            </span>
          </button>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleNav(item.href)}
                  className="font-mono text-xs tracking-widest transition-colors duration-300"
                  style={{
                    color: activeSection === item.href ? "#B7925F" : "rgba(245,237,216,0.6)",
                    letterSpacing: "0.15em",
                    fontSize: "0.7rem",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#B7925F")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color =
                      activeSection === item.href ? "#B7925F" : "rgba(245,237,216,0.6)")
                  }
                >
                  {item.label.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Btn */}
          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-px transition-all duration-300"
                style={{
                  background: "#B7925F",
                  width: i === 1 && menuOpen ? "14px" : "20px",
                  transform:
                    menuOpen
                      ? i === 0
                        ? "rotate(45deg) translate(4px, 4px)"
                        : i === 2
                        ? "rotate(-45deg) translate(4px, -4px)"
                        : "scaleX(0)"
                      : "none",
                }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 glass-dark flex flex-col items-center justify-center gap-8"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleNav(item.href)}
                className="font-serif text-3xl tracking-widest"
                style={{ color: "#F0CF98" }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
