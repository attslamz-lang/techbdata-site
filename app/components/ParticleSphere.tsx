"use client";

import { useEffect, useRef } from "react";

type ParticleSphereProps = {
  className?: string;
};

type SpherePoint = {
  x: number;
  y: number;
  z: number;
  size: number;
  intensity: number;
  tone: number;
  highlight: boolean;
};

const TAU = Math.PI * 2;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const FULL_TURN_MS = 52_000;
const ALPHA_LEVELS = [0.035, 0.055, 0.08, 0.115, 0.16, 0.225, 0.31, 0.43];
const PARTICLE_TONES = ["#4C8DFF", "#4C8DFF", "#6EDBFF", "#F7FAFF"];

function noise(index: number, offset = 0) {
  const value = Math.sin((index + 1) * 12.9898 + offset * 78.233) * 43_758.5453;
  return value - Math.floor(value);
}

function createSpherePoints(count: number): SpherePoint[] {
  return Array.from({ length: count }, (_, index) => {
    const y = 1 - ((index + 0.5) / count) * 2;
    const latitudeRadius = Math.sqrt(Math.max(0, 1 - y * y));
    const azimuth = index * GOLDEN_ANGLE + (noise(index, 1) - 0.5) * 0.016;
    const toneSeed = noise(index, 2);

    return {
      x: Math.cos(azimuth) * latitudeRadius,
      y,
      z: Math.sin(azimuth) * latitudeRadius,
      size: 0.46 + noise(index, 3) * 0.78,
      intensity: 0.72 + noise(index, 4) * 0.46,
      tone: toneSeed > 0.94 ? 3 : toneSeed > 0.76 ? 2 : toneSeed > 0.38 ? 1 : 0,
      highlight: noise(index, 5) > 0.965,
    };
  });
}

function particleCountForWidth(width: number) {
  if (width < 540) return 2_200;
  if (width < 900) return 3_600;
  return 5_200;
}

function alphaLevelFor(value: number) {
  if (value < 0.045) return 0;
  if (value < 0.068) return 1;
  if (value < 0.098) return 2;
  if (value < 0.138) return 3;
  if (value < 0.192) return 4;
  if (value < 0.265) return 5;
  if (value < 0.37) return 6;
  return 7;
}

export function ParticleSphere({ className = "" }: ParticleSphereProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });

    if (!root || !canvas || !context) return;

    let cssWidth = 0;
    let cssHeight = 0;
    let points: SpherePoint[] = [];
    let pointCount = 0;
    let rotation = 0.42;
    let frameId: number | null = null;
    let lastFrameTime = performance.now();
    let disposed = false;

    const buckets = Array.from({ length: PARTICLE_TONES.length * ALPHA_LEVELS.length }, () => [] as number[]);
    const highlights: number[] = [];
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const draw = (angle: number, drift = 0) => {
      if (!cssWidth || !cssHeight) return;

      context.clearRect(0, 0, cssWidth, cssHeight);
      buckets.forEach((bucket) => {
        bucket.length = 0;
      });
      highlights.length = 0;

      const centerX = cssWidth * 0.5;
      const centerY = cssHeight * 0.5;
      const radius = Math.min(cssWidth, cssHeight) * 0.382;
      const cosY = Math.cos(angle);
      const sinY = Math.sin(angle);
      const tilt = -0.13 + drift;
      const cosX = Math.cos(tilt);
      const sinX = Math.sin(tilt);
      const cameraDistance = 3.45;
      const scaleFactor = Math.min(1.12, Math.max(0.82, cssWidth / 760));

      const halo = context.createRadialGradient(centerX, centerY, radius * 0.16, centerX, centerY, radius * 1.14);
      halo.addColorStop(0, "rgba(4, 8, 22, 0)");
      halo.addColorStop(0.58, "rgba(22, 59, 120, 0.018)");
      halo.addColorStop(0.86, "rgba(76, 141, 255, 0.038)");
      halo.addColorStop(1, "rgba(4, 8, 22, 0)");
      context.fillStyle = halo;
      context.fillRect(centerX - radius * 1.2, centerY - radius * 1.2, radius * 2.4, radius * 2.4);

      for (const point of points) {
        const rotatedX = point.x * cosY + point.z * sinY;
        const rotatedZ = -point.x * sinY + point.z * cosY;
        const rotatedY = point.y * cosX - rotatedZ * sinX;
        const depthZ = point.y * sinX + rotatedZ * cosX;
        const depth = (depthZ + 1) * 0.5;
        const perspective = cameraDistance / (cameraDistance - depthZ);
        const screenX = centerX + rotatedX * radius * perspective;
        const screenY = centerY + rotatedY * radius * perspective;
        const rim = Math.min(1, Math.sqrt(rotatedX * rotatedX + rotatedY * rotatedY));
        const rimLight = 0.27 + Math.pow(rim, 0.72) * 0.73;
        const depthLight = 0.07 + Math.pow(depth, 1.22) * 0.53;
        const backAttenuation = depth < 0.5 ? 0.58 + depth * 0.42 : 1;
        const alpha = Math.min(0.48, depthLight * rimLight * point.intensity * backAttenuation);
        const size = point.size * (0.68 + depth * 0.72) * scaleFactor;
        const level = alphaLevelFor(alpha);
        const bucket = buckets[point.tone * ALPHA_LEVELS.length + level];

        bucket.push(screenX, screenY, size);

        if (point.highlight && depth > 0.42) {
          highlights.push(screenX, screenY, size * (2.05 + depth * 0.55));
        }
      }

      context.save();
      context.globalCompositeOperation = "source-over";

      PARTICLE_TONES.forEach((tone, toneIndex) => {
        ALPHA_LEVELS.forEach((alpha, alphaIndex) => {
          const bucket = buckets[toneIndex * ALPHA_LEVELS.length + alphaIndex];
          if (!bucket.length) return;

          context.beginPath();
          context.fillStyle = tone;
          context.globalAlpha = alpha;

          for (let index = 0; index < bucket.length; index += 3) {
            const x = bucket[index];
            const y = bucket[index + 1];
            const size = bucket[index + 2];
            context.moveTo(x + size, y);
            context.arc(x, y, size, 0, TAU);
          }

          context.fill();
        });
      });

      if (highlights.length) {
        context.globalCompositeOperation = "lighter";
        context.fillStyle = "#6EDBFF";
        context.globalAlpha = 0.075;
        context.beginPath();

        for (let index = 0; index < highlights.length; index += 3) {
          const x = highlights[index];
          const y = highlights[index + 1];
          const size = highlights[index + 2];
          context.moveTo(x + size, y);
          context.arc(x, y, size, 0, TAU);
        }

        context.fill();
      }

      context.restore();
    };

    const resize = () => {
      const bounds = root.getBoundingClientRect();
      if (bounds.width < 2 || bounds.height < 2) return;

      cssWidth = Math.round(bounds.width);
      cssHeight = Math.round(bounds.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const nextPointCount = particleCountForWidth(cssWidth);
      if (nextPointCount !== pointCount) {
        pointCount = nextPointCount;
        points = createSpherePoints(pointCount);
      }

      draw(rotation);
    };

    const stopAnimation = () => {
      if (frameId === null) return;
      cancelAnimationFrame(frameId);
      frameId = null;
    };

    const animate = (time: number) => {
      if (disposed || document.hidden || reducedMotionQuery.matches) {
        frameId = null;
        return;
      }

      const elapsed = Math.min(48, Math.max(0, time - lastFrameTime));
      lastFrameTime = time;
      rotation = (rotation + (elapsed / FULL_TURN_MS) * TAU) % TAU;
      const drift = Math.sin((time / 38_000) * TAU) * 0.018;
      draw(rotation, drift);
      frameId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (frameId !== null || document.hidden || reducedMotionQuery.matches) return;
      lastFrameTime = performance.now();
      frameId = requestAnimationFrame(animate);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    const handleMotionPreference = () => {
      if (reducedMotionQuery.matches) {
        stopAnimation();
        draw(rotation);
      } else {
        startAnimation();
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener("change", handleMotionPreference);
    resize();
    startAnimation();

    return () => {
      disposed = true;
      stopAnimation();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener("change", handleMotionPreference);
      context.clearRect(0, 0, cssWidth, cssHeight);
    };
  }, []);

  return (
    <div ref={rootRef} className={`particle-sphere ${className}`.trim()} aria-hidden="true">
      <canvas ref={canvasRef} className="particle-sphere-canvas" />
    </div>
  );
}
