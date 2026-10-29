"use client";

import { useEffect, useId, useRef } from "react";

const DEFAULT_PATH = "M0 20 C 60 0, 100 40, 150 20 S 240 0, 300 20";

export function ThreadLine({
  animate = false,
  width = "100%",
  height = 40,
  viewBox = "0 0 300 40",
  d = DEFAULT_PATH,
}: {
  animate?: boolean;
  width?: string | number;
  height?: number;
  viewBox?: string;
  d?: string;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const gradientId = useId();

  useEffect(() => {
    const path = pathRef.current;
    if (!path || !animate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        path.style.transition = "stroke-dashoffset 1.2s ease-out";
        path.style.strokeDashoffset = "0";
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(path);
    return () => observer.disconnect();
  }, [animate]);

  return (
    <svg
      className="thread"
      width={width}
      height={height}
      viewBox={viewBox}
      aria-hidden="true"
      data-draw={gradientId}
    >
      <path ref={pathRef} d={d} />
    </svg>
  );
}
