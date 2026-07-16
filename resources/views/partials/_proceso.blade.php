@php
    $steps = [
        [
            'n' => '01',
            'title' => 'Escuchamos',
            'desc' => 'Entendemos tu negocio, tus usuarios reales y el problema que hay que resolver.',
        ],
        [
            'n' => '02',
            'title' => 'Diseñamos',
            'desc' => 'Prototipamos la experiencia pensando primero en la Capa 8: quien usará el producto.',
        ],
        [
            'n' => '03',
            'title' => 'Desarrollamos',
            'desc' => 'Construimos con Laravel y buenas prácticas, capa por capa, con entregas visibles.',
        ],
        [
            'n' => '04',
            'title' => 'Lanzamos y acompañamos',
            'desc' => 'Publicamos, medimos resultados y damos soporte continuo a tu proyecto.',
        ],
    ];
@endphp

<section class="process" id="proceso">
    <div class="container">
        <p class="section-kicker" data-reveal>Proceso</p>
        <h2 class="section-title" data-reveal>Un flujo de trabajo simple, transparente y a tu ritmo</h2>

        <div class="process__timeline">
            @foreach ($steps as $step)
                <div class="process__step" data-reveal>
                    <span class="process__num">{{ $step['n'] }}</span>
                    <h3>{{ $step['title'] }}</h3>
                    <p>{{ $step['desc'] }}</p>
                </div>
            @endforeach
        </div>
    </div>
</section>
