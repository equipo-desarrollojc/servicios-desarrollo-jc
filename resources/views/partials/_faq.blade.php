@php
    $faqs = [
        [
            'q' => '¿Por qué software a la medida en vez de una plantilla o un sistema genérico?',
            'a' => 'Una plantilla te obliga a adaptar tu negocio al programa. El software a la medida funciona al revés: se construye alrededor de tus procesos, crece contigo y solo pagas por lo que realmente necesitas. A mediano plazo suele ser más barato que pelear con un sistema que no encaja.',
        ],
        [
            'q' => '¿Cuánto tiempo toma desarrollar un sitio web o sistema a medida?',
            'a' => 'Una landing page simple puede estar lista en 1–2 semanas. Sitios más completos o software a medida suelen tomar entre 3 y 8 semanas, dependiendo del alcance. Te damos un cronograma claro antes de empezar.',
        ],
        [
            'q' => '¿Trabajan con tiendas en línea y pasarelas de pago?',
            'a' => 'Sí. Integramos catálogo de productos, carrito, y pasarelas de pago según tu país y necesidades, además de un panel simple para que administres pedidos e inventario.',
        ],
        [
            'q' => '¿Qué tecnología usan para desarrollar?',
            'a' => 'Construimos sobre PHP y Laravel para el backend, con HTML, CSS y JavaScript modernos en el frontend. Es un stack robusto, mantenible y con excelente soporte a largo plazo.',
        ],
        [
            'q' => '¿Ofrecen soporte después de publicar el sitio?',
            'a' => 'Sí, ofrecemos planes de mantenimiento con actualizaciones, monitoreo y cambios menores, para que tu proyecto siga funcionando bien mucho después del lanzamiento.',
        ],
        [
            'q' => '¿Cómo empiezo a trabajar con Servicios y Desarrollo JC?',
            'a' => 'Escríbenos por WhatsApp o llena el formulario de contacto con una breve descripción de tu proyecto. Te respondemos con los siguientes pasos y, si aplica, una propuesta.',
        ],
    ];
@endphp

<section class="faq" id="faq">
    <div class="container">
        <p class="section-kicker" data-reveal>Preguntas frecuentes</p>
        <h2 class="section-title" data-reveal>Todo lo que quizá te estés preguntando</h2>

        <div class="faq__list" id="faqList" data-reveal>
            @foreach ($faqs as $i => $faq)
                <div class="faq-item{{ $i === 0 ? ' is-open' : '' }}">
                    <button class="faq-item__question" type="button" aria-expanded="{{ $i === 0 ? 'true' : 'false' }}">
                        <span>{{ $faq['q'] }}</span>
                        <span class="faq-item__icon" aria-hidden="true"></span>
                    </button>
                    <div class="faq-item__answer">
                        <p>{{ $faq['a'] }}</p>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</section>
