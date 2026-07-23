import nodemailer from "nodemailer";
import { teamEmail, clientEmail } from "./emailTemplates";

type Message = {
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
};

/**
 * Correos del formulario de contacto, vía SMTP (Zoho). Dos envíos:
 *  - notifyTeam: aviso al equipo (CONTACT_EMAIL_TO) con los datos del mensaje.
 *  - sendAck: auto-respuesta al cliente desde un remitente "no responder".
 *
 * Nada de esto lanza: el mensaje ya se guardó en la base, así que si el correo
 * falla el envío del formulario sigue siendo un éxito; el detalle va al log.
 *
 * Variables: SMTP_HOST (def. smtp.zoho.com), SMTP_PORT (def. 465),
 * SMTP_USER (buzón), SMTP_PASS (contraseña de aplicación de Zoho),
 * CONTACT_EMAIL_FROM (def. = SMTP_USER), CONTACT_EMAIL_TO (coma-separados),
 * CONTACT_NOREPLY_FROM (remitente de la auto-respuesta; def. = SMTP_USER).
 */
let transporter: nodemailer.Transporter | null = null;
function getTransporter() {
  if (transporter) return transporter;
  const port = Number(process.env.SMTP_PORT ?? 465);
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.zoho.com",
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return transporter;
}

function configurado(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

/** Aviso al equipo. Responder va directo al cliente (replyTo). */
export async function notifyTeam(msg: Message): Promise<boolean> {
  const from = process.env.CONTACT_EMAIL_FROM ?? process.env.SMTP_USER;
  const to = (process.env.CONTACT_EMAIL_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!configurado() || !from || to.length === 0) {
    console.warn("[landing] SMTP no configurado; no se avisó al equipo.");
    return false;
  }

  try {
    const { html, text } = teamEmail(msg);
    await getTransporter().sendMail({
      from: `Servicios y Desarrollo JC <${from}>`,
      to,
      replyTo: msg.email,
      subject: `Nuevo mensaje de ${msg.name}`,
      html,
      text,
    });
    return true;
  } catch (error) {
    console.error("[landing] No se pudo avisar al equipo:", error);
    return false;
  }
}

/** Auto-respuesta al cliente, desde un remitente "no responder". */
export async function sendAck(msg: Message): Promise<boolean> {
  const from = process.env.CONTACT_NOREPLY_FROM ?? process.env.SMTP_USER;

  if (!configurado() || !from) {
    console.warn("[landing] SMTP no configurado; no se envió la auto-respuesta.");
    return false;
  }

  try {
    const { html, text } = clientEmail(msg);
    await getTransporter().sendMail({
      from: `Servicios y Desarrollo JC <${from}>`,
      to: msg.email,
      replyTo: from,
      subject: "Recibimos tu mensaje — Servicios y Desarrollo JC",
      html,
      text,
    });
    return true;
  } catch (error) {
    console.error("[landing] No se pudo enviar la auto-respuesta:", error);
    return false;
  }
}
