import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

const ROSE = "#D6336C";
const INK = "#1A1620";
const PAPER = "#FFFFFF";

// Each section gets its own silhouette instead of four identical
// markers — a stand-in monolith, a stack of plates, a graduation
// shape, a signal beacon — so the world reads as a place, not a kit.

const AboutShape = () => (
  <group>
    <mesh position={[0, 1.1, 0]}>
      <capsuleGeometry args={[0.55, 1.1, 8, 16]} />
      <meshStandardMaterial color={PAPER} roughness={0.5} />
    </mesh>
    <mesh position={[0, 1.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.75, 0.05, 12, 32]} />
      <meshStandardMaterial color={ROSE} emissive={ROSE} emissiveIntensity={0.4} />
    </mesh>
  </group>
);

const ResumeShape = () => (
  <group>
    {[0, 1, 2, 3].map((i) => (
      <mesh key={i} position={[i * 0.05, 0.16 + i * 0.28, i * -0.04]} rotation={[0, i * 0.07, 0]}>
        <boxGeometry args={[1.3, 0.14, 0.95]} />
        <meshStandardMaterial color={i === 3 ? ROSE : INK} roughness={0.45} />
      </mesh>
    ))}
  </group>
);

const EducationShape = () => (
  <group>
    <mesh position={[0, 0.55, 0]}>
      <coneGeometry args={[0.85, 1.1, 4]} />
      <meshStandardMaterial color={INK} roughness={0.5} />
    </mesh>
    <mesh position={[0, 1.18, 0]} rotation={[0, Math.PI / 4, 0]}>
      <boxGeometry args={[1.15, 0.08, 1.15]} />
      <meshStandardMaterial color={PAPER} roughness={0.4} />
    </mesh>
    <mesh position={[0.5, 1.0, 0.5]}>
      <sphereGeometry args={[0.08, 12, 12]} />
      <meshStandardMaterial color={ROSE} emissive={ROSE} emissiveIntensity={0.5} />
    </mesh>
  </group>
);

function ContactShape({ reduceMotion }) {
  const ring = useRef(null);
  useFrame((_, delta) => {
    if (ring.current && !reduceMotion) ring.current.rotation.z += delta * 0.6;
  });
  return (
    <group>
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshStandardMaterial color={PAPER} roughness={0.3} />
      </mesh>
      <mesh ref={ring} position={[0, 0.9, 0]}>
        <torusGeometry args={[0.8, 0.045, 12, 40]} />
        <meshStandardMaterial color={ROSE} emissive={ROSE} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

const SHAPES = {
  about: AboutShape,
  resume: ResumeShape,
  education: EducationShape,
  contact: ContactShape,
};

const PortalMarker = ({ position, label, shapeKey, active, reduceMotion }) => {
  const Shape = SHAPES[shapeKey] || AboutShape;
  const ringRef = useRef(null);

  useFrame((state3) => {
    if (!ringRef.current) return;
    const pulse = active && !reduceMotion ? 1 + Math.sin(state3.clock.elapsedTime * 4) * 0.06 : 1;
    ringRef.current.scale.set(pulse, 1, pulse);
  });

  return (
    <group position={position}>
      <Shape reduceMotion={reduceMotion} />

      {/* Ground trigger ring — visible proximity feedback so the
          trigger radius is never a guess. */}
      <mesh ref={ringRef} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.9, 2.15, 48]} />
        <meshBasicMaterial color={active ? ROSE : INK} transparent opacity={active ? 0.5 : 0.12} />
      </mesh>

      <Html position={[0, 2.15, 0]} center distanceFactor={9} occlude>
        <div className="whitespace-nowrap font-display italic text-ink-950 text-base pointer-events-none select-none">
          {label}
        </div>
      </Html>
    </group>
  );
};

export default PortalMarker;
