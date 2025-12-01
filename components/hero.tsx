"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { heroSlides } from "@/lib/hero-slides";

export function Hero() {
  const [active, setActive] = useState(0);

  // autoplay suau
  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // 6 segons per slide
    return () => clearInterval(id);
  }, []);

  const slide = heroSlides[active];

  return (
    <section
      id="hero"
      className="min-h-[90vh] border-b border-slate-900 bg-gradient-to-b from-black to-[#050509] flex items-center"
    >
      <div className="mx-auto flex w-full max-w-[120rem] flex-col items-center gap-16 px-6 md:flex-row md:items-center lg:px-12">
        {/* COLUMNA TEXTE (canvia amb el slide) */}
        <div className="flex-1 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            {slide.eyebrow}
          </p>

          <h1 className="mt-5 font-semibold leading-tight text-[clamp(3.4rem,5vw,5.3rem)]">
            {slide.title}{" "}
            <span className="text-red-500">{slide.accent}</span>
          </h1>

          <p className="mt-6 text-sm text-slate-300 md:text-base">
            {slide.description}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={slide.primaryHref}
              className="rounded-full bg-red-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-600"
            >
              {slide.primaryLabel}
            </a>

            {slide.secondaryHref && slide.secondaryLabel && (
              <a
                href={slide.secondaryHref}
                className="rounded-full border border-slate-600 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-300"
              >
                {slide.secondaryLabel}
              </a>
            )}
          </div>
        </div>

        {/* COLUMNA IMATGE – apaisada i protagonista */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative w-full max-w-[560px]">
            {/* Targeta apaisada */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-slate-800 bg-black/40 shadow-2xl">
              <Image
                src={slide.image}
                alt={slide.id}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 560px, 100vw"
                priority
              />
              <p className="absolute bottom-4 left-4 text-[0.7rem] uppercase tracking-[0.2em] text-slate-200/80">
                {slide.caption}
              </p>
            </div>

            {/* Títol curt + punts de navegació */}
            <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
              <span className="max-w-[65%] truncate">
                {slide.title} {slide.accent}
              </span>
              <div className="flex items-center gap-2">
                {heroSlides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setActive(idx)}
                    className={`h-2.5 w-2.5 rounded-full transition-colors ${
                      idx === active
                        ? "bg-red-500"
                        : "bg-slate-600 hover:bg-slate-400"
                    }`}
                    aria-label={`Mostrar slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
