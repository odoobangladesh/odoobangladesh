"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

export function WhatsAppFab() {
  const [pulse, setPulse] = useState(true);
  const [offsetForSticky, setOffsetForSticky] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setPulse(false), 2400);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const update = () => {
      const sticky = document.querySelector("[data-sticky-cta='visible']");
      setOffsetForSticky(Boolean(sticky));
    };
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ["data-sticky-cta"],
    });
    return () => obs.disconnect();
  }, []);

  return (
    <a
      href={siteConfig.social.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={`group fixed right-4 z-40 flex items-center ${
        offsetForSticky
          ? "bottom-[calc(5.5rem+env(safe-area-inset-bottom))] md:bottom-[max(1.25rem,env(safe-area-inset-bottom))]"
          : "bottom-[max(1.25rem,env(safe-area-inset-bottom))]"
      }`}
      aria-label="Chat on WhatsApp"
    >
      <span
        className="pointer-events-none mr-2 translate-x-2 rounded-[var(--radius-pill)] bg-brand px-3 py-2 text-sm font-medium text-on-brand opacity-0 shadow-2 transition-[opacity,transform] duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
        aria-hidden="true"
      >
        WhatsApp
      </span>
      <span
        className={`relative flex h-[var(--fab-size)] w-[var(--fab-size)] items-center justify-center rounded-[var(--radius-pill)] bg-brand text-on-brand shadow-2 transition-colors duration-[var(--dur-fast)] group-hover:bg-brand-deep ${
          pulse ? "fab-pulse" : ""
        }`}
      >
        <MessageCircle className="h-5 w-5" />
      </span>
    </a>
  );
}
