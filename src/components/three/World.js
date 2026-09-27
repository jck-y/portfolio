import React from "react";
import Vehicle from "./Vehicle";
import PortalMarker from "./PortalMarker";

export const PORTALS = [
  { key: "about", label: "About", shapeKey: "about", position: [-7, 0, -6] },
  { key: "resume", label: "Resume & Projects", shapeKey: "resume", position: [7, 0, -6] },
  { key: "education", label: "Education", shapeKey: "education", position: [-7, 0, 6] },
  { key: "contact", label: "Contact", shapeKey: "contact", position: [7, 0, 6] },
];

const World = ({ inputRef, paused, onEnterPortal, resetSignal, activeSection, reduceMotion }) => {
  return (
    <>
      <color attach="background" args={["#FFFFFF"]} />
      <fog attach="fog" args={["#FFFFFF", 16, 30]} />
      <ambientLight intensity={0.95} />
      <directionalLight position={[8, 10, 5]} intensity={0.5} />

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[34, 34]} />
        <meshStandardMaterial color="#F8F4F5" roughness={0.95} />
      </mesh>
      <gridHelper args={[34, 34, "#E3D5DA", "#EFE6E9"]} position={[0, 0.015, 0]} />

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
