import React, { useRef } from "react";
import { motion } from "framer-motion";

/**
 * Signature UI element: a glass bento card with a mouse-tracked
 * radial spotlight and a subtle 3D tilt on hover.
 * Used as the base building block for every section on the page.
 */
const GlassCard = ({ children, className = "", span = "" }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = (y / rect.height - 0.5) * -4;
    const ry = (x / rect.width - 0.5) * 4;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "none";
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`glass-card relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.03] transition-colors duration-300 hover:border-white/[0.16] hover:bg-white/[0.05] ${span} ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [.glass-card:hover_&]:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(108,108,244,0.16), transparent 60%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlassCard;
