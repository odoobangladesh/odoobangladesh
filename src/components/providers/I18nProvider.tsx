"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { LocaleCode } from "@/i18n/config";
import type { Messages } from "@/i18n/messages";
import { localizedPath } from "@/i18n/localized-path";

const LocaleContext = createContext<LocaleCode>(defaultLocaleFallback());
const MessagesContext = createContext<Messages | null>(null);

function defaultLocaleFallback(): LocaleCode {
  return "en";
}

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: LocaleCode;
  messages: Messages;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>
      <MessagesContext.Provider value={messages}>{children}</MessagesContext.Provider>
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleCode {
  return useContext(LocaleContext);
}

export function useMessages(): Messages {
  const messages = useContext(MessagesContext);
  if (!messages) throw new Error("useMessages must be used within I18nProvider");
  return messages;
}

export function useLocalizedHref(): (path: string) => string {
  const locale = useLocale();
  return (path: string) => localizedPath(path, locale);
}
