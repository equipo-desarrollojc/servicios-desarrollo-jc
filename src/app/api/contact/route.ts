import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { notifyByEmail } from "@/lib/notifyEmail";

/**
 * Recibe el formulario de contacto. Guarda el mensaje en la base (para que el
 * panel lo muestre en "Mensajes") y avisa por correo. Si la base falla, cae a
 * un archivo `data/messages.jsonl` para no perder ningún mensaje.
 */
const DATA_DIR = process.env.CONTACT_DATA_DIR ?? path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "messages.jsonl");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function guardarEnArchivo(entry: Record<string, unknown>) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.appendFile(DATA_FILE, JSON.stringify(entry) + "\n", "utf8");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().slice(0, 190);
  const phone = String(body.phone ?? "").trim().slice(0, 40) || null;
  const service = String(body.service ?? "").trim().slice(0, 80) || null;
  const message = String(body.message ?? "").trim().slice(0, 4000);

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Nombre, correo válido y mensaje son obligatorios" },
      { status: 422 },
    );
  }

  const msg = { name, email, phone, service, message };

  // 1. Guardar. Primero en la base; si falla, al archivo, para no perder nada.
  let guardado = false;
  try {
    const sql = getSql();
    await sql`
      INSERT INTO messages (name, email, phone, service, message)
      VALUES (${name}, ${email}, ${phone}, ${service}, ${message})
    `;
    guardado = true;
  } catch (error) {
    console.error("[landing] No se pudo guardar el mensaje en la base:", error);
    try {
      await guardarEnArchivo({ ...msg, receivedAt: new Date().toISOString() });
      guardado = true;
    } catch (e2) {
      console.error("[landing] Tampoco se pudo guardar en archivo:", e2);
    }
  }

  if (!guardado) {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }

  // 2. Avisar por correo (best-effort: no bloquea la respuesta al usuario).
  await notifyByEmail(msg);

  return NextResponse.json({ ok: true });
}
