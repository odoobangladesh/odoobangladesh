"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import CountUp from "@/components/react-bits/CountUp/CountUp";
import { readLastGuide, type LastGuide } from "@/lib/last-guide";

const Orb = dynamic(() => import("@/components/react-bits/Orb/Orb"), {
  ssr: false,
});

const ORBIT_NODES = [
  { id: "learn", label: "Learn", href: "/learning-center", angle: 0 },
  { id: "compare", label: "Compare", href: "/comparisons", angle: 90 },
  { id: "plan", label: "Plan", href: "/implementation-guide", angle: 180 },
  { id: "ask", label: "Ask", href: "/contact", angle: 270 },
] as const;

const STAGES = [
  {
    id: "exploring",
    label: "Exploring",
    href: "/learning-center",
  },
  {
    id: "shortlisting",
    label: "Shortlisting",
    href: "/comparisons",
  },
  {
    id: "ready",
    label: "Ready to implement",
    href: "/resources/erp-checklist",
  },
] as const;

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

/**
 * Decision hub: orbit links + concrete center metric.
 * Outer ring + labels spin around the core; text stays upright.
 */
export function DecisionOrb({
  guideCount,
  metricHref = "/modules",
  metricLabel = "guides",
}: {
  guideCount: number;
  metricHref?: string;
  metricLabel?: string;
}) {
  const reduced = useReducedMotion();
  const [lastGuide, setLastGuide] = useState<LastGuide | null>(null);
  const [stage, setStage] = useState<(typeof STAGES)[number]["id"]>("exploring");

  useEffect(() => {
    setLastGuide(readLastGuide());
  }, []);

  return (
    <div className="landing-hero-stage">
      <div
        className="decision-hub"
        role="navigation"
        aria-label="Choose your next step"
      >
        {!reduced ? (
          <div className="decision-hub-glow" aria-hidden="true">
            <Orb
              colors={["#0A6B4F", "#064634", "#DDF1E8"]}
              hue={152}
              backgroundColor="transparent"
              size={1}
              glow={0.28}
              bleed={0.1}
              wobble={0.18}
              highlight={0.4}
              trail={0.08}
              speed={0.32}
              hoverIntensity={0.12}
              rotateOnHover={false}
              followCursor={false}
              clickPulse={false}
              intro
              opacity={0.45}
              className="h-full w-full"
            />
          </div>
        ) : null}

        <div
          className="decision-hub-orbit"
          data-spin={reduced ? "false" : "true"}
        >
          <div className="decision-hub-ring decision-hub-ring-outer" aria-hidden="true" />
          <div className="decision-hub-ring decision-hub-ring-track" aria-hidden="true" />
          <div className="decision-hub-ring decision-hub-ring-inner" aria-hidden="true" />

          {ORBIT_NODES.map((node) => (
            <div
              key={node.id}
              className="decision-hub-node-slot"
              style={{ ["--orbit-angle" as string]: `${node.angle}deg` }}
            >
              <div className="decision-hub-node-counter">
                <div className="decision-hub-node-upright">
                  <Link href={node.href} className="decision-hub-node">
                    <span className="decision-hub-node-dot" aria-hidden="true" />
                    <span className="decision-hub-node-label">{node.label}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link
          href={metricHref}
          className="decision-hub-core"
          aria-label={`${guideCount} ${metricLabel} — open directory`}
        >
          <span className="decision-hub-core-ring" aria-hidden="true" />
          <span className="decision-hub-metric">
            {reduced ? (
              guideCount
            ) : (
              <CountUp
                to={guideCount}
                from={0}
                duration={1.4}
                trigger="view"
                className="decision-hub-metric-value"
              />
            )}
          </span>
          <span className="decision-hub-metric-label">{metricLabel}</span>
        </Link>
      </div>

      {lastGuide ? (
        <Link href={lastGuide.href} className="decision-hub-continue">
          Continue: {lastGuide.title}
          <span aria-hidden="true">→</span>
        </Link>
      ) : null}

      <div
        className="decision-hub-stages"
        role="group"
        aria-label="Where are you in the journey?"
      >
        {STAGES.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="decision-hub-stage"
            aria-current={stage === item.id ? "true" : undefined}
            onClick={() => setStage(item.id)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
