"use client";

import Link from "next/link";
import { type CSSProperties } from "react";
import { useInViewOnce } from "@/lib/use-in-view-once";

export type RangeBarItem = {
  label: string;
  /** Inclusive low bound in the same unit as maxScale. */
  low: number;
  /** Inclusive high bound in the same unit as maxScale. */
  high: number;
  hint?: string;
  href?: string;
};

/** Animated range bars for documented cost/effort bands (presentation only). */
export function RangeBars({
  items,
  maxScale,
  unitLabel,
  ariaLabel = "Documented ranges",
}: {
  items: RangeBarItem[];
  maxScale: number;
  unitLabel: string;
  ariaLabel?: string;
}) {
  const { ref, active } = useInViewOnce();

  return (
    <div ref={ref} className="range-bars" role="list" aria-label={ariaLabel}>
      {items.map((item) => {
        const left = Math.max(0, (item.low / maxScale) * 100);
        const width = Math.max(
          4,
          ((item.high - item.low) / maxScale) * 100,
        );
        const text = `${item.label}: ${item.low} to ${item.high} ${unitLabel}`;
        const inner = (
          <>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-semibold text-ink">{item.label}</span>
              <span className="text-xs font-medium text-ink-muted tabular-nums">
                {item.low}–{item.high} {unitLabel}
              </span>
            </div>
            <div className="range-track mt-2" aria-hidden="true">
              <span
                className={`range-fill ${active ? "is-active" : ""}`}
                style={
                  {
                    "--range-left": `${left}%`,
                    "--range-width": `${width}%`,
                  } as CSSProperties
                }
              />
            </div>
            {item.hint ? (
              <p className="mt-2 text-xs leading-5 text-ink-muted">{item.hint}</p>
            ) : null}
            <span className="sr-only">{text}</span>
          </>
        );

        return (
          <div key={item.label} role="listitem" className="range-bar-item">
            {item.href ? (
              <Link
                href={item.href}
                className="block rounded-[var(--radius-control)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2"
              >
                {inner}
              </Link>
            ) : (
              inner
            )}
          </div>
        );
      })}
    </div>
  );
}
