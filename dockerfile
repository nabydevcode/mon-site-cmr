# Utiliser une image PHP avec Apache
FROM php:8.2-apache

# Installer les dépendances nécessaires (Symfony et extensions PHP)
RUN apt-get update && apt-get install -y \
    libicu-dev \
    zip \
    unzip \
    git \
    wget \
    && docker-php-ext-install intl pdo pdo_mysql

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copier les fichiers de ton projet dans le conteneur
WORKDIR /var/www/html
COPY . /var/www/html

# Donner les permissions nécessaires
RUN chown -R www-data:www-data /var/www/html

# Activer le module Apache Rewrite
RUN a2enmod rewrite

# Exposer le port 80 pour Apache
EXPOSE 80

# Commande de lancement
CMD ["apache2-foreground"]
