"use client";

import { useEffect } from "react";

/** Restrained scroll reveal: marks `[data-reveal]` groups visible once. */
export function ScrollReveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (reduced) {
      nodes.forEach((el) => {
        el.classList.add("is-visible");
        el.classList.remove("reveal-pending");
      });
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );

    nodes.forEach((el) => {
      el.classList.add("reveal-pending");
      obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return null;
}
