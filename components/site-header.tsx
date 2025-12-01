// components/site-header.tsx
import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-black/40 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-8xl items-center justify-between px-6 lg:px-10">

        {/* LOGO IZQUIERDA */}
        <Link href="/" className="flex items-center gap-6">
          <div className="relative h-16 w-44 md:h-20 md:w-56">
            <Image
              src="/drklab_logo.png"
              alt="DRK LAB"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* NAV DERECHA */}
        <nav className="flex items-center gap-8 text-sm md:text-base text-slate-200 font-medium">

          <Link href="/services" className="hover:text-white tracking-wide">
            Serveis
          </Link>

          <Link href="/products" className="hover:text-white tracking-wide">
            Productes
          </Link>

          <Link href="/custom" className="hover:text-white tracking-wide">
            A mida
          </Link>

          <Link href="/about" className="hover:text-white tracking-wide">
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
            className="
              ml-4
              rounded-full
              border border-slate-700/70
              px-4 py-1
              text-sm
              text-slate-500
              opacity-70
              select-none
              cursor-not-allowed
            "
          >
            Shop · pròximament
          </span>
        </nav>

      </div>
    </header>
  );
}
