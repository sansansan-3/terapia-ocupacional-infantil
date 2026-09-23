import { useCallback, useEffect, useState } from "react";

export type EstadoEvolucion = "logrado" | "en-proceso" | "necesita-apoyo";

export interface Nino {
  id: string;
  nombre: string;
  edad: number;
  created_at: string;
}

export interface RegistroEvolucion {
  id: string;
  child_id: string;
  fecha: string; // YYYY-MM-DD
  actividad: string; // id de dinámica
  objetivo: string;
  observaciones: string;
  estado: EstadoEvolucion;
  created_at: string;
  updated_at: string;
}

interface Datos {
  version: 1;
  ninos: Nino[];
  registros: RegistroEvolucion[];
}

export const CLAVE_EVOLUCION = "to_kids_evolution_records";
const EVENTO = "to-kids-evolucion";

export const ESTADOS: { id: EstadoEvolucion; etiqueta: string; emoji: string }[] = [
  { id: "logrado", etiqueta: "Logrado", emoji: "🟢" },
  { id: "en-proceso", etiqueta: "En proceso", emoji: "🟡" },
  { id: "necesita-apoyo", etiqueta: "Necesita apoyo", emoji: "🔴" },
];

const vacio = (): Datos => ({ version: 1, ninos: [], registros: [] });

function leer(): Datos {
  try {
    const raw = localStorage.getItem(CLAVE_EVOLUCION);
    if (!raw) return vacio();
    const d = JSON.parse(raw);
    return {
      version: 1,
      ninos: Array.isArray(d?.ninos) ? d.ninos : [],
      registros: Array.isArray(d?.registros) ? d.registros : [],
    };
  } catch {
    return vacio();
  }
}

function escribir(d: Datos) {
  localStorage.setItem(CLAVE_EVOLUCION, JSON.stringify(d));
  window.dispatchEvent(new Event(EVENTO));
}

export function nuevoId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function hoyISO() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${dia}`;
}

export function formatearFecha(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function useEvolucion() {
  const [datos, setDatos] = useState<Datos>(vacio);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    const sync = () => setDatos(leer());
    sync();
    setCargado(true);
    const onStorage = (e: StorageEvent) => e.key === CLAVE_EVOLUCION && sync();
    window.addEventListener(EVENTO, sync);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVENTO, sync);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const mutar = useCallback((fn: (d: Datos) => Datos) => escribir(fn(leer())), []);

  const anadirNino = useCallback(
    (nombre: string, edad: number) => {
      const n: Nino = { id: nuevoId(), nombre, edad, created_at: new Date().toISOString() };
      mutar((d) => ({ ...d, ninos: [...d.ninos, n] }));
      return n;
    },
    [mutar],
  );

  const eliminarNino = useCallback(
    (id: string) =>
      mutar((d) => ({
        ...d,
        ninos: d.ninos.filter((n) => n.id !== id),
        registros: d.registros.filter((r) => r.child_id !== id),
      })),
    [mutar],
  );

  const guardarRegistro = useCallback(
    (r: Omit<RegistroEvolucion, "id" | "created_at" | "updated_at"> & { id?: string | undefined }) => {
      const ahora = new Date().toISOString();
      mutar((d) => {
        if (r.id) {
          return {
            ...d,
            registros: d.registros.map((x) =>
              x.id === r.id ? { ...x, ...r, id: x.id, updated_at: ahora } : x,
            ),
          };
        }
        const nuevo: RegistroEvolucion = { ...r, id: nuevoId(), created_at: ahora, updated_at: ahora };
        return { ...d, registros: [...d.registros, nuevo] };
      });
    },
    [mutar],
  );

  const eliminarRegistro = useCallback(
    (id: string) => mutar((d) => ({ ...d, registros: d.registros.filter((r) => r.id !== id) })),
    [mutar],
  );

  return { ...datos, cargado, anadirNino, eliminarNino, guardarRegistro, eliminarRegistro };
}
