import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles, Stars } from "@react-three/drei";

export const VOID = "#05030A";
const ROSE = "#D6336C";
const ROSE_SOFT = "#FF8FB8";

// Hand-placed so the void composes the same way every load.
const DEBRIS = [
  { pos: [-19, 3, -8], scale: 1.6, speed: 0.7 },
  { pos: [21, 5, -14], scale: 2.2, speed: 0.5 },
  { pos: [-24, -3, 6], scale: 1.1, speed: 0.9 },
  { pos: [18, -4, 12], scale: 1.4, speed: 0.8 },
  { pos: [-9, 8, -24], scale: 2.6, speed: 0.4 },
  { pos: [12, 9, -27], scale: 1.2, speed: 0.9 },
  { pos: [0, -8, -20], scale: 1.8, speed: 0.6 },
  { pos: [-16, 6, 18], scale: 0.9, speed: 1.0 },
  { pos: [25, 1, 2], scale: 0.8, speed: 1.1 },
];

// Distant singularity: black disc ringed by a tilted accretion disk.
// Materials ignore fog so it stays crisp against the void.
function Singularity({ animate }) {
  const disk = useRef(null);
  useFrame((_, delta) => {
    if (animate && disk.current) disk.current.rotation.z += delta * 0.08;
  });

  return (
    <group position={[-12, 17, -62]} rotation={[0.35, 0.2, 0.15]}>
      <mesh>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial color="#000000" fog={false} />
      </mesh>
      <group rotation={[1.25, 0, 0]}>
        <mesh ref={disk}>
          <torusGeometry args={[8.2, 0.45, 12, 96]} />
          <meshBasicMaterial color={ROSE_SOFT} fog={false} toneMapped={false} />
        </mesh>
        <mesh>
          <torusGeometry args={[10.5, 1.4, 12, 96]} />
          <meshBasicMaterial
            color={ROSE}
            transparent
            opacity={0.35}
            depthWrite={false}
            fog={false}
            toneMapped={false}
          />
        </mesh>
        <mesh>
          <torusGeometry args={[14, 2.6, 12, 96]} />
          <meshBasicMaterial
            color="#6A5CFF"
            transparent
            opacity={0.12}
            depthWrite={false}
            fog={false}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

function Debris({ pos, scale, speed, animate }) {
  return (
    <Float
      speed={animate ? speed : 0}
      rotationIntensity={animate ? 0.8 : 0}
      floatIntensity={animate ? 1.4 : 0}
    >
      <mesh position={pos} scale={scale}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#1B1522"
          emissive={ROSE}
          emissiveIntensity={0.06}
          roughness={0.85}
          metalness={0.2}
          flatShading
        />
      </mesh>
    </Float>
  );
}

const VoidBackdrop = ({ reduceMotion }) => {
  const animate = !reduceMotion;
  return (
    <>
      <Stars
        radius={110}
        depth={50}
        count={animate ? 3200 : 1800}
        factor={4}
        saturation={0}
        fade
        speed={animate ? 0.5 : 0}
      />
      <Singularity animate={animate} />
      {DEBRIS.map((d, i) => (
        <Debris key={i} {...d} animate={animate} />
      ))}
      <Sparkles
        count={90}
        scale={[34, 12, 34]}
        position={[0, 3, 0]}
        size={3}
        speed={animate ? 0.3 : 0}
        color={ROSE_SOFT}
        opacity={0.55}
      />
    </>
  );
};

export default VoidBackdrop;
