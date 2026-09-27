import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import World from "./World";
import TouchControls from "./TouchControls";
import useDriveInput from "../../hooks/useDriveInput";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
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

const Scene3D = ({ activeSection, onEnterPortal, resetSignal }) => {
  const reduceMotion = useReducedMotion();
  const { inputRef, setTouchInput, releaseTouchInput } = useDriveInput();
  const [webglOK, setWebglOK] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setWebglOK(supportsWebGL());
    const mq = window.matchMedia(MOBILE_QUERY);
    const tq = window.matchMedia(TOUCH_QUERY);
    setIsMobile(mq.matches);
    setIsTouch(tq.matches);
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

  return (
    <div className="absolute inset-0">
      <Canvas3DErrorBoundary>
        <Canvas
          dpr={isMobile ? 1 : [1, 2]}
          gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
          camera={{ position: [0, 4.5, 14.7], fov: 55 }}
        >
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

      {isTouch && !paused && <TouchControls onMove={setTouchInput} onRelease={releaseTouchInput} />}
    </div>
  );
};

export default Scene3D;
