"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import BlurText from "@/components/react-bits/BlurText/BlurText";
import FadeContent from "@/components/react-bits/FadeContent/FadeContent";
import { CtaSpark } from "@/components/cta-spark";
import { DecisionOrb } from "@/components/decision-orb";

const Aurora = dynamic(
  () => import("@/components/react-bits/Aurora/Aurora"),
  { ssr: false },
);

type AudienceId = "business" | "professional" | "developer";

const AUDIENCES: Record<
  AudienceId,
  {
    label: string;
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
  }
> = {
  business: {
    label: "Business",
    primary: { href: "/packages", label: "View packages" },
    secondary: { href: "/contact", label: "Request ERP consultation" },
  },
  professional: {
    label: "Professional",
    primary: { href: "/training/functional", label: "Functional training" },
    secondary: { href: "/odoo-career-guide", label: "Career guide" },
  },
  developer: {
    label: "Developer",
    primary: { href: "/training/technical", label: "Technical training" },
    secondary: { href: "/developer-resources", label: "Developer resources" },
  },
};

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

/** Brand-first hero with audience dial + decision hub orb. */
export function LandingHero({
  guideCount,
  metricHref = "/modules",
  metricLabel = "guides",
}: {
  guideCount: number;
  metricHref?: string;
  metricLabel?: string;
}) {
  const reduced = useReducedMotion();
  const [audience, setAudience] = useState<AudienceId>("business");
  const ctas = AUDIENCES[audience];

  return (
    <section id="hero" className="landing-hero">
      {!reduced ? (
        <div className="landing-hero-fx" aria-hidden="true">
          <Aurora
            colorStops={["#064634", "#0A6B4F", "#1A8F6E", "#0A6B4F"]}
            direction="top"
            lightMode
            mouseInteraction
            intro
            layers={2}
            amplitude={1.15}
            blend={0.62}
            speed={0.7}
            height={0.52}
            scale={1.05}
            glow={0.75}
            brightness={1.15}
            opacity={0.9}
            className="h-full w-full"
          />
        </div>
      ) : null}

      <div className="site-container landing-hero-grid">
        <div className="landing-hero-copy">
          <FadeContent
            effect="fade"
            duration={0.45}
            delay={0.02}
            threshold={0.01}
            trigger="mount"
            initialOpacity={0}
          >
            <p className="landing-brand">Odoo Bangladesh</p>
          </FadeContent>

          <div className="mt-3 md:mt-4">
            <BlurText
              as="h1"
              text="The Odoo Community Platform for Bangladesh"
              animateBy="words"
              direction="top"
              effect="focus"
              blur={8}
              distance={14}
              delay={50}
              stepDuration={0.28}
              trigger="load"
              className="landing-headline"
            />
          </div>

          <FadeContent
            effect="focus"
            blur={4}
            duration={0.55}
            delay={0.18}
            threshold={0.01}
            trigger="mount"
            initialOpacity={0}
            className="mt-3 max-w-xl text-base leading-7 text-ink-muted md:text-lg md:leading-8"
          >
            Learning paths, implementation guidance, and career support for
            businesses, professionals, developers, and learners exploring Odoo
            in Bangladesh.
          </FadeContent>

          <div
            className="audience-dial"
            role="group"
            aria-label="Choose your starting audience"
          >
            {(Object.keys(AUDIENCES) as AudienceId[]).map((id) => (
              <button
                key={id}
                type="button"
                className="audience-dial-btn"
                aria-pressed={audience === id}
                onClick={() => setAudience(id)}
              >
                {AUDIENCES[id].label}
              </button>
            ))}
          </div>

          <FadeContent
            effect="fade"
            duration={0.45}
            delay={0.28}
            threshold={0.01}
            trigger="mount"
            initialOpacity={0}
            className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <CtaSpark>
              <Link href={ctas.primary.href} className="btn-primary">
                {ctas.primary.label}
              </Link>
            </CtaSpark>
            <Link href={ctas.secondary.href} className="btn-secondary">
              {ctas.secondary.label}
            </Link>
          </FadeContent>

          <p className="mt-5 text-xs leading-5 text-ink-muted">
            Independent community portal. Not affiliated with Odoo S.A.
          </p>
        </div>

        <DecisionOrb
          guideCount={guideCount}
          metricHref={metricHref}
          metricLabel={metricLabel}
        />
      </div>
    </section>
  );
}
