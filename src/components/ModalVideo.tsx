import { useEffect, useRef, useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { urlIncrustada, type VideoComplementario } from "@/data/videos";

interface Props {
  video: VideoComplementario;
  onCerrar: () => void;
}

/** Reproductor de YouTube dentro de la aplicación. El iframe se desmonta al cerrar. */
export function ModalVideo({ video, onCerrar }: Props) {
  const contenedor = useRef<HTMLDivElement>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const [cargado, setCargado] = useState(false);
  const [aviso, setAviso] = useState(false);

  useEffect(() => {
    cerrarRef.current?.focus();
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCerrar();
        return;
      }
      if (e.key !== "Tab" || !contenedor.current) return;
      const foco = contenedor.current.querySelectorAll<HTMLElement>(
        'button, a[href], iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (foco.length === 0) return;
      const primero = foco[0]!;
      const ultimo = foco[foco.length - 1]!;
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
      document.body.style.overflow = previo;
    };
  }, [onCerrar]);

  // Si el iframe no carga en un tiempo razonable, avisamos sin redirigir.
  useEffect(() => {
    const t = setTimeout(() => {
      if (!cargado) setAviso(true);
    }, 8000);
    return () => clearTimeout(t);
  }, [cargado]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCerrar();
      }}
    >
      <div
        ref={contenedor}
        role="dialog"
        aria-modal="true"
        aria-label={`Reproductor: ${video.titulo}`}
        className="relative w-full max-w-4xl"
      >
        <button
          ref={cerrarRef}
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar reproductor"
          className="absolute -top-2 right-0 z-10 grid h-10 w-10 -translate-y-full place-items-center rounded-full bg-surface text-foreground shadow-lg transition-opacity hover:opacity-90"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="overflow-hidden rounded-2xl bg-black shadow-lg">
          <div className="relative aspect-video w-full">
            <iframe
              key={video.id}
              src={urlIncrustada(video.youtubeId)}
              title={video.titulo}
              onLoad={() => setCargado(true)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>

        <div className="mt-3 rounded-2xl bg-surface px-4 py-3">
          <h2 className="text-sm font-semibold">{video.titulo}</h2>
          {aviso && (
            <p className="mt-2 flex items-start gap-2 text-xs text-muted-foreground">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
              Si el vídeo no se reproduce aquí, puede tener restringida la reproducción integrada.
              Puedes cerrar esta ventana y verlo en{" "}
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                YouTube
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
