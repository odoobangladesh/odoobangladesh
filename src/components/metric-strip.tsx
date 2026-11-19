"use client";

import Link from "next/link";
import CountUp from "@/components/react-bits/CountUp/CountUp";
import WarmTooltip, {
  WarmTooltipGroup,
} from "@/components/react-bits/WarmTooltip/WarmTooltip";
import { useInViewOnce } from "@/lib/use-in-view-once";

export type MetricItem = {
  value: number;
  label: string;
  suffix?: string;
  href?: string;
};

function MetricCell({
  item,
  active,
  index,
}: {
  item: MetricItem;
  active: boolean;
  index: number;
}) {
  const content = (
    <>
      <span className="metric-accent" aria-hidden="true" />
      <span className="metric-spark" aria-hidden="true">
        <span style={{ animationDelay: `calc(var(--stagger) * ${index})` }} />
        <span
          style={{ animationDelay: `calc(var(--stagger) * ${index + 1})` }}
        />
        <span
          style={{ animationDelay: `calc(var(--stagger) * ${index + 2})` }}
        />
        <span
          style={{ animationDelay: `calc(var(--stagger) * ${index + 3})` }}
        />
      </span>
      <span className="metric-value font-display text-[length:var(--text-h2)] font-bold tracking-[var(--tracking-h2)] text-ink">
        <CountUp
          to={item.value}
          from={0}
          duration={1.35}
          delay={index * 0.08}
          startWhen={active}
          suffix={item.suffix ?? ""}
          easing="easeOut"
          className="tabular-nums"
        />
      </span>
      <WarmTooltip
        content={`${item.value}${item.suffix ?? ""} published ${item.label.toLowerCase()}`}
        side="bottom"
        size="sm"
      >
        <span className="mt-1 block text-sm text-ink-muted">{item.label}</span>
      </WarmTooltip>
    </>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        className="metric-cell metric-cell-link group"
        aria-label={`${item.value}${item.suffix ?? ""} ${item.label}`}
      >
        {content}
      </Link>
    );
  }

  return <div className="metric-cell">{content}</div>;
}

/** Animated metric strip; values must be real collection counts or verified figures. */
export function MetricStrip({
  items,
  ariaLabel = "Portal coverage",
}: {
  items: MetricItem[];
  ariaLabel?: string;
}) {
  const { ref, active } = useInViewOnce();

  return (
    <WarmTooltipGroup delay={0.12} warmWindow={1.2} travel={8} lean={4}>
      <div
        ref={ref}
        className="metric-strip grid gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(10.5rem,1fr))]"
        role="list"
        aria-label={ariaLabel}
      >
        {items.map((item, i) => (
          <div key={item.label} role="listitem">
            <MetricCell item={item} active={active} index={i} />
            <span className="sr-only">
              {item.value}
              {item.suffix ?? ""} {item.label}
            </span>
          </div>
        ))}
      </div>
    </WarmTooltipGroup>
  );
}
