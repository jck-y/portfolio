import React, { useState } from "react";

import Home2D from "./Home2D";
import Home3D from "./Home3D";
import ModeToggle from "../components/ui/ModeToggle";

import "../styles/global.css";

const HomePages = () => {
  const [is3D, setIs3D] = useState(false);

  return (
    <div className={is3D ? "portfolio-root mode-3d" : "portfolio-root mode-2d"}>
      {/* =====================================================
          MODE HEADER
          ===================================================== */}

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

        <ModeToggle is3D={is3D} onChange={setIs3D} />
      </header>

      {/* =====================================================
          2D
          ===================================================== */}

      <div
        className={`portfolio-layer portfolio-layer-2d ${
          is3D ? "portfolio-layer-hidden" : ""
        }`}
        aria-hidden={is3D}
      >
        <Home2D />
      </div>

      {/* =====================================================
          3D
          IMPORTANT:
          Home3D tetap mounted.
          Kita hanya hide/show.
          ===================================================== */}

      <div
        className={`portfolio-layer portfolio-layer-3d ${
          !is3D ? "portfolio-layer-hidden" : ""
        }`}
        aria-hidden={!is3D}
      >
        <Home3D />
      </div>
    </div>
  );
};

export default HomePages;
