import { useEffect, useRef, useState } from "react";
import { Heart, X, Copy, Check } from "lucide-react";
import { useFavoritos } from "@/lib/favoritos";
import { MAPA_CATEGORIAS_GUIA, type RecursoComunicacion } from "@/data/guia-comunicacion-familias";

function BotonFavorito({ id, titulo }: { id: string; titulo: string }) {
  const { esFavorito, alternarFavorito } = useFavoritos();
  const activo = esFavorito(id);
  return (
    <button
      type="button"
      onClick={() => alternarFavorito(id)}
      aria-pressed={activo}
      aria-label={activo ? `Quitar "${titulo}" de favoritos` : `Guardar "${titulo}" en favoritos`}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-primary transition-colors hover:bg-primary-soft"
    >
      <Heart className="h-5 w-5" fill={activo ? "currentColor" : "none"} aria-hidden="true" />
    </button>
  );
}

export function TarjetaRecurso({ recurso, onAbrir }: { recurso: RecursoComunicacion; onAbrir: (r: RecursoComunicacion) => void }) {
  const cat = MAPA_CATEGORIAS_GUIA[recurso.categoria];
  return (
    <article className="tarjeta flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold text-primary">{cat.emoji} {cat.nombre}</p>
        <BotonFavorito id={recurso.id} titulo={recurso.titulo} />
      </div>
      <h3 className="mt-1 font-semibold leading-snug">{recurso.titulo}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{recurso.situacion}</p>
      <button
        type="button"
        onClick={() => onAbrir(recurso)}
        className="mt-4 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Ver mensaje
      </button>
    </article>
  );
}

export function DetalleRecurso({ recurso, onCerrar }: { recurso: RecursoComunicacion; onCerrar: () => void }) {
  const [copiado, setCopiado] = useState<"" | "ok" | "error">("");
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const cat = MAPA_CATEGORIAS_GUIA[recurso.categoria];

  useEffect(() => {
    const previo = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cerrarRef.current?.focus();
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && onCerrar();
    window.addEventListener("keydown", tecla);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", tecla);
      previo?.focus();
    };
  }, [onCerrar]);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(recurso.mensaje);
      setCopiado("ok");
    } catch {
      setCopiado("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 sm:items-center sm:p-6" onClick={onCerrar}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-recurso"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-surface p-6 shadow-xl sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-semibold text-primary">{cat.emoji} {cat.nombre}</p>
          <div className="flex gap-2">
            <BotonFavorito id={recurso.id} titulo={recurso.titulo} />
            <button ref={cerrarRef} type="button" onClick={onCerrar} aria-label="Cerrar mensaje" className="grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground hover:text-primary">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <h2 id="titulo-recurso" className="mt-2 text-xl font-bold sm:text-2xl">{recurso.titulo}</h2>
        <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-muted-foreground">Situación</h3>
        <p className="mt-1 text-sm">Utiliza este mensaje cuando… {recurso.situacion.charAt(0).toLowerCase() + recurso.situacion.slice(1)}</p>
        <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-muted-foreground">Mensaje</h3>
        <div className="mt-2 rounded-2xl border border-primary/30 bg-primary-soft p-5 text-base leading-relaxed">{recurso.mensaje}</div>
        <button type="button" onClick={copiar} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90">
          {copiado === "ok" ? <Check className="h-5 w-5" aria-hidden="true" /> : <Copy className="h-5 w-5" aria-hidden="true" />}
          📋 Copiar mensaje
        </button>
        <p role="status" className="mt-3 min-h-5 text-center text-sm font-semibold text-primary">
          {copiado === "ok" ? "Mensaje copiado correctamente." : copiado === "error" ? "No se pudo copiar. Selecciona el texto y cópialo manualmente." : ""}
        </p>
      </div>
    </div>
  );
}
