import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

const CLAVE = "to-kids:acceso:v1";

interface AccesoContexto {
  tieneAcceso: boolean;
  fecha: string | null;
  cargado: boolean;
  registrarAcceso: () => void;
  salir: () => void;
}

const Contexto = createContext<AccesoContexto | null>(null);

function leer(): { fecha: string | null; acceso: boolean } {
  try {
    const bruto = window.localStorage.getItem(CLAVE);
    if (!bruto) return { fecha: null, acceso: false };
    const datos: unknown = JSON.parse(bruto);
    if (typeof datos !== "object" || datos === null) return { fecha: null, acceso: false };
    const obj = datos as { acceso?: unknown; fecha?: unknown };
    if (obj.acceso !== true) return { fecha: null, acceso: false };
    return { acceso: true, fecha: typeof obj.fecha === "string" ? obj.fecha : null };
  } catch {
    return { fecha: null, acceso: false };
  }
}

export function ProveedorAcceso({ children }: { children: ReactNode }) {
  const [tieneAcceso, setTieneAcceso] = useState(false);
  const [fecha, setFecha] = useState<string | null>(null);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    const { acceso, fecha: f } = leer();
    setTieneAcceso(acceso);
    setFecha(f);
    setCargado(true);
  }, []);

  const registrarAcceso = useCallback(() => {
    const ahora = new Date().toISOString();
    try {
      window.localStorage.setItem(CLAVE, JSON.stringify({ acceso: true, fecha: ahora }));
    } catch {
      /* almacenamiento no disponible */
    }
    setTieneAcceso(true);
    setFecha(ahora);
  }, []);

  const salir = useCallback(() => {
    try {
      window.localStorage.removeItem(CLAVE);
    } catch {
      /* almacenamiento no disponible */
    }
    setTieneAcceso(false);
    setFecha(null);
  }, []);

  const valor = useMemo<AccesoContexto>(
    () => ({ tieneAcceso, fecha, cargado, registrarAcceso, salir }),
    [tieneAcceso, fecha, cargado, registrarAcceso, salir],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useAcceso(): AccesoContexto {
  const contexto = useContext(Contexto);
  if (!contexto) throw new Error("useAcceso debe usarse dentro de ProveedorAcceso");
  return contexto;
}

const CORREO = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function normalizarCorreo(valor: string): string {
  return valor.trim().toLowerCase();
}

export function correoValido(valor: string): boolean {
  return CORREO.test(valor);
}
