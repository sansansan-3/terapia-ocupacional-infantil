import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Plus, Pencil, Trash2, ShieldCheck, ClipboardList } from "lucide-react";
import {
  ESTADOS,
  formatearFecha,
  hoyISO,
  useEvolucion,
  type EstadoEvolucion,
  type RegistroEvolucion,
} from "@/lib/evolucion";
import { DINAMICAS, MAPA_DINAMICAS } from "@/data/dinamicas";

export const Route = createFileRoute("/registro-evolucion/$ninoId")({
  head: () => ({
    meta: [
      { title: "Historial de evolución · TO Kids" },
      { name: "description", content: "Historial de sesiones y avances de un niño." },
      { property: "og:title", content: "Historial de evolución · TO Kids" },
      { property: "og:description", content: "Registros de evolución guardados en este dispositivo." },
    ],
  }),
  component: PerfilNino,
});

const DINAMICAS_ORDENADAS = [...DINAMICAS].sort((a, b) => a.titulo.localeCompare(b.titulo, "es"));

interface Borrador {
  id?: string;
  fecha: string;
  actividad: string;
  objetivo: string;
  observaciones: string;
  estado: EstadoEvolucion;
}

const borradorVacio = (): Borrador => ({
  fecha: hoyISO(),
  actividad: "",
  objetivo: "",
  observaciones: "",
  estado: "en-proceso",
});

const campo =
  "mt-1 w-full rounded-xl border border-border bg-background px-3 py-3 outline-none focus:border-primary";

function PerfilNino() {
  const { ninoId } = Route.useParams();
  const navigate = useNavigate();
  const { ninos, registros, cargado, guardarRegistro, eliminarRegistro, eliminarNino } = useEvolucion();
  const [borrador, setBorrador] = useState<Borrador | null>(null);
  const [error, setError] = useState("");
  const [orden, setOrden] = useState<"desc" | "asc">("desc");
  const [confirmar, setConfirmar] = useState<string | null>(null);
  const [confirmarNino, setConfirmarNino] = useState(false);

  const nino = ninos.find((n) => n.id === ninoId);
  const historial = useMemo(
    () =>
      registros
        .filter((r) => r.child_id === ninoId)
        .sort((a, b) => {
          const c = a.fecha.localeCompare(b.fecha) || a.created_at.localeCompare(b.created_at);
          return orden === "desc" ? -c : c;
        }),
    [registros, ninoId, orden],
  );

  if (!cargado) return null;
  if (!nino) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center">
        <p className="text-muted-foreground">No encontramos este niño en este dispositivo.</p>
        <Link to="/registro-evolucion" className="mt-4 inline-block rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">
          Volver al registro
        </Link>
      </div>
    );
  }

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!borrador) return;
    if (!borrador.fecha || !borrador.actividad) {
      setError("Selecciona la fecha y la actividad realizada.");
      return;
    }
    guardarRegistro({
      id: borrador.id,
      child_id: nino.id,
      fecha: borrador.fecha,
      actividad: borrador.actividad,
      objetivo: borrador.objetivo.trim(),
      observaciones: borrador.observaciones.trim(),
      estado: borrador.estado,
    });
    setBorrador(null);
    setError("");
  };

  const editar = (r: RegistroEvolucion) => {
    setBorrador({ id: r.id, fecha: r.fecha, actividad: r.actividad, objetivo: r.objetivo, observaciones: r.observaciones, estado: r.estado });
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <Link to="/registro-evolucion" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Todos los niños
      </Link>

      <header className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="break-words font-display text-3xl font-bold">{nino.nombre}</h1>
          <p className="text-muted-foreground">
            {nino.edad} {nino.edad === 1 ? "año" : "años"} · Perfil creado el {new Date(nino.created_at).toLocaleDateString("es-ES")}
          </p>
        </div>
        {!borrador && (
          <button
            type="button"
            onClick={() => setBorrador(borradorVacio())}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90"
          >
            <Plus className="h-5 w-5" aria-hidden="true" /> Nueva evolución
          </button>
        )}
      </header>

      <p className="inline-flex items-center gap-2 rounded-xl bg-primary-soft px-3 py-2 text-xs text-accent-foreground">
        <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Los registros se guardan en este dispositivo.
      </p>

      {borrador && (
        <form onSubmit={enviar} className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="font-display text-lg font-bold">{borrador.id ? "Editar evolución" : "Nueva evolución"}</h2>
          <div className="grid gap-4 md:grid-cols-[180px_1fr]">
            <div>
              <label htmlFor="fecha" className="text-sm font-semibold">Fecha de sesión</label>
              <input id="fecha" type="date" value={borrador.fecha} onChange={(e) => setBorrador({ ...borrador, fecha: e.target.value })} className={campo} />
            </div>
            <div className="min-w-0">
              <label htmlFor="actividad" className="text-sm font-semibold">Actividad realizada</label>
              <select id="actividad" value={borrador.actividad} onChange={(e) => setBorrador({ ...borrador, actividad: e.target.value })} className={campo}>
                <option value="">Selecciona una dinámica…</option>
                {DINAMICAS_ORDENADAS.map((d) => (
                  <option key={d.id} value={d.id}>{d.titulo}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="objetivo" className="text-sm font-semibold">Objetivo trabajado</label>
            <input id="objetivo" value={borrador.objetivo} onChange={(e) => setBorrador({ ...borrador, objetivo: e.target.value })} placeholder="Trabajar coordinación ojo-mano." className={campo} />
          </div>
          <div>
            <label htmlFor="observaciones" className="text-sm font-semibold">Observaciones</label>
            <textarea id="observaciones" rows={5} value={borrador.observaciones} onChange={(e) => setBorrador({ ...borrador, observaciones: e.target.value })} placeholder="Realizó la actividad con menos ayuda que en sesiones anteriores." className={campo} />
          </div>
          <fieldset>
            <legend className="text-sm font-semibold">Estado de evolución</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {ESTADOS.map((s) => (
                <label
                  key={s.id}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-border px-4 py-3 font-medium has-[:checked]:border-primary has-[:checked]:bg-primary-soft has-[:checked]:text-primary"
                >
                  <input type="radio" name="estado" value={s.id} checked={borrador.estado === s.id} onChange={() => setBorrador({ ...borrador, estado: s.id })} className="sr-only" />
                  <span aria-hidden="true">{s.emoji}</span> {s.etiqueta}
                </label>
              ))}
            </div>
          </fieldset>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => { setBorrador(null); setError(""); }} className="rounded-xl border border-border px-5 py-3 font-semibold hover:bg-muted">
              Cancelar
            </button>
            <button type="submit" className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90">
              Guardar evolución
            </button>
          </div>
        </form>
      )}

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl font-bold">Historial ({historial.length})</h2>
          {historial.length > 1 && (
            <>
              <label htmlFor="orden-registros" className="sr-only">Ordenar registros</label>
              <select id="orden-registros" value={orden} onChange={(e) => setOrden(e.target.value as "desc" | "asc")} className="rounded-xl border border-border bg-card px-3 py-2 text-sm">
                <option value="desc">Más recientes primero</option>
                <option value="asc">Más antiguos primero</option>
              </select>
            </>
          )}
        </div>

        {historial.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
            <ClipboardList className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
            <p className="mt-2">Aún no hay evoluciones registradas para {nino.nombre}.</p>
          </div>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {historial.map((r) => {
              const est = ESTADOS.find((s) => s.id === r.estado) ?? ESTADOS[1]!;
              const din = MAPA_DINAMICAS.get(r.actividad);
              return (
                <li key={r.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display font-bold">{formatearFecha(r.fecha)}</p>
                    <span className="shrink-0 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
                      {est.emoji} {est.etiqueta}
                    </span>
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div><dt className="font-semibold text-muted-foreground">Actividad</dt><dd>{
                      r.actividades && r.actividades.length > 1 && r.actividades[0] === r.actividad
                        ? r.actividades.map((id) => MAPA_DINAMICAS.get(id)?.titulo ?? "Dinámica no disponible").join(" · ")
                        : din?.titulo ?? "Dinámica no disponible"
                    }</dd></div>
                    {r.objetivo && <div><dt className="font-semibold text-muted-foreground">Objetivo</dt><dd>{r.objetivo}</dd></div>}
                    {r.observaciones && <div><dt className="font-semibold text-muted-foreground">Observaciones</dt><dd className="whitespace-pre-line break-words">{r.observaciones}</dd></div>}
                  </dl>
                  {confirmar === r.id ? (
                    <div className="mt-auto rounded-xl bg-muted p-3 text-sm">
                      <p className="font-semibold">¿Eliminar este registro? No se puede deshacer.</p>
                      <div className="mt-2 flex gap-2">
                        <button type="button" onClick={() => { eliminarRegistro(r.id); setConfirmar(null); }} className="flex-1 rounded-xl bg-destructive px-4 py-2.5 font-semibold text-destructive-foreground">Sí, eliminar</button>
                        <button type="button" onClick={() => setConfirmar(null)} className="flex-1 rounded-xl border border-border bg-card px-4 py-2.5 font-semibold">Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-auto flex gap-2">
                      <button type="button" onClick={() => editar(r)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 font-semibold hover:bg-muted">
                        <Pencil className="h-4 w-4" aria-hidden="true" /> Editar
                      </button>
                      <button type="button" onClick={() => setConfirmar(r.id)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 font-semibold text-destructive hover:bg-muted">
                        <Trash2 className="h-4 w-4" aria-hidden="true" /> Eliminar
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <div className="border-t border-border pt-4">
        {confirmarNino ? (
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span>¿Eliminar a {nino.nombre} y todo su historial?</span>
            <button type="button" onClick={() => { eliminarNino(nino.id); navigate({ to: "/registro-evolucion" }); }} className="rounded-xl bg-destructive px-4 py-2 font-semibold text-destructive-foreground">Sí, eliminar</button>
            <button type="button" onClick={() => setConfirmarNino(false)} className="rounded-xl border border-border px-4 py-2 font-semibold">Cancelar</button>
          </div>
        ) : (
          <button type="button" onClick={() => setConfirmarNino(true)} className="text-sm font-semibold text-muted-foreground hover:text-destructive">
            Eliminar perfil del niño
          </button>
        )}
      </div>
    </div>
  );
}
