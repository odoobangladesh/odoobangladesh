import Link from "next/link";
import { trustHighlights } from "@/lib/trust-highlights";

export function TrustHighlights({
  title = "Trust & proof",
  description = "Workshop outcomes and operator proof. Named customer case studies live on Binary Quest — this portal does not invent them.",
}: {
  title?: string;
  description?: string;
} = {}) {
  return (
    <section aria-labelledby="trust-highlights-heading">
      <h2
        id="trust-highlights-heading"
        className="font-display text-[length:var(--text-h2)] font-semibold tracking-[var(--tracking-h2)] text-ink"
      >
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
        {description}
      </p>

      <ul className="directory-list directory-list-1 mt-6">
        {trustHighlights.map((item) => {
          const meta =
            item.kind === "operator" ? "Operator proof" : "Workshop highlight";
          const body = (
            <>
              <span className="directory-row-copy min-w-0">
                <span className="directory-row-title">
                  {item.title}
                  <span className="directory-row-meta">{meta}</span>
                </span>
                <span className="directory-row-desc">{item.summary}</span>
                <span className="mt-2 block text-sm font-medium text-brand">
                  {item.cta}
                </span>
              </span>
              <span className="directory-row-chevron" aria-hidden="true">
                →
              </span>
            </>
          );

          return (
            <li key={item.id}>
              {item.external ? (
                <a
                  href={item.href}
                  className="directory-row group"
                  target="_blank"
                  rel="noreferrer"
                >
                  {body}
                </a>
              ) : (
                <Link href={item.href} className="directory-row group">
                  {body}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
