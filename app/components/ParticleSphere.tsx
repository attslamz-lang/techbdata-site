"use client";

import { useEffect, useRef } from "react";

type ParticleSphereProps = {
  className?: string;
};

type SpherePoint = {
  x: number;
  y: number;
  z: number;
  radius: number;
  size: number;
  intensity: number;
  tone: number;
  highlight: boolean;
};

const TAU = Math.PI * 2;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const FULL_TURN_MS = 62_000;
const TARGET_FRAME_MS = 1000 / 30;
const INTRO_FAST_MS = 820;
const INTRO_DECELERATION_MS = 1_580;
const DPR_CAP = 1.5;
const MAX_CANVAS_PIXELS = 1_050_000;
const ALPHA_LEVELS = [0.024, 0.046, 0.074, 0.112, 0.16, 0.225, 0.32, 0.46];
const PARTICLE_TONES = ["#355C91", "#416FAE", "#6674D9", "#776EF0", "#58B8CF", "#DCEBFF"];

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
    const radius = 0.97 + noise(index, 6) * 0.06;

    return {
      x: Math.cos(azimuth) * latitudeRadius * radius,
      y: y * radius,
      z: Math.sin(azimuth) * latitudeRadius * radius,
      radius,
      size: 0.46 + noise(index, 3) * 0.62,
      intensity: 0.82 + noise(index, 4) * 0.18,
      tone: toneSeed < 0.44 ? 0 : toneSeed < 0.7 ? 1 : toneSeed < 0.87 ? 2 : toneSeed < 0.93 ? 3 : toneSeed < 0.985 ? 4 : 5,
      highlight: noise(index, 5) > 0.992,
    };
  });
}

function particleCountForWidth(width: number, coarsePointer: boolean) {
  if (width < 440) return 1_800;
  if (coarsePointer || width < 620) return 2_400;
  return 3_600;
}

function alphaLevelFor(value: number) {
  if (value < 0.035) return 0;
  if (value < 0.06) return 1;
  if (value < 0.09) return 2;
  if (value < 0.13) return 3;
  if (value < 0.18) return 4;
  if (value < 0.25) return 5;
  if (value < 0.37) return 6;
  return 7;
}

function introSpeedMultiplier(elapsed: number) {
  if (elapsed < INTRO_FAST_MS) {
    return 16 - (elapsed / INTRO_FAST_MS) * 3;
  }

  const progress = Math.min(1, (elapsed - INTRO_FAST_MS) / INTRO_DECELERATION_MS);
  const endValue = Math.exp(-4.2);
  const normalizedDecay = (Math.exp(-4.2 * progress) - endValue) / (1 - endValue);
  return 1 + normalizedDecay * 12;
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
    let lastRenderTime = 0;
    let lastMotionTime = performance.now();
    let introElapsed = 0;
    let isNearViewport = true;
    let disposed = false;
    let haloGradient: CanvasGradient | null = null;
    let haloLeft = 0;
    let haloTop = 0;
    let haloSize = 0;

    const buckets = Array.from(
      { length: PARTICLE_TONES.length * ALPHA_LEVELS.length },
      () => [] as number[],
    );
    const highlights: number[] = [];
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");

    const draw = (angle: number, drift = 0) => {
      if (!cssWidth || !cssHeight) return;

      context.clearRect(0, 0, cssWidth, cssHeight);
      for (let index = 0; index < buckets.length; index += 1) {
        buckets[index].length = 0;
      }
      highlights.length = 0;

      const centerX = cssWidth * 0.5;
      const centerY = cssHeight * 0.5;
      const radius = Math.min(cssWidth, cssHeight) * 0.382;
      const cosY = Math.cos(angle);
      const sinY = Math.sin(angle);
      const tilt = -0.13 + drift;
      const cosX = Math.cos(tilt);
      const sinX = Math.sin(tilt);
      const cameraDistance = 3.7;
      const scaleFactor = Math.min(1.08, Math.max(0.82, cssWidth / 760));

      if (haloGradient) {
        context.fillStyle = haloGradient;
        context.fillRect(haloLeft, haloTop, haloSize, haloSize);
      }

      for (let pointIndex = 0; pointIndex < points.length; pointIndex += 1) {
        const point = points[pointIndex];
        const rotatedX = point.x * cosY + point.z * sinY;
        const rotatedZ = -point.x * sinY + point.z * cosY;
        const rotatedY = point.y * cosX - rotatedZ * sinX;
        const depthZ = point.y * sinX + rotatedZ * cosX;
        const normalizedX = rotatedX / point.radius;
        const normalizedY = rotatedY / point.radius;
        const normalizedZ = depthZ / point.radius;
        const depth = (normalizedZ + 1) * 0.5;
        const perspective = cameraDistance / (cameraDistance - depthZ);
        const screenX = centerX + rotatedX * radius * perspective;
        const screenY = centerY + rotatedY * radius * perspective;
        const directional = Math.max(
          0,
          normalizedX * 0.5 + normalizedY * -0.76 + normalizedZ * 0.42,
        );
        const diffuse = 0.15 + Math.pow(directional, 1.36) * 0.94;
        const depthVisibility = 0.56 + depth * 0.44;
        const backAttenuation = depth < 0.5 ? 0.34 + depth * 0.3 : 1;
        const frontBoost = depth > 0.5 ? 1 + ((depth - 0.5) / 0.5) * 0.34 : 1;
        const rim = Math.min(1, Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY));
        const rimAccent = 1 + Math.pow(rim, 4) * 0.006;
        const alpha = Math.min(
          0.48,
          (0.032 + diffuse * 0.43) * depthVisibility * backAttenuation * frontBoost * point.intensity * rimAccent,
        );
        const size = point.size * (0.78 + depth * 0.42) * scaleFactor * 1.12;
        const level = alphaLevelFor(alpha);
        const bucket = buckets[point.tone * ALPHA_LEVELS.length + level];

        bucket.push(screenX, screenY, size);

        if (point.highlight && depth > 0.56 && directional > 0.38) {
          highlights.push(screenX, screenY, size * (1.28 + depth * 0.18));
        }
      }

      context.save();
      context.globalCompositeOperation = "source-over";

      for (let toneIndex = 0; toneIndex < PARTICLE_TONES.length; toneIndex += 1) {
        for (let alphaIndex = 0; alphaIndex < ALPHA_LEVELS.length; alphaIndex += 1) {
          const bucket = buckets[toneIndex * ALPHA_LEVELS.length + alphaIndex];
          if (!bucket.length) continue;

          context.beginPath();
          context.fillStyle = PARTICLE_TONES[toneIndex];
          context.globalAlpha = ALPHA_LEVELS[alphaIndex];

          for (let index = 0; index < bucket.length; index += 3) {
            const x = bucket[index];
            const y = bucket[index + 1];
            const size = bucket[index + 2];
            context.moveTo(x + size, y);
            context.arc(x, y, size, 0, TAU);
          }

          context.fill();
        }
      }

      if (highlights.length) {
        context.globalCompositeOperation = "lighter";
        context.fillStyle = "#F2F7FF";
        context.globalAlpha = 0.105;
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

      const nextCssWidth = Math.round(bounds.width);
      const nextCssHeight = Math.round(bounds.height);
      const desiredDpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      const budgetDpr = Math.sqrt(MAX_CANVAS_PIXELS / Math.max(1, nextCssWidth * nextCssHeight));
      const dpr = Math.min(desiredDpr, Math.max(0.75, budgetDpr));
      const bitmapWidth = Math.max(1, Math.round(nextCssWidth * dpr));
      const bitmapHeight = Math.max(1, Math.round(nextCssHeight * dpr));
      const dimensionsChanged =
        nextCssWidth !== cssWidth ||
        nextCssHeight !== cssHeight ||
        canvas.width !== bitmapWidth ||
        canvas.height !== bitmapHeight;

      cssWidth = nextCssWidth;
      cssHeight = nextCssHeight;

      if (dimensionsChanged) {
        canvas.width = bitmapWidth;
        canvas.height = bitmapHeight;
        canvas.style.width = `${cssWidth}px`;
        canvas.style.height = `${cssHeight}px`;
        context.setTransform(dpr, 0, 0, dpr, 0, 0);

        const centerX = cssWidth * 0.5;
        const centerY = cssHeight * 0.5;
        const radius = Math.min(cssWidth, cssHeight) * 0.382;
        haloGradient = context.createRadialGradient(
          centerX,
          centerY,
          radius * 0.22,
          centerX,
          centerY,
          radius * 1.12,
        );
        haloGradient.addColorStop(0, "rgba(53, 92, 145, 0.026)");
        haloGradient.addColorStop(0.48, "rgba(102, 116, 217, 0.016)");
        haloGradient.addColorStop(0.86, "rgba(88, 184, 207, 0.005)");
        haloGradient.addColorStop(1, "rgba(4, 8, 22, 0)");
        haloLeft = centerX - radius * 1.18;
        haloTop = centerY - radius * 1.18;
        haloSize = radius * 2.36;
      }

      const nextPointCount = particleCountForWidth(cssWidth, coarsePointerQuery.matches);
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
      if (disposed || document.hidden || reducedMotionQuery.matches || !isNearViewport) {
        frameId = null;
        return;
      }

      const sinceLastRender = time - lastRenderTime;
      if (sinceLastRender >= TARGET_FRAME_MS) {
        const elapsed = Math.min(100, Math.max(0, time - lastMotionTime));
        lastMotionTime = time;
        lastRenderTime = time - (sinceLastRender % TARGET_FRAME_MS);
        const introDuration = INTRO_FAST_MS + INTRO_DECELERATION_MS;
        const speedMultiplier = introElapsed < introDuration
          ? introSpeedMultiplier(introElapsed)
          : 1;
        rotation = (rotation + (elapsed / FULL_TURN_MS) * TAU * speedMultiplier) % TAU;
        introElapsed = Math.min(introDuration, introElapsed + elapsed);
        const drift = Math.sin((time / 44_000) * TAU) * 0.012;
        draw(rotation, drift);
      }

      frameId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (
        frameId !== null ||
        document.hidden ||
        reducedMotionQuery.matches ||
        !isNearViewport
      ) return;

      const now = performance.now();
      lastMotionTime = now;
      lastRenderTime = now - TARGET_FRAME_MS;
      frameId = requestAnimationFrame(animate);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) stopAnimation();
      else startAnimation();
    };

    const handleMotionPreference = () => {
      if (reducedMotionQuery.matches) {
        stopAnimation();
        draw(rotation);
      } else {
        startAnimation();
      }
    };

    const handlePointerPreference = () => resize();
    const resizeObserver = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(resize);
    const intersectionObserver = typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(
        ([entry]) => {
          isNearViewport = entry.isIntersecting;
          if (isNearViewport) startAnimation();
          else stopAnimation();
        },
        { rootMargin: "200px 0px", threshold: 0 },
      );

    resizeObserver?.observe(root);
    intersectionObserver?.observe(root);
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener("change", handleMotionPreference);
    coarsePointerQuery.addEventListener("change", handlePointerPreference);
    resize();
    startAnimation();

    return () => {
      disposed = true;
      stopAnimation();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener("change", handleMotionPreference);
      coarsePointerQuery.removeEventListener("change", handlePointerPreference);
      context.clearRect(0, 0, cssWidth, cssHeight);
      haloGradient = null;
    };
  }, []);

  return (
    <div ref={rootRef} className={`particle-sphere ${className}`.trim()} aria-hidden="true">
      <canvas ref={canvasRef} className="particle-sphere-canvas" />
    </div>
  );
}
