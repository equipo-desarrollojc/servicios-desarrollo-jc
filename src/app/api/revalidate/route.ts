import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * El panel de administración llama aquí después de guardar un cambio para
 * que la landing —que es estática— se regenere con los datos nuevos.
 * Protegido con un secreto compartido en la cabecera `x-revalidate-token`.
 */
export async function POST(request: Request) {
  const token = process.env.REVALIDATE_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "REVALIDATE_TOKEN no configurado en la landing" },
      { status: 500 },
    );
  }
  if (request.headers.get("x-revalidate-token") !== token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  revalidatePath("/");
  return NextResponse.json({ ok: true, revalidated: "/" });
}
