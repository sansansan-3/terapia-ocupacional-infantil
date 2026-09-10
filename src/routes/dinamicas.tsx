import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { DINAMICAS } from "@/data/dinamicas";
import { MAPA_CATEGORIAS } from "@/data/categorias";
import type { Dinamica } from "@/data/types";
import { filtrarDinamicas, POR_PAGINA } from "@/lib/filtros";
import { TarjetaDinamica } from "@/components/TarjetaDinamica";
import { FichaDinamica } from "@/components/FichaDinamica";
import { PanelFiltros } from "@/components/PanelFiltros";
import { CarruselVideos } from "@/components/CarruselVideos";

interface BusquedaCatalogo {
  q: string;
  cat: string;
  edad: number;
  dif: string;
  hab: string;
  orden: string;
  p: number;
}

export const Route = createFileRoute("/dinamicas")({
  validateSearch: (search: Record<string, unknown>): BusquedaCatalogo => ({
    q: typeof search.q === "string" ? search.q : "",
    cat: typeof search.cat === "string" ? search.cat : "",
    edad: Number(search.edad) > 0 ? Number(search.edad) : 0,
    dif: typeof search.dif === "string" ? search.dif : "",
    hab: typeof search.hab === "string" ? search.hab : "",
    orden: typeof search.orden === "string" ? search.orden : "titulo-asc",
    p: Number(search.p) > 0 ? Number(search.p) : 1,
  }),
  head: () => ({
    meta: [
      { title: "Catálogo de dinámicas · TO Kids" },
      {
        name: "description",
        content:
          "Explora las 150 dinámicas por categoría, edad, dificultad y habilidad, con buscador y filtros combinables.",
      },
      { property: "og:title", content: "Catálogo de dinámicas · TO Kids" },
      {
        property: "og:description",
        content: "Busca y filtra dinámicas de terapia ocupacional infantil por área, edad y habilidad.",
      },
    ],
  }),
  component: PaginaDinamicas,
});

function PaginaDinamicas() {
  const busqueda = Route.useSearch();
  const navigate = useNavigate({ from: "/dinamicas" });
  const [abierta, setAbierta] = useState<Dinamica | null>(null);
  const tarjetas = useRef<Record<string, HTMLButtonElement | null>>({});

  const nombreCategoria = (id: string) =>
    MAPA_CATEGORIAS[id as keyof typeof MAPA_CATEGORIAS]?.nombre ?? "";

  const resultados = useMemo(
    () =>
      filtrarDinamicas(
        DINAMICAS,
        {
          q: busqueda.q,
          categoria: busqueda.cat,
          edad: busqueda.edad,
          dificultad: busqueda.dif,
          habilidad: busqueda.hab,
          orden: busqueda.orden,
        },
        nombreCategoria,
      ),
    [busqueda],
  );

  const totalPaginas = Math.max(1, Math.ceil(resultados.length / POR_PAGINA));
  const pagina = Math.min(busqueda.p, totalPaginas);
  const visibles = resultados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  const actualizar = (parcial: Partial<BusquedaCatalogo>, reiniciarPagina = true) => {
    navigate({
      search: (prev) => ({ ...prev, ...parcial, ...(reiniciarPagina ? { p: 1 } : {}) }),
      resetScroll: false,
    });
  };

  const limpiar = () =>
    navigate({
      search: { q: "", cat: "", edad: 0, dif: "", hab: "", orden: "titulo-asc", p: 1 },
      resetScroll: false,
    });

  const hayFiltros = Boolean(
    busqueda.q || busqueda.cat || busqueda.edad || busqueda.dif || busqueda.hab,
  );

  const cerrarFicha = () => {
    const id = abierta?.id;
    setAbierta(null);
    if (id) requestAnimationFrame(() => tarjetas.current[id]?.focus());
  };

  const categoriaActiva = busqueda.cat
    ? MAPA_CATEGORIAS[busqueda.cat as keyof typeof MAPA_CATEGORIAS]
    : undefined;

  return (
    <div>
      <CarruselVideos />

      <header className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">
          {categoriaActiva ? categoriaActiva.nombre : "Todas las dinámicas"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {resultados.length}{" "}
          {resultados.length === 1 ? "dinámica encontrada" : "dinámicas encontradas"}
          {categoriaActiva && (
            <>
              {" · "}
              <Link
                to="/dinamicas"
                search={{ q: busqueda.q, cat: "", edad: busqueda.edad, dif: busqueda.dif, hab: busqueda.hab, orden: busqueda.orden, p: 1 }}
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                Ver todas las dinámicas
              </Link>
            </>
          )}
        </p>
      </header>

      <div className="mb-6 space-y-3">
        <label className="block">
          <span className="sr-only">Buscar dinámicas</span>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              value={busqueda.q}
              onChange={(e) => actualizar({ q: e.target.value })}
              placeholder="Buscar dinámicas…"
              className="w-full rounded-xl border border-border bg-surface py-3 pl-9 pr-3 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
        </label>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          <span className="font-semibold">Filtros</span>
        </div>

        <PanelFiltros
          valores={{
            categoria: busqueda.cat,
            edad: busqueda.edad,
            dificultad: busqueda.dif,
            habilidad: busqueda.hab,
            orden: busqueda.orden,
          }}
          onCambio={(parcial) =>
            actualizar({
              cat: parcial.categoria ?? busqueda.cat,
              edad: parcial.edad ?? busqueda.edad,
              dif: parcial.dificultad ?? busqueda.dif,
              hab: parcial.habilidad ?? busqueda.hab,
              orden: parcial.orden ?? busqueda.orden,
            })
          }
          onLimpiar={limpiar}
          hayFiltros={hayFiltros}
        />
      </div>

      {visibles.length === 0 ? (
        <div className="tarjeta p-8 text-center">
          <h2 className="text-lg font-semibold">No hay dinámicas que coincidan</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Prueba con otras palabras o quita alguno de los filtros aplicados.
          </p>
          <button
            type="button"
            onClick={limpiar}
            className="mt-5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Limpiar búsqueda y filtros
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibles.map((d) => (
            <TarjetaDinamica
              key={d.id}
              dinamica={d}
              onAbrir={setAbierta}
              ref={(el) => {
                tarjetas.current[d.id] = el;
              }}
            />
          ))}
        </div>
      )}

      {totalPaginas > 1 && (
        <nav aria-label="Paginación" className="mt-8 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={pagina <= 1}
            onClick={() => actualizar({ p: pagina - 1 }, false)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface disabled:opacity-40"
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="px-3 text-sm text-muted-foreground">
            Página {pagina} de {totalPaginas}
          </span>
          <button
            type="button"
            disabled={pagina >= totalPaginas}
            onClick={() => actualizar({ p: pagina + 1 }, false)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface disabled:opacity-40"
            aria-label="Página siguiente"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </nav>
      )}

      {abierta && <FichaDinamica dinamica={abierta} onCerrar={cerrarFicha} />}
    </div>
  );
}
