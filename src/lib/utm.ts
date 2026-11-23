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

const STORAGE_KEY = "obd_first_touch_v1";

export type FirstTouchAttribution = UtmParams & {
  landing_path?: string;
};

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

function readStoredFirstTouch(): FirstTouchAttribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as FirstTouchAttribution;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

/**
 * Capture first-touch UTMs + landing path once per session.
 * Later navigations keep the original campaign attribution.
 */
export function captureFirstTouch(): FirstTouchAttribution {
  if (typeof window === "undefined") return {};
  const existing = readStoredFirstTouch();
  if (existing.landing_path) return existing;

  const utm = readUtmsFromWindow();
  const next: FirstTouchAttribution = {
    ...utm,
    landing_path: window.location.pathname || "/",
  };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* private mode / quota */
  }
  return next;
}

export function getFirstTouch(): FirstTouchAttribution {
  return readStoredFirstTouch();
}

/** Append stored UTMs onto a relative /contact (or other) href. */
export function withStoredUtms(href: string): string {
  if (typeof window === "undefined") return href;
  const stored = readStoredFirstTouch();
  const [pathAndQuery, hash = ""] = href.split("#");
  const [path, existingQuery = ""] = (pathAndQuery ?? href).split("?");
  const params = new URLSearchParams(existingQuery);
  for (const key of UTM_KEYS) {
    const value = stored[key];
    if (value && !params.has(key)) params.set(key, value);
  }
  const qs = params.toString();
  const base = qs ? `${path}?${qs}` : path;
  return hash ? `${base}#${hash}` : base;
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
  const stored = readStoredFirstTouch();
  const current = readUtmsFromWindow();
  const utm: UtmParams = { ...stored, ...current };
  // Prefer first-touch landing path for CRM source_path honesty on multi-page journeys.
  const source_path =
    extra?.sourcePath ??
    stored.landing_path ??
    (typeof window !== "undefined" ? window.location.pathname : undefined);

  return {
    ...utm,
    source_path,
    referrer:
      extra?.referrer ??
      (typeof document !== "undefined" ? document.referrer || undefined : undefined),
    package: extra?.packageSlug,
  };
}
