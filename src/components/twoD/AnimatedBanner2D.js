import React, { useEffect, useRef } from "react";

const GLYPHS = ["·", ":", "0", "1", "3", "5", "8", "9", "X", "B", "#", "00"];
const TARGET_FPS = 18;
const FRAME_MS = 1000 / TARGET_FPS;
const STYLE_LEVELS = 16;

// Colour only depends on the (static) source image, so build the palette once.
const STYLES = Array.from({ length: STYLE_LEVELS }, (_, i) => {
  const normalized = (i + 0.5) / STYLE_LEVELS;
  const pink = Math.min(1, normalized * 1.4);
  const r = Math.round(110 + pink * 120);
  const g = Math.round(30 + pink * 80);
  const b = Math.round(65 + pink * 100);
  const a = (0.15 + normalized * 0.7).toFixed(2);
  return `rgba(${r},${g},${b},${a})`;
});

/**
 * Perf notes:
 *  - Per-cell colour/visibility is computed once when the image is sampled,
 *    not every frame; cells are grouped by colour so fillStyle changes
 *    ~16 times per frame instead of once per glyph.
 *  - Frame rate is capped and the loop only runs while the banner is
 *    on-screen, the tab is visible, and the 2D layer is active.
 *  - Cells are coarser on small screens.
 */
const AnimatedBanner2D = ({
  src = "/bg.webp",
  cellWidth = 7,
  cellHeight = 9,
  speed = 0.35,
  active = true,
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !active) return undefined;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const image = new Image();
    image.decoding = "async";
    image.src = src;

    let raf = 0;
    let running = false;
    let destroyed = false;
    let inView = true;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let cw = cellWidth;
    let ch = cellHeight;
    let elapsed = 0;
    let lastFrame = performance.now();

    // Static, per-cell data built in sampleImage()
    let groups = []; // groups[level] = Int32Array of cell indices
    let cellMaxIndex = new Uint8Array(0);
    let hasData = false;

    const sampleCanvas = document.createElement("canvas");
    const sampleCtx = sampleCanvas.getContext("2d", {
      willReadFrequently: true,
    });

    const sampleImage = () => {
      if (!sampleCtx || !image.naturalWidth) return;

      sampleCanvas.width = cols;
      sampleCanvas.height = rows;

      const imageRatio = image.naturalWidth / image.naturalHeight;
      const canvasRatio = width / height;

      let drawWidth = cols;
      let drawHeight = rows;
      let drawX = 0;
      let drawY = 0;

      if (imageRatio > canvasRatio) {
        drawWidth = rows * imageRatio;
        drawX = -(drawWidth - cols) / 2;
      } else {
        drawHeight = cols / imageRatio;
        drawY = -(drawHeight - rows) * 0.4;
      }

      sampleCtx.clearRect(0, 0, cols, rows);
      sampleCtx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
      const pixels = sampleCtx.getImageData(0, 0, cols, rows).data;

      const buckets = Array.from({ length: STYLE_LEVELS }, () => []);
      cellMaxIndex = new Uint8Array(cols * rows);

      for (let i = 0; i < cols * rows; i++) {
        const p = i * 4;
        if (pixels[p + 3] < 20) continue;
        const luminance =
          0.299 * pixels[p] + 0.587 * pixels[p + 1] + 0.114 * pixels[p + 2];
        if (luminance < 65) continue;

        const normalized = Math.min(1, Math.max(0, (luminance - 65) / 190));
        const level = Math.min(
          STYLE_LEVELS - 1,
          Math.floor(normalized * STYLE_LEVELS),
        );
        cellMaxIndex[i] = Math.max(1, Math.floor(normalized * GLYPHS.length));
        buckets[level].push(i);
      }

      groups = buckets.map((list) => Int32Array.from(list));
      hasData = true;
    };

    const render = () => {
      if (!hasData) return;

      ctx.clearRect(0, 0, width, height);

      for (let level = 0; level < STYLE_LEVELS; level++) {
        const list = groups[level];
        if (!list.length) continue;
        ctx.fillStyle = STYLES[level];

        for (let n = 0; n < list.length; n++) {
          const i = list[n];
          const row = (i / cols) | 0;
          const col = i - row * cols;

          const wave =
            Math.sin(col * 0.12 + elapsed * 1.7) * 1.4 +
            Math.cos(row * 0.25 - elapsed * 1.3) * 1.2;
          const g =
            Math.abs(Math.floor(col * 3 + row * 7 + wave + elapsed * 4)) %
            cellMaxIndex[i];

          ctx.fillText(GLYPHS[g], col * cw + cw / 2, row * ch + ch / 2);
        }
      }
    };

    const shouldRun = () =>
      inView && !document.hidden && !reducedMotionQuery.matches;

    const loop = (now) => {
      if (!running) return;
      if (!shouldRun()) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
      const delta = now - lastFrame;
      if (delta < FRAME_MS) return;
      lastFrame = now;
      elapsed += (Math.min(delta, 100) / 1000) * speed;
      render();
    };

    const kick = () => {
      if (running || destroyed || !hasData || !shouldRun()) return;
      running = true;
      lastFrame = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const resize = () => {
      width = container.clientWidth || 900;
      height = container.clientHeight || 260;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const coarse = width < 640 ? 1.35 : 1;
      cw = cellWidth * coarse;
      ch = cellHeight * coarse;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      // Resizing a canvas resets its state, so (re)apply it here once
      // rather than on every frame.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = '600 7px "IBM Plex Mono", monospace';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      cols = Math.ceil(width / cw);
      rows = Math.ceil(height / ch);

      sampleImage();
      render(); // always paint at least one (static) frame
      kick();
    };

    image.onload = () => {
      if (!destroyed) resize();
    };

    const resizeObserver = new ResizeObserver(() => {
      if (image.complete) resize();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) kick();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);

    const onVisibility = () => {
      if (!document.hidden) kick();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      destroyed = true;
      running = false;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [src, cellWidth, cellHeight, speed, active]);

  return (
    <div ref={containerRef} className="two-d-banner">
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="two-d-banner-image"
        decoding="async"
      />

      <canvas
        ref={canvasRef}
        className="two-d-banner-canvas"
        aria-hidden="true"
      />

      <div className="two-d-banner-scanlines" aria-hidden="true" />

      <div className="two-d-banner-noise" aria-hidden="true" />
    </div>
  );
};

export default AnimatedBanner2D;
