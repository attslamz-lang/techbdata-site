"use client";

import {
  type CSSProperties,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

type InteractiveSurfaceProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

type SurfaceFrame = {
  x: number;
  y: number;
  shiftX: number;
  shiftY: number;
};

export function InteractiveSurface({ className = "", children, ...props }: InteractiveSurfaceProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const pendingFrameRef = useRef<SurfaceFrame | null>(null);
  const reducedMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(media.matches);
    update();
    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  function commitFrame() {
    const surface = surfaceRef.current;
    const frame = pendingFrameRef.current;
    if (!surface || !frame) return;

    surface.style.setProperty("--surface-x", `${frame.x}px`);
    surface.style.setProperty("--surface-y", `${frame.y}px`);
    surface.style.setProperty("--surface-shift-x", `${frame.shiftX}px`);
    surface.style.setProperty("--surface-shift-y", `${frame.shiftY}px`);
    animationFrameRef.current = null;
  }

  function updateSurface(event: ReactPointerEvent<HTMLDivElement>) {
    if (!finePointer || reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    pendingFrameRef.current = {
      x,
      y,
      shiftX: ((x / bounds.width) - 0.5) * 5,
      shiftY: ((y / bounds.height) - 0.5) * 5,
    };

    if (animationFrameRef.current === null) {
      animationFrameRef.current = requestAnimationFrame(commitFrame);
    }
  }

  function resetSurface(event: ReactPointerEvent<HTMLDivElement>) {
    if (!finePointer || reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pendingFrameRef.current = {
      x: bounds.width / 2,
      y: bounds.height / 2,
      shiftX: 0,
      shiftY: 0,
    };

    if (animationFrameRef.current === null) {
      animationFrameRef.current = requestAnimationFrame(commitFrame);
    }
  }

  return (
    <div
      {...props}
      ref={surfaceRef}
      className={`interactive-surface ${className}`.trim()}
      onPointerMove={updateSurface}
      onPointerLeave={resetSurface}
    >
      {children}
    </div>
  );
}

type DataRailButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "header";
};

type EntryStyle = CSSProperties & {
  "--entry-x": string;
  "--entry-y": string;
};

export function DataRailButton({
  children,
  className = "",
  href,
  onClick,
  type = "button",
  variant = "primary",
}: DataRailButtonProps) {
  const reducedMotion = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 430, damping: 28, mass: 0.32 });
  const y = useSpring(targetY, { stiffness: 430, damping: 28, mass: 0.32 });
  const [entryStyle, setEntryStyle] = useState<EntryStyle>({ "--entry-x": "50%", "--entry-y": "50%" });
  const magnetic = variant !== "header";

  function handlePointerEnter(event: ReactPointerEvent<HTMLElement>) {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setEntryStyle({
      "--entry-x": `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
      "--entry-y": `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
    });
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (!magnetic || reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    targetX.set(Math.max(-5, Math.min(5, (event.clientX - bounds.left - bounds.width / 2) * 0.055)));
    targetY.set(Math.max(-4, Math.min(4, (event.clientY - bounds.top - bounds.height / 2) * 0.055)));
  }

  function handlePointerLeave() {
    targetX.set(0);
    targetY.set(0);
  }

  const classes = `${variant === "header" ? "" : "button "}data-rail data-rail-${variant} ${className}`.trim();
  const content = (
    <>
      <span className="data-rail-label">{children}</span>
      <span className="data-rail-output" aria-hidden="true"><i /></span>
    </>
  );
  const motionStyle = reducedMotion ? entryStyle : { ...entryStyle, x, y };
  const sharedProps = {
    className: classes,
    onPointerEnter: handlePointerEnter,
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
    style: motionStyle,
    whileTap: reducedMotion ? undefined : { scale: variant === "header" ? 0.99 : 0.985, y: 1 },
  };

  if (href) {
    return (
      <motion.a {...sharedProps} href={href}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button {...sharedProps} type={type} onClick={onClick}>
      {content}
    </motion.button>
  );
}
