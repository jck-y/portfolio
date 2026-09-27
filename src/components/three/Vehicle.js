import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const MAX_SPEED = 6.5;
const ACCEL = 9;
const FRICTION = 5;
const TURN_RATE = 2.6;
const BOUND = 12.5;
const TRIGGER_RADIUS = 2.3;
const CAM_HEIGHT = 4.2;
const CAM_BACK = 6.2;

/**
 * Kinematic (not physics-engine) movement on purpose: acceleration,
 * turning and friction are plain numbers updated each frame. It's far
 * more predictable to tune correctly without playtesting than a rigid
 * body simulation, and plenty convincing for a small exploration space.
 */
const Vehicle = ({ inputRef, portals, paused, onEnterPortal, resetSignal, reduceMotion }) => {
  const group = useRef(null);
  const wheelRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const car = useRef({ x: 0, z: 8.5, heading: Math.PI, speed: 0 });
  const nearPortal = useRef(null);
  const distanceTraveled = useRef(0);
  const camReady = useRef(false);

  // When a content panel closes, back the car away from the portal it
  // just triggered so it doesn't immediately re-trigger on the next frame.
  useEffect(() => {
    if (resetSignal === 0) return;
    const c = car.current;
    c.x -= Math.sin(c.heading) * 3.2;
    c.z -= Math.cos(c.heading) * 3.2;
    c.x = Math.max(-BOUND, Math.min(BOUND, c.x));
    c.z = Math.max(-BOUND, Math.min(BOUND, c.z));
    c.speed = 0;
    nearPortal.current = null;
  }, [resetSignal]);

  useFrame((three, delta) => {
    const c = car.current;
    const input = inputRef.current;
    const dt = Math.min(delta, 0.05); // guard against huge jumps on tab refocus

    if (!paused) {
      const targetSpeed = input.forward * MAX_SPEED;
      if (input.forward !== 0) {
        c.speed += (targetSpeed - c.speed) * Math.min(1, ACCEL * dt);
      } else {
        c.speed -= c.speed * Math.min(1, FRICTION * dt);
      }
      if (Math.abs(c.speed) < 0.02) c.speed = 0;

      const speedFactor = Math.max(-1, Math.min(1, c.speed / MAX_SPEED));
      c.heading += input.turn * TURN_RATE * speedFactor * dt;

      c.x += Math.sin(c.heading) * c.speed * dt;
      c.z += Math.cos(c.heading) * c.speed * dt;
      c.x = Math.max(-BOUND, Math.min(BOUND, c.x));
      c.z = Math.max(-BOUND, Math.min(BOUND, c.z));

      distanceTraveled.current += Math.abs(c.speed) * dt;
    }

    if (group.current) {
      group.current.position.set(c.x, 0, c.z);
      group.current.rotation.y = c.heading;
    }
    wheelRefs.forEach((w) => {
      if (w.current) w.current.rotation.x = distanceTraveled.current * 1.6;
    });

    // Chase camera — snaps instantly under reduced motion instead of
    // smoothing, since a lerped trailing camera is itself a motion cue.
    const targetX = c.x - Math.sin(c.heading) * CAM_BACK;
    const targetZ = c.z - Math.cos(c.heading) * CAM_BACK;
    const alpha = reduceMotion || !camReady.current ? 1 : Math.min(1, 3.2 * dt);
    three.camera.position.x += (targetX - three.camera.position.x) * alpha;
    three.camera.position.y += (CAM_HEIGHT - three.camera.position.y) * alpha;
    three.camera.position.z += (targetZ - three.camera.position.z) * alpha;
    three.camera.lookAt(c.x, 0.7, c.z);
    camReady.current = true;

    // Proximity check — closest portal wins, fires once per approach.
    if (!paused && portals && portals.length) {
      let closest = null;
      let closestDist = Infinity;
      for (const p of portals) {
        const dx = p.position[0] - c.x;
        const dz = p.position[2] - c.z;
        const d = Math.sqrt(dx * dx + dz * dz);
        if (d < closestDist) {
          closestDist = d;
          closest = p;
        }
      }
      if (closest && closestDist < TRIGGER_RADIUS) {
        if (nearPortal.current !== closest.key) {
          nearPortal.current = closest.key;
          onEnterPortal(closest.key);
        }
      } else {
        nearPortal.current = null;
      }
    }
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[1.15, 0.45, 2.1]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.78, -0.15]}>
        <boxGeometry args={[0.85, 0.32, 1.05]} />
        <meshStandardMaterial color="#1A1620" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.5, 0.2]}>
        <boxGeometry args={[1.17, 0.08, 1.2]} />
        <meshStandardMaterial color="#D6336C" roughness={0.3} emissive="#D6336C" emissiveIntensity={0.15} />
      </mesh>
      {[
        [-0.62, 0.72],
        [0.62, 0.72],
        [-0.62, -0.72],
        [0.62, -0.72],
      ].map(([x, z], i) => (
        <mesh key={i} ref={wheelRefs[i]} position={[x, 0.22, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 0.18, 16]} />
          <meshStandardMaterial color="#2B2630" roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
};

export default Vehicle;
