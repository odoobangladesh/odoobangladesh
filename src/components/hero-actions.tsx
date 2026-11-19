"use client";

import Link from "next/link";
import BlurText from "@/components/react-bits/BlurText/BlurText";
import FadeContent from "@/components/react-bits/FadeContent/FadeContent";
import { CtaSpark } from "@/components/cta-spark";

export function HeroEyebrow({ children }: { children: string }) {
  return (
    <FadeContent
      effect="fade"
      duration={0.55}
      delay={0.05}
      threshold={0.01}
      trigger="mount"
      initialOpacity={0}
      className="text-sm font-medium text-ink-muted"
    >
      {children}
    </FadeContent>
  );
}

export function HeroTitle({ text }: { text: string }) {
  return (
    <BlurText
      as="h1"
      text={text}
      animateBy="words"
      direction="top"
      effect="focus"
      blur={10}
      distance={18}
      delay={70}
      stepDuration={0.32}
      trigger="load"
      className="text-display text-ink"
    />
  );
}

export function HeroSupport({ children }: { children: string }) {
  return (
    <FadeContent
      effect="focus"
      blur={6}
      duration={0.7}
      delay={0.22}
      threshold={0.01}
      trigger="mount"
      initialOpacity={0}
      className="max-w-2xl text-lg leading-8 text-ink-muted"
    >
      {children}
    </FadeContent>
  );
}

export function HeroActions() {
  return (
    <FadeContent
      effect="fade"
      duration={0.55}
      delay={0.35}
      threshold={0.01}
      trigger="mount"
      initialOpacity={0}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <CtaSpark>
        <Link href="/learning-center" className="btn-primary">
          Explore resources
        </Link>
      </CtaSpark>
      <Link href="/contact" className="btn-secondary">
        Request ERP consultation
      </Link>
      <Link href="/training" className="btn-secondary">
        Explore training programs
      </Link>
    </FadeContent>
  );
}
