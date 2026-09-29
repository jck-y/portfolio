import React from "react";

const SectionShell2D = ({
  number,
  title,
  eyebrow,
  children,
  annotation,
  id,
}) => {
  return (
    <section id={id} className="two-d-section">
      <div className="two-d-section-inner">
        {annotation && (
          <aside className="two-d-annotation">
            <span></span>
            <p>{annotation}</p>
          </aside>
        )}

        <div className="two-d-section-main">
          <div className="two-d-section-heading">
            <span className="two-d-section-number">{number}</span>

            <div>
              <span className="two-d-eyebrow">{eyebrow}</span>

              <h2>{title}</h2>
            </div>
          </div>

          {children}
        </div>
      </div>
    </section>
  );
};

export default SectionShell2D;
