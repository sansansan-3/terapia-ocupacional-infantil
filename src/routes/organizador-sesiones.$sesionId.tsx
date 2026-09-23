import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Pencil, Trash2, CheckCircle2, Clock } from "lucide-react";
import { useSesiones, ESTADOS_SESION } from "@/lib/sesiones";
import { useEvolucion, formatearFecha } from "@/lib/evolucion";
import { useEstadoSesion } from "@/lib/usar-estado-sesion";
import { FormularioSesion } from "@/components/FormularioSesion";
import { MAPA_DINAMICAS } from "@/data/dinamicas";
import { MAPA_CATEGORIAS } from "@/data/categorias";

export const Route = createFileRoute("/organizador-sesiones/$sesionId")({
  head: () => ({
    meta: [
      { title: "Detalle de sesión · TO Kids" },
      { name: "description", content: "Actividades, materiales y notas de una sesión planificada." },
      { property: "og:title", content: "Detalle de sesión · TO Kids" },
      { property: "og:description", content: "Sesión organizada con las dinámicas de TO Kids." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DetalleSesion,
});

function DetalleSesion() {
  const { sesionId } = Route.useParams();
  const navigate = useNavigate();
  const { sesiones, cargado, guardarSesion, eliminarSesion } = useSesiones();
  const { ninos } = useEvolucion();
  const { cambiar, dialogo, aviso, yaRegistrada } = useEstadoSesion();
  const [editando, setEditando] = useState(false);
  const [confirmar, setConfirmar] = useState(false);

  const s = sesiones.find((x) => x.id === sesionId);
  if (!cargado) return null;
  if (!s) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center">
        <p className="text-muted-foreground">No encontramos esta sesión en este dispositivo.</p>
        <Link to="/organizador-sesiones" className="mt-4 inline-block rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">Volver al organizador</Link>
      </div>
    );
  }
  const nino = ninos.find((n) => n.id === s.child_id);
  const est = ESTADOS_SESION.find((e) => e.id === s.estado) ?? ESTADOS_SESION[0]!;

  return (
    <div className="space-y-6">
      <Link to="/organizador-sesiones" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Todas las sesiones
      </Link>

      {editando ? (
        <FormularioSesion inicial={s} onCancelar={() => setEditando(false)} onGuardar={(b) => { guardarSesion(b); setEditando(false); }} />
      ) : (
        <>
          <header className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <span className="inline-block rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-accent-foreground">{est.emoji} {est.etiqueta}</span>
              <h1 className="mt-2 break-words font-display text-3xl font-bold">{nino?.nombre ?? "Niño no disponible"}</h1>
              <p className="text-muted-foreground">{formatearFecha(s.fecha)} · Objetivo: {s.objetivo}</p>
              {yaRegistrada(s) && <p className="mt-1 text-xs font-semibold text-primary">Guardada en el Registro de evolución</p>}
            </div>
            <div className="grid gap-2 sm:grid-cols-3 md:flex">
              {s.estado !== "realizada" && (
                <button type="button" onClick={() => cambiar(s, "realizada")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground hover:opacity-90">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Marcar como realizada
                </button>
              )}
              <button type="button" onClick={() => setEditando(true)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 font-semibold hover:bg-muted">
                <Pencil className="h-4 w-4" aria-hidden="true" /> Editar
              </button>
              <button type="button" onClick={() => setConfirmar(true)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 font-semibold text-destructive hover:bg-muted">
                <Trash2 className="h-4 w-4" aria-hidden="true" /> Eliminar
              </button>
            </div>
          </header>

          {confirmar && (
            <div className="rounded-xl bg-muted p-4 text-sm">
              <p className="font-semibold">¿Eliminar esta sesión? No se puede deshacer.</p>
              <div className="mt-2 flex gap-2">
                <button type="button" onClick={() => { eliminarSesion(s.id); navigate({ to: "/organizador-sesiones" }); }} className="flex-1 rounded-xl bg-destructive px-4 py-3 font-semibold text-destructive-foreground sm:flex-none">Sí, eliminar</button>
                <button type="button" onClick={() => setConfirmar(false)} className="flex-1 rounded-xl border border-border bg-card px-4 py-3 font-semibold sm:flex-none">Cancelar</button>
              </div>
            </div>
          )}

          {aviso && <p role="status" className="rounded-xl bg-muted px-4 py-3 text-sm">{aviso}</p>}

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold">Actividades seleccionadas ({s.actividades.length})</h2>
              <ol className="space-y-3">
                {s.actividades.map((id, i) => {
                  const d = MAPA_DINAMICAS.get(id);
                  return (
                    <li key={id} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
                      <p className="font-display font-bold">{i + 1}. {d?.titulo ?? "Dinámica no disponible"}</p>
                      {d && (
                        <>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {MAPA_CATEGORIAS[d.categoriaId]?.nombre} · <Clock className="inline h-3.5 w-3.5" aria-hidden="true" /> {d.duracion} min · {d.dificultad} · {d.edadMin}–{d.edadMax} años
                          </p>
                          <p className="mt-2 text-sm">{d.objetivo}</p>
                        </>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
            <aside className="space-y-4">
              <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <h2 className="font-display text-lg font-bold">Materiales ({s.materiales.length})</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {s.materiales.map((m) => <li key={m}>{m}</li>)}
                </ul>
              </section>
              <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <h2 className="font-display text-lg font-bold">Notas</h2>
                <p className="mt-2 whitespace-pre-line break-words text-sm">{s.notas || <span className="text-muted-foreground">Sin notas.</span>}</p>
              </section>
            </aside>
          </div>
        </>
      )}
      {dialogo}
    </div>
  );
}
