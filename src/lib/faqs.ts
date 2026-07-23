import { getSql } from "./db";
import { faqs as placeholders, type Faq } from "./data";

type Row = { question: string; answer: string };

/**
 * Preguntas frecuentes publicadas, de la base que administra el panel. Si la
 * base no responde, usa las de muestra de `data.ts`.
 */
export async function getPublishedFaqs(): Promise<Faq[]> {
  try {
    const sql = getSql();
    const rows = await sql<Row[]>`
      SELECT question, answer
      FROM faqs
      WHERE published
      ORDER BY position, id
    `;
    return rows.map((r) => ({ question: r.question, answer: r.answer }));
  } catch (error) {
    console.error("[landing] Base no disponible; usando FAQ de muestra:", error);
    return placeholders;
  }
}
