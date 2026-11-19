"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import {
  ERP_CHECKLIST_UNLOCK_KEY,
  ResourceEmailGate,
} from "@/components/resource-email-gate";

const STORAGE_KEY = "obd_exit_intent_dismissed_v1";

export function ExitIntentLeadModal() {
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [canShow, setCanShow] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setCanShow(window.localStorage.getItem(STORAGE_KEY) !== "1");
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!canShow) return;
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) setOpen(true);
    };
    window.addEventListener("mouseout", onMouseOut);
    return () => window.removeEventListener("mouseout", onMouseOut);
  }, [canShow]);

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      previousFocus.current?.focus();
    };
  }, [open]);

  function dismiss() {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setLeaving(true);
    window.setTimeout(() => {
      setOpen(false);
      setLeaving(false);
      setCanShow(false);
    }, 150);
  }

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 grid place-items-center bg-[rgb(13_27_22_/_0.48)] p-4 backdrop-blur-[4px] transition-opacity duration-[var(--dur-base)] ease-[var(--ease-out)] ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div
        ref={panelRef}
        className={`w-full max-w-lg rounded-[var(--radius-panel)] bg-surface p-6 shadow-3 transition-[opacity,transform] duration-[var(--dur-base)] ease-[var(--ease-out)] ${
          leaving ? "opacity-0" : "opacity-100"
        }`}
        style={{
          transform: leaving ? "scale(0.96)" : "scale(1)",
          transitionDuration: leaving ? "var(--dur-fast)" : "var(--dur-base)",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div id={titleId} className="text-sm font-semibold text-ink">
              Free ERP readiness checklist (Bangladesh)
            </div>
            <p className="mt-1 text-sm text-ink-muted">
              Educational resource first. Leave your email to unlock the
              checklist. A Binary Quest consultation is optional afterward.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="rounded-[var(--radius-control)] px-2 py-1 text-sm text-ink-muted transition-colors duration-[var(--dur-fast)] hover:bg-surface-sunken"
            onClick={dismiss}
          >
            Close
          </button>
        </div>

        <ResourceEmailGate
          asset="erp-checklist"
          storageKey={ERP_CHECKLIST_UNLOCK_KEY}
          submitLabel="Unlock checklist"
          teaser={
            <p className="mt-4 text-sm text-ink-muted">
              The checklist stays free. Email unlocks it once on this device.
            </p>
          }
        >
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link href="/resources/erp-checklist" className="btn-primary">
              Open the checklist
            </Link>
            <Link
              href="/contact?interest=erp-assessment"
              className="btn-secondary"
            >
              Request consultation
            </Link>
          </div>
          <p className="mt-3 text-xs text-ink-muted">
            Portal content is community education. Implementation quotes come
            from Binary Quest after discovery—only if you want them.
          </p>
        </ResourceEmailGate>
      </div>
    </div>
  );
}
