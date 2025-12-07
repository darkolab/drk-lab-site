// lib/i18n.ts
import ca from "@/locales/ca.json";
import es from "@/locales/es.json";
import en from "@/locales/en.json";

export const locales = ["ca", "es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ca";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value as Locale);
}

// Los diccionarios se cargan de forma ESTÁTICA y SINCRONA
const dictionaries = {
  ca,
  es,
  en,
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/**
 * Normaliza un string cualquiera a un Locale válido del array `locales`.
 * Si no coincide con nada, cae a `defaultLocale`.
 */
export function resolveLocale(rawLocale: string | undefined | null): Locale {
  if (!rawLocale) return defaultLocale;

  const normalized = rawLocale.toLowerCase().split("-")[0];

  if (isLocale(normalized)) {
    return normalized;
  }

  return defaultLocale;
}
