export const site = {
  name: "Servicios y Desarrollo JC",
  shortName: "JC",
  slogan: "No compres software genérico. Constrúyelo a tu medida.",
  url: "https://portafolio.serviciosydesarrollojc.com",
  description:
    "En Servicios y Desarrollo JC creamos sitios web, tiendas en línea y sistemas hechos exactamente para tu negocio. Tecnología que se adapta a ti, y no al revés.",
  email: "contacto@serviciosydesarrollojc.com",
  whatsapp: "+50495076519",
  whatsappUrl:
    "https://wa.me/50495076519?text=" +
    encodeURIComponent("Hola JC, quiero información sobre un proyecto web."),
  location: "Honduras · Trabajo remoto para todo LATAM",
} as const;

export const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
] as const;
