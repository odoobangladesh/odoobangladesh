export const LAST_GUIDE_KEY = "obd:last-guide";

export type LastGuide = {
  href: string;
  title: string;
  savedAt: number;
};

export function readLastGuide(): LastGuide | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LAST_GUIDE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LastGuide;
    if (!parsed?.href || !parsed?.title) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeLastGuide(guide: Omit<LastGuide, "savedAt">) {
  if (typeof window === "undefined") return;
  try {
    const payload: LastGuide = { ...guide, savedAt: Date.now() };
    window.localStorage.setItem(LAST_GUIDE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore quota / private mode failures.
  }
}
