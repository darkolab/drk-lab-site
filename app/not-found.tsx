// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050509] text-slate-100">
      <div className="mx-auto max-w-4xl px-6 py-16 space-y-6">
        <h1 className="text-2xl font-semibold text-red-400">
          Pàgina no trobada
        </h1>

        <p className="text-sm text-slate-300">
          Sembla que aquesta ruta no existeix o el producte s&apos;ha mogut.
        </p>

        <Link
          href="/"
          className="inline-flex rounded-full border border-slate-600 px-4 py-2 text-xs hover:border-slate-300"
        >
          Tornar a l&apos;inici
        </Link>
      </div>
    </main>
  );
}
