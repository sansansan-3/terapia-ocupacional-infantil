import { useEffect, useRef } from "react";
import { X, Heart, Clock, Baby, Gauge, AlertTriangle } from "lucide-react";
import type { Dinamica } from "@/data/types";
import { MAPA_CATEGORIAS } from "@/data/categorias";
import { useFavoritos } from "@/lib/favoritos";
import { IconoCategoria } from "./IconoCategoria";

interface Props {
  dinamica: Dinamica;
  onCerrar: () => void;
}

export function FichaDinamica({ dinamica, onCerrar }: Props) {
  const { esFavorito, alternarFavorito } = useFavoritos();
  const favorito = esFavorito(dinamica.id);
  const categoria = MAPA_CATEGORIAS[dinamica.categoriaId];
  const botonCerrar = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    botonCerrar.current?.focus();
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCerrar();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const focusables = panel.current.querySelectorAll<HTMLElement>(
        'button, a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const primero = focusables[0];
      const ultimo = focusables[focusables.length - 1];
      if (!primero || !ultimo) return;
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };

    document.addEventListener("keydown", alPulsar);
    return () => {
      document.removeEventListener("keydown", alPulsar);
      document.body.style.overflow = anterior;
    };
  }, [onCerrar]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div
        role="presentation"
        className="absolute inset-0"
        onClick={onCerrar}
        aria-hidden="true"
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-ficha"
        className="relative flex h-[100dvh] w-full max-w-4xl flex-col overflow-hidden bg-card shadow-lift sm:h-auto sm:max-h-[90vh] sm:rounded-3xl"
      >
        <header className="grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-b border-border bg-surface px-5 py-4 sm:px-7">
          <div className="min-w-0">
            <span className="inline-flex min-w-0 items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              <IconoCategoria categoriaId={dinamica.categoriaId} className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{categoria?.nombre}</span>
            </span>
            <h2 id="titulo-ficha" className="mt-2 text-xl font-bold sm:text-2xl">
              {dinamica.titulo}
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => alternarFavorito(dinamica.id)}
              aria-pressed={favorito}
              aria-label={favorito ? "Quitar de favoritos" : "Añadir a favoritos"}
              className="grid h-10 w-10 place-items-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary-soft hover:text-primary"
            >
              <Heart
                className={`h-5 w-5 ${favorito ? "fill-primary text-primary" : ""}`}
                aria-hidden="true"
              />
            </button>
            <button
              ref={botonCerrar}
              type="button"
              onClick={onCerrar}
              aria-label="Cerrar dinámica"
              className="grid h-10 w-10 place-items-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
            <div className="space-y-6">
              <section aria-label="Datos básicos" className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                <Dato icono={<Baby className="h-4 w-4" />} etiqueta="Edad">
                  {dinamica.edadMin} a {dinamica.edadMax} años
                </Dato>
                <Dato icono={<Clock className="h-4 w-4" />} etiqueta="Duración">
                  {dinamica.duracion} minutos
                </Dato>
                <Dato icono={<Gauge className="h-4 w-4" />} etiqueta="Dificultad">
                  {dinamica.dificultad}
                </Dato>
              </section>

              <section>
                <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  Habilidades
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {dinamica.habilidades.map((h) => (
                    <li
                      key={h}
                      className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  Materiales
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {dinamica.materiales.map((m) => (
                    <li key={m} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  Objetivo
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed">{dinamica.objetivo}</p>
              </section>

              <section>
                <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  Instrucciones
                </h3>
                <ol className="mt-3 space-y-3">
                  {dinamica.pasos.map((paso, i) => (
                    <li key={paso} className="flex gap-3">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      <span className="pt-0.5 text-[15px] leading-relaxed">{paso}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  Consejos y adaptaciones
                </h3>
                <ul className="mt-3 space-y-2 text-[15px]">
                  {dinamica.consejos.map((c) => (
                    <li key={c} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl bg-muted p-4">
                <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  Observaciones
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed">{dinamica.observaciones}</p>
              </section>

              {dinamica.precauciones && (
                <section className="flex gap-3 rounded-2xl bg-warning/12 p-4">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning" aria-hidden="true" />
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-warning">
                      Precauciones
                    </h3>
                    <p className="mt-1 text-[15px] leading-relaxed">{dinamica.precauciones}</p>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>

        <footer className="shrink-0 border-t border-border bg-surface px-5 py-4 sm:px-7">
          <button
            type="button"
            onClick={onCerrar}
            className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
          >
            Cerrar dinámica
          </button>
        </footer>
      </div>
    </div>
  );
}

function Dato({
  icono,
  etiqueta,
  children,
}: {
  icono: React.ReactNode;
  etiqueta: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-muted px-4 py-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface text-primary">
        {icono}
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-muted-foreground">{etiqueta}</span>
        <span className="block text-sm font-semibold">{children}</span>
      </span>
    </div>
  );
}
