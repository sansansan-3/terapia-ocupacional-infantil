/** Normaliza texto: minúsculas y sin tildes, para búsquedas tolerantes. */
export function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}
