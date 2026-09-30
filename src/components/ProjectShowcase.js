import React, { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import GlassCard from "../GlassCard";

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M9 6l6 6-6 6" />
  </svg>
);

const ImageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 opacity-50">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="9" cy="10" r="1.5" />
    <path d="M5 18l5-5 3 3 4-4 2 2" />
  </svg>
);

/* Empty slot — tells the user exactly which file to drop in */
const Placeholder = ({ label }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink-400">
    <ImageIcon />
    <span className="font-mono text-[11px]">{label}</span>
  </div>
);

/* Phone frame for mobile apps */
const PhoneFrame = ({ src, label, alt }) => (
  <div className="w-full max-w-[230px] mx-auto rounded-[2.1rem] border border-ink-950/[0.12] bg-paper-200 p-1.5">
    <div className="relative rounded-[1.7rem] overflow-hidden aspect-[9/19] bg-paper-300">
      {src ? (
        <img src={src} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top" />
      ) : (
        <Placeholder label={label} />
      )}
      <span className="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3.5 rounded-full bg-ink-950/80" />
    </div>
  </div>
);

/* Browser frame for web apps */
const BrowserFrame = ({ src, label, alt }) => (
  <div className="w-full overflow-hidden rounded-xl border border-ink-950/[0.12] bg-paper-200">
    <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-paper-300 bg-paper-100">
      <span className="w-2.5 h-2.5 rounded-full bg-ink-950/[0.15]" />
      <span className="w-2.5 h-2.5 rounded-full bg-ink-950/[0.15]" />
      <span className="w-2.5 h-2.5 rounded-full bg-ink-950/[0.15]" />
      <span className="ml-2 flex-1 h-5 rounded-md bg-paper-50 border border-paper-300" />
    </div>
    <div className="relative aspect-[16/10] bg-paper-300">
      {src ? (
        <img src={src} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top" />
      ) : (
        <Placeholder label={label} />
      )}
    </div>
  </div>
);

/**
 * Single project card: info column + swipeable screenshot carousel.
 * Carousel uses native scroll-snap, so it swipes naturally on touch
 * and works with trackpads; arrows + dots cover desktop.
 */
const ProjectShowcase = ({ project }) => {
  const trackRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();
  const isMobile = project.device === "mobile";
  const slides = project.images.length ? project.images : [null, null, null];
  const total = slides.length;

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.min(total - 1, Math.max(0, Math.round(el.scrollLeft / el.clientWidth)));
    setCurrent(idx);
  };

  const scrollToSlide = (i) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const step = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <GlassCard className="p-6 md:p-8">
      <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10">
        {/* Project info */}
        <div className="lg:w-[38%] lg:flex-shrink-0 lg:pt-2">
          <h3 className="font-display text-xl md:text-2xl font-medium text-ink-950 mb-2">
            {project.name}
          </h3>
          <p className="text-sm text-ink-600 leading-relaxed mb-4">{project.desc}</p>
          <div className="inline-flex items-center gap-2 text-xs text-ink-500 border border-paper-300 rounded-full px-3 py-1">
            <span className={`w-1.5 h-1.5 rounded-full ${isMobile ? "bg-rose-500" : "bg-ink-400"}`} />
            {isMobile ? "Mobile" : "Web"}
          </div>
        </div>

        {/* Screenshot carousel */}
        <div className="flex-1 min-w-0 w-full">
          <div className="relative" role="region" aria-label={`Screenshots — ${project.name}`}>
            <div
              ref={trackRef}
              onScroll={handleScroll}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2"
            >
              {slides.map((src, i) => (
                <div
                  key={i}
                  className={`snap-start shrink-0 ${
                    isMobile ? "w-[66%] sm:w-[46%] lg:w-[40%]" : "w-[82%] sm:w-[56%] lg:w-[50%]"
                  }`}
                >
                  {isMobile ? (
                    <PhoneFrame src={src} label={`screenshot-0${i + 1}.png`} alt={`${project.name} — screenshot ${i + 1}`} />
                  ) : (
                    <BrowserFrame src={src} label={`screenshot-0${i + 1}.png`} alt={`${project.name} — screenshot ${i + 1}`} />
                  )}
                </div>
              ))}
            </div>

            {total > 1 && (
              <>
                <button
                  onClick={() => step(-1)}
                  disabled={current === 0}
                  aria-label="Previous screenshot"
                  className="absolute left-1 top-1/2 -translate-y-1/2 p-2 rounded-lg border border-ink-950/[0.12] bg-paper-50/95 text-ink-600 hover:text-ink-950 hover:border-ink-950/[0.25] transition-all disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={() => step(1)}
                  disabled={current === total - 1}
                  aria-label="Next screenshot"
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-lg border border-ink-950/[0.12] bg-paper-50/95 text-ink-600 hover:text-ink-950 hover:border-ink-950/[0.25] transition-all disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ChevronRight />
                </button>
              </>
            )}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToSlide(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  current === i ? "w-5 bg-rose-500" : "w-1.5 bg-ink-950/[0.15] hover:bg-ink-950/[0.3]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default ProjectShowcase;
