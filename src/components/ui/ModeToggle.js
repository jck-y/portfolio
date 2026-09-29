import React from "react";

const ModeToggle = ({ is3D, onChange }) => {
  return (
    <div
      className="mode-toggle"
      role="group"
      aria-label="Portfolio display mode"
    >
      <span className={!is3D ? "mode-label active" : "mode-label"}>2D</span>

      <button
        type="button"
        className={`mode-switch ${is3D ? "is-3d" : ""}`}
        onClick={() => onChange(!is3D)}
        aria-label={is3D ? "Switch to 2D mode" : "Switch to 3D mode"}
        aria-pressed={is3D}
      >
        <span className="mode-switch-track">
          <span className="mode-switch-thumb" />
        </span>
      </button>

      <span className={is3D ? "mode-label active" : "mode-label"}>3D</span>
    </div>
  );
};

export default ModeToggle;
