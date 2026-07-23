import nodemailer from "nodemailer";

type Message = {
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
};

/**
 * Avisa por correo de un mensaje nuevo del formulario, vía SMTP (Zoho).
 * Nunca lanza: el mensaje ya se guardó en la base, así que si el correo falla
 * el envío del formulario sigue siendo un éxito; el detalle queda en el log.
 *
 * Variables: SMTP_HOST (def. smtp.zoho.com), SMTP_PORT (def. 465),
 * SMTP_USER (buzón completo), SMTP_PASS (contraseña de aplicación de Zoho),
 * CONTACT_EMAIL_FROM (def. = SMTP_USER), CONTACT_EMAIL_TO (coma-separados).
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

export async function notifyByEmail(msg: Message): Promise<boolean> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.CONTACT_EMAIL_FROM ?? user;
  const to = (process.env.CONTACT_EMAIL_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!user || !pass || !from || to.length === 0) {
    console.warn("[landing] SMTP no configurado; no se envió aviso.");
    return false;
  }

  try {
    await getTransporter().sendMail({
      from: `Servicios y Desarrollo JC <${from}>`,
      to,
      replyTo: msg.email,
      subject: `Nuevo mensaje de ${msg.name}`,
      text: [
        `Nombre:   ${msg.name}`,
        `Correo:   ${msg.email}`,
        `Teléfono: ${msg.phone ?? "—"}`,
        `Servicio: ${msg.service ?? "—"}`,
        "",
        "Mensaje:",
        msg.message,
      ].join("\n"),
    });
    return true;
  } catch (error) {
    console.error("[landing] No se pudo enviar el correo:", error);
    return false;
  }
}
