import { getSql } from "./db";
import { services as placeholders, type Service } from "./data";

const ICONS: Service["icon"][] = ["monitor", "cart", "braces", "wrench", "users", "bolt"];

type Row = { id: number; title: string; description: string; icon: string };

/**
 * Servicios publicados, de la base que administra el panel. Si la base no
 * responde, usa los de muestra de `data.ts`.
 */
export async function getPublishedServices(): Promise<Service[]> {
  try {
    const sql = getSql();
    const rows = await sql<Row[]>`
      SELECT id, title, description, icon
      FROM services
      WHERE published
      ORDER BY position, id
    `;
    return rows.map((r) => ({
      id: String(r.id),
      title: r.title,
      description: r.description,
      icon: (ICONS.includes(r.icon as Service["icon"]) ? r.icon : "monitor") as Service["icon"],
    }));
  } catch (error) {
    console.error("[landing] Base no disponible; usando servicios de muestra:", error);
    return placeholders;
  }
}
