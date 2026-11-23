"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type HubCatalogItem = {
  path: string;
  title: string;
  description: string;
  collection: string;
  collectionLabel: string;
  keywords: string[];
  date?: string;
};

const ALL = "all";

export function HubCatalog({
  items,
  collections,
}: {
  items: HubCatalogItem[];
  collections: { id: string; label: string }[];
}) {
  const [query, setQuery] = useState("");
  const [collection, setCollection] = useState(ALL);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (collection !== ALL && item.collection !== collection) return false;
      if (!q) return true;
      const hay = [
        item.title,
        item.description,
        item.collectionLabel,
        ...item.keywords,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [items, query, collection]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="grid w-full gap-1 text-sm sm:max-w-md">
          <span className="text-ink-muted">Search resources</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. inventory, VAT, garments"
            className="input-field"
            autoComplete="off"
          />
        </label>
        <label className="grid w-full gap-1 text-sm sm:max-w-xs">
          <span className="text-ink-muted">Category</span>
          <select
            className="input-field"
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
          >
            <option value={ALL}>All categories</option>
            {collections.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-3 text-xs text-ink-muted" aria-live="polite">
        Showing {filtered.length} of {items.length} resources
      </p>

      <ul className="directory-list directory-list-1 mt-4">
        {filtered.map((item) => (
          <li key={item.path}>
            <Link href={item.path} className="directory-row group">
              <span className="directory-row-copy min-w-0">
                <span className="directory-row-title">
                  {item.title}
                  <span className="directory-row-meta">
                    {item.collectionLabel}
                    {item.date ? ` · ${item.date}` : ""}
                  </span>
                </span>
                <span className="directory-row-desc">{item.description}</span>
              </span>
              <span className="directory-row-chevron" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <div className="mt-4 border border-dashed border-line px-4 py-6 text-sm text-ink-muted">
          No resources match that search. Try another keyword or category.
        </div>
      ) : null}
    </div>
  );
}
