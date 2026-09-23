import { useState } from "react";
import { useEvolucion } from "@/lib/evolucion";
import { useSesiones, type EstadoSesion, type Sesion } from "@/lib/sesiones";

/** Cambia el estado de una sesión y, al marcarla realizada, ofrece crear un registro de evolución. */
export function useEstadoSesion() {
  const { cambiarEstado } = useSesiones();
  const { registros, guardarRegistro } = useEvolucion();
  const [pendiente, setPendiente] = useState<Sesion | null>(null);
  const [aviso, setAviso] = useState("");

  const yaRegistrada = (s: Sesion) => registros.some((r) => r.session_id === s.id);

  const cambiar = (s: Sesion, estado: EstadoSesion) => {
    cambiarEstado(s.id, estado);
    setAviso("");
    if (estado === "realizada" && s.estado !== "realizada") {
      if (yaRegistrada(s)) setAviso("Esta sesión ya está guardada en el Registro de evolución.");
      else setPendiente({ ...s, estado });
    }
  };

  const aceptar = () => {
    if (pendiente && !yaRegistrada(pendiente)) {
      guardarRegistro({
        child_id: pendiente.child_id,
        fecha: pendiente.fecha,
        actividad: pendiente.actividades[0] ?? "",
        actividades: pendiente.actividades,
        session_id: pendiente.id,
        objetivo: pendiente.objetivo,
        observaciones: "",
        estado: "en-proceso",
      });
      setAviso("Sesión guardada en el Registro de evolución. Completa las observaciones allí.");
    }
    setPendiente(null);
  };

  const dialogo = pendiente ? (
    <div role="dialog" aria-modal="true" aria-labelledby="preg-evo" className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-lift">
        <p id="preg-evo" className="font-display text-lg font-bold">¿Quieres guardar esta sesión en el Registro de evolución?</p>
        <p className="mt-2 text-sm text-muted-foreground">Se creará un registro con el niño, la fecha, las dinámicas y el objetivo. Las observaciones quedarán vacías para completar.</p>
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => setPendiente(null)} className="rounded-xl border border-border px-5 py-3 font-semibold hover:bg-muted">Ahora no</button>
          <button type="button" autoFocus onClick={aceptar} className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90">Sí, guardar</button>
        </div>
      </div>
    </div>
  ) : null;

  return { cambiar, dialogo, aviso, yaRegistrada };
}
