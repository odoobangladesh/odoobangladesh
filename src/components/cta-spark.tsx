"use client";

import type { ReactNode } from "react";
import ClickSpark from "@/components/react-bits/ClickSpark/ClickSpark";
import Magnet from "@/components/react-bits/Magnet/Magnet";

/**
 * Quiet Premium CTA micro-layer: soft brand sparks + restrained magnet pull.
 * Presentation only — does not change link/button behavior.
 */
export function CtaSpark({
  children,
  className = "",
  magnet = true,
}: {
  children: ReactNode;
  className?: string;
  magnet?: boolean;
}) {
  const spark = (
    <ClickSpark
      sparkColor={["var(--brand)", "var(--brand-tint)", "#ffffff"]}
      sparkSize={10}
      sparkRadius={22}
      sparkCount={6}
      sparkWidth={1.5}
      duration={420}
      easing="ease-out"
      shape="streak"
      glow={0.35}
      ring
      className={`${className || "inline-flex"} !h-auto !w-auto`.trim()}
      style={{ width: "auto", height: "auto" }}
    >
      {children}
    </ClickSpark>
  );

  if (!magnet) return spark;

  return (
    <Magnet
      padding={48}
      magnetStrength={3.2}
      maxOffset={8}
      tilt={2}
      scale={1.015}
      spring={{ stiffness: 220, damping: 18, mass: 0.9 }}
      wrapperClassName="inline-flex"
      innerClassName="inline-flex"
    >
      {spark}
    </Magnet>
  );
}
