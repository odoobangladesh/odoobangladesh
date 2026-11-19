"use client";

import { useEffect, useRef, useState } from "react";
import type { TocItem } from "@/lib/toc";

export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("doc-article");
      if (!el || !barRef.current) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const p = total > 0 ? scrolled / total : 0;
      barRef.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <div ref={barRef} className="reading-progress" aria-hidden="true" />;
}

export function DocToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const listRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });

  useEffect(() => {
    if (items.length === 0) return;
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 1] },
    );
    headings.forEach((h) => obs.observe(h));
    return () => obs.disconnect();
  }, [items]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>(`[data-toc-id="${activeId}"]`);
    if (!active) return;
    setIndicator({ top: active.offsetTop, height: active.offsetHeight });
  }, [activeId]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[calc(var(--header-h)+1rem)] hidden max-h-[calc(100vh-6rem)] overflow-auto lg:block"
    >
      <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
        On this page
      </div>
      <div className="relative mt-3 border-l border-line pl-3">
        <div
          className="doc-toc-indicator"
          style={{
            transform: `translateY(${indicator.top}px)`,
            height: indicator.height || 0,
          }}
        />
        <ul ref={listRef} className="grid gap-1 text-sm">
          {items.map((item) => (
            <li key={item.id} data-toc-id={item.id}>
              <a
                href={`#${item.id}`}
                className={`block py-1 transition-colors duration-[var(--dur-fast)] ${
                  item.level === 3 ? "pl-3" : ""
                } ${
                  activeId === item.id
                    ? "font-medium text-brand"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
