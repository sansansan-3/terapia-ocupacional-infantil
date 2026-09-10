import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Heart } from "lucide-react";
import { MAPA_DINAMICAS } from "@/data/dinamicas";
import type { Dinamica } from "@/data/types";
import { useFavoritos } from "@/lib/favoritos";
import { TarjetaDinamica } from "@/components/TarjetaDinamica";
import { FichaDinamica } from "@/components/FichaDinamica";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Mis dinámicas favoritas · TO Kids" },
      {
        name: "description",
        content: "Consulta las dinámicas que has guardado para preparar tus sesiones.",
      },
      { property: "og:title", content: "Mis dinámicas favoritas · TO Kids" },
      {
        property: "og:description",
        content: "Tus dinámicas guardadas, siempre a mano en este navegador.",
      },
    ],
  }),
  component: PaginaFavoritos,
});

function PaginaFavoritos() {
  const { favoritos, cargado } = useFavoritos();
  const [abierta, setAbierta] = useState<Dinamica | null>(null);
  const tarjetas = useRef<Record<string, HTMLButtonElement | null>>({});

  const dinamicas = favoritos
    .map((id) => MAPA_DINAMICAS.get(id))
    .filter((d): d is Dinamica => Boolean(d))
    .sort((a, b) => a.titulo.localeCompare(b.titulo, "es"));

  const cerrarFicha = () => {
    const id = abierta?.id;
    setAbierta(null);
    if (id) requestAnimationFrame(() => tarjetas.current[id]?.focus());
  };

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">Favoritos</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {dinamicas.length} {dinamicas.length === 1 ? "dinámica guardada" : "dinámicas guardadas"} ·
          Tus favoritos se guardan en este navegador
        </p>
      </header>

      {!cargado ? null : dinamicas.length === 0 ? (
        <div className="tarjeta p-8 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
            <Heart className="h-7 w-7" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-lg font-semibold">Aún no tienes dinámicas favoritas</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Pulsa el corazón de una dinámica para guardarla aquí.
          </p>
          <Link
            to="/dinamicas"
            search={{ q: "", cat: "", edad: 0, dif: "", hab: "", orden: "titulo-asc", p: 1 }}
            className="mt-5 inline-block rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explorar dinámicas
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {dinamicas.map((d) => (
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

      {abierta && <FichaDinamica dinamica={abierta} onCerrar={cerrarFicha} />}
    </div>
  );
}
