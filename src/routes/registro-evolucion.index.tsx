import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ClipboardList, Plus, Search, ShieldCheck, ChevronRight, User } from "lucide-react";
import { useEvolucion } from "@/lib/evolucion";
import { normalizar } from "@/lib/texto";

export const Route = createFileRoute("/registro-evolucion/")({
  head: () => ({
    meta: [
      { title: "Registro de evolución · TO Kids" },
      {
        name: "description",
        content: "Organiza observaciones y avances de tus sesiones de forma sencilla.",
      },
      { property: "og:title", content: "Registro de evolución · TO Kids" },
      {
        property: "og:description",
        content: "Bono premium: historial de evolución por niño guardado en tu dispositivo.",
      },
    ],
  }),
  component: PaginaRegistro,
});

const EDADES = Array.from({ length: 18 }, (_, i) => i + 1);

function PaginaRegistro() {
  const { ninos, registros, cargado, anadirNino } = useEvolucion();
  const [consulta, setConsulta] = useState("");
  const [orden, setOrden] = useState<"az" | "za">("az");
  const [formAbierto, setFormAbierto] = useState(false);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(5);
  const [error, setError] = useState("");

  const lista = useMemo(() => {
    const q = normalizar(consulta);
    return ninos
      .filter((n) => !q || normalizar(n.nombre).includes(q))
      .sort((a, b) =>
        orden === "az" ? a.nombre.localeCompare(b.nombre, "es") : b.nombre.localeCompare(a.nombre, "es"),
      );
  }, [ninos, consulta, orden]);

  const guardar = (e: React.FormEvent) => {
    e.preventDefault();
    const limpio = nombre.trim();
    if (!limpio) {
      setError("Escribe el nombre del niño.");
      return;
    }
    anadirNino(limpio, edad);
    setNombre("");
    setEdad(5);
    setError("");
    setFormAbierto(false);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-primary">⭐ Bono Premium</p>
          <h1 className="mt-1 font-display text-3xl font-bold">Registro de evolución</h1>
          <p className="mt-1 text-muted-foreground">
            Organiza observaciones y avances de tus sesiones de forma sencilla.
          </p>
        </div>
        {!formAbierto && (
          <button
            type="button"
            onClick={() => setFormAbierto(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
          >
            <Plus className="h-5 w-5" aria-hidden="true" /> Añadir niño
          </button>
        )}
      </header>

      <p className="inline-flex items-center gap-2 rounded-xl bg-primary-soft px-3 py-2 text-xs text-accent-foreground">
        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
        Los registros se guardan en este dispositivo.
      </p>

      {formAbierto && (
        <form onSubmit={guardar} className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="font-display text-lg font-bold">Nuevo niño</h2>
          <div className="grid gap-4 sm:grid-cols-[1fr_160px]">
            <div>
              <label htmlFor="nombre-nino" className="text-sm font-semibold">
                Nombre del niño *
              </label>
              <input
                id="nombre-nino"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                autoFocus
                maxLength={80}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-3 outline-none focus:border-primary"
                aria-invalid={Boolean(error)}
              />
              {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
            </div>
            <div>
              <label htmlFor="edad-nino" className="text-sm font-semibold">
                Edad
              </label>
              <select
                id="edad-nino"
                value={edad}
                onChange={(e) => setEdad(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-3 outline-none focus:border-primary"
              >
                {EDADES.map((e) => (
                  <option key={e} value={e}>
                    {e} {e === 1 ? "año" : "años"}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">La fecha de creación se guarda automáticamente.</p>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => {
                setFormAbierto(false);
                setError("");
              }}
              className="rounded-xl border border-border px-5 py-3 font-semibold hover:bg-muted"
            >
              Cancelar
            </button>
            <button type="submit" className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90">
              Guardar niño
            </button>
          </div>
        </form>
      )}

      {cargado && ninos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <ClipboardList className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Aún no tienes niños registrados. Añade el primero para comenzar a registrar su evolución.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <label htmlFor="buscar-nino" className="sr-only">Buscar niño</label>
              <input
                id="buscar-nino"
                type="search"
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
                placeholder="Buscar niño…"
                className="w-full rounded-xl border border-border bg-card py-3 pl-9 pr-3 outline-none focus:border-primary"
              />
            </div>
            <label htmlFor="orden-ninos" className="sr-only">Ordenar niños</label>
            <select
              id="orden-ninos"
              value={orden}
              onChange={(e) => setOrden(e.target.value as "az" | "za")}
              className="rounded-xl border border-border bg-card px-3 py-3 outline-none focus:border-primary"
            >
              <option value="az">Nombre A–Z</option>
              <option value="za">Nombre Z–A</option>
            </select>
          </div>

          {lista.length === 0 ? (
            <p className="text-center text-muted-foreground">No hay niños que coincidan con la búsqueda.</p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {lista.map((n) => {
                const total = registros.filter((r) => r.child_id === n.id).length;
                return (
                  <li key={n.id}>
                    <Link
                      to="/registro-evolucion/$ninoId"
                      params={{ ninoId: n.id }}
                      className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-lift"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                        <User className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-lg font-bold">{n.nombre}</span>
                        <span className="block text-sm text-muted-foreground">
                          {n.edad} {n.edad === 1 ? "año" : "años"} · {total} {total === 1 ? "registro" : "registros"}
                        </span>
                      </span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
