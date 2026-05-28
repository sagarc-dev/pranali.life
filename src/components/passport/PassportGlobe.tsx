"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Coordinates for the passport stamps (lat, lng)
const LOCATIONS = [
  { city: "Dubai", lat: 25.2048, lng: 55.2708 },
  { city: "London", lat: 51.5072, lng: -0.1276 },
  { city: "Singapore", lat: 1.3521, lng: 103.8198 },
  { city: "Kashmir", lat: 34.0837, lng: 74.7973 },
  { city: "Seoul", lat: 37.5665, lng: 126.9780 },
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
  
  // Rotate slowly over time
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      // Slight tilt
      globeRef.current.rotation.x = 0.2;
      globeRef.current.rotation.z = 0.1;
    }
  });

  const markers = useMemo(() => {
    return LOCATIONS.map((loc) => {
      // Radius slightly larger than the globe to sit on the surface
      const pos = latLongToVector3(loc.lat, loc.lng, 2.02);
      return (
        <mesh key={loc.city} position={pos}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#C9952A" />
          {/* Add a subtle glow/halo around the marker */}
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#C9952A" transparent opacity={0.3} />
          </mesh>
        </mesh>
      );
    });
  }, []);

  return (
    <group ref={globeRef}>
      {/* Base dark sphere to block stars behind it */}
      <Sphere args={[2, 64, 64]}>
        <meshBasicMaterial color="#07030A" />
      </Sphere>
      
      {/* Wireframe outer sphere to represent latitude/longitude lines */}
      <Sphere args={[2.01, 24, 24]}>
        <meshBasicMaterial 
          color="rgba(201,149,42,0.15)" 
          wireframe={true} 
          transparent={true} 
          opacity={0.3} 
        />
      </Sphere>

      {/* City markers */}
      {markers}
    </group>
  );
}

export default function PassportGlobe() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Dark overlay gradient to blend edges */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none" 
        style={{ 
          background: "radial-gradient(ellipse at center, transparent 30%, var(--color-dark) 90%)" 
        }} 
      />
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Deep space starfield */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <ambientLight intensity={0.5} />
        <GlobeWithMarkers />
      </Canvas>
    </div>
  );
}
