import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
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
      <body className="bg-[#050509] text-slate-100">
        {/* BANNER FIRST LIGHT */}
        <div className="sticky top-30 z-[60] w-full border-b border-red-500/60 bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-black">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] md:text-xs">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-300" />
              <span>DRK LAB · First Light build</span>
            </span>

            <span className="hidden text-black/80 md:inline">
              Web en beta · contingut en construcció · feedback benvingut
            </span>
          </div>
        </div>

        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
