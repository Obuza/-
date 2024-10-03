# Используем официальный образ PHP с Apache
FROM php:8.1-apache

# Установка необходимых расширений и клиента MySQL
RUN apt-get update && apt-get install -y default-mysql-client \
    && docker-php-ext-install pdo pdo_mysql

# Установка dockerize для ожидания MySQL
RUN apt-get update && apt-get install -y wget \
    && wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz \
    && rm dockerize-linux-amd64-v0.6.1.tar.gz

# Копируем файлы вашего проекта в контейнер
COPY . /var/www/html/

# Установка прав на директорию
RUN chown -R www-data:www-data /var/www/html/

# Открываем порт 80
EXPOSE 80

# Команда, которая будет ожидать запуска MySQL и выполнит SQL-скрипт
CMD ["sh", "-c", "dockerize -wait tcp://db:3306 -timeout 60s && mysql -h db -u obuza -p1234 task_manager < /var/www/html/sql/task_manager.sql && apache2-foreground"]
