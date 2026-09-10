import type { ReactNode } from "react";

export function Indicador({
  icono,
  valor,
  etiqueta,
}: {
  icono: ReactNode;
  valor: number | string;
  etiqueta: string;
}) {
  return (
    <div className="tarjeta flex items-center gap-4 p-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
        {icono}
      </span>
      <span className="min-w-0">
        <span className="block font-display text-2xl font-bold leading-none">{valor}</span>
        <span className="mt-1 block text-sm leading-snug text-muted-foreground">{etiqueta}</span>
      </span>
    </div>
  );
}
