import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useAcceso, normalizarCorreo, correoValido } from "@/lib/acceso";
import { verificarCompra } from "@/lib/acceso.functions";

export const Route = createFileRoute("/acceso")({
  head: () => ({
    meta: [
      { title: "Accede a tus dinámicas · TO Kids" },
      {
        name: "description",
        content:
          "Introduce el correo que utilizaste en tu compra para entrar a la biblioteca de dinámicas de TO Kids.",
      },
      { property: "og:title", content: "Accede a tus dinámicas · TO Kids" },
      {
        property: "og:description",
        content: "Entra con tu correo a la biblioteca de 150 dinámicas de terapia ocupacional infantil.",
      },
    ],
  }),
  component: Acceso,
});

function Acceso() {
  const { tieneAcceso, cargado, registrarAcceso } = useAcceso();
  const comprobar = useServerFn(verificarCompra);
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (cargado && tieneAcceso) navigate({ to: "/", replace: true });
  }, [cargado, tieneAcceso, navigate]);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enviando) return;
    const limpio = normalizarCorreo(correo);
    if (!limpio) {
      setError("Introduce tu correo electrónico.");
      return;
    }
    if (!correoValido(limpio)) {
      setError("Ese correo no parece válido. Revísalo e inténtalo de nuevo.");
      return;
    }
    setError(null);
    setEnviando(true);
    try {
      const { acceso } = await comprobar({ data: { email: limpio } });
      if (!acceso) {
        setError(
          "No encontramos una compra asociada a este correo. Utiliza el mismo correo con el que realizaste la compra.",
        );
        setEnviando(false);
        return;
      }
      registrarAcceso();
      navigate({ to: "/", replace: true });
    } catch {
      setError("No pudimos completar el acceso. Inténtalo de nuevo");
      setEnviando(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted px-4 py-10">
      <div className="tarjeta w-full max-w-md p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-display text-base font-bold">TO Kids</span>
        </div>

        <h1 className="mt-6 text-2xl font-bold">Accede a tus dinámicas</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Introduce el correo que utilizaste en tu compra
        </p>

        <form onSubmit={enviar} className="mt-6" noValidate>
          <label htmlFor="correo" className="block text-sm font-semibold">
            Correo electrónico
          </label>
          <input
            id="correo"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={correo}
            onChange={(e) => {
              setCorreo(e.target.value);
              if (error) setError(null);
            }}
            placeholder="tucorreo@ejemplo.com"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "correo-error" : undefined}
            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
          />
          {error && (
            <p id="correo-error" role="alert" className="mt-2 text-sm font-medium text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {enviando && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            Entrar a la aplicación
          </button>
        </form>

        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
          Tu entrada se guarda en este navegador. No se envían códigos ni enlaces de confirmación.
        </p>
      </div>
    </div>
  );
}
