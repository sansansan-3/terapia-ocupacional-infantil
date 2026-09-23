import type { Dinamica } from "../types";
import { MOTRICIDAD_FINA } from "./motricidad-fina";
import { MOTRICIDAD_GRUESA } from "./motricidad-gruesa";
import { INTEGRACION_SENSORIAL } from "./integracion-sensorial";
import { ATENCION } from "./atencion";
import { AUTONOMIA } from "./autonomia";
import { COGNITIVA } from "./cognitiva";
import { SOCIALIZACION } from "./socializacion";
import { PERCEPCION } from "./percepcion";
import { ESCOLARES } from "./escolares";
import { DINAMICAS_COMPLEMENTARIAS } from "@/data/dinamicas-complementarias";

export { DINAMICAS_COMPLEMENTARIAS };

export const DINAMICAS: Dinamica[] = [
  ...MOTRICIDAD_FINA,
  ...MOTRICIDAD_GRUESA,
  ...INTEGRACION_SENSORIAL,
  ...ATENCION,
  ...AUTONOMIA,
  ...COGNITIVA,
  ...SOCIALIZACION,
  ...PERCEPCION,
  ...ESCOLARES,
];

/** 150 principales + 50 complementarias */
export const TODAS_LAS_DINAMICAS: Dinamica[] = [...DINAMICAS, ...DINAMICAS_COMPLEMENTARIAS];

/** Mapa de todas (principales y complementarias): favoritos, sesiones y registros */
export const MAPA_DINAMICAS = new Map(TODAS_LAS_DINAMICAS.map((d) => [d.id, d]));

export const esComplementaria = (d: Dinamica) => d.tipo === "complementaria";

export const HABILIDADES: string[] = Array.from(
  new Set(DINAMICAS.flatMap((d) => d.habilidades)),
).sort((a, b) => a.localeCompare(b, "es"));

export const DESTACADAS: Dinamica[] = DINAMICAS.filter((d) => d.destacada);

export function contarPorCategoria(categoriaId: string): number {
  return DINAMICAS.filter((d) => d.categoriaId === categoriaId).length;
}
