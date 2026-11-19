import { PortalIndex } from "@/components/portal-index";
import { continueDestinations } from "@/lib/portal-destinations";

/**
 * End-of-hub engagement router: keeps visitors moving to another path
 * without competing with sticky conversion CTAs.
 */
export function ContinueExploring({
  excludeHref,
  title = "Continue exploring",
  lead = "Pick another destination—education first, consultation when you are ready.",
}: {
  excludeHref?: string;
  title?: string;
  lead?: string;
}) {
  const items = continueDestinations(excludeHref);
  if (items.length === 0) return null;

  return (
    <div data-reveal className="mt-12">
      <h2 className="font-display text-[length:var(--text-h2)] font-semibold tracking-[var(--tracking-h2)] text-ink">
        {title}
      </h2>
      {lead ? (
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">{lead}</p>
      ) : null}
      <div className="mt-6">
        <PortalIndex items={items} ariaLabel={title} />
      </div>
    </div>
  );
}
