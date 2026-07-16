<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'Servicios y Desarrollo JC — Diseñamos para la Capa 8' }}</title>
    <meta name="description" content="{{ $description ?? 'Servicios y Desarrollo JC construye sitios web, tiendas en línea y software a medida pensando siempre en la Capa 8 del modelo OSI: las personas.' }}">

    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%230b0f1a'/%3E%3Ctext x='50' y='68' font-size='58' font-family='monospace' font-weight='700' fill='%234f8cff' text-anchor='middle'%3EJC%3C/text%3E%3C/svg%3E">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.44.0/dist/tabler-icons.min.css">

    <link rel="stylesheet" href="{{ asset('assets/css/app.css') }}">
</head>
<body>
    @include('partials._nav')

    <main>
        @yield('content')
    </main>

    @include('partials._footer')
    @include('partials._whatsapp-button')

    <script src="{{ asset('assets/js/app.js') }}" defer></script>
</body>
</html>
