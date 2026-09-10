import { X } from "lucide-react";
import { CATEGORIAS } from "@/data/categorias";
import { HABILIDADES } from "@/data/dinamicas";

export interface ValoresFiltros {
  categoria: string;
  edad: number;
  dificultad: string;
  habilidad: string;
  orden: string;
}

interface Props {
  valores: ValoresFiltros;
  onCambio: (parcial: Partial<ValoresFiltros>) => void;
  onLimpiar: () => void;
  hayFiltros: boolean;
}

const claseSelect =
  "w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary";

export function PanelFiltros({ valores, onCambio, onLimpiar, hayFiltros }: Props) {
  return (
    <div className="tarjeta p-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Categoría</span>
          <select
            className={claseSelect}
            value={valores.categoria}
            onChange={(e) => onCambio({ categoria: e.target.value })}
          >
            <option value="">Todas</option>
            {CATEGORIAS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Edad</span>
          <select
            className={claseSelect}
            value={valores.edad}
            onChange={(e) => onCambio({ edad: Number(e.target.value) })}
          >
            <option value={0}>Cualquier edad</option>
            {Array.from({ length: 11 }, (_, i) => i + 2).map((edad) => (
              <option key={edad} value={edad}>
                {edad} años
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">
            Dificultad
          </span>
          <select
            className={claseSelect}
            value={valores.dificultad}
            onChange={(e) => onCambio({ dificultad: e.target.value })}
          >
            <option value="">Todas</option>
            <option value="Fácil">Fácil</option>
            <option value="Media">Media</option>
            <option value="Avanzada">Avanzada</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Habilidad</span>
          <select
            className={claseSelect}
            value={valores.habilidad}
            onChange={(e) => onCambio({ habilidad: e.target.value })}
          >
            <option value="">Todas</option>
            {HABILIDADES.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Orden</span>
          <select
            className={claseSelect}
            value={valores.orden}
            onChange={(e) => onCambio({ orden: e.target.value })}
          >
            <option value="titulo-asc">Título (A-Z)</option>
            <option value="titulo-desc">Título (Z-A)</option>
            <option value="duracion-asc">Duración (menor primero)</option>
            <option value="duracion-desc">Duración (mayor primero)</option>
          </select>
        </label>
      </div>

      {hayFiltros && (
        <button
          type="button"
          onClick={onLimpiar}
          className="mt-3 inline-flex items-center gap-2 rounded-xl bg-muted px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <X className="h-4 w-4" aria-hidden="true" />
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
