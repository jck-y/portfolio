import React, { useEffect, useRef } from "react";

/**
 * Dot-terrain background.
 *
 * Perf notes (why this differs from the first version):
 *  - The canvas is now VIEWPORT-sized. Before, it was sized to the whole
 *    document height (width x scrollHeight x dpr), which can be tens of
 *    millions of pixels and ~250k cells per frame. Because the element is
 *    position: fixed, only the top viewport-sized slice was ever visible.
 *  - Dots are batched by opacity bucket (a handful of fill() calls) instead
 *    of one fillStyle string + fillRect per dot.
 *  - Static work (base colour, radial glow) lives in CSS, not redrawn.
 *  - Frame rate is capped, and the loop stops when the tab is hidden,
 *    the 2D layer is inactive (3D mode), or reduced-motion is on.
 */

const CELL = 8;
const DOT_SIZE = 1.7;
const TARGET_FPS = 24;
const FRAME_MS = 1000 / TARGET_FPS;
const BUCKETS = 12;
const MAX_ALPHA = 0.2;

const BUCKET_STYLES = Array.from({ length: BUCKETS }, (_, i) => {
  const alpha = ((i + 0.5) / BUCKETS) * MAX_ALPHA;
  return `rgba(214,51,108,${alpha.toFixed(3)})`;
});
const BUCKET_SIZES = Array.from(
  { length: BUCKETS },
  (_, i) => DOT_SIZE + (i / (BUCKETS - 1)) * 0.4,
);

const DepthBackground2D = ({ active = true }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !active) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let raf = 0;
    let running = false;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let time = 0;
    let lastFrame = performance.now();
    let edge = new Float32Array(0); // static per-cell value, computed once
    let phase = new Float32Array(0); // static per-cell phase, computed once
    let colX = new Float32Array(0);

    const resize = () => {
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / CELL) + 2;
      rows = Math.ceil(height / CELL) + 2;

      edge = new Float32Array(cols * rows);
      phase = new Float32Array(cols * rows);
      colX = new Float32Array(cols);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          edge[i] = Math.sin(c * 0.51 + r * 0.37) * 0.5 + 0.5;
          phase[i] = c * 0.19 + r * 0.31;
        }
      }
      paint();
    };

    const paint = () => {
      ctx.clearRect(0, 0, width, height);

      const driftX = Math.sin(time * 0.00008) * 20;
      const driftY = Math.cos(time * 0.00006) * 14;

      // Per-column values that don't depend on the row.
      for (let c = 0; c < cols; c++) colX[c] = c * CELL + driftX;

      const paths = new Array(BUCKETS);
      for (let b = 0; b < BUCKETS; b++) paths[b] = new Path2D();

      for (let row = 0; row < rows; row++) {
        const y = row * CELL + driftY;
        const sinY = Math.sin(y * 0.006) * 2.4;
        const yB = y * 0.014;
        const threshold = 0.2 + Math.sin(row * 0.17 + time * 0.00018) * 0.035;
        const timeA = time * 0.00016;
        const timeB = time * 0.00012;
        const timeC = time * 0.00008;
        const timeW = time * 0.00013;
        const timePulse = time * 0.0011;

        for (let col = 0; col < cols; col++) {
          const x = colX[col];

          const a = Math.sin(x * 0.011 + sinY + timeA);
          const b = Math.cos(yB - Math.cos(x * 0.005) * 2.1 + timeB);
          const c = Math.sin((x + y) * 0.0045 + timeC);
          const d = Math.cos((x - y) * 0.0028);
          const wave = Math.sin(x * 0.003 + y * 0.008 + timeW) * 0.18;
          const value = a * 0.27 + b * 0.3 + c * 0.25 + d * 0.18 + wave;

          if (value < threshold) continue;

          const i = row * cols + col;
          const depth = Math.pow(
            Math.min(1, Math.max(0, (value - threshold) / 0.65)),
            0.72,
          );
          const opacity = 0.025 + depth * 0.13 + edge[i] * 0.018;
          const pulse = Math.sin(phase[i] + timePulse);
          const finalOpacity = Math.min(
            MAX_ALPHA,
            opacity + Math.max(0, pulse) * depth * 0.045,
          );

          const bucket = Math.min(
            BUCKETS - 1,
            Math.floor((finalOpacity / MAX_ALPHA) * BUCKETS),
          );
          const size = BUCKET_SIZES[bucket];
          paths[bucket].rect(x, y, size, size);
        }
      }

      for (let b = 0; b < BUCKETS; b++) {
        ctx.fillStyle = BUCKET_STYLES[b];
        ctx.fill(paths[b]);
      }
    };

    const loop = (now) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      const elapsed = now - lastFrame;
      if (elapsed < FRAME_MS) return;
      lastFrame = now;
      time += Math.min(elapsed, 100);
      paint();
    };

    const start = () => {
      if (running || reducedMotionQuery.matches || document.hidden) return;
      running = true;
      lastFrame = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    start();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [active]);

  return (
    <div ref={containerRef} className="two-d-depth-background" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="two-d-depth-vignette" />
    </div>
  );
};

export default DepthBackground2D;
