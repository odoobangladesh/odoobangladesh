"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { LinkTiles, type IconKey } from "@/components/visual-ui";

export type AudienceTab = {
  id: string;
  label: string;
  summary: string;
  links: { href: string; title: string; description: string; icon?: IconKey }[];
};

/** Tabbed audience map with directory rows — no square card grid. */
export function AudienceSwitcher({
  tabs,
  ariaLabel = "Choose your starting point",
}: {
  tabs: AudienceTab[];
  ariaLabel?: string;
}) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  if (!active) return null;

  function focusTab(index: number) {
    const next = tabs[index];
    if (!next) return;
    setActiveId(next.id);
    tabRefs.current[index]?.focus();
  }

  function onTabKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (tabs.length === 0) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      focusTab((index + 1) % tabs.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      focusTab((index - 1 + tabs.length) % tabs.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusTab(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusTab(tabs.length - 1);
    }
  }

  return (
    <div className="audience-switcher">
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex flex-wrap gap-2"
      >
        {tabs.map((tab, index) => {
          const selected = tab.id === active.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              className={`rounded-[var(--radius-control)] border px-4 py-2 text-sm font-medium transition-[background-color,border-color,color] duration-[var(--dur-fast)] ${
                selected
                  ? "border-brand bg-brand text-on-brand"
                  : "border-line bg-surface text-ink hover:border-brand"
              }`}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(e) => onTabKeyDown(e, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => {
        const selected = tab.id === active.id;
        return (
          <div
            key={tab.id}
            role="tabpanel"
            id={`${baseId}-panel-${tab.id}`}
            aria-labelledby={`${baseId}-tab-${tab.id}`}
            hidden={!selected}
            className="mt-5"
            tabIndex={0}
          >
            <p className="max-w-2xl text-sm leading-6 text-ink-muted">
              {tab.summary}
            </p>
            <div className="mt-4">
              <LinkTiles
                ariaLabel={`${tab.label} starting points`}
                columns={1}
                items={tab.links.map((link) => ({
                  href: link.href,
                  title: link.title,
                  description: link.description,
                  icon: link.icon,
                }))}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
