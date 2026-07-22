import { getSql } from "./db";
import { projects as placeholders, type Project } from "./data";

type Row = {
  id: string;
  title: string;
  category: string;
  year: string;
  url: string;
  video: string | null;
  hue_from: string;
  hue_to: string;
  hue_glow: string;
};

/**
 * Proyectos publicados, leídos de la base que administra el panel.
 *
 * La consulta corre al generar la página (build o regeneración vía
 * POST /api/revalidate, que dispara el panel al guardar). Si la base no
 * responde se usan los placeholders de `data.ts`: la landing nunca se cae
 * por culpa de la base de datos — el error queda en el log del servidor.
 */
export async function getPublishedProjects(): Promise<Project[]> {
  try {
    const sql = getSql();
    const rows = await sql<Row[]>`
      SELECT id, title, category, year, url, video,
             hue_from, hue_to, hue_glow
      FROM projects
      WHERE published
      ORDER BY position
    `;
    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      category: r.category,
      year: r.year,
      url: r.url,
      video: r.video ?? undefined,
      hue: { from: r.hue_from, to: r.hue_to, glow: r.hue_glow },
    }));
  } catch (error) {
    console.error(
      "[landing] Base de datos no disponible; usando los proyectos de muestra de data.ts:",
      error,
    );
    return placeholders;
  }
}
