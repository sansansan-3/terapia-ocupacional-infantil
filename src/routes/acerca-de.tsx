import { createFileRoute, Link } from "@tanstack/react-router";
import { DINAMICAS } from "@/data/dinamicas";
import { CATEGORIAS } from "@/data/categorias";

export const Route = createFileRoute("/acerca-de")({
  head: () => ({
    meta: [
      { title: "Acerca de la biblioteca · TO Kids" },
      {
        name: "description",
        content:
          "Qué ofrece TO Kids y cómo usar categorías, búsqueda y favoritos para preparar actividades infantiles.",
      },
      { property: "og:title", content: "Acerca de la biblioteca · TO Kids" },
      {
        property: "og:description",
        content: "Una biblioteca de apoyo para organizar la preparación de actividades.",
      },
    ],
  }),
  component: PaginaAcercaDe,
});

function PaginaAcercaDe() {
  return (
    <div className="max-w-3xl">
      <header className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">Acerca de TO Kids</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Una biblioteca de {DINAMICAS.length} propuestas de actividad organizadas en{" "}
          {CATEGORIAS.length} áreas de trabajo.
        </p>
      </header>

      <div className="space-y-4">
        <section className="tarjeta p-6">
          <h2 className="text-lg font-semibold">Qué ofrece</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            Un catálogo de dinámicas pensadas para el trabajo con población infantil, con materiales
            accesibles y descripciones claras. Cada propuesta indica el área principal, la edad
            recomendada, la duración estimada, la dificultad y las habilidades que trabaja.
          </p>
        </section>

        <section className="tarjeta p-6">
          <h2 className="text-lg font-semibold">Cómo ayuda a preparar sesiones</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            En lugar de partir de cero, puedes localizar en pocos segundos varias propuestas que
            encajen con el área y la edad con la que vas a trabajar, revisar los materiales
            necesarios y ajustar la actividad antes de la sesión.
          </p>
        </section>

        <section className="tarjeta p-6">
          <h2 className="text-lg font-semibold">Qué incluye cada dinámica</h2>
          <ul className="mt-2 space-y-2 text-[15px] text-muted-foreground">
            <li>Objetivo de la actividad y habilidades implicadas.</li>
            <li>Lista de materiales necesarios.</li>
            <li>Instrucciones numeradas de preparación y desarrollo.</li>
            <li>Consejos para facilitar o ampliar la dificultad.</li>
            <li>Observaciones y, cuando procede, precauciones concretas.</li>
          </ul>
        </section>

        <section className="tarjeta p-6">
          <h2 className="text-lg font-semibold">Cómo usar la aplicación</h2>
          <ul className="mt-2 space-y-2 text-[15px] text-muted-foreground">
            <li>
              <strong className="text-foreground">Categorías:</strong> entra por área de trabajo y
              combina después con otros filtros.
            </li>
            <li>
              <strong className="text-foreground">Búsqueda:</strong> escribe en el buscador superior;
              busca en títulos, objetivos, habilidades y materiales.
            </li>
            <li>
              <strong className="text-foreground">Favoritos:</strong> pulsa el corazón para guardar
              una dinámica; se conserva en este navegador.
            </li>
          </ul>
        </section>

        <section className="rounded-2xl bg-primary-soft p-6">
          <p className="text-[15px] leading-relaxed text-accent-foreground">
            Material de apoyo para la planificación de actividades. Adapta cada propuesta a las
            necesidades del niño y al criterio del profesional.
          </p>
        </section>

        <p className="text-sm text-muted-foreground">
          Contenido editorial pendiente de revisión profesional.{" "}
          <Link
            to="/dinamicas"
            search={{ q: "", cat: "", edad: 0, dif: "", hab: "", orden: "titulo-asc", p: 1 }}
            className="font-semibold text-primary underline-offset-2 hover:underline"
          >
            Explorar dinámicas
          </Link>
        </p>
      </div>
    </div>
  );
}
