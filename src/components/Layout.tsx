import { Link, useNavigate } from "@tanstack/react-router";
import { Home, Sparkles, LayoutGrid, Heart, Info, Search, LogOut } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useFavoritos } from "@/lib/favoritos";
import { useAcceso } from "@/lib/acceso";

const ENLACES = [
  { to: "/", etiqueta: "Inicio", icono: Home, exacto: true },
  { to: "/dinamicas", etiqueta: "Dinámicas", icono: Sparkles, exacto: false },
  { to: "/categorias", etiqueta: "Categorías", icono: LayoutGrid, exacto: false },
  { to: "/favoritos", etiqueta: "Favoritos", icono: Heart, exacto: false },
  { to: "/acerca-de", etiqueta: "Acerca de", icono: Info, exacto: false },
] as const;

export function Layout({ children }: { children: ReactNode }) {
  const [consulta, setConsulta] = useState("");
  const navigate = useNavigate();
  const { total } = useFavoritos();
  const { salir } = useAcceso();

  const buscar = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      to: "/dinamicas",
      search: { q: consulta, cat: "", edad: 0, dif: "", hab: "", orden: "titulo-asc", p: 1 },
    });
  };

  return (
    <div className="min-h-screen w-full lg:flex">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-surface px-4 py-6 lg:flex">
        <Link to="/" className="flex items-center gap-3 px-2">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-base font-bold leading-tight">TO Kids</span>
            <span className="block text-xs text-muted-foreground">150 Dinámicas</span>
          </span>
        </Link>

        <nav aria-label="Navegación principal" className="mt-8 flex flex-col gap-1">
          {ENLACES.map(({ to, etiqueta, icono: Icono, exacto }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: exacto }}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted data-[status=active]:bg-primary-soft data-[status=active]:text-primary"
            >
              <Icono className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
              <span className="truncate">{etiqueta}</span>
              {to === "/favoritos" && total > 0 && (
                <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                  {total}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-3">
          <button
            type="button"
            onClick={salir}
            className="flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Salir
          </button>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Material de apoyo para la planificación de actividades.
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur">
          <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-3 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <Link to="/" className="flex shrink-0 items-center gap-2 lg:hidden">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <form role="search" onSubmit={buscar} className="min-w-0 flex-1">
                <label htmlFor="buscador" className="sr-only">
                  Buscar dinámicas
                </label>
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <input
                    id="buscador"
                    type="search"
                    value={consulta}
                    onChange={(e) => setConsulta(e.target.value)}
                    placeholder="Buscar dinámicas…"
                    className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-primary"
                  />
                </div>
              </form>
              <button
                type="button"
                onClick={salir}
                aria-label="Salir"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:text-primary lg:hidden"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-6 sm:px-6 lg:pb-12">
          {children}
        </main>

        <nav
          aria-label="Navegación principal"
          className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden"
        >
          {ENLACES.map(({ to, etiqueta, icono: Icono, exacto }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: exacto }}
              className="relative flex flex-col items-center gap-1 px-1 py-2.5 text-[11px] font-medium text-muted-foreground transition-colors data-[status=active]:text-primary"
            >
              <Icono className="h-5 w-5" aria-hidden="true" />
              <span className="truncate">{etiqueta}</span>
              {to === "/favoritos" && total > 0 && (
                <span className="absolute right-3 top-1 rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                  {total}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
