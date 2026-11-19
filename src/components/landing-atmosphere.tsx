"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";

const Threads = dynamic(
  () => import("@/components/react-bits/Threads/Threads"),
  { ssr: false },
);

const RippleGrid = dynamic(
  () => import("@/components/react-bits/RippleGrid/RippleGrid"),
  { ssr: false },
);

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Soft WebGL atmosphere behind a landing band. */
export function LandingAtmosphere({
  variant,
  children,
  className = "",
}: {
  variant: "threads" | "ripple";
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <section className={`landing-band ${className}`.trim()}>
      {!reduced ? (
        <div className="landing-band-fx" aria-hidden="true">
          {variant === "threads" ? (
            <Threads
              color="#0A6B4F"
              accentColor="#064634"
              amplitude={0.55}
              distance={0.25}
              enableMouseInteraction
              lineCount={28}
              thickness={1.1}
              softness={0.7}
              speed={0.35}
              waves={2.2}
              opacity={0.28}
              brightness={0.85}
              fade={0.45}
              className="h-full w-full"
            />
          ) : (
            <RippleGrid
              color="#0A6B4F"
              variant="dots"
              cellSize={28}
              lineWidth={1}
              glow={0.25}
              rippleStrength={0.35}
              rippleSpeed={0.9}
              rippleSize={1.1}
              autoRipple="center"
              rippleInterval={4.5}
              tilt={8}
              mouseInteraction
              clickRipple
              lightMode
              opacity={0.22}
              fade={0.55}
              className="h-full w-full"
            />
          )}
        </div>
      ) : null}
      <div className="landing-band-content">{children}</div>
    </section>
  );
}
