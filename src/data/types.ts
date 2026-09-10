export type Dificultad = "Fácil" | "Media" | "Avanzada";

export type CategoriaId =
  | "motricidad-fina"
  | "motricidad-gruesa"
  | "integracion-sensorial"
  | "atencion"
  | "autonomia"
  | "cognitiva"
  | "socializacion"
  | "percepcion"
  | "escolares";

export interface Categoria {
  id: CategoriaId;
  nombre: string;
  descripcion: string;
  icono: string;
}

export interface Dinamica {
  /** Identificador único y estable */
  id: string;
  titulo: string;
  categoriaId: CategoriaId;
  edadMin: number;
  edadMax: number;
  /** Duración en minutos */
  duracion: number;
  dificultad: Dificultad;
  habilidades: string[];
  materiales: string[];
  objetivo: string;
  pasos: string[];
  consejos: string[];
  observaciones: string;
  precauciones?: string;
  destacada?: boolean;
}
