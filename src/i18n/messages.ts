import type { LocaleCode } from "./config";

export type Messages = {
  meta: { title: string; description: string };
  skip: string;
  nav: {
    apps: string;
    industries: string;
    community: string;
    pricing: string;
    help: string;
    signIn: string;
    tryFree: string;
    viewAllApps: string;
    browseIndustries: string;
  };
  hero: {
    title: string;
    highlight: string;
    subtitle: string;
    affordable: string;
    price: string;
    forAllApps: string;
    startFree: string;
    meetAdvisor: string;
    companySize: string;
  };
  home: {
    viewAllApps: string;
    imagine: string;
    imagineLead: string;
    imagineBody: string;
    quote: string;
    quoteAuthor: string;
    levelUp: string;
    productivity: string;
    productivityBody: string;
    compareSap: string;
    nativeAi: string;
    nativeAiBody: string;
    enterprise: string;
    testimonialTitle: string;
    testimonialUsers: string;
    testimonialQuote: string;
    testimonialName: string;
    testimonialRole: string;
  };
  cta: {
    title: string;
    startFree: string;
    subtitle: string;
  };
  footer: {
    community: string;
    openSource: string;
    services: string;
    about: string;
    blurb: string;
  };
  lang: { label: string };
};

const en: Messages = {
  meta: {
    title: "Open Source ERP and CRM | Odoo",
    description:
      "Odoo is a suite of open source business apps that cover all your company needs: CRM, eCommerce, accounting, inventory, point of sale, project management, etc.",
  },
  skip: "Skip to Content",
  nav: {
    apps: "Apps",
    industries: "Industries",
    community: "Community",
    pricing: "Pricing",
    help: "Help",
    signIn: "Sign in",
    tryFree: "Try it free",
    viewAllApps: "View all Apps",
    browseIndustries: "Browse all Industries",
  },
  hero: {
    title: "All your business on",
    highlight: "one platform.",
    subtitle: "Simple, efficient, yet",
    affordable: "affordable!",
    price: "US$ 24.90 / month",
    forAllApps: "for ALL apps",
    startFree: "Start now - It's free",
    meetAdvisor: "Meet an advisor",
    companySize: "Choose your company size",
  },
  home: {
    viewAllApps: "View all Apps",
    imagine: "Imagine without odoo",
    imagineLead:
      "Imagine a vast collection of business apps at your disposal. Got something to improve? There is an app for that.",
    imagineBody:
      "Each app simplifies a process and empowers more people. Imagine the impact when everyone gets the right tool for the job, tailored with native AI.",
    quote: "If you simplify everything, you can do anything!",
    quoteAuthor: "— Bill McDermott, former CEO of SAP",
    levelUp: "Level up your quality of work",
    productivity: "Optimized for productivity",
    productivityBody:
      "Experience true speed, reduced data entry, smart AI, and a fast UI. All operations are done in less than 90ms — faster than a blink.",
    compareSap: "Compare with SAP",
    nativeAi: "Native AI across all your business",
    nativeAiBody:
      "Automate work, tailor features, perform deep research, and scale without limits.",
    enterprise: "Enterprise software done right.",
    testimonialTitle: "A unique value proposition",
    testimonialUsers: "Join 15 million happy users",
    testimonialQuote:
      "The processing time for accounting documents has been noticeably reduced, in certain cases even from 2 days to only 5 hours.",
    testimonialName: "Harry Van Donink",
    testimonialRole: "CEO KPMG Belgium",
  },
  cta: {
    title: "Unleash your growth potential",
    startFree: "Start now - It's free",
    subtitle: "No credit card required · Instant access",
  },
  footer: {
    community: "Community",
    openSource: "Open Source",
    services: "Services",
    about: "About us",
    blurb:
      "Odoo is a suite of open source business apps that cover all your company needs: CRM, eCommerce, accounting, inventory, point of sale, project management, etc.",
  },
  lang: { label: "Language" },
};

const fr_FR: Messages = {
  ...en,
  meta: {
    title: "ERP et CRM Open Source | Odoo",
    description:
      "Odoo est une suite d'applications professionnelles open source couvrant tous les besoins de votre entreprise.",
  },
  nav: {
    ...en.nav,
    apps: "Applications",
    industries: "Secteurs",
    community: "Communauté",
    pricing: "Tarifs",
    help: "Aide",
    signIn: "Se connecter",
    tryFree: "Essai gratuit",
    viewAllApps: "Voir toutes les applications",
    browseIndustries: "Parcourir tous les secteurs",
  },
  hero: {
    title: "Tout votre business sur",
    highlight: "une plateforme.",
    subtitle: "Simple, efficace, et",
    affordable: "abordable !",
    price: "24,90 $ US / mois",
    forAllApps: "pour TOUTES les applications",
    startFree: "Commencer - C'est gratuit",
    meetAdvisor: "Rencontrer un conseiller",
    companySize: "Choisissez la taille de votre entreprise",
  },
  home: {
    ...en.home,
    viewAllApps: "Voir toutes les applications",
    imagine: "Imaginez sans odoo",
    levelUp: "Améliorez la qualité de votre travail",
    enterprise: "Un logiciel d'entreprise bien fait.",
    testimonialUsers: "Rejoignez 15 millions d'utilisateurs satisfaits",
  },
  cta: {
    title: "Libérez votre potentiel de croissance",
    startFree: "Commencer - C'est gratuit",
    subtitle: "Sans carte de crédit · Accès instantané",
  },
  footer: {
    ...en.footer,
    community: "Communauté",
    openSource: "Open Source",
    services: "Services",
    about: "À propos",
  },
  lang: { label: "Langue" },
};

const de_DE: Messages = {
  ...en,
  meta: {
    title: "Open Source ERP und CRM | Odoo",
    description:
      "Odoo ist eine Suite von Open-Source-Business-Apps für alle Unternehmensanforderungen.",
  },
  nav: {
    ...en.nav,
    apps: "Apps",
    industries: "Branchen",
    community: "Community",
    pricing: "Preise",
    help: "Hilfe",
    signIn: "Anmelden",
    tryFree: "Kostenlos testen",
    viewAllApps: "Alle Apps anzeigen",
    browseIndustries: "Alle Branchen",
  },
  hero: {
    title: "Ihr gesamtes Business auf",
    highlight: "einer Plattform.",
    subtitle: "Einfach, effizient und",
    affordable: "erschwinglich!",
    price: "24,90 US$ / Monat",
    forAllApps: "für ALLE Apps",
    startFree: "Jetzt starten - Kostenlos",
    meetAdvisor: "Berater treffen",
    companySize: "Unternehmensgröße wählen",
  },
  cta: {
    title: "Entfalten Sie Ihr Wachstumspotenzial",
    startFree: "Jetzt starten - Kostenlos",
    subtitle: "Keine Kreditkarte · Sofortiger Zugang",
  },
  lang: { label: "Sprache" },
};

const es_ES: Messages = {
  ...en,
  meta: {
    title: "ERP y CRM de código abierto | Odoo",
    description:
      "Odoo es una suite de aplicaciones empresariales de código abierto para todas las necesidades de su empresa.",
  },
  nav: {
    ...en.nav,
    apps: "Aplicaciones",
    industries: "Sectores",
    community: "Comunidad",
    pricing: "Precios",
    help: "Ayuda",
    signIn: "Iniciar sesión",
    tryFree: "Pruébalo gratis",
    viewAllApps: "Ver todas las aplicaciones",
    browseIndustries: "Ver todos los sectores",
  },
  hero: {
    title: "Todo su negocio en",
    highlight: "una plataforma.",
    subtitle: "Simple, eficiente y",
    affordable: "¡asequible!",
    price: "24,90 US$ / mes",
    forAllApps: "para TODAS las apps",
    startFree: "Empezar ahora - Es gratis",
    meetAdvisor: "Hablar con un asesor",
    companySize: "Elija el tamaño de su empresa",
  },
  cta: {
    title: "Libere su potencial de crecimiento",
    startFree: "Empezar ahora - Es gratis",
    subtitle: "Sin tarjeta de crédito · Acceso instantáneo",
  },
  lang: { label: "Idioma" },
};

const nl_NL: Messages = {
  ...en,
  nav: { ...en.nav, pricing: "Prijzen", help: "Help", signIn: "Inloggen", tryFree: "Gratis proberen" },
  hero: {
    title: "Al uw business op",
    highlight: "één platform.",
    subtitle: "Eenvoudig, efficiënt en",
    affordable: "betaalbaar!",
    price: "US$ 24,90 / maand",
    forAllApps: "voor ALLE apps",
    startFree: "Start nu - Het is gratis",
    meetAdvisor: "Ontmoet een adviseur",
    companySize: "Kies uw bedrijfsgrootte",
  },
  lang: { label: "Taal" },
};

const pt_BR: Messages = {
  ...en,
  nav: { ...en.nav, pricing: "Preços", signIn: "Entrar", tryFree: "Experimente grátis" },
  hero: {
    title: "Todo o seu negócio em",
    highlight: "uma plataforma.",
    subtitle: "Simples, eficiente e",
    affordable: "acessível!",
    price: "US$ 24,90 / mês",
    forAllApps: "para TODOS os apps",
    startFree: "Comece agora - É grátis",
    meetAdvisor: "Fale com um consultor",
    companySize: "Escolha o tamanho da empresa",
  },
  lang: { label: "Idioma" },
};

const it_IT: Messages = {
  ...en,
  nav: { ...en.nav, pricing: "Prezzi", signIn: "Accedi", tryFree: "Prova gratis" },
  hero: {
    title: "Tutto il tuo business su",
    highlight: "una piattaforma.",
    subtitle: "Semplice, efficiente e",
    affordable: "conveniente!",
    price: "24,90 US$ / mese",
    forAllApps: "per TUTTE le app",
    startFree: "Inizia ora - È gratis",
    meetAdvisor: "Incontra un consulente",
    companySize: "Scegli la dimensione aziendale",
  },
  lang: { label: "Lingua" },
};

const zh_CN: Messages = {
  ...en,
  nav: { ...en.nav, pricing: "价格", help: "帮助", signIn: "登录", tryFree: "免费试用" },
  hero: {
    title: "所有业务尽在",
    highlight: "一个平台。",
    subtitle: "简单、高效、",
    affordable: "实惠！",
    price: "每月 24.90 美元",
    forAllApps: "包含所有应用",
    startFree: "立即开始 - 免费",
    meetAdvisor: "咨询顾问",
    companySize: "选择公司规模",
  },
  cta: {
    title: "释放您的增长潜力",
    startFree: "立即开始 - 免费",
    subtitle: "无需信用卡 · 即时访问",
  },
  lang: { label: "语言" },
};

const ja_JP: Messages = {
  ...en,
  nav: { ...en.nav, pricing: "料金", help: "ヘルプ", signIn: "ログイン", tryFree: "無料で試す" },
  hero: {
    title: "すべてのビジネスを",
    highlight: "ひとつのプラットフォームに。",
    subtitle: "シンプルで効率的、そして",
    affordable: "手頃な価格！",
    price: "月額 24.90 US$",
    forAllApps: "全アプリ込み",
    startFree: "今すぐ始める - 無料",
    meetAdvisor: "アドバイザーに相談",
    companySize: "会社規模を選択",
  },
  lang: { label: "言語" },
};

const ar: Messages = {
  ...en,
  nav: { ...en.nav, pricing: "الأسعار", help: "المساعدة", signIn: "تسجيل الدخول", tryFree: "جرّبه مجانًا" },
  hero: {
    title: "كل أعمالك على",
    highlight: "منصة واحدة.",
    subtitle: "بسيط وفعّال و",
    affordable: "بأسعار معقولة!",
    price: "24.90 دولار أمريكي / شهر",
    forAllApps: "لجميع التطبيقات",
    startFree: "ابدأ الآن - مجانًا",
    meetAdvisor: "قابل مستشارًا",
    companySize: "اختر حجم شركتك",
  },
  lang: { label: "اللغة" },
};

const overrides: Partial<Record<LocaleCode, Messages>> = {
  fr_FR,
  de_DE,
  es_ES,
  es: es_ES,
  nl_NL,
  pt_BR,
  it_IT,
  zh_CN,
  zh_TW: zh_CN,
  ja_JP,
  ar,
};

export function getDictionary(locale: LocaleCode): Messages {
  return overrides[locale] ?? en;
}
