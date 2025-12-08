// lib/i18n.ts
import "server-only";

// 👉 Todos los locales soportados
export const locales = ["ca", "es", "en"] as const;
export type Locale = (typeof locales)[number];

// 👉 Locale por defecto
export const DEFAULT_LOCALE: Locale = "ca";

// 👉 Usamos el JSON en inglés como “shape” del diccionario
import type en from "@/locales/en.json";
export type Dictionary = typeof en;

// Loader tipado de cada diccionario
type DictionaryLoader = () => Promise<Dictionary>;

const dictionaries: Record<Locale, DictionaryLoader> = {
  ca: () => import("@/locales/ca.json").then((m) => m.default),
  es: () => import("@/locales/es.json").then((m) => m.default),
  en: () => import("@/locales/en.json").then((m) => m.default),
};

// Normaliza cualquier string a uno de nuestros locales
export function resolveLocale(input?: string | null): Locale {
  if (!input) return DEFAULT_LOCALE;

  const normalized = input.toLowerCase().split("-")[0]; // "es-ES" -> "es"

  if (locales.includes(normalized as Locale)) {
    return normalized as Locale;
  }

  return DEFAULT_LOCALE;
}

// Helper: acepta locale o string crudo
export async function getDictionary(
  localeOrRaw: string | Locale | null,
): Promise<Dictionary> {
  const locale = resolveLocale(
    typeof localeOrRaw === "string" ? localeOrRaw : localeOrRaw ?? undefined,
  );

  return dictionaries[locale]();
}
