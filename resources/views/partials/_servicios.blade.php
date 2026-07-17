@php
    $services = [
        [
            'icon' => 'ti-device-desktop-code',
            'title' => 'Sitios web y landing pages',
            'desc' => 'Páginas rápidas, responsivas y optimizadas para convertir visitas en clientes.',
        ],
        [
            'icon' => 'ti-shopping-cart',
            'title' => 'Tiendas en línea',
            'desc' => 'E-commerce a medida: catálogo, pagos y gestión de pedidos sin complicaciones.',
        ],
        [
            'icon' => 'ti-code',
            'title' => 'Software a medida',
            'desc' => 'Sistemas web con Laravel para automatizar procesos propios de tu negocio.',
        ],
        [
            'icon' => 'ti-tool',
            'title' => 'Mantenimiento y soporte',
            'desc' => 'Actualizaciones, monitoreo y acompañamiento continuo después del lanzamiento.',
        ],
        [
            'icon' => 'ti-users',
            'title' => 'Diseño fácil de usar',
            'desc' => 'Interfaces claras y accesibles que tus clientes entienden a la primera.',
        ],
        [
            'icon' => 'ti-bolt',
            'title' => 'Optimización y rendimiento',
            'desc' => 'Velocidad de carga, SEO técnico y buenas prácticas desde el primer commit.',
        ],
    ];
@endphp

<section class="services" id="servicios">
    <div class="container">
        <p class="section-kicker" data-reveal>Servicios</p>
        <h2 class="section-title" data-reveal>Todo lo que tu negocio necesita para crecer en internet</h2>
        <p class="section-lede" data-reveal>
            Desde la primera línea de código hasta el soporte post-lanzamiento, cubrimos cada capa
            del proceso de desarrollo.
        </p>

        <div class="services__grid">
            @foreach ($services as $i => $service)
                <article class="service-card" data-reveal style="--delay: {{ $i * 60 }}ms">
                    <span class="service-card__icon">
                        <i class="ti {{ $service['icon'] }}" aria-hidden="true"></i>
                    </span>
                    <h3>{{ $service['title'] }}</h3>
                    <p>{{ $service['desc'] }}</p>
                </article>
            @endforeach
        </div>
    </div>
</section>
