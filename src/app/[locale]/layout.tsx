import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { getLocaleDefinition, isValidLocale, localeCodes } from "@/i18n/config";
import { getDictionary } from "@/i18n/messages";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return localeCodes.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const localeDef = getLocaleDefinition(localeParam);
  const messages = getDictionary(localeParam);

  return (
    <I18nProvider locale={localeParam} messages={messages}>
      <div
        className="flex min-h-full flex-col"
        lang={localeParam === "en" ? "en" : localeParam}
        dir={localeDef.dir}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-odoo-purple focus:px-4 focus:py-2 focus:text-white"
        >
          {messages.skip}
        </a>
        <Header />
        <div className="fixed bottom-4 right-4 z-50 lg:bottom-6 lg:right-6">
          <LanguageSwitcher />
        </div>
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
