import { ExternalLink } from "lucide-react";
import { VIDEOS } from "@/data/videos";

/**
 * Carrusel de vídeos complementarios.
 * Se oculta por completo mientras la lista de vídeos esté vacía.
 */
export function CarruselVideos() {
  if (VIDEOS.length === 0) return null;

  return (
    <section aria-label="Vídeos complementarios" className="mb-8">
      <h2 className="mb-3 text-lg font-semibold">Vídeos complementarios</h2>
      <div className="-mx-1 flex snap-x gap-4 overflow-x-auto px-1 pb-2">
        {VIDEOS.map((video) => (
          <article
            key={video.id}
            className="tarjeta w-64 shrink-0 snap-start overflow-hidden p-0"
          >
            <img
              src={video.miniatura}
              alt={`Miniatura del vídeo ${video.titulo}`}
              className="h-36 w-full object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <h3 className="line-clamp-2 text-sm font-semibold">{video.titulo}</h3>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
              >
                Ver vídeo
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
