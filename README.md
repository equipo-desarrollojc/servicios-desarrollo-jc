# Servicios y Desarrollo JC

Landing page del emprendimiento **Servicios y Desarrollo JC**, construida con Laravel.
Tema central: la **Capa 8** del modelo OSI — el usuario — como eje de todo el diseño.

## Desarrollo local

Requiere PHP 8.3+ y Composer.

```bash
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate
php artisan serve
```

El sitio queda disponible en `http://127.0.0.1:8000`.

No se usa Vite/Node: los estilos y el JavaScript viven directamente en
`public/assets/css/app.css` y `public/assets/js/app.js`, sin paso de build.

### Variables de entorno relevantes

| Variable | Uso |
|---|---|
| `CONTACT_WHATSAPP_NUMBER` | Número usado en los botones de WhatsApp (`config/contact.php`) |
| `CONTACT_EMAIL` | Correo mostrado en la sección de contacto |

### Videos

Coloca los archivos reales en `public/videos/`:

- `public/videos/como-trabajamos.mp4`
- `public/videos/proyectos.mp4`

Si no existen, la sección de video muestra automáticamente un aviso
"Video próximamente" en vez de un reproductor roto.

## Despliegue en Coolify

El repo incluye un `Dockerfile` (PHP-FPM + Nginx + Supervisor en Alpine) listo para
que Coolify lo construya directamente, sin necesidad de Node ni de un `docker-compose.yml`.

Pasos en Coolify:

1. **Nueva aplicación → desde este repositorio de Git**, tipo de build: `Dockerfile`.
2. **Puerto expuesto**: `80` (ya declarado con `EXPOSE 80` en el Dockerfile).
3. **Variables de entorno** a configurar en Coolify (no se commitean, van solo ahí):
   - `APP_KEY` — genera una con `php artisan key:generate --show` y pégala tal cual
     (incluyendo el prefijo `base64:`). Es obligatoria; el contenedor no arranca sin ella.
   - `APP_ENV=production`
   - `APP_DEBUG=false`
   - `APP_URL=https://tu-dominio.com`
   - `CONTACT_WHATSAPP_NUMBER=+50495076519`
   - `CONTACT_EMAIL=contacto@serviciosydesarrollojc.com`
4. **Almacenamiento persistente**: monta un volumen en `/var/www/html/database`.
   Ahí vive `database.sqlite`, que guarda los mensajes de contacto, sesiones y caché.
   Sin este volumen, cada nuevo deploy empieza con la base de datos vacía.
5. Al iniciar, el contenedor corre automáticamente las migraciones
   (`docker/entrypoint.sh`) y cachea config/rutas/vistas para producción.

## Estructura relevante

```
app/Http/Controllers/ContactController.php   Guarda los mensajes del formulario
app/Models/ContactMessage.php                Modelo del formulario de contacto
resources/views/partials/                    Secciones de la landing (hero, capa8, etc.)
public/assets/css/app.css                    Estilos (tema oscuro, sin build)
public/assets/js/app.js                      Animaciones e interacciones (sin build)
docker/                                       Config de nginx, php, supervisor y entrypoint
```
