import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

/**
 * Guarda los mensajes del formulario como líneas JSON en data/messages.jsonl.
 * En Coolify, monta un volumen en /app/data para que persistan entre deploys.
 */
const DATA_DIR = process.env.CONTACT_DATA_DIR ?? path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "messages.jsonl");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().slice(0, 190);
  const phone = String(body.phone ?? "").trim().slice(0, 40);
  const service = String(body.service ?? "").trim().slice(0, 80);
  const message = String(body.message ?? "").trim().slice(0, 4000);

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Nombre, correo válido y mensaje son obligatorios" },
      { status: 422 },
    );
  }

  const entry = {
    name,
    email,
    phone: phone || null,
    service: service || null,
    message,
    receivedAt: new Date().toISOString(),
  };

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.appendFile(DATA_FILE, JSON.stringify(entry) + "\n", "utf8");
  } catch (error) {
    console.error("No se pudo guardar el mensaje de contacto:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
