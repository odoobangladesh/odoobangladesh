"use client";

import Link from "next/link";
import { useMemo, type CSSProperties, type ReactNode } from "react";
import CountUp from "@/components/react-bits/CountUp/CountUp";
import WarmTooltip, {
  WarmTooltipGroup,
} from "@/components/react-bits/WarmTooltip/WarmTooltip";
import { useInViewOnce } from "@/lib/use-in-view-once";

export type CoverageMetric = {
  value: number;
  label: string;
  suffix?: string;
  href?: string;
};

export type CoverageTrack = {
  label: string;
  value: number;
  max: number;
  href?: string;
};

function stemHeight(value: number, max: number) {
  const ratio = max > 0 ? value / max : 0;
  return 28 + Math.round(ratio * 72);
}

function MetricStation({
  item,
  active,
  index,
  max,
}: {
  item: CoverageMetric;
  active: boolean;
  index: number;
  max: number;
}) {
  const h = stemHeight(item.value, max);
  const delay = `calc(var(--stagger) * ${index})`;

  const inner = (
    <>
      <span className="coverage-station-value font-display">
        <CountUp
          to={item.value}
          from={0}
          duration={1.35}
          delay={index * 0.07}
          startWhen={active}
          suffix={item.suffix ?? ""}
          easing="easeOut"
          className="tabular-nums"
        />
      </span>
      <span
        className="coverage-stem"
        style={
          {
            "--stem-h": `${h}px`,
            transitionDelay: delay,
          } as CSSProperties
        }
        data-active={active ? "true" : "false"}
        aria-hidden="true"
      >
        <span className="coverage-stem-fill" />
        <span className="coverage-node" />
      </span>
      <WarmTooltip
        content={`${item.value}${item.suffix ?? ""} published ${item.label.toLowerCase()}`}
        side="bottom"
        size="sm"
      >
        <span className="coverage-station-label">{item.label}</span>
      </WarmTooltip>
    </>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        className="coverage-station coverage-station-link"
        style={{ transitionDelay: delay }}
        data-active={active ? "true" : "false"}
        aria-label={`${item.value}${item.suffix ?? ""} ${item.label}`}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div
      className="coverage-station"
      style={{ transitionDelay: delay }}
      data-active={active ? "true" : "false"}
    >
      {inner}
    </div>
  );
}

function TwinGauge({
  items,
  title,
  active,
}: {
  items: CoverageTrack[];
  title: string;
  active: boolean;
}) {
  const total = Math.max(items[0]?.max ?? 1, 1);
  const a = items[0];
  const b = items[1];
  const aPct = a ? a.value / total : 0;
  const bPct = b ? b.value / total : 0;

  // Hemisphere capacity (~168deg) so arcs read as mirrored crescents.
  const r = 58;
  const c = 2 * Math.PI * r;
  const hem = c * 0.47;
  const aLen = Math.max(aPct * hem, 0.01);
  const bLen = Math.max(bPct * hem, 0.01);

  return (
    <div className="coverage-twin" aria-label={title}>
      <div className="coverage-twin-copy">
        <p className="coverage-twin-kicker">{title}</p>
        <ul className="coverage-twin-legend">
          {items.map((item, i) => {
            const pct = Math.round(
              (item.value / Math.max(item.max, 1)) * 100,
            );
            const row = (
              <>
                <span
                  className="coverage-twin-swatch"
                  data-tone={i === 0 ? "brand" : "deep"}
                  aria-hidden="true"
                />
                <span className="coverage-twin-meta">
                  <span className="coverage-twin-label">{item.label}</span>
                  <span className="coverage-twin-stat tabular-nums">
                    {item.value} of {item.max}
                    <span className="coverage-twin-pct">{pct}%</span>
                  </span>
                </span>
              </>
            );
            return (
              <li key={item.label}>
                {item.href ? (
                  <Link href={item.href} className="coverage-twin-row">
                    {row}
                  </Link>
                ) : (
                  <div className="coverage-twin-row">{row}</div>
                )}
                <span className="sr-only">
                  {item.label}: {item.value} of {item.max}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="coverage-share" aria-hidden="true">
          <span
            className="coverage-share-a"
            data-active={active ? "true" : "false"}
            style={{ ["--share" as string]: `${aPct * 100}%` }}
          />
          <span
            className="coverage-share-b"
            data-active={active ? "true" : "false"}
            style={{ ["--share" as string]: `${bPct * 100}%` }}
          />
        </div>
      </div>

      <div className="coverage-twin-stage" aria-hidden="true">
        <svg viewBox="0 0 160 160" className="coverage-twin-svg">
          <circle
            cx="80"
            cy="80"
            r={r}
            fill="none"
            stroke="var(--line)"
            strokeWidth="1.5"
            strokeDasharray="2 6"
            opacity="0.7"
          />
          <circle
            cx="80"
            cy="80"
            r={r}
            fill="none"
            stroke="var(--surface-sunken)"
            strokeWidth="12"
            strokeDasharray={`${hem} ${c - hem}`}
            strokeLinecap="round"
            transform="rotate(-84 80 80)"
          />
          <circle
            cx="80"
            cy="80"
            r={r}
            fill="none"
            stroke="var(--surface-sunken)"
            strokeWidth="12"
            strokeDasharray={`${hem} ${c - hem}`}
            strokeLinecap="round"
            transform="rotate(96 80 80)"
          />
          <circle
            cx="80"
            cy="80"
            r={r}
            fill="none"
            stroke="var(--brand)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${aLen} ${c - aLen}`}
            transform="rotate(-84 80 80)"
            className="coverage-twin-arc"
            style={
              {
                strokeDashoffset: active ? 0 : aLen,
                transitionDelay: "calc(var(--stagger) * 2)",
              } as CSSProperties
            }
          />
          <circle
            cx="80"
            cy="80"
            r={r}
            fill="none"
            stroke="var(--brand-deep)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${bLen} ${c - bLen}`}
            transform="rotate(96 80 80)"
            className="coverage-twin-arc"
            style={
              {
                strokeDashoffset: active ? 0 : bLen,
                transitionDelay: "calc(var(--stagger) * 4)",
              } as CSSProperties
            }
          />
        </svg>
        <div className="coverage-twin-core">
          <span className="coverage-twin-core-value tabular-nums font-display">
            {total}
          </span>
          <span className="coverage-twin-core-label">topics</span>
        </div>
      </div>
    </div>
  );
}

/** Editorial live coverage: signal rail + twin gauge. No boxed tiles. */
export function LiveCoverage({
  eyebrow,
  title,
  description,
  metrics,
  tracks,
  trackTitle,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  metrics: CoverageMetric[];
  tracks: CoverageTrack[];
  trackTitle: string;
}) {
  const { ref, active } = useInViewOnce(0.18);
  const max = useMemo(
    () => Math.max(...metrics.map((m) => m.value), 1),
    [metrics],
  );

  return (
    <section ref={ref} className="live-coverage" data-active={active ? "true" : "false"}>
      <header className="live-coverage-header">
        {eyebrow ? (
          <p className="live-coverage-eyebrow">
            <span className="chart-live-dot" aria-hidden="true" />
            {eyebrow}
          </p>
        ) : null}
        <h2 className="live-coverage-title font-display">{title}</h2>
        {description ? (
          <div className="live-coverage-desc">{description}</div>
        ) : null}
      </header>

      <WarmTooltipGroup delay={0.12} warmWindow={1.2} travel={8} lean={4}>
        <div
          className="coverage-rail"
          role="list"
          aria-label="Portal coverage"
        >
          <div className="coverage-rail-track" aria-hidden="true">
            <span className="coverage-rail-line" data-active={active ? "true" : "false"} />
            <span className="coverage-rail-pulse" data-active={active ? "true" : "false"} />
          </div>
          {metrics.map((item, i) => (
            <div key={item.label} role="listitem" className="coverage-rail-slot">
              <MetricStation
                item={item}
                active={active}
                index={i}
                max={max}
              />
              <span className="sr-only">
                {item.value}
                {item.suffix ?? ""} {item.label}
              </span>
            </div>
          ))}
        </div>
      </WarmTooltipGroup>

      <TwinGauge items={tracks} title={trackTitle} active={active} />
    </section>
  );
}
