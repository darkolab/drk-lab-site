// app/layout.tsx
import type { Metadata } from "next";
import type React from "react";

import "./globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ca">
      <body className="bg-[#050509] text-slate-100">{children}</body>
    </html>
  );
}
