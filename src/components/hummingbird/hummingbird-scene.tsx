"use client";

import Image from "next/image";
import { forwardRef } from "react";

export const HummingbirdScene = forwardRef<HTMLDivElement, { className?: string }>(
  function HummingbirdScene({ className = "" }, ref) {
    return (
      <div ref={ref} className={`hummingbird-navigator ${className}`} data-hummingbird-scene aria-hidden="true">
        <div className="bird-aura" />
        <Image src="/images/hummingbird-premium.png" alt="" width={1536} height={1024} priority sizes="(max-width: 600px) 330px, (max-width: 1023px) 53vw, 39vw" className="hummingbird-image" />
        <span className="bird-telemetry">FLIGHT / 01</span>
      </div>
    );
  },
);
