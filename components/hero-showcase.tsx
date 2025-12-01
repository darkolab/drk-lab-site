"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = {
  src: string;
  title: string;
  subtitle: string;
};

const slides: Slide[] = [
  {
    src: "/hero/drk-hood-sh7.jpg",
    title: "DRK-HOOD SH7 · Parasol Shinobi 7\"",
    subtitle: "ENCASLLAT PRECÍS · SENSE ADHESIUS",
  },
  {
    src: "/hero/drk-bowens-cap.jpg",
    title: "DRK-CAP LED · Tapes Bowens",
    subtitle: "PROTECCIÓ PER COB LED EN TRANSPORT",
  },
  {
    src: "/hero/drk-sd-cases.jpg",
    title: "DRK-CASE MEDIA · Caixes targetes",
    subtitle: "SD · CFEXPRESS · CFAST · INTERIORS MODULARS",
  },
];

export function HeroShowcase() {
  const [index, setIndex] = useState(0);

  // autoplay suau
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const slide = slides[index];

  return (
    <div className="relative flex items-center justify-center">
      {/* glow de fons */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_transparent_60%)] opacity-70" />

      {/* targeta “diagonal” gran */}
      <div className="relative w-[22rem] h-[28rem] md:w-[26rem] md:h-[32rem] xl:w-[30rem] xl:h-[34rem]">
        {/* marc exterior, girat lleugerament */}
        <div className="absolute inset-0 rounded-[2rem] border border-slate-800/80 bg-gradient-to-br from-slate-900 to-black shadow-[0_0_60px_rgba(15,23,42,0.9)] rotate-[-6deg]" />

        {/* targeta interior, contra-girada per redreçar el contingut */}
        <div className="absolute inset-3 flex flex-col overflow-hidden rounded-[1.7rem] border border-slate-700/80 bg-black/40 rotate-[4deg]">
          {/* imatge */}
          <div className="relative flex-1">
            <Image
              src={slide.src}
              alt={slide.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 22rem, 18rem"
              priority
            />
          </div>

          {/* text sota la imatge */}
          <div className="border-t border-slate-800/80 px-4 py-3 text-[0.7rem] uppercase tracking-[0.18em]">
            <p className="text-[0.65rem] text-sky-300/80">{slide.subtitle}</p>
            <p className="mt-1 text-[0.7rem] text-slate-100">{slide.title}</p>
          </div>
        </div>
      </div>

      {/* punts + títol curt, enganxats a la targeta */}
      <div className="absolute -bottom-7 right-1 flex items-center gap-3 text-[0.65rem] text-slate-400">
        <span className="hidden md:inline-block max-w-[14rem] truncate">
          {slide.title}
        </span>
        <div className="flex gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={[
                "h-2 w-2 rounded-full transition-colors",
                i === index ? "bg-red-500" : "bg-slate-600",
              ].join(" ")}
              aria-label={`Mostrar slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
