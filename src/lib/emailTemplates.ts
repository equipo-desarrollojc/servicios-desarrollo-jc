import { site } from "./site";

/**
 * Plantillas HTML de los correos de contacto. Email HTML es quisquilloso:
 * todo va con tablas y estilos en línea, colores sólidos (los degradados solo
 * los pintan algunos clientes, con fallback), y fuentes web-safe.
 */

const BG = "#05070d";
const ACCENT = "#4f8cff";
const INK = "#1a2233";
const MUTED = "#8a93a6";
const LINE = "#e6e9f0";
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif";

/** Escapa HTML de contenido que viene del usuario. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const nl2br = (s: string) => esc(s).replace(/\n/g, "<br>");

/** Envoltura común: encabezado de marca + franja de degradado + pie. */
function shell(inner: string): string {
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#eef1f7;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f7;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:14px;overflow:hidden;border:1px solid ${LINE};">
        <tr><td style="background:${BG};padding:22px 32px;">
          <span style="font:700 20px ${FONT};color:#ffffff;letter-spacing:-.3px;">Servicios y Desarrollo <span style="color:${ACCENT};">JC</span></span>
        </td></tr>
        <tr><td style="height:4px;line-height:4px;font-size:0;background:${ACCENT};background:linear-gradient(90deg,#4f8cff,#a855f7,#ff4d7e);">&nbsp;</td></tr>
        <tr><td style="background:#ffffff;padding:32px;font:400 15px/1.6 ${FONT};color:${INK};">
          ${inner}
        </td></tr>
        <tr><td style="background:#fafbfd;border-top:1px solid ${LINE};padding:18px 32px;font:400 12px/1.5 ${FONT};color:${MUTED};">
          Servicios y Desarrollo JC · Honduras<br>
          <a href="${site.url}" style="color:${MUTED};">serviciosydesarrollojc.com</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function boton(href: string, texto: string, color = ACCENT): string {
  return `<a href="${href}" style="display:inline-block;background:${color};color:#ffffff;text-decoration:none;font:600 14px ${FONT};padding:12px 22px;border-radius:999px;">${texto}</a>`;
}

type Message = {
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
};

/** Correo al equipo con los datos del mensaje. */
export function teamEmail(m: Message): { html: string; text: string } {
  const fila = (k: string, v: string) =>
    `<tr>
      <td style="padding:8px 0;color:${MUTED};font:600 12px ${FONT};text-transform:uppercase;letter-spacing:.6px;width:96px;vertical-align:top;">${k}</td>
      <td style="padding:8px 0;color:${INK};font:400 15px ${FONT};">${v}</td>
    </tr>`;

  const inner = `
    <h1 style="margin:0 0 6px;font:700 22px ${FONT};color:${INK};">Nuevo mensaje de contacto</h1>
    <p style="margin:0 0 24px;color:${MUTED};">Llegó desde el formulario de la web.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${LINE};border-bottom:1px solid ${LINE};margin-bottom:22px;">
      ${fila("Nombre", esc(m.name))}
      ${fila("Correo", `<a href="mailto:${esc(m.email)}" style="color:${ACCENT};">${esc(m.email)}</a>`)}
      ${fila("Teléfono", m.phone ? esc(m.phone) : "—")}
      ${fila("Servicio", m.service ? esc(m.service) : "—")}
    </table>
    <div style="color:${MUTED};font:600 12px ${FONT};text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px;">Mensaje</div>
    <div style="background:#f4f6fb;border:1px solid ${LINE};border-radius:10px;padding:16px 18px;color:${INK};font:400 15px/1.65 ${FONT};margin-bottom:26px;">${nl2br(m.message)}</div>
    ${boton(`mailto:${esc(m.email)}?subject=${encodeURIComponent("Re: tu mensaje a Servicios y Desarrollo JC")}`, `Responder a ${esc(m.name)}`)}
  `;

  const text = [
    "Nuevo mensaje de contacto",
    "",
    `Nombre:   ${m.name}`,
    `Correo:   ${m.email}`,
    `Teléfono: ${m.phone ?? "—"}`,
    `Servicio: ${m.service ?? "—"}`,
    "",
    "Mensaje:",
    m.message,
  ].join("\n");

  return { html: shell(inner), text };
}

/** Auto-respuesta al cliente. */
export function clientEmail(m: Message): { html: string; text: string } {
  const inner = `
    <h1 style="margin:0 0 14px;font:700 22px ${FONT};color:${INK};">¡Gracias por escribirnos, ${esc(m.name)}!</h1>
    <p style="margin:0 0 16px;">Recibimos tu mensaje y en breve <strong>uno de nuestros desarrolladores estará en contacto</strong> contigo.</p>
    <p style="margin:0 0 24px;color:${MUTED};">Mientras tanto, si prefieres una respuesta más rápida, escríbenos por WhatsApp:</p>
    <div style="margin-bottom:28px;">${boton(site.whatsappUrl, "Escríbenos por WhatsApp", "#1fb355")}</div>
    <p style="margin:0;padding-top:20px;border-top:1px solid ${LINE};color:${MUTED};font-size:13px;">Este es un correo automático, por favor no respondas a esta dirección.</p>
  `;

  const text = [
    `Hola ${m.name},`,
    "",
    "Gracias por escribirnos. Recibimos tu mensaje y en breve uno de nuestros",
    "desarrolladores estará en contacto contigo.",
    "",
    `Si es urgente, escríbenos por WhatsApp: ${site.whatsapp}`,
    "",
    "Este es un correo automático, por favor no respondas a esta dirección.",
    "",
    "— Servicios y Desarrollo JC",
  ].join("\n");

  return { html: shell(inner), text };
}
