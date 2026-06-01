import { defaultLocale, localeCodes, type LocaleCode } from "./config";

/** Build a public URL path with Odoo-style locale prefix (English has none). */
export function localizedPath(path: string, locale: LocaleCode): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return normalized;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}

/** Strip locale prefix from pathname; returns locale + path without prefix. */
export function parseLocalizedPathname(pathname: string): {
  locale: LocaleCode;
  pathnameWithoutLocale: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  const prefixed = localeCodes.filter((c) => c !== defaultLocale) as string[];

  if (first && prefixed.includes(first)) {
    const rest = "/" + segments.slice(1).join("/");
    return {
      locale: first as LocaleCode,
      pathnameWithoutLocale: rest === "/" ? "/" : rest.replace(/\/$/, "") || "/",
    };
  }

  return { locale: defaultLocale, pathnameWithoutLocale: pathname || "/" };
}
