import type { Dinamica } from "@/data/types";
import { normalizar } from "./texto";

export interface EstadoFiltros {
  q: string;
  categoria: string;
  edad: number;
  dificultad: string;
  habilidad: string;
  orden: string;
}

export const POR_PAGINA = 18;

function textoBuscable(d: Dinamica, nombreCategoria: string): string {
  return normalizar(
    [d.titulo, d.objetivo, nombreCategoria, d.habilidades.join(" "), d.materiales.join(" ")].join(
      " ",
    ),
  );
}

export function filtrarDinamicas(
  dinamicas: Dinamica[],
  filtros: EstadoFiltros,
  nombreCategoria: (id: string) => string,
): Dinamica[] {
  const consulta = normalizar(filtros.q);

  const resultado = dinamicas.filter((d) => {
    if (filtros.categoria && d.categoriaId !== filtros.categoria) return false;
    if (filtros.dificultad && d.dificultad !== filtros.dificultad) return false;
    if (filtros.habilidad && !d.habilidades.includes(filtros.habilidad)) return false;
    if (filtros.edad > 0 && (filtros.edad < d.edadMin || filtros.edad > d.edadMax)) return false;
    if (consulta && !textoBuscable(d, nombreCategoria(d.categoriaId)).includes(consulta))
      return false;
    return true;
  });

  const ordenado = [...resultado];
  switch (filtros.orden) {
    case "titulo-desc":
      ordenado.sort((a, b) => b.titulo.localeCompare(a.titulo, "es"));
      break;
    case "duracion-asc":
      ordenado.sort((a, b) => a.duracion - b.duracion || a.titulo.localeCompare(b.titulo, "es"));
      break;
    case "duracion-desc":
      ordenado.sort((a, b) => b.duracion - a.duracion || a.titulo.localeCompare(b.titulo, "es"));
      break;
    default:
      ordenado.sort((a, b) => a.titulo.localeCompare(b.titulo, "es"));
  }
  return ordenado;
}
