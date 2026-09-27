import React from "react";

/**
 * Names the section. Sentence case, no letter-spacing/uppercase
 * treatment, no decorative rule — just a small serif identifier in the
 * accent color.
 */
const SectionLabel = ({ children }) => {
  return <div className="section-label mb-5">{children}</div>;
};

export default SectionLabel;
