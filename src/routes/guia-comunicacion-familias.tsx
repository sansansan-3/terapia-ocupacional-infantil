import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import {
  CATEGORIAS_GUIA,
  MAPA_CATEGORIAS_GUIA,
  RECURSOS_COMUNICACION,
  type CategoriaGuiaId,
  type RecursoComunicacion,
} from "@/data/guia-comunicacion-familias";
import { normalizar } from "@/lib/texto";
import { TarjetaRecurso, DetalleRecurso } from "@/components/RecursoComunicacion";

export const Route = createFileRoute("/guia-comunicacion-familias")({
  head: () => ({
    meta: [
      { title: "Guía de comunicación con familias · TO Kids" },
      { name: "description", content: "Mensajes preparados para compartir avances, recomendaciones y observaciones con las familias." },
      { property: "og:title", content: "Guía de comunicación con familias · TO Kids" },
      { property: "og:description", content: "Bono premium: 50 mensajes listos para copiar y compartir con las familias." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PaginaGuia,
});

function PaginaGuia() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CategoriaGuiaId | "">("");
  const [abierto, setAbierto] = useState<RecursoComunicacion | null>(null);
  const cerrar = useCallback(() => setAbierto(null), []);

  const resultados = useMemo(() => {
    const c = normalizar(q);
    return RECURSOS_COMUNICACION.filter((r) => {
      if (cat && r.categoria !== cat) return false;
      if (!c) return true;
      const texto = normalizar(
        [r.titulo, MAPA_CATEGORIAS_GUIA[r.categoria].nombre, r.situacion, r.keywords.join(" "), r.mensaje].join(" "),
      );
      return texto.includes(c);
    });
  }, [q, cat]);

  const mostrarLista = Boolean(cat || q.trim());

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wide text-primary">⭐ Bono Premium</p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Guía de comunicación con familias</h1>
        <p className="mt-1 text-muted-foreground">
          Encuentra mensajes preparados para compartir avances, recomendaciones y observaciones con las familias.
        </p>
      </header>

      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <label htmlFor="buscar-recursos" className="sr-only">Buscar recursos</label>
        <input
          id="buscar-recursos"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar recursos..."
          className="w-full rounded-xl border border-border bg-surface py-3 pl-9 pr-3 text-sm outline-none focus:border-primary"
        />
      </div>

      {!mostrarLista ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {CATEGORIAS_GUIA.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id)}
              className="tarjeta flex items-start gap-4 p-5 text-left transition-colors hover:border-primary"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-2xl" aria-hidden="true">{c.emoji}</span>
              <span className="min-w-0">
                <span className="block font-semibold">{c.nombre}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{c.descripcion}</span>
                <span className="mt-2 block text-xs font-semibold text-primary">
                  {RECURSOS_COMUNICACION.filter((r) => r.categoria === c.id).length} recursos
                </span>
              </span>
            </button>
          ))}
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {cat && <strong className="text-foreground">{MAPA_CATEGORIAS_GUIA[cat].emoji} {MAPA_CATEGORIAS_GUIA[cat].nombre} · </strong>}
              {resultados.length} {resultados.length === 1 ? "recurso" : "recursos"}
            </p>
            <button
              type="button"
              onClick={() => { setCat(""); setQ(""); }}
              className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver a categorías
            </button>
          </div>
          {resultados.length === 0 ? (
            <div className="tarjeta p-8 text-center text-sm text-muted-foreground">No encontramos recursos con esa búsqueda.</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {resultados.map((r) => <TarjetaRecurso key={r.id} recurso={r} onAbrir={setAbierto} />)}
            </div>
          )}
        </>
      )}

      {abierto && <DetalleRecurso recurso={abierto} onCerrar={cerrar} />}
    </div>
  );
}
