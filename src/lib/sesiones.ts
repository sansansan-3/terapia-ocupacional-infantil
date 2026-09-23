import { useCallback, useEffect, useState } from "react";
import { nuevoId } from "@/lib/evolucion";

export type EstadoSesion = "pendiente" | "preparacion" | "realizada";

export interface Sesion {
  id: string;
  child_id: string;
  fecha: string;
  objetivo: string;
  actividades: string[];
  materiales: string[];
  notas: string;
  estado: EstadoSesion;
  created_at: string;
  updated_at: string;
}

export const CLAVE_SESIONES = "to_kids_sessions";
const EVENTO = "to-kids-sesiones";

export const ESTADOS_SESION: { id: EstadoSesion; etiqueta: string; emoji: string }[] = [
  { id: "pendiente", etiqueta: "Pendiente", emoji: "⚪" },
  { id: "preparacion", etiqueta: "En preparación", emoji: "🟡" },
  { id: "realizada", etiqueta: "Realizada", emoji: "🟢" },
];

function leer(): Sesion[] {
  try {
    const raw = localStorage.getItem(CLAVE_SESIONES);
    if (!raw) return [];
    const d = JSON.parse(raw);
    const lista = Array.isArray(d) ? d : Array.isArray(d?.sesiones) ? d.sesiones : [];
    return lista.filter((s: Sesion) => s && typeof s.id === "string");
  } catch {
    return [];
  }
}

function escribir(s: Sesion[]) {
  localStorage.setItem(CLAVE_SESIONES, JSON.stringify({ version: 1, sesiones: s }));
  window.dispatchEvent(new Event(EVENTO));
}

export type BorradorSesion = Omit<Sesion, "id" | "created_at" | "updated_at"> & { id?: string };

export function useSesiones() {
  const [sesiones, setSesiones] = useState<Sesion[]>([]);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    const sync = () => setSesiones(leer());
    sync();
    setCargado(true);
    const onStorage = (e: StorageEvent) => e.key === CLAVE_SESIONES && sync();
    window.addEventListener(EVENTO, sync);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVENTO, sync);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const guardarSesion = useCallback((b: BorradorSesion): string => {
    const ahora = new Date().toISOString();
    const lista = leer();
    if (b.id && lista.some((s) => s.id === b.id)) {
      escribir(lista.map((s) => (s.id === b.id ? { ...s, ...b, id: s.id, updated_at: ahora } : s)));
      return b.id;
    }
    const id = nuevoId();
    escribir([...lista, { ...b, id, created_at: ahora, updated_at: ahora }]);
    return id;
  }, []);

  const cambiarEstado = useCallback((id: string, estado: EstadoSesion) => {
    const ahora = new Date().toISOString();
    escribir(leer().map((s) => (s.id === id ? { ...s, estado, updated_at: ahora } : s)));
  }, []);

  const eliminarSesion = useCallback((id: string) => {
    escribir(leer().filter((s) => s.id !== id));
  }, []);

  return { sesiones, cargado, guardarSesion, cambiarEstado, eliminarSesion };
}
