import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X, Plus, Clock, User } from "lucide-react";
import { TODAS_LAS_DINAMICAS as DINAMICAS, MAPA_DINAMICAS } from "@/data/dinamicas";
import { CATEGORIAS, MAPA_CATEGORIAS } from "@/data/categorias";
import { useEvolucion, hoyISO } from "@/lib/evolucion";
import { ESTADOS_SESION, type BorradorSesion, type Sesion } from "@/lib/sesiones";
import { normalizar } from "@/lib/texto";

const campo =
  "mt-1 w-full rounded-xl border border-border bg-background px-3 py-3 outline-none focus:border-primary";
const PERSONALIZADO = "__personalizado__";
const NOMBRES_CAT = CATEGORIAS.map((c) => c.nombre);

function materialesDe(ids: string[]) {
  const vistos = new Set<string>();
  const res: string[] = [];
  for (const id of ids) {
    for (const m of MAPA_DINAMICAS.get(id)?.materiales ?? []) {
      const k = normalizar(m);
      if (!vistos.has(k)) {
        vistos.add(k);
        res.push(m);
      }
    }
  }
  return res;
}

export function FormularioSesion({
  inicial,
  onGuardar,
  onCancelar,
}: {
  inicial?: Sesion;
  onGuardar: (b: BorradorSesion) => void;
  onCancelar: () => void;
}) {
  const { ninos, cargado } = useEvolucion();
  const [childId, setChildId] = useState(inicial?.child_id ?? "");
  const [fecha, setFecha] = useState(inicial?.fecha ?? hoyISO());
  const objInicial = inicial?.objetivo ?? "";
  const [objSel, setObjSel] = useState(
    !objInicial ? "" : NOMBRES_CAT.includes(objInicial) ? objInicial : PERSONALIZADO,
  );
  const [objPers, setObjPers] = useState(NOMBRES_CAT.includes(objInicial) ? "" : objInicial);
  const [actividades, setActividades] = useState<string[]>(inicial?.actividades ?? []);
  const [manuales, setManuales] = useState<string[]>(() => {
    if (!inicial) return [];
    const auto = new Set(materialesDe(inicial.actividades).map(normalizar));
    return inicial.materiales.filter((m) => !auto.has(normalizar(m)));
  });
  const [nuevoMat, setNuevoMat] = useState("");
  const [notas, setNotas] = useState(inicial?.notas ?? "");
  const [consulta, setConsulta] = useState("");
  const [error, setError] = useState("");

  const resultados = useMemo(() => {
    const q = normalizar(consulta);
    const lista = q
      ? DINAMICAS.filter(
          (d) =>
            normalizar(d.titulo).includes(q) ||
            normalizar(MAPA_CATEGORIAS[d.categoriaId]?.nombre ?? "").includes(q),
        )
      : DINAMICAS;
    return [...lista].sort((a, b) => a.titulo.localeCompare(b.titulo, "es"));
  }, [consulta]);

  const autoMat = useMemo(() => materialesDe(actividades), [actividades]);
  const todosMat = useMemo(() => {
    const k = new Set(autoMat.map(normalizar));
    return [...autoMat, ...manuales.filter((m) => !k.has(normalizar(m)))];
  }, [autoMat, manuales]);

  const alternar = (id: string) =>
    setActividades((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  const anadirMat = () => {
    const m = nuevoMat.trim();
    if (!m) return;
    if (!todosMat.some((x) => normalizar(x) === normalizar(m))) setManuales((l) => [...l, m]);
    setNuevoMat("");
  };

  if (cargado && ninos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
        <User className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Primero crea un niño en Registro de evolución para poder organizar una sesión.
        </p>
        <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row">
          <Link to="/registro-evolucion" className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90">
            Ir a Registro de evolución
          </Link>
          <button type="button" onClick={onCancelar} className="rounded-xl border border-border px-5 py-3 font-semibold hover:bg-muted">
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const objetivo = objSel === PERSONALIZADO ? objPers.trim() : objSel;
    if (!childId) return setError("Selecciona un niño.");
    if (!fecha) return setError("Indica la fecha de la sesión.");
    if (!objetivo) return setError("Selecciona o escribe el objetivo de la sesión.");
    if (actividades.length === 0) return setError("Selecciona al menos una dinámica.");
    onGuardar({
      id: inicial?.id,
      child_id: childId,
      fecha,
      objetivo,
      actividades,
      materiales: todosMat,
      notas: notas.trim(),
      estado: inicial?.estado ?? ESTADOS_SESION[0]!.id,
    });
  };

  return (
    <form onSubmit={enviar} className="space-y-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
      <h2 className="font-display text-xl font-bold">{inicial ? "Editar sesión" : "Nueva sesión"}</h2>

      <div className="grid gap-4 md:grid-cols-[1fr_200px]">
        <div>
          <label htmlFor="ses-nino" className="text-sm font-semibold">1. Seleccionar niño</label>
          <select id="ses-nino" value={childId} onChange={(e) => setChildId(e.target.value)} className={campo}>
            <option value="">Selecciona un niño…</option>
            {[...ninos].sort((a, b) => a.nombre.localeCompare(b.nombre, "es")).map((n) => (
              <option key={n.id} value={n.id}>{n.nombre} ({n.edad} {n.edad === 1 ? "año" : "años"})</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="ses-fecha" className="text-sm font-semibold">2. Fecha</label>
          <input id="ses-fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className={campo} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="ses-obj" className="text-sm font-semibold">3. Objetivo de la sesión</label>
          <select id="ses-obj" value={objSel} onChange={(e) => setObjSel(e.target.value)} className={campo}>
            <option value="">Selecciona un objetivo…</option>
            {NOMBRES_CAT.map((n) => <option key={n} value={n}>{n}</option>)}
            <option value={PERSONALIZADO}>Objetivo personalizado…</option>
          </select>
        </div>
        {objSel === PERSONALIZADO && (
          <div>
            <label htmlFor="ses-obj-pers" className="text-sm font-semibold">Objetivo personalizado</label>
            <input id="ses-obj-pers" value={objPers} onChange={(e) => setObjPers(e.target.value)} maxLength={160} placeholder="Mejorar la tolerancia a texturas nuevas" className={campo} />
          </div>
        )}
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold">4. Selección de dinámicas ({actividades.length} seleccionadas)</legend>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="ses-buscar" className="sr-only">Buscar dinámica</label>
          <input id="ses-buscar" type="search" value={consulta} onChange={(e) => setConsulta(e.target.value)} placeholder="Buscar dinámica..." className="w-full rounded-xl border border-border bg-background py-3 pl-9 pr-3 outline-none focus:border-primary" />
        </div>
        <ul className="max-h-72 space-y-1 overflow-y-auto rounded-xl border border-border p-2">
          {resultados.length === 0 && <li className="p-3 text-sm text-muted-foreground">No hay dinámicas que coincidan.</li>}
          {resultados.map((d) => (
            <li key={d.id}>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted has-[:checked]:bg-primary-soft">
                <input type="checkbox" checked={actividades.includes(d.id)} onChange={() => alternar(d.id)} className="h-5 w-5 shrink-0 accent-[var(--primary)]" />
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{d.tipo === "complementaria" && "⭐ "}{d.titulo}{d.tipo === "complementaria" && <span className="font-normal text-primary"> (Complementaria)</span>}</span>
                  <span className="block text-xs text-muted-foreground">{MAPA_CATEGORIAS[d.categoriaId]?.nombre} · {d.duracion} min</span>
                </span>
              </label>
            </li>
          ))}
        </ul>

        {actividades.length > 0 && (
          <ul className="grid gap-3 md:grid-cols-2">
            {actividades.map((id) => {
              const d = MAPA_DINAMICAS.get(id);
              if (!d) return null;
              return (
                <li key={id} className="rounded-xl border border-primary/30 bg-primary-soft/50 p-4 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display font-bold">{d.tipo === "complementaria" && "⭐ "}{d.titulo}</p>
                    <button type="button" onClick={() => alternar(id)} aria-label={`Quitar ${d.titulo}`} className="grid h-8 w-8 shrink-0 place-items-center rounded-lg hover:bg-muted">
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="mt-1 text-muted-foreground">
                    {MAPA_CATEGORIAS[d.categoriaId]?.nombre} · <Clock className="inline h-3.5 w-3.5" aria-hidden="true" /> {d.duracion} min · {d.dificultad} · {d.edadMin}–{d.edadMax} años
                  </p>
                  <p className="mt-2"><span className="font-semibold">Objetivo:</span> {d.objetivo}</p>
                  <p className="mt-1"><span className="font-semibold">Materiales:</span> {d.materiales.join(", ")}</p>
                </li>
              );
            })}
          </ul>
        )}
      </fieldset>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold">5. Materiales necesarios</h3>
        {todosMat.length === 0 ? (
          <p className="text-sm text-muted-foreground">Selecciona dinámicas para ver sus materiales.</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {todosMat.map((m) => {
              const manual = manuales.includes(m);
              return (
                <li key={m} className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-3 py-1.5 text-sm text-accent-foreground">
                  {m}
                  {manual && (
                    <button type="button" onClick={() => setManuales((l) => l.filter((x) => x !== m))} aria-label={`Quitar ${m}`} className="ml-1 rounded-full hover:text-destructive">
                      <X className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        <div className="flex gap-2">
          <label htmlFor="ses-mat" className="sr-only">Añadir material</label>
          <input
            id="ses-mat"
            value={nuevoMat}
            onChange={(e) => setNuevoMat(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); anadirMat(); } }}
            placeholder="Añadir material manualmente"
            className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-3 outline-none focus:border-primary"
          />
          <button type="button" onClick={anadirMat} className="inline-flex items-center gap-1 rounded-xl border border-border px-4 py-3 font-semibold hover:bg-muted">
            <Plus className="h-4 w-4" aria-hidden="true" /> Añadir
          </button>
        </div>
      </section>

      <div>
        <label htmlFor="ses-notas" className="text-sm font-semibold">6. Notas del terapeuta</label>
        <textarea id="ses-notas" rows={5} value={notas} onChange={(e) => setNotas(e.target.value)} placeholder="Trabajar tolerancia táctil y coordinación ojo-mano." className={campo} />
      </div>

      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancelar} className="rounded-xl border border-border px-5 py-3 font-semibold hover:bg-muted">Cancelar</button>
        <button type="submit" className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90">Guardar sesión</button>
      </div>
    </form>
  );
}
