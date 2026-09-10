export interface VideoComplementario {
  id: string;
  titulo: string;
  /** URL absoluta de la miniatura */
  miniatura: string;
  /** URL absoluta del vídeo (se abre en una pestaña nueva) */
  url: string;
}

/**
 * Lista configurable de vídeos complementarios.
 * Está vacía a propósito: la sección se oculta mientras no haya vídeos reales.
 */
export const VIDEOS: VideoComplementario[] = [];
