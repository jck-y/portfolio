import React from "react";
import { Edges } from "@react-three/drei";
import Vehicle from "./Vehicle";
import PortalMarker from "./PortalMarker";
import VoidBackdrop, { VOID } from "./VoidBackdrop";

const ROSE = "#D6336C";

export const PORTALS = [
  { key: "about", label: "About", shapeKey: "about", position: [-7, 0, -6] },
  { key: "resume", label: "Resume & Projects", shapeKey: "resume", position: [7, 0, -6] },
  { key: "education", label: "Education", shapeKey: "education", position: [-7, 0, 6] },
  { key: "contact", label: "Contact", shapeKey: "contact", position: [7, 0, 6] },
];

const World = ({ inputRef, paused, onEnterPortal, resetSignal, activeSection, reduceMotion }) => {
  return (
    <>
      <color attach="background" args={[VOID]} />
      <fog attach="fog" args={[VOID, 20, 58]} />
      <ambientLight intensity={0.35} color="#8A7AA8" />
      <directionalLight position={[-8, 12, 6]} intensity={0.5} color="#FFD0E0" />
      <pointLight position={[0, 7, 0]} color={ROSE} intensity={40} distance={32} />
      <pointLight position={[-13, 3, -13]} color="#6A5CFF" intensity={30} distance={26} />

      <VoidBackdrop reduceMotion={reduceMotion} />

      {/* The island: a slab floating in nothing, tapering into the dark. */}
      <mesh position={[0, -0.7, 0]}>
        <boxGeometry args={[28, 1.4, 28]} />
        <meshStandardMaterial color="#14101A" roughness={0.55} metalness={0.25} />
        <Edges color={ROSE} />
      </mesh>
      <mesh position={[0, -5.9, 0]} rotation={[Math.PI, Math.PI / 4, 0]}>
        <coneGeometry args={[19.8, 9, 4]} />
        <meshStandardMaterial color="#0C0910" roughness={0.9} flatShading />
      </mesh>
      <gridHelper args={[28, 28, "#8E2A53", "#33172A"]} position={[0, 0.015, 0]} />

      {PORTALS.map((p) => (
        <PortalMarker
          key={p.key}
          position={p.position}
          label={p.label}
          shapeKey={p.shapeKey}
          active={activeSection === p.key}
          reduceMotion={reduceMotion}
        />
      ))}

      <Vehicle
        inputRef={inputRef}
        portals={PORTALS}
        paused={paused}
        onEnterPortal={onEnterPortal}
        resetSignal={resetSignal}
        reduceMotion={reduceMotion}
      />
    </>
  );
};

export default World;
