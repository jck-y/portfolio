import React from "react";

/**
 * Flat panel — hairline border, no shadow kit, no hover-tilt, no
 * per-card scroll reveal. The 3D world is this page's one bold,
 * animated element; every panel around it stays quiet and still so it
 * doesn't compete for attention.
 *
 * Kept the `GlassCard` name and `tilt` prop so nothing importing it
 * elsewhere had to change — `tilt` is accepted but no longer does
 * anything, since that mouse-tracked spotlight effect is retired.
 */
const GlassCard = ({ children, className = "" }) => {
  return (
    <div className={`panel relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
