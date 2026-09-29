import React, { useEffect, useRef } from "react";

const GLYPHS = ["·", ":", "0", "1", "3", "5", "8", "9", "X", "B", "#", "00"];

const AnimatedBanner2D = ({
  src = "/bg.webp",
  cellWidth = 7,
  cellHeight = 9,
  speed = 0.35,
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
    });

    if (!ctx) return;

    const image = new Image();
    image.src = src;

    let animationFrame;
    let destroyed = false;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let pixels = null;
    let elapsed = 0;
    let previous = performance.now();

    const sampleCanvas = document.createElement("canvas");
    const sampleCtx = sampleCanvas.getContext("2d", {
      willReadFrequently: true,
    });

    const resize = () => {
      width = container.clientWidth || 900;
      height = container.clientHeight || 260;

      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      cols = Math.ceil(width / cellWidth);
      rows = Math.ceil(height / cellHeight);

      sampleImage();
    };

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

      pixels = sampleCtx.getImageData(0, 0, cols, rows).data;
    };

    const render = (time) => {
      if (destroyed || !pixels) return;

      const delta = Math.min(time - previous, 50) / 1000;

      previous = time;
      elapsed += delta * speed;

      ctx.save();
      ctx.scale(dpr, dpr);

      ctx.clearRect(0, 0, width, height);

      ctx.font = '600 7px "IBM Plex Mono", monospace';

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const index = (row * cols + col) * 4;

          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];
          const a = pixels[index + 3];

          if (a < 20) continue;

          const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

          if (luminance < 65) continue;

          const normalized = Math.min(1, Math.max(0, (luminance - 65) / 190));

          const wave =
            Math.sin(col * 0.12 + elapsed * 1.7) * 1.4 +
            Math.cos(row * 0.25 - elapsed * 1.3) * 1.2;

          const maxIndex = Math.max(1, Math.floor(normalized * GLYPHS.length));

          const glyph =
            GLYPHS[
              Math.abs(Math.floor(col * 3 + row * 7 + wave + elapsed * 4)) %
                maxIndex
            ];

          /*
           * Identity palette:
           * white / black / pink.
           */
          const pinkStrength = Math.min(1, normalized * 1.4);

          const red = 110 + pinkStrength * 120;

          const green = 30 + pinkStrength * 80;

          const blue = 65 + pinkStrength * 100;

          const alpha = 0.15 + normalized * 0.7;

          ctx.fillStyle = `rgba(${red},${green},${blue},${alpha})`;

          ctx.fillText(
            glyph,
            col * cellWidth + cellWidth / 2,
            row * cellHeight + cellHeight / 2,
          );
        }
      }

      ctx.restore();

      animationFrame = requestAnimationFrame(render);
    };

    image.onload = () => {
      resize();
      animationFrame = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(container);

    return () => {
      destroyed = true;

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      resizeObserver.disconnect();
    };
  }, [src, cellWidth, cellHeight, speed]);

  return (
    <div ref={containerRef} className="two-d-banner">
      <img src={src} alt="" aria-hidden="true" className="two-d-banner-image" />

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
