import React, { Suspense, useCallback, useState } from "react";

import Home2D from "./Home2D";
import ModeToggle from "../components/ui/ModeToggle";

import "../styles/global.css";

// Three.js + R3F + drei are large. Load the whole 3D mode only when the
// visitor actually asks for it, instead of at page load.
const loadHome3D = () => import("./Home3D");
const Home3D = React.lazy(loadHome3D);

const HomePages = () => {
  const [is3D, setIs3D] = useState(false);
  // Once 3D has been opened we keep it mounted (so the car position and open
  // panel survive toggling back), but it stops rendering while hidden.
  const [has3DOpened, setHas3DOpened] = useState(false);

  const handleModeChange = useCallback((next) => {
    if (next) setHas3DOpened(true);
    setIs3D(next);
  }, []);

  // Start downloading the 3D chunk as soon as the toggle is approached.
  const preload3D = useCallback(() => {
    loadHome3D();
  }, []);

  return (
    <div className={is3D ? "portfolio-root mode-3d" : "portfolio-root mode-2d"}>
      <header
        className={
          is3D ? "mode-header mode-header-3d" : "mode-header mode-header-2d"
        }
      >
        <a
          href="#home"
          className="mode-brand"
          aria-label="Jacky Karongkong Portfolio"
        >
          JK
        </a>

        <div
          onPointerEnter={preload3D}
          onFocus={preload3D}
          onTouchStart={preload3D}
        >
          <ModeToggle is3D={is3D} onChange={handleModeChange} />
        </div>
      </header>

      {/* 2D — stays mounted (keeps scroll position / DOM), but its canvas
          animations stop while 3D is showing. */}
      <div
        className={`portfolio-layer portfolio-layer-2d ${
          is3D ? "portfolio-layer-hidden" : ""
        }`}
        aria-hidden={is3D}
      >
        <Home2D active={!is3D} />
      </div>

      {/* 3D — not mounted at all until first opened; afterwards it is only
          hidden, and its render loop is switched off while hidden. */}
      {has3DOpened && (
        <div
          className={`portfolio-layer portfolio-layer-3d ${
            !is3D ? "portfolio-layer-hidden" : ""
          }`}
          aria-hidden={!is3D}
        >
          <Suspense fallback={null}>
            <Home3D active={is3D} />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default HomePages;
