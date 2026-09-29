import React, { useEffect, useRef } from "react";

const DepthBackground2D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrame;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;
    let lastTime = performance.now();

    const CELL = 8;
    const DOT_SIZE = 1.7;

    const resize = () => {
      width = window.innerWidth;
      height = Math.max(
        document.documentElement.scrollHeight,
        window.innerHeight,
      );

      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /*
     * Generates large organic "terrain"
     * regions.
     */
    const noise = (x, y, t) => {
      const a = Math.sin(x * 0.011 + Math.sin(y * 0.006) * 2.4 + t * 0.00016);

      const b = Math.cos(y * 0.014 - Math.cos(x * 0.005) * 2.1 + t * 0.00012);

      const c = Math.sin((x + y) * 0.0045 + t * 0.00008);

      const d = Math.cos((x - y) * 0.0028);

      return a * 0.27 + b * 0.3 + c * 0.25 + d * 0.18;
    };

    /*
     * Several larger "islands" create
     * the depth seen in the reference.
     */
    const terrain = (x, y, t) => {
      const n = noise(x, y, t);

      const wave = Math.sin(x * 0.003 + y * 0.008 + t * 0.00013) * 0.18;

      return n + wave;
    };

    const draw = (now) => {
      const delta = Math.min(now - lastTime, 50);

      lastTime = now;
      time += delta;

      ctx.clearRect(0, 0, width, height);

      /*
       * Base.
       *
       * Keep this slightly warm rather than
       * pure #fff so the pink particles remain
       * visible without becoming aggressive.
       */
      ctx.fillStyle = "#fffdfb";

      ctx.fillRect(0, 0, width, height);

      const cols = Math.ceil(width / CELL) + 2;

      const rows = Math.ceil(height / CELL) + 2;

      /*
       * Slow global movement.
       */
      const driftX = Math.sin(time * 0.00008) * 20;

      const driftY = Math.cos(time * 0.00006) * 14;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * CELL + driftX;

          const y = row * CELL + driftY;

          const value = terrain(x, y, time);

          /*
           * Convert noise into a threshold.
           *
           * This creates clusters instead of
           * uniformly distributed dots.
           */
          const threshold = 0.2 + Math.sin(row * 0.17 + time * 0.00018) * 0.035;

          if (value < threshold) {
            continue;
          }

          /*
           * Depth calculation.
           *
           * Higher terrain = stronger pink.
           */
          const depth = Math.pow(
            Math.min(1, Math.max(0, (value - threshold) / 0.65)),
            0.72,
          );

          /*
           * Edge fading makes clusters dissolve
           * naturally instead of ending abruptly.
           */
          const edgeNoise = Math.sin(col * 0.51 + row * 0.37) * 0.5 + 0.5;

          const opacity = 0.025 + depth * 0.13 + edgeNoise * 0.018;

          /*
           * Occasional brighter cells.
           */
          const pulse = Math.sin(col * 0.19 + row * 0.31 + time * 0.0011);

          const finalOpacity = Math.min(
            0.2,
            opacity + Math.max(0, pulse) * depth * 0.045,
          );

          /*
           * Pink palette.
           *
           * Same family as your existing
           * rose/pink theme.
           */
          ctx.fillStyle = `rgba(
              214,
              51,
              108,
              ${finalOpacity}
            )`;

          const size = DOT_SIZE + depth * 0.45;

          ctx.fillRect(x, y, size, size);
        }
      }

      /*
       * Very subtle moving highlight field.
       * This produces the "depth" sensation.
       */
      const gradient = ctx.createRadialGradient(
        width * 0.52,
        height * 0.38,
        0,
        width * 0.52,
        height * 0.38,
        Math.max(width, height) * 0.65,
      );

      gradient.addColorStop(0, "rgba(214,51,108,0.035)");

      gradient.addColorStop(0.45, "rgba(214,51,108,0.012)");

      gradient.addColorStop(1, "rgba(255,255,255,0)");

      ctx.fillStyle = gradient;

      ctx.fillRect(0, 0, width, height);

      animationFrame = requestAnimationFrame(draw);
    };

    resize();

    window.addEventListener("resize", resize);

    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="two-d-depth-background" aria-hidden="true">
      <canvas ref={canvasRef} />

      <div className="two-d-depth-vignette" />
    </div>
  );
};

export default DepthBackground2D;
