export const locales = ["ca", "es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ca";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function resolveLocale(value: string): Locale {
  return isLocale(value) ? (value as Locale) : defaultLocale;
}

const dictionaries = {
  ca: () => import("@/locales/ca.json").then((module) => module.default),
  es: () => import("@/locales/es.json").then((module) => module.default),
  en: () => import("@/locales/en.json").then((module) => module.default),
};

export async function getDictionary(locale: Locale) {
  const loadDictionary = dictionaries[locale] ?? dictionaries[defaultLocale];
  return loadDictionary();
}
