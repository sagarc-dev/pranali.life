"use client";
import { useEffect, useState, useCallback } from "react";
import Lenis from "lenis";
import LoadingScreen from "@/components/shared/LoadingScreen";
import Navigation from "@/components/shared/Navigation";
import ScrollSidebar from "@/components/shared/ScrollSidebar";
import AirportIntro from "@/components/intro/AirportIntro";
import FlightTimeline from "@/components/timeline/FlightTimeline";
import CabinAnnouncements from "@/components/announcements/CabinAnnouncements";
import LifeAboveClouds from "@/components/life/LifeAboveClouds";
import PassportMemories from "@/components/passport/PassportMemories";
import InFlightEntertainment from "@/components/entertainment/InFlightEntertainment";
import BehindTheUniform from "@/components/uniform/BehindTheUniform";
import FinalDestination from "@/components/final/FinalDestination";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaded = useCallback(() => {
    setLoaded(true);
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loaded]);

  return (
    <>
      <LoadingScreen onComplete={handleLoaded} />

      {loaded && (
        <>
          <Navigation />
          <main>
            <ScrollSidebar />
            
            {/* Section 1 — Airport Intro */}
            <AirportIntro />

            {/* Section 2 — Flight Route Timeline */}
            <FlightTimeline />

            {/* Section 3 — Cabin Announcements */}
            <CabinAnnouncements />

            {/* Section 4 — Life Above The Clouds */}
            <LifeAboveClouds />

            {/* Section 5 — Passport Memories */}
            <PassportMemories />

            {/* Section 6 — In-Flight Entertainment */}
            <InFlightEntertainment />

            {/* Section 7 — Behind The Uniform */}
            <BehindTheUniform />

            {/* Section 8 — Final Destination */}
            <FinalDestination />
          </main>
        </>
      )}
    </>
  );
}
