"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useInViewOnce } from "@/lib/use-in-view-once";

export type CompareCell = {
  label: string;
  tone?: "good" | "warn" | "neutral";
};

export type CompareRow = {
  dimension: string;
  cells: CompareCell[];
};

function toneStrength(tone: CompareCell["tone"]) {
  if (tone === "good") return 3;
  if (tone === "warn") return 1;
  return 2;
}

function SignalPips({ tone }: { tone: CompareCell["tone"] }) {
  const strength = toneStrength(tone);
  return (
    <span
      className="shortlist-pips"
      data-tone={tone ?? "neutral"}
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="shortlist-pip"
          data-on={i < strength ? "true" : "false"}
        />
      ))}
    </span>
  );
}

/** Editorial shortlist: open verdict lanes — no boxed table cells. */
export function CompareMatrix({
  columns,
  rows,
  ariaLabel = "Comparison matrix",
  footnote,
}: {
  columns: string[];
  rows: CompareRow[];
  ariaLabel?: string;
  footnote?: string;
}) {
  const { ref, active } = useInViewOnce(0.15);

  return (
    <div
      ref={ref}
      className="shortlist-board"
      data-active={active ? "true" : "false"}
    >
      <div className="shortlist-grid" role="table" aria-label={ariaLabel}>
        <div
          className="shortlist-head"
          role="row"
          style={{
            gridTemplateColumns: `minmax(6.5rem,0.9fr) repeat(${columns.length}, minmax(0,1fr))`,
          }}
        >
          <div role="columnheader" className="shortlist-corner">
            <span className="sr-only">Dimension</span>
          </div>
          {columns.map((col, i) => (
            <div
              key={col}
              role="columnheader"
              className="shortlist-col"
              data-lead={i === 0 ? "true" : "false"}
            >
              <span className="shortlist-col-name">{col}</span>
              <span className="shortlist-col-rule" aria-hidden="true" />
            </div>
          ))}
        </div>

        {rows.map((row, rowIndex) => {
          const cells = row.cells.slice(0, columns.length);
          while (cells.length < columns.length) {
            cells.push({ label: "—", tone: "neutral" });
          }
          return (
            <div
              key={row.dimension}
              role="row"
              className="shortlist-row"
              data-active={active ? "true" : "false"}
              style={{
                gridTemplateColumns: `minmax(6.5rem,0.9fr) repeat(${columns.length}, minmax(0,1fr))`,
                transitionDelay: `calc(var(--stagger) * ${rowIndex + 1})`,
              }}
            >
              <div role="rowheader" className="shortlist-dim">
                <span className="shortlist-dim-mark" aria-hidden="true" />
                <span className="shortlist-dim-label">{row.dimension}</span>
              </div>
              {cells.map((cell, i) => (
                <div
                  key={`${row.dimension}-${i}`}
                  role="cell"
                  className="shortlist-verdict"
                  data-tone={cell.tone ?? "neutral"}
                  data-lead={i === 0 ? "true" : "false"}
                >
                  <SignalPips tone={cell.tone} />
                  <span className="shortlist-verdict-label">{cell.label}</span>
                  <span className="sr-only">
                    {columns[i]}: {cell.label}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {footnote ? <p className="shortlist-footnote">{footnote}</p> : null}
    </div>
  );
}

/** Two-pathway fork: open columns with a center divider, not boxed panels. */
export function DualTrack({
  left,
  right,
  ariaLabel = "Two pathways",
}: {
  left: { title: string; body: ReactNode; href?: string };
  right: { title: string; body: ReactNode; href?: string };
  ariaLabel?: string;
}) {
  const side = (
    item: { title: string; body: ReactNode; href?: string },
    index: number,
  ) => {
    const body = (
      <>
        <span className="fork-index" aria-hidden="true">
          {String(index).padStart(2, "0")}
        </span>
        <h3 className="fork-title">{item.title}</h3>
        <div className="fork-body">{item.body}</div>
        {item.href ? (
          <span className="fork-cta">
            Explore pathway
            <span className="card-arrow" aria-hidden="true">
              →
            </span>
          </span>
        ) : null}
      </>
    );

    if (item.href) {
      return (
        <Link href={item.href} className="fork-side fork-side-link group">
          {body}
        </Link>
      );
    }
    return <div className="fork-side">{body}</div>;
  };

  return (
    <div className="fork-split" aria-label={ariaLabel}>
      {side(left, 1)}
      <div className="fork-divider" aria-hidden="true">
        <span>OR</span>
      </div>
      {side(right, 2)}
    </div>
  );
}
