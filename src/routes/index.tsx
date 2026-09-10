import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Sparkles, LayoutGrid, Wand2, Heart, ArrowRight } from "lucide-react";
import { DINAMICAS, DESTACADAS, HABILIDADES } from "@/data/dinamicas";
import { CATEGORIAS } from "@/data/categorias";
import type { Dinamica } from "@/data/types";
import { useFavoritos } from "@/lib/favoritos";
import { Indicador } from "@/components/Indicador";
import { TarjetaDinamica } from "@/components/TarjetaDinamica";
import { FichaDinamica } from "@/components/FichaDinamica";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TO Kids · 150 dinámicas de terapia ocupacional infantil" },
      {
        name: "description",
        content:
          "Encuentra actividades organizadas por área, edad y habilidades, con materiales e instrucciones paso a paso.",
      },
      { property: "og:title", content: "TO Kids · 150 dinámicas de terapia ocupacional infantil" },
      {
        property: "og:description",
        content: "Biblioteca de dinámicas con materiales, objetivos e instrucciones paso a paso.",
      },
    ],
  }),
  component: Inicio,
});

const BUSQUEDA_VACIA = {
  q: "",
  cat: "",
  edad: 0,
  dif: "",
  hab: "",
  orden: "titulo-asc",
  p: 1,
} as const;

function Inicio() {
  const { total } = useFavoritos();
  const [abierta, setAbierta] = useState<Dinamica | null>(null);
  const tarjetas = useRef<Record<string, HTMLButtonElement | null>>({});

  const cerrarFicha = () => {
    const id = abierta?.id;
    setAbierta(null);
    if (id) requestAnimationFrame(() => tarjetas.current[id]?.focus());
  };

  return (
    <div>
      <section className="tarjeta overflow-hidden p-6 sm:p-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Biblioteca de actividades
        </span>
        <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
          {DINAMICAS.length} dinámicas de terapia ocupacional infantil
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Encuentra actividades organizadas por área, edad y habilidades, con materiales e
          instrucciones paso a paso.
        </p>
        <Link
          to="/dinamicas"
          search={{ ...BUSQUEDA_VACIA }}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Explorar dinámicas
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>

      <section aria-label="Indicadores" className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Indicador
          icono={<Sparkles className="h-5 w-5" />}
          valor={DINAMICAS.length}
          etiqueta="Dinámicas disponibles"
        />
        <Indicador
          icono={<LayoutGrid className="h-5 w-5" />}
          valor={CATEGORIAS.length}
          etiqueta="Categorías"
        />
        <Indicador
          icono={<Wand2 className="h-5 w-5" />}
          valor={HABILIDADES.length}
          etiqueta="Habilidades únicas"
        />
        <Indicador icono={<Heart className="h-5 w-5" />} valor={total} etiqueta="Favoritos" />
      </section>

      <section className="mt-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <h2 className="truncate text-xl font-bold">Dinámicas destacadas</h2>
          <Link
            to="/dinamicas"
            search={{ ...BUSQUEDA_VACIA }}
            className="shrink-0 text-sm font-semibold text-primary underline-offset-2 hover:underline"
          >
            Ver todas
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {DESTACADAS.map((d) => (
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
      </section>

      {abierta && <FichaDinamica dinamica={abierta} onCerrar={cerrarFicha} />}
    </div>
  );
}
