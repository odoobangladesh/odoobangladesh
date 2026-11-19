"use client";

import Link from "next/link";
import { useId, type CSSProperties, type ReactNode } from "react";
import { useInViewOnce } from "@/lib/use-in-view-once";

export type ChartSlice = {
  label: string;
  value: number;
  href?: string;
  color?: string;
};

const PALETTE = [
  "var(--brand)",
  "var(--brand-deep)",
  "#1F7AE0",
  "#0A8F6C",
  "#3D7A68",
  "#5B9A86",
];

function ChartHeader({
  title,
  hint,
  live,
}: {
  title: string;
  hint?: string;
  live?: boolean;
}) {
  return (
    <div className="chart-header">
      <div className="min-w-0">
        <div className="chart-kicker">
          {live ? <span className="chart-live-dot" aria-hidden="true" /> : null}
          Analytics
        </div>
        <div className="chart-title">{title}</div>
      </div>
      {hint ? <div className="chart-hint">{hint}</div> : null}
    </div>
  );
}

function buildArcs(slices: ChartSlice[], circumference: number, gap = 6) {
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  const usable = Math.max(circumference - gap * slices.length, circumference * 0.85);
  const arcs: {
    label: string;
    value: number;
    href?: string;
    dash: string;
    rot: number;
    color: string;
    pct: number;
  }[] = [];
  let offset = 0;
  for (let i = 0; i < slices.length; i++) {
    const slice = slices[i];
    const len = (slice.value / total) * usable;
    arcs.push({
      label: slice.label,
      value: slice.value,
      href: slice.href,
      dash: `${len} ${circumference - len}`,
      rot: (offset / circumference) * 360 - 90,
      color: slice.color ?? PALETTE[i % PALETTE.length],
      pct: Math.round((slice.value / total) * 100),
    });
    offset += len + gap;
  }
  return { arcs, total };
}

/** Animated SVG donut from real numeric slices (collection counts, etc.). */
export function DonutChart({
  slices,
  title,
  centerLabel,
  size = 228,
}: {
  slices: ChartSlice[];
  title: string;
  centerLabel?: string;
  size?: number;
}) {
  const { ref, active } = useInViewOnce();
  const uid = useId();
  const r = 74;
  const c = 2 * Math.PI * r;
  const cx = size / 2;
  const cy = size / 2;
  const { arcs, total } = buildArcs(slices, c);

  return (
    <div ref={ref} className="chart-panel">
      <ChartHeader title={title} live />
      <div className="mt-5 flex flex-col items-center gap-6 lg:flex-row lg:items-center">
        <div className="donut-frame relative shrink-0" style={{ width: size, height: size }}>
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            role="img"
            aria-label={`${title}: ${slices.map((s) => `${s.label} ${s.value}`).join(", ")}`}
          >
            <defs>
              <filter id={`${uid}-soft`} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow
                  dx="0"
                  dy="6"
                  stdDeviation="8"
                  floodColor="rgb(13 27 22 / 0.12)"
                />
              </filter>
            </defs>
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="var(--surface-sunken)"
              strokeWidth="20"
            />
            {arcs.map((arc, i) => (
              <circle
                key={arc.label}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={arc.color}
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={arc.dash}
                strokeDashoffset={active ? 0 : c}
                transform={`rotate(${arc.rot} ${cx} ${cy})`}
                className="donut-arc"
                filter={`url(#${uid}-soft)`}
                style={
                  {
                    transitionDelay: `calc(var(--stagger) * ${i})`,
                  } as CSSProperties
                }
              />
            ))}
          </svg>
          <div className="donut-center pointer-events-none absolute inset-0 grid place-items-center text-center">
            <div>
              <div className="font-display text-3xl font-bold tracking-tight text-ink tabular-nums">
                {total}
              </div>
              <div className="mt-0.5 text-[0.7rem] font-medium uppercase tracking-[0.08em] text-ink-muted">
                {centerLabel ?? "guides"}
              </div>
            </div>
          </div>
        </div>
        <ul className="donut-legend grid w-full gap-1.5" aria-labelledby={uid}>
          <li id={uid} className="sr-only">
            Legend
          </li>
          {arcs.map((arc) => {
            const row = (
              <>
                <span
                  className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white"
                  style={{ background: arc.color }}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1 truncate text-sm text-ink">
                  {arc.label}
                </span>
                <span className="text-sm font-semibold tabular-nums text-ink">
                  {arc.value}
                </span>
                <span className="legend-pct">{arc.pct}%</span>
              </>
            );
            return (
              <li key={arc.label}>
                {arc.href ? (
                  <Link href={arc.href} className="legend-row legend-row-link">
                    {row}
                  </Link>
                ) : (
                  <div className="legend-row">{row}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export type ColumnItem = {
  label: string;
  value: number;
  href?: string;
};

/** Vertical column chart with height grow animation. */
export function ColumnChart({
  items,
  title,
  unitHint,
}: {
  items: ColumnItem[];
  title: string;
  unitHint?: string;
}) {
  const { ref, active } = useInViewOnce();
  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <div ref={ref} className="chart-panel">
      <ChartHeader title={title} hint={unitHint} live />
      <div className="column-chart mt-5" role="img" aria-label={`${title}: ${items.map((i) => `${i.label} ${i.value}`).join(", ")}`}>
        <div className="column-gridlines" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="relative z-[1] flex h-44 items-end gap-2 sm:gap-3">
          {items.map((item, i) => {
            const h = Math.max(10, (item.value / max) * 100);
            const bar = (
              <div className="column-item">
                <span className="column-value">{item.value}</span>
                <div className="column-track">
                  <div
                    className={`column-fill ${active ? "is-active" : ""}`}
                    style={
                      {
                        "--col-h": `${h}%`,
                        transitionDelay: `calc(var(--stagger) * ${i})`,
                      } as CSSProperties
                    }
                  />
                </div>
                <span className="column-label">{item.label}</span>
              </div>
            );
            return item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className="h-full min-w-0 flex-1 rounded-[var(--radius-control)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)]"
              >
                {bar}
              </Link>
            ) : (
              <div key={item.label} className="h-full min-w-0 flex-1">
                {bar}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export type SeriesBar = {
  label: string;
  series: { key: string; value: number; color?: string }[];
  href?: string;
};

/** Grouped horizontal bars for comparing package scopes etc. */
export function GroupedBars({
  items,
  keys,
  title,
  colors,
}: {
  items: SeriesBar[];
  keys: { key: string; label: string }[];
  title: string;
  colors?: string[];
}) {
  const { ref, active } = useInViewOnce();
  const max = Math.max(
    ...items.flatMap((i) => i.series.map((s) => s.value)),
    1,
  );
  const palette = colors ?? PALETTE;

  return (
    <div ref={ref} className="chart-panel">
      <ChartHeader title={title} live />
      <div className="mt-3 flex flex-wrap gap-2">
        {keys.map((k, i) => (
          <span key={k.key} className="legend-chip">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: palette[i % palette.length] }}
              aria-hidden="true"
            />
            {k.label}
          </span>
        ))}
      </div>
      <ul className="mt-5 grid gap-5" aria-label={title}>
        {items.map((item, row) => (
          <li key={item.label} className="grouped-row">
            <div className="mb-2 flex items-center justify-between gap-2">
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-sm font-semibold text-ink hover:text-brand"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-sm font-semibold text-ink">{item.label}</span>
              )}
            </div>
            <div className="grid gap-2">
              {item.series.map((s, si) => {
                const w = Math.max(4, (s.value / max) * 100);
                return (
                  <div key={s.key} className="flex items-center gap-3">
                    <span className="w-[4.5rem] shrink-0 text-[0.7rem] font-medium text-ink-muted">
                      {keys.find((k) => k.key === s.key)?.label ?? s.key}
                    </span>
                    <div className="grouped-track flex-1">
                      <span
                        className={`grouped-fill ${active ? "is-active" : ""}`}
                        style={
                          {
                            "--bar-w": `${w}%`,
                            background:
                              s.color ?? palette[si % palette.length],
                            transitionDelay: `calc(var(--stagger) * ${row + si})`,
                          } as CSSProperties
                        }
                      />
                    </div>
                    <span className="w-7 text-right text-xs font-bold tabular-nums text-ink">
                      {s.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export type RingItem = {
  label: string;
  value: number;
  max: number;
  href?: string;
};

/** Multi progress rings from real ratios. */
export function ProgressRings({
  items,
  title,
}: {
  items: RingItem[];
  title: string;
}) {
  const { ref, active } = useInViewOnce();
  const r = 30;
  const c = 2 * Math.PI * r;

  return (
    <div ref={ref} className="chart-panel">
      <ChartHeader title={title} live />
      <ul
        className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        aria-label={title}
      >
        {items.map((item, i) => {
          const pct = Math.min(1, item.value / Math.max(item.max, 1));
          const dash = `${pct * c} ${c}`;
          const body = (
            <>
              <div className="ring-frame relative h-[5.5rem] w-[5.5rem] shrink-0">
                <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden="true">
                  <circle
                    cx="44"
                    cy="44"
                    r={r}
                    fill="none"
                    stroke="var(--surface-sunken)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="44"
                    cy="44"
                    r={r}
                    fill="none"
                    stroke="var(--brand)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={dash}
                    strokeDashoffset={active ? 0 : c}
                    transform="rotate(-90 44 44)"
                    className="ring-arc"
                    style={
                      {
                        transitionDelay: `calc(var(--stagger) * ${i})`,
                      } as CSSProperties
                    }
                  />
                </svg>
                <span className="absolute inset-0 grid place-items-center text-sm font-bold tabular-nums text-ink">
                  {Math.round(pct * 100)}%
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-ink">{item.label}</div>
                <div className="mt-0.5 text-xs text-ink-muted tabular-nums">
                  {item.value} of {item.max}
                </div>
              </div>
              <span className="sr-only">
                {item.label}: {item.value} of {item.max}
              </span>
            </>
          );
          return (
            <li key={item.label}>
              {item.href ? (
                <Link href={item.href} className="ring-card ring-card-link">
                  {body}
                </Link>
              ) : (
                <div className="ring-card">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Dashboard shell: multi-panel composition for chart widgets. */
export function DashboardShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="dashboard-shell">
      <header className="dashboard-shell-header mb-6 max-w-2xl">
        {eyebrow ? (
          <p className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted">
            <span className="chart-live-dot" aria-hidden="true" />
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={`font-display text-[length:var(--text-h2)] font-semibold tracking-[var(--tracking-h2)] text-ink ${
            eyebrow ? "mt-1" : ""
          }`}
        >
          {title}
        </h2>
        {description ? (
          <div className="mt-2 text-sm leading-6 text-ink-muted">
            {description}
          </div>
        ) : null}
      </header>
      <div className="dashboard-grid">{children}</div>
    </section>
  );
}

export function DashboardTile({
  children,
  span = "md",
}: {
  children: ReactNode;
  span?: "md" | "lg" | "full";
}) {
  return (
    <div className={`dashboard-tile dashboard-tile-${span}`}>{children}</div>
  );
}
