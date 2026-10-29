import Image from "next/image";
import { cn } from "@/lib/cn";
import { HangTag } from "./hang-tag";
import { Pill } from "./pill";

const badgeCopy = {
  new: "New",
  sale: "Sale",
  sold: "Sold out",
  sample: "Sample",
} as const;

export function ProductCard({
  name,
  meta,
  price,
  compareAt,
  image,
  alt,
  href = "#",
  badge,
  forceHover = false,
  quickAdd = false,
  priority = false,
}: {
  name: string;
  meta: string;
  price: number;
  compareAt?: number;
  image: string;
  alt: string;
  href?: string;
  badge?: keyof typeof badgeCopy;
  forceHover?: boolean;
  quickAdd?: boolean;
  priority?: boolean;
}) {
  return (
    <a className={cn("card", forceHover && "hoverlift")} href={href}>
      <div className="ph">
        <Image
          src={image}
          alt={alt}
          width={900}
          height={1200}
          sizes="(max-width: 600px) 46vw, 280px"
          priority={priority}
          // These sample files are already WebP. Skipping the optimizer keeps the mockup pixels and full-page screenshots.
          unoptimized
          style={{ width: "100%", height: "100%", objectFit: "cover", position: "relative" }}
        />
        {badge ? <Pill tone={badge}>{badgeCopy[badge]}</Pill> : null}
        <span className="heart" aria-hidden="true">
          <svg className="ic" style={{ width: 17, height: 17 }} viewBox="0 0 24 24">
            <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
          </svg>
        </span>
        {quickAdd ? <span className="quick">Quick add · choose size</span> : null}
      </div>
      <div className="meta">
        <div>
          <h3>{name}</h3>
          <div className="mt">{meta}</div>
        </div>
        <HangTag amount={price} compareAt={compareAt} />
      </div>
    </a>
  );
}
