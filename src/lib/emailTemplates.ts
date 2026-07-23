import { site } from "./site";

/**
 * Plantillas HTML de los correos de contacto. Email HTML es quisquilloso:
 * todo va con tablas y estilos en línea, colores sólidos (los degradados solo
 * los pintan algunos clientes, con fallback), y fuentes web-safe. El logo se
 * carga por URL desde el sitio: las imágenes incrustadas (data:) las bloquean
 * Gmail y Outlook.
 */

const NAVY = "#12213f";
const ACCENT = "#4f8cff";
const INK = "#26324a";
const MUTED = "#8791a5";
const LINE = "#e6e9f0";
const SOFT = "#f4f6fb";
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif";
const LOGO = `${site.url}/brand/logo-horizontal.png`;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
const nl2br = (s: string) => esc(s).replace(/\n/g, "<br>");

/** Envoltura: logo centrado, franja de degradado, cuerpo y pie. */
function shell(eyebrow: string, inner: string): string {
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#eef1f7;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f7;padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${LINE};">
        <tr><td align="center" style="padding:30px 32px 22px;">
          <img src="${LOGO}" alt="Servicios y Desarrollo JC" width="230" style="width:230px;max-width:70%;height:auto;display:block;" />
        </td></tr>
        <tr><td style="height:4px;line-height:4px;font-size:0;background:${ACCENT};background:linear-gradient(90deg,#4f8cff,#a855f7,#ff4d7e);">&nbsp;</td></tr>
        <tr><td style="padding:30px 36px 8px;">
          <div style="font:700 11px ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${ACCENT};">${eyebrow}</div>
        </td></tr>
        <tr><td style="padding:0 36px 34px;font:400 15px/1.6 ${FONT};color:${INK};">
          ${inner}
        </td></tr>
        <tr><td align="center" style="background:${SOFT};border-top:1px solid ${LINE};padding:22px 32px;font:400 12px/1.6 ${FONT};color:${MUTED};">
          <div style="font-weight:700;color:${NAVY};">Servicios y Desarrollo JC</div>
          Honduras · <a href="${site.url}" style="color:${MUTED};">serviciosydesarrollojc.com</a><br>
          <span style="color:#aab2c2;">Este es un correo automático, por favor no respondas a esta dirección.</span>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function boton(href: string, texto: string, color = ACCENT): string {
  return `<a href="${href}" style="display:inline-block;background:${color};color:#ffffff;text-decoration:none;font:600 14px ${FONT};padding:13px 26px;border-radius:999px;">${texto}</a>`;
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
      <td style="padding:9px 16px 9px 0;color:${MUTED};font:600 11px ${FONT};text-transform:uppercase;letter-spacing:.6px;width:88px;vertical-align:top;">${k}</td>
      <td style="padding:9px 0;color:${INK};font:400 15px ${FONT};">${v}</td>
    </tr>`;

  const inner = `
    <h1 style="margin:0 0 6px;font:700 22px ${FONT};color:${NAVY};">Nuevo mensaje de contacto</h1>
    <p style="margin:0 0 22px;color:${MUTED};">Llegó desde el formulario de la web.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-left:3px solid ${ACCENT};background:${SOFT};border-radius:0 10px 10px 0;padding:6px 18px;margin-bottom:22px;">
      ${fila("Nombre", esc(m.name))}
      ${fila("Correo", `<a href="mailto:${esc(m.email)}" style="color:${ACCENT};">${esc(m.email)}</a>`)}
      ${fila("Teléfono", m.phone ? esc(m.phone) : "—")}
      ${fila("Servicio", m.service ? esc(m.service) : "—")}
    </table>
    <div style="color:${MUTED};font:600 11px ${FONT};text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px;">Mensaje</div>
    <div style="border:1px solid ${LINE};border-radius:10px;padding:16px 18px;color:${INK};font:400 15px/1.65 ${FONT};margin-bottom:26px;">${nl2br(m.message)}</div>
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

  return { html: shell("Nuevo mensaje", inner), text };
}

/** Auto-respuesta al cliente. */
export function clientEmail(m: Message): { html: string; text: string } {
  const inner = `
    <h1 style="margin:0 0 14px;font:700 23px ${FONT};color:${NAVY};">¡Gracias por escribirnos, ${esc(m.name)}!</h1>
    <p style="margin:0 0 18px;">Recibimos tu mensaje y en breve <strong style="color:${NAVY};">uno de nuestros desarrolladores estará en contacto</strong> contigo.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-left:3px solid #1fb355;background:${SOFT};border-radius:0 10px 10px 0;margin-bottom:26px;">
      <tr><td style="padding:14px 18px;color:${INK};font:400 14px/1.5 ${FONT};">
        <strong style="color:${NAVY};">Tiempo de respuesta:</strong> normalmente te contactamos el mismo día hábil.
      </td></tr>
    </table>
    <p style="margin:0 0 16px;color:${MUTED};">¿Prefieres una respuesta más rápida? Escríbenos directo por WhatsApp:</p>
    <div style="margin-bottom:6px;">${boton(site.whatsappUrl, "Escríbenos por WhatsApp", "#1fb355")}</div>
  `;

  const text = [
    `Hola ${m.name},`,
    "",
    "Gracias por escribirnos. Recibimos tu mensaje y en breve uno de nuestros",
    "desarrolladores estará en contacto contigo (normalmente el mismo día hábil).",
    "",
    `¿Es urgente? Escríbenos por WhatsApp: ${site.whatsapp}`,
    "",
    "Este es un correo automático, por favor no respondas a esta dirección.",
    "",
    "— Servicios y Desarrollo JC",
  ].join("\n");

  return { html: shell("Mensaje recibido", inner), text };
}
