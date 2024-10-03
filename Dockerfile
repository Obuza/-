# Используем официальный образ PHP с Apache
FROM php:8.1-apache

# Установка необходимых расширений
RUN docker-php-ext-install pdo pdo_mysql

# Копируем файлы вашего проекта в контейнер
COPY . /var/www/html/

# Установка прав на директорию
RUN chown -R www-data:www-data /var/www/html/

# Открываем порт 80
EXPOSE 80
