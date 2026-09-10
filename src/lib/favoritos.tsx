import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

const CLAVE = "to-kids:favoritos:v1";

interface FavoritosContexto {
  favoritos: string[];
  esFavorito: (id: string) => boolean;
  alternarFavorito: (id: string) => void;
  total: number;
  cargado: boolean;
}

const Contexto = createContext<FavoritosContexto | null>(null);

function leerAlmacenamiento(): string[] {
  try {
    const bruto = window.localStorage.getItem(CLAVE);
    if (!bruto) return [];
    const datos: unknown = JSON.parse(bruto);
    if (!Array.isArray(datos)) return [];
    return datos.filter((x): x is string => typeof x === "string");
  } catch {
    return [];
  }
}

export function ProveedorFavoritos({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    setFavoritos(leerAlmacenamiento());
    setCargado(true);
  }, []);

  useEffect(() => {
    if (!cargado) return;
    try {
      window.localStorage.setItem(CLAVE, JSON.stringify(favoritos));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [favoritos, cargado]);

  const alternarFavorito = useCallback((id: string) => {
    setFavoritos((actuales) =>
      actuales.includes(id) ? actuales.filter((x) => x !== id) : [...actuales, id],
    );
  }, []);

  const valor = useMemo<FavoritosContexto>(
    () => ({
      favoritos,
      esFavorito: (id: string) => favoritos.includes(id),
      alternarFavorito,
      total: favoritos.length,
      cargado,
    }),
    [favoritos, alternarFavorito, cargado],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useFavoritos(): FavoritosContexto {
  const contexto = useContext(Contexto);
  if (!contexto) {
    throw new Error("useFavoritos debe usarse dentro de ProveedorFavoritos");
  }
  return contexto;
}
