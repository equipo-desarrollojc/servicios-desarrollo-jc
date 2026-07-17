<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'Servicios y Desarrollo JC — Software a tu medida' }}</title>
    <meta name="description" content="{{ $description ?? 'Servicios y Desarrollo JC crea sitios web, tiendas en línea y software a la medida de tu negocio. No compres software genérico: constrúyelo a tu medida.' }}">

    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('favicon-16x16.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="96x96" href="{{ asset('favicon-96x96.png') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('apple-icon-180x180.png') }}">
    <link rel="apple-touch-icon" href="{{ asset('apple-icon.png') }}">
    <link rel="manifest" href="{{ asset('site.webmanifest') }}">
    <meta name="msapplication-config" content="{{ asset('browserconfig.xml') }}">
    <meta name="theme-color" content="#05060b">

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
