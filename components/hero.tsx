"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HeroSlide } from "@/lib/hero-slides";
import type { Locale } from "@/lib/i18n";

const TRANSITION_MS = 650;
const AUTOPLAY_MS = 7500;

export function Hero({ slides, locale }: { slides: HeroSlide[]; locale: Locale }) {
  const safeSlides = useMemo(() => slides ?? [], [slides]);
  const hasSlides = safeSlides.length > 0;

  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [animKey, setAnimKey] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const timeoutRef = useRef<number | null>(null);

  // Detecta “prefers-reduced-motion”
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(media.matches);
    onChange();
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  const withLocale = (href: string) => {
    if (href.startsWith("http")) return href;
    if (href.startsWith(`/${locale}`)) return href;
    if (href.startsWith("/")) return `/${locale}${href}`;
    if (href.startsWith("#")) return `/${locale}${href}`;
    return `/${locale}/${href}`;
  };

  const goTo = (nextIndex: number) => {
    if (!hasSlides) return;

    const clamped = ((nextIndex % safeSlides.length) + safeSlides.length) % safeSlides.length;
    if (clamped === active) return;

    const dir: 1 | -1 = clamped > active ? 1 : -1;

    if (reduceMotion) {
      setPrev(null);
      setDirection(dir);
      setActive(clamped);
      setAnimKey((k) => k + 1);
      return;
    }

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

    setDirection(dir);
    setPrev(active);
    setActive(clamped);
    setAnimKey((k) => k + 1);

    timeoutRef.current = window.setTimeout(() => {
      setPrev(null);
      timeoutRef.current = null;
    }, TRANSITION_MS);
  };

  // Autoplay
  useEffect(() => {
    if (!hasSlides) return;
    const id = window.setInterval(() => {
      goTo(active + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasSlides, active, reduceMotion]);

  const activeSlide = hasSlides ? safeSlides[active] : null;
  const prevSlide = prev !== null && hasSlides ? safeSlides[prev] : null;

  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] items-center overflow-hidden border-b border-slate-900 bg-black"
    >
      {/* Backdrop sobrio (uniforme + cine) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* Base uniforme */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050509] to-black" />

        {/* Glow rojo MUY sutil y controlado */}
        <div className="absolute left-[10%] top-[18%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.08),_transparent_68%)] blur-3xl" />

        {/* Vignette suave */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.92)_100%)]" />

        {/* Grain finito (casi invisible) */}
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_5px)]" />
      </div>

      <div className="mx-auto flex w-full max-w-[120rem] flex-col gap-10 px-6 py-10 md:py-24 lg:gap-12 lg:px-12">
        {/* Escena doble capa */}
        <div className="relative w-full">
          {/* Capa saliente */}
          {prevSlide && (
            <div
              key={`prev-${animKey}`}
              className={[
                "absolute inset-0",
                "will-change-transform",
                direction === 1
                  ? "animate-[heroOutLeft_650ms_cubic-bezier(0.16,1,0.3,1)_both]"
                  : "animate-[heroOutRight_650ms_cubic-bezier(0.16,1,0.3,1)_both]",
              ].join(" ")}
              aria-hidden
            >
              <HeroFrame slide={prevSlide} locale={locale} withLocale={withLocale} />
            </div>
          )}

          {/* Capa entrante */}
          {activeSlide && (
            <div
              key={`next-${animKey}`}
              className={[
                "relative",
                "will-change-transform",
                prevSlide
                  ? direction === 1
                    ? "animate-heroInRight animate-[heroInRight_650ms_cubic-bezier(0.16,1,0.3,1)_both]"
                    : "animate-heroInLeft animate-[heroInLeft_650ms_cubic-bezier(0.16,1,0.3,1)_both]"
                  : "",
              ].join(" ")}
            >
              <HeroFrame slide={activeSlide} locale={locale} withLocale={withLocale} />
            </div>
          )}
        </div>

        {/* Dots molones */}
        <div className="flex w-full justify-center">
          <div className="rounded-full border border-slate-800 bg-black/40 px-4 py-2 backdrop-blur">
            <div className="flex items-center gap-3">
              {safeSlides.map((s, idx) => {
                const isActive = idx === active;
                return (
                  <button
                    key={s.id}
                    onClick={() => goTo(idx)}
                    className={`transition-all ${
                      isActive
                        ? "h-3.5 w-8 rounded-full bg-red-500"
                        : "h-2.5 w-2.5 rounded-full bg-slate-600 hover:bg-slate-400"
                    }`}
                    aria-label={`Mostrar slide ${idx + 1}`}
                    aria-pressed={isActive}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* In/Out con overshoot suave + blur más “cine” */
        @keyframes heroInRight {
          0% {
            opacity: 0;
            transform: translateX(38px) scale(0.992);
            filter: blur(3px);
          }
          70% {
            opacity: 1;
            transform: translateX(-2px) scale(1.002);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
        }
        @keyframes heroInLeft {
          0% {
            opacity: 0;
            transform: translateX(-38px) scale(0.992);
            filter: blur(3px);
          }
          70% {
            opacity: 1;
            transform: translateX(2px) scale(1.002);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
        }
        @keyframes heroOutLeft {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-32px) scale(0.995);
            filter: blur(3px);
          }
        }
        @keyframes heroOutRight {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
          100% {
            opacity: 0;
            transform: translateX(32px) scale(0.995);
            filter: blur(3px);
          }
        }

        /* Micro-parallax interno en la imagen (solo cuando entra) */
        :global(.hero-card) {
          transform: translateZ(0);
        }

        :global(.animate-heroInRight .hero-media) {
          animation: mediaInRight 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        :global(.animate-heroInLeft .hero-media) {
          animation: mediaInLeft 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes mediaInRight {
          0% {
            transform: translateX(12px) scale(1.012);
            filter: blur(1px);
          }
          100% {
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
        }
        @keyframes mediaInLeft {
          0% {
            transform: translateX(-12px) scale(1.012);
            filter: blur(1px);
          }
          100% {
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
        }
      `}</style>
    </section>
  );
}

function HeroFrame({
  slide,
  locale,
  withLocale,
}: {
  slide: HeroSlide;
  locale: Locale;
  withLocale: (href: string) => string;
}) {
  const secondaryHref = slide.secondaryHref;
  const secondaryLabel = slide.secondaryLabel;

  return (
    <div className="flex w-full flex-col items-center gap-12 md:flex-row md:items-center md:gap-10 lg:gap-12">
      {/* Texto */}
      <div className="w-full max-w-2xl md:flex-[0.55] lg:max-w-none">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{slide.eyebrow}</p>

          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-slate-200 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" aria-hidden />
            Build in progress
          </span>
        </div>

        <h1 className="mt-5 break-words text-[clamp(2.4rem,5.5vw,5.3rem)] font-semibold leading-tight text-white">
          {slide.title} <span className="text-red-500">{slide.accent}</span>
        </h1>

        <p className="mt-6 text-sm text-slate-300 md:text-base">{slide.description}</p>

        <div className="mt-9 flex flex-wrap gap-4">
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

        <div className="mt-8 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.22em] text-slate-500">
          <span className="h-px w-10 bg-slate-700/70" aria-hidden />
          DRK LAB · FIRST LIGHT BUILD · BCN
        </div>
      </div>

      {/* Imagen */}
      <div className="w-full md:flex-[0.45] md:max-w-[620px] lg:max-w-[760px]">
        <div className="relative w-full">
          <div className="hero-card relative aspect-[16/10] overflow-hidden rounded-3xl border border-slate-800 bg-black/40 shadow-2xl">
            <Image
              src={slide.image}
              alt={slide.id}
              fill
              className="hero-media object-cover"
              sizes="(min-width: 1280px) 720px, (min-width: 1024px) 620px, 100vw"
              priority
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/25" />

            <p className="absolute bottom-4 left-4 text-[0.7rem] uppercase tracking-[0.2em] text-slate-200/80">
              {slide.caption}
            </p>

            <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-slate-200 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" aria-hidden />
              {slide.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
