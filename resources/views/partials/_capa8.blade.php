@php
    $layers = [
        ['n' => 1, 'name' => 'Física', 'desc' => 'Servidores, cables y señales: la base que sostiene todo lo demás.'],
        ['n' => 2, 'name' => 'Enlace de datos', 'desc' => 'Conexiones estables entre dispositivos, sin fricción.'],
        ['n' => 3, 'name' => 'Red', 'desc' => 'Rutas que llevan cada dato exactamente a donde debe llegar.'],
        ['n' => 4, 'name' => 'Transporte', 'desc' => 'Que nada se pierda, se duplique o llegue a destiempo.'],
        ['n' => 5, 'name' => 'Sesión', 'desc' => 'Conversaciones digitales que se mantienen abiertas y seguras.'],
        ['n' => 6, 'name' => 'Presentación', 'desc' => 'Datos traducidos a formatos que todo sistema entiende.'],
        ['n' => 7, 'name' => 'Aplicación', 'desc' => 'Donde el software finalmente cobra forma y se usa.'],
    ];
@endphp

<section class="layers" id="capa8">
    <div class="container">
        <p class="section-kicker" data-reveal>El concepto</p>
        <h2 class="section-title" data-reveal>
            El modelo OSI tiene 7 capas técnicas.<br>
            Nosotros trabajamos para la <span class="text-accent">octava</span>.
        </h2>
        <p class="section-lede" data-reveal>
            Puedes tener la infraestructura perfecta y aun así perder al usuario en el primer clic.
            Por eso cada proyecto de <strong>JC</strong> se diseña de abajo hacia arriba: dominamos las
            7 capas técnicas para que la Capa 8 —la persona— tenga una experiencia simple, rápida y confiable.
        </p>
    </div>

    <div class="container layers__grid">
        <ol class="layers__stack" id="layersStack" style="--total: {{ count($layers) }}">
            @foreach ($layers as $layer)
                <li class="layer-row" data-layer="{{ $layer['n'] }}">
                    <span class="layer-row__num">{{ $layer['n'] }}</span>
                    <span class="layer-row__body">
                        <span class="layer-row__name">{{ $layer['name'] }}</span>
                        <span class="layer-row__desc">{{ $layer['desc'] }}</span>
                    </span>
                    <span class="layer-row__bar" aria-hidden="true"></span>
                </li>
            @endforeach
        </ol>

        <div class="layer-eight" id="layerEight">
            <span class="layer-eight__num">8</span>
            <h3 class="layer-eight__name">Capa 8 — El usuario</h3>
            <p class="layer-eight__desc">
                Quien decide, compra, confía… o se va. No es una capa técnica, es la razón de ser
                de todas las demás. Diseñamos cada interfaz, cada flujo y cada segundo de carga
                pensando en ella.
            </p>
            <span class="layer-eight__pulse" aria-hidden="true"></span>
        </div>
    </div>
</section>
