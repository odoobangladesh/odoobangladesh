export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export function readUtmsFromSearch(
  search: string | URLSearchParams | null | undefined,
): UtmParams {
  const params =
    typeof search === "string"
      ? new URLSearchParams(search.startsWith("?") ? search : `?${search}`)
      : search instanceof URLSearchParams
        ? search
        : new URLSearchParams();

  const out: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) out[key] = value;
  }
  return out;
}

export function readUtmsFromWindow(): UtmParams {
  if (typeof window === "undefined") return {};
  return readUtmsFromSearch(window.location.search);
}

export function mergeAttribution(extra?: {
  sourcePath?: string;
  referrer?: string;
  packageSlug?: string;
}): UtmParams & {
  source_path?: string;
  referrer?: string;
  package?: string;
} {
  const utm = readUtmsFromWindow();
  return {
    ...utm,
    source_path:
      extra?.sourcePath ??
      (typeof window !== "undefined" ? window.location.pathname : undefined),
    referrer:
      extra?.referrer ??
      (typeof document !== "undefined" ? document.referrer || undefined : undefined),
    package: extra?.packageSlug,
  };
}
