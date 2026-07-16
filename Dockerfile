# syntax=docker/dockerfile:1

FROM composer:2 AS vendor

WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --no-scripts \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader \
    --ignore-platform-reqs

FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
        nginx \
        supervisor \
        sqlite \
        icu-libs \
    && apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS \
        sqlite-dev \
        icu-dev \
        libzip-dev \
        oniguruma-dev \
    && docker-php-ext-install pdo pdo_sqlite mbstring intl zip bcmath opcache \
    && apk del .build-deps

COPY docker/php.ini /usr/local/etc/php/conf.d/99-app.ini
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/supervisord.conf /etc/supervisord.conf
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /var/www/html

COPY --from=vendor /app/vendor ./vendor
COPY . .

RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views \
        storage/logs bootstrap/cache database \
    && touch database/database.sqlite \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache database

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
