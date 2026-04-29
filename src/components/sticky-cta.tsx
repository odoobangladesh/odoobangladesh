"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 280);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={[
        "fixed inset-x-0 bottom-3 z-50 transition",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      <div className="ob-container">
        <div className="flex items-center justify-between gap-3 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-background)]/90 px-3 py-2 shadow-md backdrop-blur">
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">
              Need guidance on Odoo ERP in Bangladesh?
            </div>
            <div className="truncate text-xs text-[color:var(--color-muted)]">
              Request a free consultation or explore training.
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link href="/contact" className="ob-btn ob-btn-primary py-2">
              Request consultation
            </Link>
            <Link href="/training" className="ob-btn ob-btn-secondary py-2 hidden sm:inline-flex">
              Join next batch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

