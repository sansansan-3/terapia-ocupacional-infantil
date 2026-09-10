import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIAS } from "@/data/categorias";
import { contarPorCategoria } from "@/data/dinamicas";
import { IconoCategoria } from "@/components/IconoCategoria";

export const Route = createFileRoute("/categorias")({
  head: () => ({
    meta: [
      { title: "Categorías de dinámicas · TO Kids" },
      {
        name: "description",
        content:
          "Nueve áreas de trabajo: motricidad, integración sensorial, atención, autonomía, cognición, socialización, percepción y escuela.",
      },
      { property: "og:title", content: "Categorías de dinámicas · TO Kids" },
      {
        property: "og:description",
        content: "Explora las dinámicas agrupadas por área de trabajo.",
      },
    ],
  }),
  component: PaginaCategorias,
});

function PaginaCategorias() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">Categorías</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Elige un área para ver sus dinámicas. Después puedes combinarla con el resto de filtros.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {CATEGORIAS.map((categoria) => (
          <Link
            key={categoria.id}
            to="/dinamicas"
            search={{ q: "", cat: categoria.id, edad: 0, dif: "", hab: "", orden: "titulo-asc", p: 1 }}
            className="tarjeta flex flex-col p-5 transition-shadow hover:shadow-lift"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
              <IconoCategoria categoriaId={categoria.id} className="h-6 w-6" />
            </span>
            <h2 className="mt-4 text-lg font-semibold">{categoria.nombre}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{categoria.descripcion}</p>
            <span className="mt-4 text-sm font-semibold text-primary">
              {contarPorCategoria(categoria.id)} dinámicas
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
