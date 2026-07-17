export type Service = {
  id: string;
  title: string;
  description: string;
  icon: "monitor" | "cart" | "braces" | "wrench" | "users" | "bolt";
};

export const services: Service[] = [
  {
    id: "sitios-web",
    title: "Sitios web y landing pages",
    description:
      "Páginas rápidas, responsivas y optimizadas para convertir visitas en clientes.",
    icon: "monitor",
  },
  {
    id: "tiendas",
    title: "Tiendas en línea",
    description:
      "E-commerce a medida: catálogo, pagos y gestión de pedidos sin complicaciones.",
    icon: "cart",
  },
  {
    id: "software",
    title: "Software a medida",
    description:
      "Sistemas web que automatizan los procesos propios de tu negocio, sin funciones de sobra.",
    icon: "braces",
  },
  {
    id: "soporte",
    title: "Mantenimiento y soporte",
    description:
      "Actualizaciones, monitoreo y acompañamiento continuo después del lanzamiento.",
    icon: "wrench",
  },
  {
    id: "diseno",
    title: "Diseño fácil de usar",
    description:
      "Interfaces claras y accesibles que tus clientes entienden a la primera.",
    icon: "users",
  },
  {
    id: "rendimiento",
    title: "Optimización y rendimiento",
    description:
      "Velocidad de carga, SEO técnico y buenas prácticas desde el primer día.",
    icon: "bolt",
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  /** Texto que acompaña la escena animada del modal. */
  sceneDescription: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Nos contactas",
    description:
      "Nos escribes por WhatsApp o el formulario y nos cuentas tu idea. Sin compromiso y sin tecnicismos.",
    sceneDescription:
      "Llenas el formulario o nos escribes por WhatsApp, y tu mensaje nos llega al instante.",
  },
  {
    number: "02",
    title: "Planificamos juntos",
    description:
      "Convertimos tu idea en un plan claro: qué se hará, cuánto cuesta y cuándo estará listo.",
    sceneDescription:
      "Conversamos contigo, proponemos ideas y definimos juntos el diseño y el alcance.",
  },
  {
    number: "03",
    title: "Desarrollamos",
    description:
      "Construimos tu proyecto y te mantenemos al tanto del avance en todo momento.",
    sceneDescription:
      "Manos a la obra: construimos tu proyecto línea por línea y te compartimos cada avance.",
  },
  {
    number: "04",
    title: "Te lo presentamos",
    description:
      "Te mostramos el resultado funcionando para que lo pruebes con calma y opines.",
    sceneDescription:
      "Te mostramos la primera versión funcionando y tomamos nota de tus cambios.",
  },
  {
    number: "05",
    title: "Lo apruebas y lanzamos",
    description:
      "Ajustamos los detalles finales, das el visto bueno y tu proyecto sale al mundo.",
    sceneDescription:
      "Aplicamos tus cambios, te lo volvemos a presentar y, con tu aprobación, ¡tu proyecto se lanza!",
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  /** Tono del degradado de portada y del brillo de fondo al hacer hover. */
  hue: { from: string; to: string; glow: string };
  /** Ruta opcional a un video en /public que se reproduce al hacer hover. */
  video?: string;
};

// Proyectos de muestra: reemplaza títulos, categorías y (opcionalmente) videos reales.
export const projects: Project[] = [
  {
    id: "gestion-escolar",
    title: "Plataforma de gestión escolar",
    category: "Sistema web",
    year: "2025",
    hue: { from: "#1d4ed8", to: "#7c3aed", glow: "#0a1024" },
  },
  {
    id: "tienda-linea",
    title: "Tienda en línea con pagos",
    category: "E-commerce",
    year: "2025",
    hue: { from: "#7c3aed", to: "#db2777", glow: "#140a20" },
  },
  {
    id: "mesa-ayuda",
    title: "Mesa de ayuda y tickets",
    category: "Automatización",
    year: "2026",
    hue: { from: "#0891b2", to: "#2563eb", glow: "#061420" },
  },
  {
    id: "panel-operaciones",
    title: "Panel de operaciones en tiempo real",
    category: "Dashboard",
    year: "2026",
    hue: { from: "#ea580c", to: "#f59e0b", glow: "#160d05" },
  },
];

export const technologies: string[][] = [
  ["Laravel", "PHP", "MySQL", "Docker", "Nginx", "Redis"],
  ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Node.js"],
];

export type Stat = {
  value: number;
  suffix: string;
  label: string;
};

// Cifras de muestra: ajústalas a tus números reales.
export const stats: Stat[] = [
  { value: 12, suffix: "+", label: "Proyectos entregados" },
  { value: 5, suffix: "", label: "Años construyendo software" },
  { value: 98, suffix: "%", label: "Clientes que nos recomiendan" },
  { value: 24, suffix: "/7", label: "Canal directo por WhatsApp" },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// Testimonios de muestra: reemplázalos por citas reales de tus clientes.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Nos entendieron a la primera. El sistema que construyeron ordenó por completo nuestra operación diaria.",
    name: "María Fernández",
    role: "Directora administrativa · Centro educativo",
  },
  {
    quote:
      "Pasamos de hojas de cálculo a un panel donde todo el equipo ve la información en tiempo real.",
    name: "Carlos Mejía",
    role: "Gerente de operaciones · Distribuidora",
  },
  {
    quote:
      "Lo que más valoro es el acompañamiento: cada duda se resuelve el mismo día, sin vueltas.",
    name: "Ana Rodríguez",
    role: "Fundadora · Tienda en línea",
  },
  {
    quote:
      "La automatización de reportes nos ahorra horas cada semana. Se pagó sola en el primer mes.",
    name: "Jorge Castillo",
    role: "Administrador · Empresa de servicios",
  },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question:
      "¿Por qué software a la medida en vez de una plantilla o un sistema genérico?",
    answer:
      "Una plantilla te obliga a adaptar tu negocio al programa. El software a la medida funciona al revés: se construye alrededor de tus procesos, crece contigo y solo pagas por lo que realmente necesitas. A mediano plazo suele ser más barato que pelear con un sistema que no encaja.",
  },
  {
    question: "¿Cuánto tiempo toma desarrollar un sitio web o sistema a medida?",
    answer:
      "Una landing page simple puede estar lista en 1–2 semanas. Sitios más completos o software a medida suelen tomar entre 3 y 8 semanas, dependiendo del alcance. Te damos un cronograma claro antes de empezar.",
  },
  {
    question: "¿Trabajan con tiendas en línea y pasarelas de pago?",
    answer:
      "Sí. Integramos catálogo de productos, carrito y pasarelas de pago según tu país y necesidades, además de un panel simple para que administres pedidos e inventario.",
  },
  {
    question: "¿Qué tecnología usan para desarrollar?",
    answer:
      "Construimos con PHP y Laravel en el backend, y con React y Next.js para experiencias web modernas. Es un stack robusto, mantenible y con excelente soporte a largo plazo.",
  },
  {
    question: "¿Ofrecen soporte después de publicar el sitio?",
    answer:
      "Sí, ofrecemos planes de mantenimiento con actualizaciones, monitoreo y cambios menores, para que tu proyecto siga funcionando bien mucho después del lanzamiento.",
  },
  {
    question: "¿Cómo empiezo a trabajar con Servicios y Desarrollo JC?",
    answer:
      "Escríbenos por WhatsApp o llena el formulario de contacto con una breve descripción de tu proyecto. Te respondemos con los siguientes pasos y, si aplica, una propuesta.",
  },
];

export const contactServiceOptions = [
  "Sitio web / landing page",
  "Tienda en línea",
  "Software a medida",
  "Mantenimiento y soporte",
  "Otro",
] as const;
