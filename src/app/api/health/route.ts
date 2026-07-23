import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";

// Punto de diagnóstico temporal: dice si la landing puede leer la base.
// No expone secretos (solo booleanos, un conteo y el mensaje de error).
// Quitar cuando el vínculo con el panel esté confirmado.
export const dynamic = "force-dynamic";

export async function GET() {
  const databaseUrlSet = Boolean(process.env.DATABASE_URL);
  const revalidateTokenSet = Boolean(process.env.REVALIDATE_TOKEN);

  let dbReachable = false;
  let publishedCount: number | null = null;
  let error: string | null = null;

  if (databaseUrlSet) {
    try {
      const sql = getSql();
      const rows = await sql<{ n: number }[]>`
        SELECT count(*)::int AS n FROM projects WHERE published
      `;
      publishedCount = rows[0]?.n ?? null;
      dbReachable = true;
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    }
  }

  return NextResponse.json({
    databaseUrlSet,
    revalidateTokenSet,
    dbReachable,
    publishedCount,
    error,
  });
}
