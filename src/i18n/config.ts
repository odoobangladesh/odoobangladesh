export const defaultLocale = "en" as const;

export type LocaleCode =
  | "en"
  | "ar"
  | "ca_ES"
  | "cs_CZ"
  | "da_DK"
  | "de_DE"
  | "es"
  | "es_ES"
  | "fi_FI"
  | "fr_FR"
  | "hi_IN"
  | "id_ID"
  | "it_IT"
  | "ja_JP"
  | "ko_KR"
  | "lt_LT"
  | "nl_NL"
  | "pl_PL"
  | "pt_BR"
  | "ro_RO"
  | "ru_RU"
  | "sk_SK"
  | "sl_SI"
  | "sv_SE"
  | "th_TH"
  | "tr_TR"
  | "uk_UA"
  | "vi_VN"
  | "zh_CN"
  | "zh_TW";

export type LocaleDefinition = {
  code: LocaleCode;
  label: string;
  englishName: string;
  flag: string;
  dir: "ltr" | "rtl";
};

/** Matches odoo.com URL prefixes (English has no prefix). */
export const locales: LocaleDefinition[] = [
  { code: "en", label: "English", englishName: "English", flag: "us", dir: "ltr" },
  { code: "ar", label: "الْعَرَبيّة", englishName: "Arabic", flag: "ar", dir: "rtl" },
  { code: "ca_ES", label: "Català", englishName: "Catalan", flag: "es", dir: "ltr" },
  { code: "cs_CZ", label: "Čeština", englishName: "Czech", flag: "cz", dir: "ltr" },
  { code: "da_DK", label: "Dansk", englishName: "Danish", flag: "dk", dir: "ltr" },
  { code: "de_DE", label: "Deutsch", englishName: "German", flag: "de", dir: "ltr" },
  { code: "es", label: "Español", englishName: "Spanish (LATAM)", flag: "es", dir: "ltr" },
  { code: "es_ES", label: "Español", englishName: "Spanish", flag: "es", dir: "ltr" },
  { code: "fi_FI", label: "Suomi", englishName: "Finnish", flag: "fi", dir: "ltr" },
  { code: "fr_FR", label: "Français", englishName: "French", flag: "fr", dir: "ltr" },
  { code: "hi_IN", label: "हिंदी", englishName: "Hindi", flag: "in", dir: "ltr" },
  { code: "id_ID", label: "Bahasa Indonesia", englishName: "Indonesian", flag: "id", dir: "ltr" },
  { code: "it_IT", label: "Italiano", englishName: "Italian", flag: "it", dir: "ltr" },
  { code: "ja_JP", label: "日本語", englishName: "Japanese", flag: "jp", dir: "ltr" },
  { code: "ko_KR", label: "한국어 (KR)", englishName: "Korean", flag: "kr", dir: "ltr" },
  { code: "lt_LT", label: "Lietuvių kalba", englishName: "Lithuanian", flag: "lt", dir: "ltr" },
  { code: "nl_NL", label: "Nederlands", englishName: "Dutch", flag: "nl", dir: "ltr" },
  { code: "pl_PL", label: "Język polski", englishName: "Polish", flag: "pl", dir: "ltr" },
  { code: "pt_BR", label: "Português (BR)", englishName: "Portuguese (BR)", flag: "br", dir: "ltr" },
  { code: "ro_RO", label: "română", englishName: "Romanian", flag: "ro", dir: "ltr" },
  { code: "ru_RU", label: "русский язык", englishName: "Russian", flag: "ru", dir: "ltr" },
  { code: "sk_SK", label: "Slovenský jazyk", englishName: "Slovak", flag: "sk", dir: "ltr" },
  { code: "sl_SI", label: "Slovenščina", englishName: "Slovenian", flag: "si", dir: "ltr" },
  { code: "sv_SE", label: "Svenska", englishName: "Swedish", flag: "se", dir: "ltr" },
  { code: "th_TH", label: "ภาษาไทย", englishName: "Thai", flag: "th", dir: "ltr" },
  { code: "tr_TR", label: "Türkçe", englishName: "Turkish", flag: "tr", dir: "ltr" },
  { code: "uk_UA", label: "українська", englishName: "Ukrainian", flag: "ua", dir: "ltr" },
  { code: "vi_VN", label: "Tiếng Việt", englishName: "Vietnamese", flag: "vn", dir: "ltr" },
  { code: "zh_CN", label: "简体中文", englishName: "Chinese (Simplified)", flag: "cn", dir: "ltr" },
  { code: "zh_TW", label: "繁體中文 (台灣)", englishName: "Chinese (Traditional)", flag: "tw", dir: "ltr" },
];

export const localeCodes = locales.map((l) => l.code);

export function getLocaleDefinition(code: string): LocaleDefinition {
  return locales.find((l) => l.code === code) ?? locales[0];
}

export function isValidLocale(code: string): code is LocaleCode {
  return localeCodes.includes(code as LocaleCode);
}
