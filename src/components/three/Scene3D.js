import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import World from "./World";
import TouchControls from "./TouchControls";
import useDriveInput from "../../hooks/useDriveInput";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return false;
    // Release the probe context right away so it doesn't count against the
    // browser's limit on live WebGL contexts.
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch (e) {
    return false;
  }
}

const StaticFallback = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-paper-100 px-6">
    <p className="font-display italic text-ink-950 text-lg text-center max-w-xs">
      Dunia 3D tidak didukung di perangkat ini — pakai menu di bawah untuk membuka tiap bagian.
    </p>
  </div>
);

class Canvas3DErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.warn("3D world disabled after a render error:", error);
  }
  render() {
    return this.state.hasError ? <StaticFallback /> : this.props.children;
  }
}

const MOBILE_QUERY = "(max-width: 768px)";
const TOUCH_QUERY = "(pointer: coarse)";

// Read synchronously so <Canvas> is created with the right `gl` options the
// first time. (`antialias` can't be changed after the context exists, and the
// old code initialised these to `false` and only corrected them in an effect.)
const matches = (q) => typeof window !== "undefined" && window.matchMedia(q).matches;

const DESKTOP_MAX_DPR = 1.5;

const Scene3D = ({ activeSection, onEnterPortal, resetSignal, active = true }) => {
  const reduceMotion = useReducedMotion();
  const { inputRef, setTouchInput, releaseTouchInput } = useDriveInput();
  const [webglOK] = useState(supportsWebGL);
  const [isMobile, setIsMobile] = useState(() => matches(MOBILE_QUERY));
  const [isTouch, setIsTouch] = useState(() => matches(TOUCH_QUERY));
  // Adaptive resolution: PerformanceMonitor drops this to 1 if FPS sags.
  const [maxDpr, setMaxDpr] = useState(isMobile ? 1 : DESKTOP_MAX_DPR);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const tq = window.matchMedia(TOUCH_QUERY);
    const onMq = (e) => setIsMobile(e.matches);
    const onTq = (e) => setIsTouch(e.matches);
    mq.addEventListener("change", onMq);
    tq.addEventListener("change", onTq);
    return () => {
      mq.removeEventListener("change", onMq);
      tq.removeEventListener("change", onTq);
    };
  }, []);

  if (!webglOK) return <StaticFallback />;

  const paused = !!activeSection;
  const ceiling = isMobile ? 1 : DESKTOP_MAX_DPR;
  const dprCap = Math.min(maxDpr, ceiling);

  // never  -> 3D mode isn't visible (2D is showing): render nothing at all.
  // demand -> a content panel is open on top: the world is frozen anyway.
  // always -> actually driving around.
  const frameloop = !active ? "never" : paused ? "demand" : "always";

  return (
    <div className="absolute inset-0">
      <Canvas3DErrorBoundary>
        <Canvas
          dpr={[1, dprCap]}
          frameloop={frameloop}
          gl={{
            antialias: !isMobile,
            stencil: false,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 4.5, 14.7], fov: 55 }}
        >
          <PerformanceMonitor
            flipflops={2}
            onDecline={() => setMaxDpr(1)}
            onFallback={() => setMaxDpr(1)}
            onIncline={() => setMaxDpr(ceiling)}
          />
          <Suspense fallback={null}>
            <World
              inputRef={inputRef}
              paused={paused}
              onEnterPortal={onEnterPortal}
              resetSignal={resetSignal}
              activeSection={activeSection}
              reduceMotion={reduceMotion}
            />
          </Suspense>
        </Canvas>
      </Canvas3DErrorBoundary>

      {isTouch && !paused && active && (
        <TouchControls onMove={setTouchInput} onRelease={releaseTouchInput} />
      )}
    </div>
  );
};

export default Scene3D;
