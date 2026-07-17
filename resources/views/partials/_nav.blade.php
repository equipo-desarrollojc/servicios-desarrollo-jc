@php
    $waNumber = preg_replace('/\D/', '', config('contact.whatsapp_number'));
    $waMessage = rawurlencode('Hola JC, quiero información sobre un proyecto web.');
@endphp

<header class="site-header" id="top">
    <div class="container site-header__inner">
        <a href="{{ route('home') }}" class="brand" aria-label="Servicios y Desarrollo JC — inicio">
            <span class="brand__mark">
                <img src="{{ asset('assets/img/isotipo.png') }}" alt="" width="28" height="28">
            </span>
            <span class="brand__text">
                Servicios y Desarrollo <strong>JC</strong>
            </span>
        </a>

        <nav class="site-nav" aria-label="Navegación principal">
            <a href="#servicios">Servicios</a>
            <a href="#proceso">Proceso</a>
            <a href="#faq">FAQ</a>
            <a href="#contacto">Contacto</a>
        </nav>

        <div class="site-header__cta">
            <a
                class="btn btn--whatsapp btn--sm"
                href="https://wa.me/{{ $waNumber }}?text={{ $waMessage }}"
                target="_blank"
                rel="noopener"
            >
                <i class="ti ti-brand-whatsapp" aria-hidden="true"></i>
                <span>WhatsApp</span>
            </a>
        </div>

        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobileNav" aria-label="Abrir menú">
            <span></span><span></span><span></span>
        </button>
    </div>

    <div class="mobile-nav" id="mobileNav">
        <a href="#servicios">Servicios</a>
        <a href="#proceso">Proceso</a>
        <a href="#faq">FAQ</a>
        <a href="#contacto">Contacto</a>
        <a href="https://wa.me/{{ $waNumber }}?text={{ $waMessage }}" target="_blank" rel="noopener" class="btn btn--whatsapp">
            Escríbenos por WhatsApp
        </a>
    </div>
</header>
