@php
    $steps = [
        [
            'icon' => 'ti-messages',
            'title' => 'Nos contactas',
            'desc' => 'Nos escribes por WhatsApp o el formulario y nos cuentas tu idea. Sin compromiso y sin tecnicismos.',
        ],
        [
            'icon' => 'ti-clipboard-list',
            'title' => 'Planificamos juntos',
            'desc' => 'Convertimos tu idea en un plan claro: qué se hará, cuánto cuesta y cuándo estará listo.',
        ],
        [
            'icon' => 'ti-code',
            'title' => 'Desarrollamos',
            'desc' => 'Construimos tu proyecto y te mantenemos al tanto del avance en todo momento.',
        ],
        [
            'icon' => 'ti-presentation',
            'title' => 'Te lo presentamos',
            'desc' => 'Te mostramos el resultado funcionando para que lo pruebes con calma y opines.',
        ],
        [
            'icon' => 'ti-thumb-up',
            'title' => 'Lo apruebas y lanzamos',
            'desc' => 'Ajustamos los detalles finales, das el visto bueno y tu proyecto sale al mundo.',
        ],
    ];
@endphp

<section class="process" id="proceso">
    <div class="container">
        <p class="section-kicker" data-reveal>Nuestro proceso</p>
        <h2 class="section-title" data-reveal>De la idea al lanzamiento en 5 pasos</h2>
        <p class="section-lede" data-reveal>
            Trabajar con nosotros es simple y transparente: siempre sabrás en qué punto
            va tu proyecto y qué sigue después.
        </p>

        <div class="flow" id="flow">
            <div class="flow__track" aria-hidden="true">
                <span class="flow__line-fill"></span>
                <span class="flow__dot"></span>
            </div>

            <ol class="flow__steps">
                @foreach ($steps as $i => $step)
                    <li class="flow-step" data-step="{{ $i + 1 }}" aria-label="Ver animación del paso {{ $i + 1 }}: {{ $step['title'] }}">
                        <span class="flow-step__node">
                            <i class="ti {{ $step['icon'] }}" aria-hidden="true"></i>
                        </span>
                        <div class="flow-step__body">
                            <span class="flow-step__num">Paso {{ $i + 1 }}</span>
                            <h3>{{ $step['title'] }}</h3>
                            <p>{{ $step['desc'] }}</p>
                            <span class="flow-step__hint">
                                <i class="ti ti-player-play-filled" aria-hidden="true"></i>
                                Ver animación
                            </span>
                        </div>
                    </li>
                @endforeach
            </ol>
        </div>
    </div>

    @include('partials._proceso-modal')
</section>
