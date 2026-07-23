import { Resend } from "resend";

type Message = {
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
};

/**
 * Avisa por correo de un mensaje nuevo del formulario, vía Resend.
 *
 * Nunca lanza: el mensaje ya se guardó en la base antes de llamar aquí, así
 * que si el correo falla (o Resend no está configurado) el envío del
 * formulario sigue siendo un éxito. El detalle queda en el log.
 *
 * Config por variables de entorno:
 *   RESEND_API_KEY   clave de Resend
 *   CONTACT_EMAIL_FROM  remitente verificado (ej. avisos@serviciosydesarrollojc.com)
 *   CONTACT_EMAIL_TO    destinos separados por coma
 */
export async function notifyByEmail(msg: Message): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  const to = (process.env.CONTACT_EMAIL_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!apiKey || !from || to.length === 0) {
    console.warn("[landing] Correo no configurado (RESEND_API_KEY / CONTACT_EMAIL_FROM / CONTACT_EMAIL_TO); no se envió aviso.");
    return false;
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Servicios y Desarrollo JC <${from}>`,
      to,
      replyTo: msg.email, // responder desde el correo va directo al cliente
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
    if (error) {
      console.error("[landing] Resend devolvió error:", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[landing] No se pudo enviar el correo:", error);
    return false;
  }
}
