import { Heart, Clock, Baby } from "lucide-react";
import { forwardRef } from "react";
import type { Dinamica } from "@/data/types";
import { MAPA_CATEGORIAS } from "@/data/categorias";
import { useFavoritos } from "@/lib/favoritos";
import { IconoCategoria } from "./IconoCategoria";

const COLOR_DIFICULTAD: Record<string, string> = {
  Fácil: "bg-success/12 text-success",
  Media: "bg-warning/15 text-warning",
  Avanzada: "bg-destructive/10 text-destructive",
};

interface Props {
  dinamica: Dinamica;
  onAbrir: (dinamica: Dinamica) => void;
}

export const TarjetaDinamica = forwardRef<HTMLButtonElement, Props>(function TarjetaDinamica(
  { dinamica, onAbrir },
  ref,
) {
  const { esFavorito, alternarFavorito } = useFavoritos();
  const favorito = esFavorito(dinamica.id);
  const categoria = MAPA_CATEGORIAS[dinamica.categoriaId];

  return (
    <div className="tarjeta group relative flex flex-col p-5 transition-shadow hover:shadow-lift">
      <button
        type="button"
        onClick={() => alternarFavorito(dinamica.id)}
        aria-pressed={favorito}
        aria-label={
          favorito
            ? `Quitar ${dinamica.titulo} de favoritos`
            : `Añadir ${dinamica.titulo} a favoritos`
        }
        className="absolute right-4 top-4 z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary-soft hover:text-primary"
      >
        <Heart
          className={`h-[18px] w-[18px] ${favorito ? "fill-primary text-primary" : ""}`}
          aria-hidden="true"
        />
      </button>

      <button
        ref={ref}
        type="button"
        onClick={() => onAbrir(dinamica)}
        className="flex flex-1 flex-col items-start text-left"
      >
        <span className="inline-flex min-w-0 items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
          <IconoCategoria categoriaId={dinamica.categoriaId} className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{categoria?.nombre}</span>
        </span>

        <h3 className="mt-3 pr-10 text-lg font-semibold leading-snug">{dinamica.titulo}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{dinamica.objetivo}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-lg bg-muted px-2 py-1">
            <Baby className="h-3.5 w-3.5" aria-hidden="true" />
            {dinamica.edadMin}-{dinamica.edadMax} años
          </span>
          <span className="inline-flex items-center gap-1 rounded-lg bg-muted px-2 py-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {dinamica.duracion} min
          </span>
          <span
            className={`rounded-lg px-2 py-1 font-semibold ${COLOR_DIFICULTAD[dinamica.dificultad]}`}
          >
            {dinamica.dificultad}
          </span>
        </div>
      </button>
    </div>
  );
});
