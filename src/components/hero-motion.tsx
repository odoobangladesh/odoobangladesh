"use client";

import { useEffect } from "react";

/** Presentation-only: runs the hero load sequence once. */
export function HeroMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // CSS gates visibility on `.hero-reveal.is-visible`, not the step wrappers.
    const nodes = document.querySelectorAll<HTMLElement>(".hero-reveal");
    if (reduced) {
      nodes.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    nodes.forEach((el, i) => {
      window.setTimeout(
        () => el.classList.add("is-visible"),
        80 + i * 60,
      );
    });
  }, []);

  return null;
}
