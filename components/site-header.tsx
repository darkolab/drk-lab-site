"use client";

// components/site-header.tsx
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-black/40 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* LOGO IZQUIERDA */}
        <Link
          href="/"
          className="flex items-center gap-3 sm:gap-6"
          onClick={closeMenu}
          aria-label="Inici"
        >
          <div className="relative h-10 w-32 sm:h-14 sm:w-44 md:h-20 md:w-56">
            <Image
              src="/drklab_logo.png"
              alt="DRK LAB"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* NAV */}
        <div className="flex items-center gap-4">
          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex md:text-base">
            <Link href="/services" className="tracking-wide hover:text-white">
              Serveis
            </Link>

            <Link href="/products" className="tracking-wide hover:text-white">
              Productes
            </Link>

            <Link href="/custom" className="tracking-wide hover:text-white">
              A mida
            </Link>

            <Link href="/about" className="tracking-wide hover:text-white">
              Sobre DRK LAB
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-slate-600 px-4 py-1 text-sm hover:border-slate-300"
            >
              Contacte
            </Link>

            {/* SHOP – DESACTIVADO */}
            <span
              className="ml-2 rounded-full border border-slate-700/70 px-4 py-1 text-sm text-slate-500 opacity-70"
            >
              Shop · pròximament
            </span>
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700/70 text-slate-200 transition hover:border-slate-400 md:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Tancar menú" : "Obrir menú"}
          >
            <span className="relative flex h-5 w-5 items-center justify-center" aria-hidden>
              <span
                className={`block h-0.5 w-full rounded-full bg-current transition-transform duration-200 ${
                  isOpen ? "translate-y-[6px] rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                className={`block h-0.5 w-full rounded-full bg-current transition-opacity duration-200 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-full rounded-full bg-current transition-transform duration-200 ${
                  isOpen ? "-translate-y-[6px] -rotate-45" : "translate-y-[4px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div
        id="mobile-nav"
        className={`md:hidden transition-[max-height,opacity] duration-200 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden border-t border-white/5 bg-black/80 backdrop-blur`}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 pb-6 pt-4 text-base font-medium text-slate-200">
          <Link
            href="/services"
            className="rounded-lg px-3 py-2 tracking-wide hover:bg-white/5 hover:text-white"
            onClick={closeMenu}
          >
            Serveis
          </Link>
          <Link
            href="/products"
            className="rounded-lg px-3 py-2 tracking-wide hover:bg-white/5 hover:text-white"
            onClick={closeMenu}
          >
            Productes
          </Link>
          <Link
            href="/custom"
            className="rounded-lg px-3 py-2 tracking-wide hover:bg-white/5 hover:text-white"
            onClick={closeMenu}
          >
            A mida
          </Link>
          <Link
            href="/about"
            className="rounded-lg px-3 py-2 tracking-wide hover:bg-white/5 hover:text-white"
            onClick={closeMenu}
          >
            Sobre DRK LAB
          </Link>
          <Link
            href="/contact"
            className="w-fit rounded-full border border-slate-600 px-4 py-2 text-sm hover:border-slate-300"
            onClick={closeMenu}
          >
            Contacte
          </Link>
          <span className="w-fit rounded-full border border-slate-700/70 px-4 py-2 text-sm text-slate-500 opacity-70">
            Shop · pròximament
          </span>
        </div>
      </div>
    </header>
  );
}
