FROM php:7.2-apache

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y curl git unzip zip zlib1g-dev

RUN curl -sS https://getcomposer.org/installer | php && \
    chmod +x composer.phar && \
    mv composer.phar /usr/local/bin/composer

RUN pecl install grpc

COPY ./php.ini /usr/local/etc/php
COPY ./ /var/www/html/

WORKDIR /var/www/html/

RUN composer install

VOLUME /var/www/html/

EXPOSE 80 443



