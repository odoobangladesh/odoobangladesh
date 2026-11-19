"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import SpotlightCard from "@/components/react-bits/SpotlightCard/SpotlightCard";
import GlareHover from "@/components/react-bits/GlareHover/GlareHover";

export type PortalIndexItem = {
  title: string;
  description: string;
  href?: string;
  eyebrow?: string;
  metric?: string;
  /** Kept for callers that still pass bento spans; ignored visually. */
  span?: string;
};

function parseMetric(metric?: string) {
  if (!metric) return 0;
  const n = Number(metric.replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

/**
 * Spotlight index: one lead entry + compact secondary index.
 * Built for scanning and navigation — not another tile/bar grid.
 */
export function PortalIndex({
  items,
  ariaLabel = "Portal index",
}: {
  items: PortalIndexItem[];
  ariaLabel?: string;
}) {
  if (items.length === 0) return null;

  const ranked = [...items].sort(
    (a, b) => parseMetric(b.metric) - parseMetric(a.metric),
  );
  const hasMetrics = ranked.some((item) => parseMetric(item.metric) > 0);
  const lead = hasMetrics ? ranked[0] : items[0];
  const rest = (hasMetrics ? ranked : items).filter((item) => item !== lead);
  const max = Math.max(1, ...ranked.map((item) => parseMetric(item.metric)));
  const total = ranked.reduce((sum, item) => sum + parseMetric(item.metric), 0);

  return (
    <div className="portal-index" aria-label={ariaLabel}>
      <LeadEntry item={lead} total={total || items.length} />
      {rest.length > 0 ? (
        <ul className="portal-index-grid">
          {rest.map((item) => {
            const value = parseMetric(item.metric);
            const share = hasMetrics ? Math.max(0.12, value / max) : 0.45;
            return (
              <li key={item.title + (item.href ?? "")}>
                <IndexEntry item={item} share={share} />
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function LeadEntry({
  item,
  total,
}: {
  item: PortalIndexItem;
  total: number;
}) {
  const body = (
    <>
      <div className="portal-index-lead-stat">
        <span className="portal-index-lead-metric">
          {item.metric ?? "01"}
        </span>
        {total > 0 && item.metric ? (
          <span className="portal-index-lead-total">
            of {total} published
          </span>
        ) : null}
      </div>
      <div className="portal-index-lead-copy">
        {item.eyebrow ? (
          <span className="portal-index-eyebrow">{item.eyebrow}</span>
        ) : null}
        <span className="portal-index-lead-title">{item.title}</span>
        <span className="portal-index-lead-desc">{item.description}</span>
        {item.href ? (
          <span className="portal-index-cta">
            Open
            <span className="card-arrow" aria-hidden="true">
              →
            </span>
          </span>
        ) : null}
      </div>
    </>
  );

  const card = (
    <SpotlightCard
      theme="light"
      spotlightColor="var(--brand)"
      intensity={0.12}
      spotlightSize={280}
      softness={0.85}
      borderGlow={0.35}
      proximity={64}
      smoothing={0.35}
      grain={0.04}
      className="portal-index-lead-spotlight !rounded-[var(--radius-panel)] !p-0 !shadow-none"
      style={
        {
          "--spotlight-card-surface": "transparent",
          "--spotlight-card-border": "transparent",
          "--spotlight-card-shadow": "none",
        } as CSSProperties
      }
    >
      {item.href ? (
        <Link href={item.href} className="portal-index-lead group">
          {body}
        </Link>
      ) : (
        <div className="portal-index-lead">{body}</div>
      )}
    </SpotlightCard>
  );

  return card;
}

function IndexEntry({
  item,
  share,
}: {
  item: PortalIndexItem;
  share: number;
}) {
  const body = (
    <>
      <span
        className="portal-index-share"
        aria-hidden="true"
        style={{ "--share": share } as CSSProperties}
      >
        <span className="portal-index-share-fill" />
      </span>
      <span className="portal-index-entry-top">
        {item.metric ? (
          <span className="portal-index-entry-metric">{item.metric}</span>
        ) : null}
        {item.eyebrow ? (
          <span className="portal-index-eyebrow">{item.eyebrow}</span>
        ) : null}
      </span>
      <span className="portal-index-entry-title">{item.title}</span>
      <span className="portal-index-entry-desc">{item.description}</span>
    </>
  );

  const inner = item.href ? (
    <Link href={item.href} className="portal-index-entry group">
      {body}
    </Link>
  ) : (
    <div className="portal-index-entry">{body}</div>
  );

  return (
    <GlareHover
      width="100%"
      height="auto"
      background="transparent"
      borderRadius="var(--radius-control)"
      borderColor="transparent"
      glareColor="#ffffff"
      glareOpacity={0.16}
      glareSize={32}
      softness={0.75}
      variant="sheen"
      blendMode="soft-light"
      rimGlint={false}
      mode="hover"
      transitionDuration={480}
      className="!block w-full !place-items-stretch"
      style={{ display: "block" }}
    >
      {inner}
    </GlareHover>
  );
}

/** @deprecated Prefer PortalIndex — kept as a thin alias for older imports. */
export function BentoGrid(props: {
  items: PortalIndexItem[];
  ariaLabel?: string;
}) {
  return <PortalIndex {...props} />;
}

export type BentoItem = PortalIndexItem;
