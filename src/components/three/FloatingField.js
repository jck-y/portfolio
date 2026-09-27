import React, { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";

// Same palette as tailwind.config.js (accent / ink) so the 3D layer
// reads as part of the same design system, not a bolted-on demo.
const ACCENT = "#34D399";
const ACCENT_DEEP = "#10B981";
const INK_PANEL = "#1A1D26";

// Fixed, hand-placed layout so the scene composes the same way on
// every load instead of looking random/cluttered.
const SHAPES = [
  { type: "icosahedron", pos: [-3.6, 1.2, -2], scale: 0.95, wire: false, speed: 1.1 },
  { type: "torus", pos: [3.3, -0.7, -3], scale: 1.15, wire: true, speed: 0.8 },
  { type: "octahedron", pos: [-2.3, -1.9, -1.5], scale: 0.7, wire: false, speed: 1.4 },
  { type: "torusKnot", pos: [2.7, 1.9, -4], scale: 0.6, wire: true, speed: 0.9 },
  { type: "icosahedron", pos: [0.2, -2.5, -3.5], scale: 0.55, wire: true, speed: 1.2 },
  { type: "octahedron", pos: [4.3, 0.5, -2.6], scale: 0.5, wire: false, speed: 1.6 },
  { type: "torus", pos: [-4.5, -0.9, -3], scale: 0.65, wire: false, speed: 1.0 },
  { type: "icosahedron", pos: [1.6, 2.7, -2.5], scale: 0.4, wire: false, speed: 1.3 },
];

function Shape({ type, pos, scale, wire, speed, animate }) {
  const geometry = useMemo(() => {
    switch (type) {
      case "torus":
        return <torusGeometry args={[1, 0.36, 16, 64]} />;
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "torusKnot":
        return <torusKnotGeometry args={[0.8, 0.24, 100, 16]} />;
      default:
        return <icosahedronGeometry args={[1, 0]} />;
    }
  }, [type]);

  return (
    <Float
      speed={animate ? speed : 0}
      rotationIntensity={animate ? 0.6 : 0}
      floatIntensity={animate ? 1.1 : 0}
    >
      <mesh position={pos} scale={scale}>
        {geometry}
        <meshStandardMaterial
          color={wire ? ACCENT : INK_PANEL}
          emissive={ACCENT_DEEP}
          emissiveIntensity={wire ? 0.4 : 0.15}
          wireframe={wire}
          roughness={0.35}
          metalness={0.6}
        />
      </mesh>
    </Float>
  );
}

/**
 * Pointer-driven camera parallax — a light nod to the "drive/look around
 * a 3D world" feel without vehicle physics. Listens on `window`, not the
 * canvas, because the canvas has pointer-events: none (clicks and scroll
 * must keep reaching the real page content underneath).
 */
function ParallaxRig({ enabled }) {
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const handleMove = (e) => {
      target.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [enabled]);

  useFrame((state) => {
    if (!enabled) return;
    const cam = state.camera;
    cam.position.x += (target.current.x * 0.6 - cam.position.x) * 0.04;
    cam.position.y += (-target.current.y * 0.4 - cam.position.y) * 0.04;
    cam.lookAt(0, 0, 0);
  });

  return null;
}

/**
 * The actual scene contents. `simplified` trims shape count and turns off
 * particles/parallax for low-power / mobile devices. `animate` is false
 * under prefers-reduced-motion — shapes render once, fully static.
 */
const FloatingField = ({ simplified = false, animate = true }) => {
  const shapes = simplified ? SHAPES.slice(0, 4) : SHAPES;

  return (
    <>
      <color attach="background" args={["#0A0B0E"]} />
      <fog attach="fog" args={["#0A0B0E", 6, 15]} />
      <ambientLight intensity={0.45} />
      <pointLight position={[6, 4, 4]} color={ACCENT} intensity={22} distance={18} />
      <pointLight position={[-6, -3, -2]} color={ACCENT_DEEP} intensity={10} distance={16} />

      {shapes.map((s, i) => (
        <Shape key={i} {...s} animate={animate} />
      ))}

      {!simplified && animate && (
        <Sparkles count={45} scale={9} size={2} speed={0.25} color={ACCENT} opacity={0.5} />
      )}

      <ParallaxRig enabled={animate && !simplified} />
    </>
  );
};

export default FloatingField;
