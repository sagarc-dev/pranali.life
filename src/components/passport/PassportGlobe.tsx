"use client";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import ThreeGlobe from "three-globe";

// Coordinates for the passport stamps (lat, lng)
const LOCATIONS = [
  { city: "London", lat: 51.5072, lng: -0.1276 },
  { city: "Birmingham", lat: 52.4862, lng: -1.8904 },
  { city: "Nepal", lat: 27.7172, lng: 85.3240 },
  { city: "Amritsar", lat: 31.6340, lng: 74.8723 },
  { city: "Bangkok", lat: 13.7563, lng: 100.5018 },
  { city: "Dubai", lat: 25.2048, lng: 55.2708 },
  { city: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { city: "Saudi Arabia", lat: 24.7136, lng: 46.6753 },
  { city: "Singapore", lat: 1.3521, lng: 103.8198 },
  { city: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { city: "Kochi", lat: 9.9312, lng: 76.2673 },
  { city: "Jaipur", lat: 26.9124, lng: 75.7873 },
  { city: "Mauritius", lat: -20.1609, lng: 57.5012 },
  { city: "Sydney", lat: -33.8688, lng: 151.2093 },
  { city: "Melbourne", lat: -37.8136, lng: 144.9631 },
  { city: "Nairobi", lat: -1.2921, lng: 36.8219 },
  { city: "Hyderabad", lat: 17.3850, lng: 78.4867 },
  { city: "Delhi", lat: 28.7041, lng: 77.1025 },
  { city: "Chennai", lat: 13.0827, lng: 80.2707 },
  { city: "Goa", lat: 15.4909, lng: 73.8278 },
  { city: "Mathura", lat: 27.4924, lng: 77.6737 },
  { city: "Hong Kong", lat: 22.3193, lng: 114.1694 },
  { city: "South Korea", lat: 37.5665, lng: 126.9780 },
  { city: "Kannur", lat: 11.8745, lng: 75.3704 }
];

function latLongToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

function GlobeWithMarkers() {
  const globeRef = useRef<THREE.Group>(null);
  const [globeData, setGlobeData] = useState<any>(null);

  useEffect(() => {
    fetch("/countries.geojson")
      .then((res) => res.json())
      .then((data) => setGlobeData(data.features))
      .catch((err) => console.error("Error loading countries:", err));
  }, []);

  // Initialize ThreeGlobe
  const GlobeObj = useMemo(() => {
    if (!globeData) return null;

    const globe = new ThreeGlobe()
      .hexPolygonsData(globeData)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.3)
      .hexPolygonColor(() => "rgba(201,149,42,0.8)")
      .showAtmosphere(true)
      .atmosphereColor("#C9952A")
      .atmosphereAltitude(0.15);

    // Make the base globe invisible/dark
    const globeMaterial = new THREE.MeshBasicMaterial({ 
      color: "#0A0410",
      transparent: true,
      opacity: 0.95
    });
    globe.globeMaterial(globeMaterial);

    return globe;
  }, [globeData]);

  // Rotate slowly over time
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      globeRef.current.rotation.x = 0.2;
      globeRef.current.rotation.z = 0.1;
    }
  });

  const markers = useMemo(() => {
    return LOCATIONS.map((loc) => {
      // ThreeGlobe default radius is 100. We'll use 100.5 for markers.
      const pos = latLongToVector3(loc.lat, loc.lng, 100.5);
      return (
        <mesh key={loc.city} position={pos}>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
          {/* Intense golden halo around the marker */}
          <mesh>
            <sphereGeometry args={[3.5, 16, 16]} />
            <meshBasicMaterial color="#C9952A" transparent opacity={0.6} />
          </mesh>
        </mesh>
      );
    });
  }, []);

  return (
    <group ref={globeRef} scale={[0.02, 0.02, 0.02]}>
      {GlobeObj && <primitive object={GlobeObj} />}
      {/* City markers */}
      {markers}
    </group>
  );
}

export default function PassportGlobe() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div 
        className="absolute inset-0 pointer-events-none z-10" 
        style={{ 
          background: "radial-gradient(ellipse at center, transparent 30%, var(--color-dark) 90%)" 
        }} 
      />
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        {/* Deep space starfield */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        {/* Lighting for the globe */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#fffcf5" />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#8ab4f8" />
        
        <GlobeWithMarkers />
      </Canvas>
    </div>
  );
}
