"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HeroSlide } from "@/lib/hero-slides";
import type { Locale } from "@/lib/i18n";

export function Hero({ slides, locale }: { slides: HeroSlide[]; locale: Locale }) {
  const [active, setActive] = useState(0);

  // autoplay suau
  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 segons per slide
    return () => clearInterval(id);
  }, [slides.length]);

  const slide = slides[active];

  // Siempre recibe string y siempre devuelve string
  const withLocale = (href: string) => {
    if (href.startsWith("http")) return href;
    if (href.startsWith(`/${locale}`)) return href;
    if (href.startsWith("/")) return `/${locale}${href}`;
    if (href.startsWith("#")) return `/${locale}${href}`;
    return `/${locale}/${href}`;
  };

  // Copias locales para que TS las estreche bien en el condicional
  const secondaryHref = slide.secondaryHref;
  const secondaryLabel = slide.secondaryLabel;

  return (
    <section
      id="hero"
      className="min-h-[90vh] border-b border-slate-900 bg-gradient-to-b from-black to-[#050509]"
    >
      <div className="mx-auto flex w-full max-w-[120rem] flex-col gap-10 px-6 py-10 md:py-84 lg:gap-12 lg:px-12">
        <div className="flex w-full flex-col items-center gap-10 md:flex-row md:items-center md:gap-8 lg:gap-12">
          {/* COLUMNA TEXT (canvia amb el slide) */}
          <div className="w-full max-w-2xl md:flex-[0.55] lg:max-w-none">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
              {slide.eyebrow}
            </p>

            <h1 className="mt-5 break-words text-[clamp(2.4rem,5.5vw,5.3rem)] font-semibold leading-tight">
              {slide.title} <span className="text-red-500">{slide.accent}</span>
            </h1>

            <p className="mt-6 text-sm text-slate-300 md:text-base">
              {slide.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              {/* primaryHref asumimos que siempre viene definido en los slides */}
              <Link
                href={withLocale(slide.primaryHref)}
                className="rounded-full bg-red-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-600"
              >
                {slide.primaryLabel}
              </Link>

              {secondaryHref && secondaryLabel && (
                <Link
                  href={withLocale(secondaryHref)}
                  className="rounded-full border border-slate-600 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-300"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>

          {/* COLUMNA IMATGE – apaisada i protagonista */}
          <div className="w-full md:flex-[0.45] md:max-w-[620px] lg:max-w-[720px]">
            <div className="relative w-full">
              {/* Targeta apaisada */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-800 bg-black/40 shadow-2xl sm:aspect-[16/10]">
                <Image
                  src={slide.image}
                  alt={slide.id}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 640px, (min-width: 1024px) 560px, 100vw"
                  priority
                />
                <p className="absolute bottom-4 left-4 text-[0.7rem] uppercase tracking-[0.2em] text-slate-200/80">
                  {slide.caption}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Punts de navegació centrats sota tot el contingut */}
        <div className="flex w-full justify-center">
          <div className="flex items-center gap-3">
            {slides.map((s, idx) => {
              const isActive = idx === active;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(idx)}
                  className={`transition-all ${
                    isActive
                      ? "h-4 w-8 rounded-full bg-red-500"
                      : "h-3 w-3 rounded-full bg-slate-600 hover:bg-slate-400"
                  }`}
                  aria-label={`Mostrar slide ${idx + 1}`}
                  aria-pressed={isActive}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
