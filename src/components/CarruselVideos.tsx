import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { VIDEOS, type VideoComplementario } from "@/data/videos";
import { ModalVideo } from "./ModalVideo";

/** Carrusel de vídeos de apoyo con reproductor integrado. */
export function CarruselVideos() {
  const pista = useRef<HTMLDivElement>(null);
  const tarjetas = useRef<Record<string, HTMLButtonElement | null>>({});
  const [activo, setActivo] = useState<VideoComplementario | null>(null);
  const [fallos, setFallos] = useState<Record<string, boolean>>({});

  if (VIDEOS.length === 0) return null;

  const desplazar = (dir: -1 | 1) => {
    const el = pista.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(260, el.clientWidth * 0.8), behavior: "smooth" });
  };

  const cerrar = () => {
    const id = activo?.id;
    setActivo(null);
    if (id) requestAnimationFrame(() => tarjetas.current[id]?.focus());
  };

  return (
    <section aria-label="Vídeos de apoyo" className="mb-8">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <h2 className="text-xl font-bold">Vídeos de apoyo para tus actividades</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Ideas y demostraciones para complementar las dinámicas
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => desplazar(-1)}
            aria-label="Vídeos anteriores"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface transition-colors hover:bg-primary-soft"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => desplazar(1)}
            aria-label="Vídeos siguientes"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface transition-colors hover:bg-primary-soft"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={pista}
        className="-mx-1 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]"
      >
        {VIDEOS.map((video) => (
          <article
            key={video.id}
            className="tarjeta w-[260px] shrink-0 snap-start overflow-hidden p-0"
          >
            <button
              type="button"
              ref={(el) => {
                tarjetas.current[video.id] = el;
              }}
              onClick={() => setActivo(video)}
              aria-label={`Ver vídeo: ${video.titulo}`}
              className="group block w-full text-left"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-primary-soft">
                {!fallos[video.id] && (
                  <img
                    src={video.miniatura}
                    alt=""
                    loading="lazy"
                    onError={() => setFallos((f) => ({ ...f, [video.id]: true }))}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/90 text-primary-foreground shadow-lift">
                    <Play className="h-5 w-5 translate-x-[1px]" aria-hidden="true" />
                  </span>
                </span>
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 text-sm font-semibold">{video.titulo}</h3>
              </div>
            </button>
            <div className="px-4 pb-4">
              <button
                type="button"
                onClick={() => setActivo(video)}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
                Ver vídeo
              </button>
            </div>
          </article>
        ))}
      </div>

      {activo && <ModalVideo video={activo} onCerrar={cerrar} />}
    </section>
  );
}
