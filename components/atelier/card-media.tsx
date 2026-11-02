"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";

export function CardMedia({
  image,
  alt,
  video,
  priority = false,
  children,
}: {
  image: string;
  alt: string;
  video?: string;
  priority?: boolean;
  children?: ReactNode;
}) {
  const clip = useRef<HTMLVideoElement>(null);

  function play() {
    const node = clip.current;
    if (!node) return;
    void node.play();
  }

  function pause() {
    const node = clip.current;
    if (!node) return;
    node.pause();
  }

  return (
    <div className="ph" onMouseEnter={play} onMouseLeave={pause}>
      <Image
        src={image}
        alt={alt}
        width={900}
        height={1200}
        sizes="(max-width: 600px) 46vw, 280px"
        priority={priority}
        unoptimized
        style={{ width: "100%", height: "100%", objectFit: "cover", position: "relative" }}
      />
      {video ? (
        <video
          ref={clip}
          className="card-video"
          src={video}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
      ) : null}
      {children}
    </div>
  );
}
