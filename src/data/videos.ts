export interface VideoComplementario {
  id: string;
  titulo: string;
  /** URL original en YouTube */
  url: string;
  /** Identificador del vídeo en YouTube */
  youtubeId: string;
  /** URL absoluta de la miniatura */
  miniatura: string;
  /** Orden de aparición en el carrusel */
  orden: number;
}

const crear = (
  id: string,
  titulo: string,
  youtubeId: string,
  orden: number,
): VideoComplementario => ({
  id,
  titulo,
  youtubeId,
  orden,
  url: `https://www.youtube.com/watch?v=${youtubeId}`,
  miniatura: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
});

/** Lista configurable de vídeos de apoyo, independiente del catálogo de dinámicas. */
export const VIDEOS: VideoComplementario[] = [
  crear("v1", "Actividades motoras y sensoriales en casa", "dBhk2c53ids", 1),
  crear("v2", "Juegos y juguetes para atención temprana", "AvlbppHoAcA", 2),
  crear("v3", "15 actividades de motricidad fina", "9oHq-joy22w", 3),
  crear("v4", "Motricidad fina y preparación para escribir", "z5fk2it-FD8", 4),
  crear("v5", "Habilidades motoras finas", "E1ePJOWORkI", 5),
  crear("v6", "Ejercicios de motricidad fina", "kTvLIkmP9WA", 6),
  crear("v7", "15 ejercicios de motricidad gruesa", "d6MtEBnWYm0", 7),
].sort((a, b) => a.orden - b.orden);

export const urlIncrustada = (youtubeId: string) =>
  `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&cc_load_policy=1`;
