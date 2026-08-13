import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Signature UI element: a refined panel card with a mouse-tracked
 * spotlight and a whisper-subtle 3D tilt on hover.
 * Used as the base building block for every section on the page.
 * Pass `tilt={false}` for cards with interactive content (carousels, forms).
 */
const GlassCard = ({ children, className = "", tilt = true }) => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = (y / rect.height - 0.5) * -2;
    const ry = (x / rect.width - 0.5) * 2;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <motion.div
      ref={ref}
      {...(tilt
        ? { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave }
        : {})}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`panel group relative overflow-hidden rounded-panel ${className}`}
    >
      {tilt && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(52,211,153,0.07), transparent 60%)",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlassCard;
