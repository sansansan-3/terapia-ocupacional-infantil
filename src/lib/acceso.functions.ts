import { createServerFn } from "@tanstack/react-start";

const APP_CODE = "terapia_infantil";
const CORREO = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export const verificarCompra = createServerFn({ method: "POST" })
  .inputValidator((input: { email: string }) => {
    const email = String(input?.email ?? "")
      .trim()
      .toLowerCase();
    if (!CORREO.test(email)) throw new Error("correo_invalido");
    return { email };
  })
  .handler(async ({ data }): Promise<{ acceso: boolean }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: filas, error } = await supabaseAdmin
      .from("customers")
      .select("id")
      .eq("email", data.email)
      .eq("app_code", APP_CODE)
      .eq("active", true)
      .limit(1);

    if (error) {
      console.error("[acceso] fallo al consultar compras");
      throw new Error("fallo_consulta");
    }

    return { acceso: (filas?.length ?? 0) > 0 };
  });
