import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalendarCheck, Plus, ShieldCheck, ChevronRight } from "lucide-react";
import { useSesiones, ESTADOS_SESION, type EstadoSesion } from "@/lib/sesiones";
import { useEvolucion, formatearFecha } from "@/lib/evolucion";
import { useEstadoSesion } from "@/lib/usar-estado-sesion";
import { FormularioSesion } from "@/components/FormularioSesion";

export const Route = createFileRoute("/organizador-sesiones/")({
  head: () => ({
    meta: [
      { title: "Organizador de sesiones · TO Kids" },
      { name: "description", content: "Planifica tus sesiones, organiza actividades y registra avances." },
      { property: "og:title", content: "Organizador de sesiones · TO Kids" },
      { property: "og:description", content: "Bono premium: prepara sesiones con las 150 dinámicas de TO Kids." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PaginaOrganizador,
});

function PaginaOrganizador() {
  const { sesiones, cargado, guardarSesion } = useSesiones();
  const { ninos } = useEvolucion();
  const { cambiar, dialogo, aviso } = useEstadoSesion();
  const [formAbierto, setFormAbierto] = useState(false);
  const [filtro, setFiltro] = useState<"" | EstadoSesion>("");

  const lista = useMemo(
    () =>
      sesiones
        .filter((s) => !filtro || s.estado === filtro)
        .sort((a, b) => b.fecha.localeCompare(a.fecha) || b.created_at.localeCompare(a.created_at)),
    [sesiones, filtro],
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-primary">⭐ Bono Premium</p>
          <h1 className="mt-1 font-display text-3xl font-bold">Organizador de sesiones</h1>
          <p className="mt-1 text-muted-foreground">Planifica tus sesiones, organiza actividades y registra avances.</p>
        </div>
        {!formAbierto && (
          <button type="button" onClick={() => setFormAbierto(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-soft hover:opacity-90">
            <Plus className="h-5 w-5" aria-hidden="true" /> Nueva sesión
          </button>
        )}
      </header>

      <p className="inline-flex items-center gap-2 rounded-xl bg-primary-soft px-3 py-2 text-xs text-accent-foreground">
        <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Las sesiones se guardan en este dispositivo.
      </p>

      {formAbierto && (
        <FormularioSesion
          onCancelar={() => setFormAbierto(false)}
          onGuardar={(b) => { guardarSesion(b); setFormAbierto(false); }}
        />
      )}

      {aviso && <p role="status" className="rounded-xl bg-muted px-4 py-3 text-sm">{aviso}</p>}

      {cargado && sesiones.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <CalendarCheck className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Aún no tienes sesiones creadas. Organiza tu primera sesión para comenzar.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl font-bold">Sesiones ({lista.length})</h2>
            <label htmlFor="filtro-estado" className="sr-only">Filtrar por estado</label>
            <select id="filtro-estado" value={filtro} onChange={(e) => setFiltro(e.target.value as "" | EstadoSesion)} className="rounded-xl border border-border bg-card px-3 py-2.5 text-sm">
              <option value="">Todos los estados</option>
              {ESTADOS_SESION.map((s) => <option key={s.id} value={s.id}>{s.emoji} {s.etiqueta}</option>)}
            </select>
          </div>
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {lista.map((s) => {
              const nino = ninos.find((n) => n.id === s.child_id);
              return (
                <li key={s.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <Link to="/organizador-sesiones/$sesionId" params={{ sesionId: s.id }} className="group flex items-start justify-between gap-2">
                    <span className="min-w-0">
                      <span className="block font-display text-lg font-bold group-hover:text-primary">{nino?.nombre ?? "Niño no disponible"}</span>
                      <span className="block text-sm text-muted-foreground">{formatearFecha(s.fecha)}</span>
                    </span>
                    <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  </Link>
                  <dl className="space-y-1 text-sm">
                    <div><dt className="font-semibold text-muted-foreground">Objetivo principal</dt><dd className="break-words">{s.objetivo}</dd></div>
                    <div><dt className="sr-only">Actividades</dt><dd className="text-muted-foreground">{s.actividades.length} {s.actividades.length === 1 ? "dinámica" : "dinámicas"} · {s.materiales.length} materiales</dd></div>
                  </dl>
                  <div className="mt-auto">
                    <label htmlFor={`estado-${s.id}`} className="text-xs font-semibold text-muted-foreground">Estado</label>
                    <select id={`estado-${s.id}`} value={s.estado} onChange={(e) => cambiar(s, e.target.value as EstadoSesion)} className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-3 font-medium outline-none focus:border-primary">
                      {ESTADOS_SESION.map((e) => <option key={e.id} value={e.id}>{e.emoji} {e.etiqueta}</option>)}
                    </select>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {dialogo}
    </div>
  );
}
