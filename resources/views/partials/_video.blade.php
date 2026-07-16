{{--
    Coloca tus archivos de video en public/videos/ con estos nombres
    (o cambia el atributo src de cada <video> por el tuyo):
      - public/videos/como-trabajamos.mp4
      - public/videos/proyectos.mp4
    Si el archivo no existe, se muestra automáticamente un aviso "Video próximamente"
    en vez de un reproductor roto (ver assets/js/app.js).
--}}
@php
    $videos = [
        [
            'src' => 'videos/como-trabajamos.mp4',
            'tag' => 'Detrás de escena',
            'title' => 'Así trabajamos capa por capa',
            'desc' => 'Un vistazo rápido a cómo pasamos de una idea a un producto en producción.',
        ],
        [
            'src' => 'videos/proyectos.mp4',
            'tag' => 'Portafolio',
            'title' => 'Un vistazo a nuestros proyectos',
            'desc' => 'Interfaces reales, pensadas para que la Capa 8 no tenga que pensar dos veces.',
        ],
    ];
@endphp

<section class="videos" id="videos">
    <div class="container">
        <p class="section-kicker" data-reveal>En video</p>
        <h2 class="section-title" data-reveal>Míralo en movimiento</h2>

        <div class="videos__grid">
            @foreach ($videos as $video)
                <figure class="video-card" data-reveal>
                    <div class="video-card__frame">
                        <video
                            class="video-card__el"
                            playsinline
                            muted
                            loop
                            controls
                            preload="none"
                            data-fallback-title="{{ $video['title'] }}"
                        >
                            <source src="{{ asset($video['src']) }}" type="video/mp4">
                        </video>
                        <div class="video-card__fallback" aria-hidden="true">
                            <span class="video-card__play"><i class="ti ti-player-play-filled" aria-hidden="true"></i></span>
                            <p>Video próximamente</p>
                        </div>
                    </div>
                    <figcaption>
                        <span class="video-card__tag">{{ $video['tag'] }}</span>
                        <h3>{{ $video['title'] }}</h3>
                        <p>{{ $video['desc'] }}</p>
                    </figcaption>
                </figure>
            @endforeach
        </div>
    </div>
</section>
