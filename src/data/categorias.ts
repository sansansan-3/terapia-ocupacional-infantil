import type { Categoria, CategoriaId } from "./types";

export const CATEGORIAS: Categoria[] = [
  {
    id: "motricidad-fina",
    nombre: "Motricidad fina",
    descripcion: "Manos, dedos y coordinación óculo-manual.",
    icono: "Hand",
  },
  {
    id: "motricidad-gruesa",
    nombre: "Motricidad gruesa",
    descripcion: "Movimiento global, equilibrio y coordinación.",
    icono: "PersonStanding",
  },
  {
    id: "integracion-sensorial",
    nombre: "Integración sensorial",
    descripcion: "Regulación, tacto profundo y calma.",
    icono: "Waves",
  },
  {
    id: "atencion",
    nombre: "Atención y concentración",
    descripcion: "Atención sostenida, selectiva e inhibición.",
    icono: "Target",
  },
  {
    id: "autonomia",
    nombre: "Autonomía",
    descripcion: "Actividades de la vida diaria.",
    icono: "Shirt",
  },
  {
    id: "cognitiva",
    nombre: "Estimulación cognitiva",
    descripcion: "Memoria, lógica y resolución de problemas.",
    icono: "Brain",
  },
  {
    id: "socializacion",
    nombre: "Socialización",
    descripcion: "Turnos, emociones y juego cooperativo.",
    icono: "Users",
  },
  {
    id: "percepcion",
    nombre: "Percepción sensorial",
    descripcion: "Discriminación visual, auditiva y táctil.",
    icono: "Eye",
  },
  {
    id: "escolares",
    nombre: "Actividades escolares",
    descripcion: "Grafomotricidad y hábitos de trabajo.",
    icono: "GraduationCap",
  },
];

export const MAPA_CATEGORIAS: Record<CategoriaId, Categoria> = CATEGORIAS.reduce(
  (acc, c) => {
    acc[c.id] = c;
    return acc;
  },
  {} as Record<CategoriaId, Categoria>,
);
