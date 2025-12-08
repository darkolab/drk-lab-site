// app/layout.tsx
import type { Metadata } from "next";
import { headers, cookies } from "next/headers";
import type React from "react";
import "./globals.css";
import { DEFAULT_LOCALE, resolveLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "DRK LAB · Enginyeria per a rodatges",
  description: "DRK LAB dissenya i fabrica accessoris tècnics…",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32" },
      { url: "/favicon-48.png", sizes: "48x48" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const headerList = await headers();

  const detectedLocale = resolveLocale(
    cookieStore.get("NEXT_LOCALE")?.value ?? headerList.get("accept-language"),
  );

  return (
    <html lang={detectedLocale ?? DEFAULT_LOCALE}>
      <body className="bg-[#050509] text-slate-100">{children}</body>
    </html>
  );
}
