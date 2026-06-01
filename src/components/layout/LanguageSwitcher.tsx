"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { OdooImage } from "@/components/shared/OdooImage";
import { useLocale } from "@/components/providers/I18nProvider";
import { locales, type LocaleCode } from "@/i18n/config";
import { flagUrl } from "@/lib/odoo-cdn";
import { localizedPath, parseLocalizedPathname } from "@/i18n/localized-path";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const current = locales.find((l) => l.code === locale) ?? locales[0];

  function switchLocale(next: LocaleCode) {
    const { pathnameWithoutLocale } = parseLocalizedPathname(pathname);
    router.push(localizedPath(pathnameWithoutLocale, next));
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 px-2 py-1.5 text-sm hover:border-odoo-purple"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <OdooImage
          src={flagUrl(current.flag)}
          alt=""
          width={20}
          height={14}
          className="rounded-sm object-cover"
        />
        <span className="hidden sm:inline">{current.label}</span>
        <span className="text-gray-400" aria-hidden>
          ▾
        </span>
      </button>
      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            aria-label="Close language menu"
            onClick={() => setOpen(false)}
          />
          <ul
            role="listbox"
            className="absolute bottom-full right-0 z-50 mb-2 max-h-72 w-56 overflow-y-auto rounded-lg border bg-white py-1 shadow-xl sm:bottom-auto sm:top-full sm:mb-0 sm:mt-2"
          >
            {locales.map((loc) => (
              <li key={loc.code} role="option" aria-selected={loc.code === locale}>
                <button
                  type="button"
                  onClick={() => switchLocale(loc.code)}
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50",
                    loc.code === locale && "bg-odoo-purple/5 font-medium text-odoo-purple",
                  )}
                >
                  <OdooImage
                    src={flagUrl(loc.flag)}
                    alt=""
                    width={20}
                    height={14}
                    className="rounded-sm object-cover"
                  />
                  <span>{loc.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
