import React from "react";

/**
 * Section header eyebrow — mono, tracked-out, with a short accent rule.
 * Keeps the editorial label treatment consistent across every section.
 */
const SectionLabel = ({ children }) => {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="w-8 h-px bg-accent-400/70" />
      <span className="eyebrow">{children}</span>
    </div>
  );
};

export default SectionLabel;
