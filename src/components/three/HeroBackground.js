import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import FloatingField from "./FloatingField";

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

/**
 * The site's original CSS background (dot grid + ambient glows), used
 * whenever the 3D layer can't run — WebGL unsupported, or a runtime
 * error in the canvas. The page should never ship with a blank backdrop.
 * This is the exact markup HomePages used before the 3D layer existed.
 */
const StaticFallback = () => (
  <>
    <div
      className="pointer-events-none fixed inset-0 z-0 bg-dots"
      style={{
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)",
      }}
    />
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(720px circle at 12% -5%, rgba(52,211,153,0.07), transparent 45%), radial-gradient(640px circle at 88% 12%, rgba(255,255,255,0.05), transparent 45%), radial-gradient(900px circle at 50% 110%, rgba(52,211,153,0.04), transparent 50%)",
      }}
    />
  </>
);

/**
 * Catches any runtime WebGL/Three.js error (e.g. lost context, driver
 * quirk) so it degrades to the flat background instead of taking the
 * whole page down.
 */
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
    console.warn("3D background disabled after a render error:", error);
  }
  render() {
    if (this.state.hasError) return <StaticFallback />;
    return this.props.children;
  }
}

const MOBILE_QUERY = "(max-width: 768px)"; // matches Tailwind's `md` breakpoint used across the site

/**
 * Fixed, full-viewport 3D background. Drop-in replacement for the old
 * dot-grid + radial-gradient background divs — same position in the
 * DOM (z-0, behind every section, pointer-events disabled), just
 * rendered as an interactive Three.js scene instead of flat CSS when
 * the device can handle it.
 */
const HeroBackground = () => {
  const reduceMotion = useReducedMotion();
  const [webglOK, setWebglOK] = useState(true);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.matchMedia(MOBILE_QUERY).matches : false
  );

  useEffect(() => {
    setWebglOK(supportsWebGL());
    const mq = window.matchMedia(MOBILE_QUERY);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!webglOK) return <StaticFallback />;

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas3DErrorBoundary>
        <Canvas
          dpr={isMobile ? 1 : [1, 2]}
          gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 7], fov: 50 }}
          frameloop={reduceMotion ? "demand" : "always"}
        >
          <Suspense fallback={null}>
            <FloatingField simplified={isMobile} animate={!reduceMotion} />
          </Suspense>
        </Canvas>
      </Canvas3DErrorBoundary>
    </div>
  );
};

export default HeroBackground;
