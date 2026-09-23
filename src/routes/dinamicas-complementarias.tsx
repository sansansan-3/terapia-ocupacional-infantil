import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { Search, Star } from "lucide-react";
import { DINAMICAS_COMPLEMENTARIAS } from "@/data/dinamicas";
import { CATEGORIAS, MAPA_CATEGORIAS } from "@/data/categorias";
import type { Dinamica } from "@/data/types";
import { filtrarDinamicas } from "@/lib/filtros";
import { TarjetaDinamica } from "@/components/TarjetaDinamica";
import { FichaDinamica } from "@/components/FichaDinamica";

export const Route = createFileRoute("/dinamicas-complementarias")({
  head: () => ({
    meta: [
      { title: "Dinámicas complementarias · TO Kids" },
      { name: "description", content: "Amplía tus sesiones con nuevas actividades prácticas para terapia ocupacional infantil." },
      { property: "og:title", content: "Dinámicas complementarias · TO Kids" },
      { property: "og:description", content: "Bono premium: 50 dinámicas extra para complementar la biblioteca principal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PaginaComplementarias,
});

const EDADES = Array.from({ length: 10 }, (_, i) => i + 3);
const campo = "w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary";

function PaginaComplementarias() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [edad, setEdad] = useState(0);
  const [dif, setDif] = useState("");
  const [abierta, setAbierta] = useState<Dinamica | null>(null);
  const tarjetas = useRef<Record<string, HTMLButtonElement | null>>({});

  const resultados = useMemo(
    () =>
      filtrarDinamicas(
        DINAMICAS_COMPLEMENTARIAS,
        { q, categoria: cat, edad, dificultad: dif, habilidad: "", orden: "titulo-asc" },
        (id) => MAPA_CATEGORIAS[id as keyof typeof MAPA_CATEGORIAS]?.nombre ?? "",
      ),
    [q, cat, edad, dif],
  );
  const hayFiltros = Boolean(q || cat || edad || dif);
  const limpiar = () => { setQ(""); setCat(""); setEdad(0); setDif(""); };
  const cerrar = () => {
    const id = abierta?.id;
    setAbierta(null);
    if (id) requestAnimationFrame(() => tarjetas.current[id]?.focus());
  };

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wide text-primary">⭐ Bono Premium</p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Dinámicas complementarias</h1>
        <p className="mt-1 text-muted-foreground">Amplía tus sesiones con nuevas actividades prácticas para terapia ocupacional infantil.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {resultados.length} de {DINAMICAS_COMPLEMENTARIAS.length} dinámicas ·{" "}
          <Link
            to="/dinamicas"
            search={{ q: "", cat: "", edad: 0, dif: "", hab: "", orden: "titulo-asc", p: 1, tipo: "todas" }}
            className="font-semibold text-primary underline-offset-2 hover:underline"
          >
            Buscar junto a las dinámicas principales
          </Link>
        </p>
      </header>

      <div className="mb-6 space-y-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="buscar-comp" className="sr-only">Buscar dinámicas complementarias</label>
          <input id="buscar-comp" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar dinámicas…" className="w-full rounded-xl border border-border bg-surface py-3 pl-9 pr-3 text-sm outline-none focus:border-primary" />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="text-xs font-semibold text-muted-foreground">Categoría
            <select value={cat} onChange={(e) => setCat(e.target.value)} className={`mt-1 ${campo}`}>
              <option value="">Todas</option>
              {CATEGORIAS.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </label>
          <label className="text-xs font-semibold text-muted-foreground">Edad
            <select value={edad} onChange={(e) => setEdad(Number(e.target.value))} className={`mt-1 ${campo}`}>
              <option value={0}>Todas</option>
              {EDADES.map((e) => <option key={e} value={e}>{e} años</option>)}
            </select>
          </label>
          <label className="text-xs font-semibold text-muted-foreground">Dificultad
            <select value={dif} onChange={(e) => setDif(e.target.value)} className={`mt-1 ${campo}`}>
              <option value="">Todas</option>
              {["Fácil", "Media", "Avanzada"].map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </label>
        </div>
        {hayFiltros && (
          <button type="button" onClick={limpiar} className="text-sm font-semibold text-primary hover:underline">Limpiar filtros</button>
        )}
      </div>

      {resultados.length === 0 ? (
        <div className="tarjeta p-8 text-center">
          <Star className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
          <h2 className="mt-2 text-lg font-semibold">No hay dinámicas que coincidan</h2>
          <button type="button" onClick={limpiar} className="mt-4 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">Limpiar búsqueda y filtros</button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {resultados.map((d) => (
            <TarjetaDinamica key={d.id} dinamica={d} onAbrir={setAbierta} ref={(el) => { tarjetas.current[d.id] = el; }} />
          ))}
        </div>
      )}

      {abierta && <FichaDinamica dinamica={abierta} onCerrar={cerrar} />}
    </div>
  );
}
