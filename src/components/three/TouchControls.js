import React, { useCallback, useRef, useState } from "react";

const BASE_RADIUS = 46;

/**
 * A single-thumb drag pad: distance from center maps to forward speed,
 * horizontal offset maps to steering. Deliberately simple (no physics,
 * no acceleration curve of its own) so it's reliable without on-device
 * testing.
 */
const TouchControls = ({ onMove, onRelease }) => {
  const baseRef = useRef(null);
  const activeTouch = useRef(null);
  const [knob, setKnob] = useState({ x: 0, y: 0 });

  const updateFromClient = useCallback(
    (clientX, clientY) => {
      const base = baseRef.current;
      if (!base) return;
      const rect = base.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let dx = clientX - cx;
      let dy = clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > BASE_RADIUS) {
        dx = (dx / dist) * BASE_RADIUS;
        dy = (dy / dist) * BASE_RADIUS;
      }
      setKnob({ x: dx, y: dy });
      onMove(-(dy / BASE_RADIUS), -(dx / BASE_RADIUS));
    },
    [onMove]
  );

  const handleTouchStart = (e) => {
    const t = e.touches[0];
    activeTouch.current = t.identifier;
    updateFromClient(t.clientX, t.clientY);
  };

  const handleTouchMove = (e) => {
    if (activeTouch.current === null) return;
    const touch = Array.from(e.touches).find((t) => t.identifier === activeTouch.current);
    if (touch) updateFromClient(touch.clientX, touch.clientY);
  };

  const handleEnd = () => {
    activeTouch.current = null;
    setKnob({ x: 0, y: 0 });
    onRelease();
  };

  return (
    <div
      ref={baseRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
      className="absolute bottom-8 left-8 w-24 h-24 rounded-full bg-ink-950/[0.06] border border-ink-950/[0.14] select-none"
      style={{ touchAction: "none", WebkitTapHighlightColor: "transparent" }}
    >
      <div
        className="absolute w-11 h-11 rounded-full bg-paper-50 border border-ink-950/[0.2]"
        style={{
          left: "50%",
          top: "50%",
          transform: `translate(calc(-50% + ${knob.x}px), calc(-50% + ${knob.y}px))`,
          boxShadow: "0 4px 10px rgba(26,22,32,0.15)",
        }}
      />
    </div>
  );
};

export default TouchControls;
