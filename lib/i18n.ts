// lib/i18n.ts
import "server-only";

export const locales = ["ca", "es", "en"] as const;
export type Locale = (typeof locales)[number];

export const DEFAULT_LOCALE: Locale = "ca";

const dictionaries: Record<Locale, () => Promise<any>> = {
  ca: () => import("@/locales/ca.json").then((m) => m.default),
  es: () => import("@/locales/es.json").then((m) => m.default),
  en: () => import("@/locales/en.json").then((m) => m.default),
};

// Normaliza cualquier string a uno de nuestros locales
export function resolveLocale(input?: string | null): Locale {
  if (!input) return DEFAULT_LOCALE;

  const normalized = input.toLowerCase().split("-")[0] as Locale;
  if (locales.includes(normalized)) return normalized;

  return DEFAULT_LOCALE;
}

// Helper cómodo: acepta string, Locale o nada
export async function getDictionary(
  localeOrRaw?: string | Locale | null,
) {
  const locale = resolveLocale(
    typeof localeOrRaw === "string"
      ? localeOrRaw
      : (localeOrRaw as Locale | undefined),
  );

  return dictionaries[locale]();
}
