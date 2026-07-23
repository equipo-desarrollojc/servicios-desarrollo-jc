import { getSql } from "./db";
import { testimonials as placeholders, type Testimonial } from "./data";

type Row = { quote: string; name: string; role: string };

/**
 * Testimonios publicados, leídos de la base que administra el panel. Si la
 * base no responde, usa los de muestra de `data.ts`: la landing nunca se cae
 * por culpa de la base.
 */
export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  try {
    const sql = getSql();
    const rows = await sql<Row[]>`
      SELECT quote, name, role
      FROM testimonials
      WHERE published
      ORDER BY position, id
    `;
    return rows.map((r) => ({ quote: r.quote, name: r.name, role: r.role }));
  } catch (error) {
    console.error(
      "[landing] Base no disponible; usando testimonios de muestra:",
      error,
    );
    return placeholders;
  }
}
