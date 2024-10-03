#официальный образ PHP с Apache
FROM php:8.1-apache

# Установка расширений и клиента MySQL
RUN apt-get update && apt-get install -y default-mysql-client \
    && docker-php-ext-install pdo pdo_mysql

# Установка dockerize для ожидания MySQL
RUN apt-get update && apt-get install -y wget \
    && wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz \
    && rm dockerize-linux-amd64-v0.6.1.tar.gz

# Копируем файлы проекта в контейнер
COPY . /var/www/html/

# Установка прав на директорию
RUN chown -R www-data:www-data /var/www/html/

# Открываем порт 80
EXPOSE 80

COPY init_db.sh /usr/local/bin/init_db.sh
RUN chmod +x /usr/local/bin/init_db.sh

CMD ["sh", "/usr/local/bin/init_db.sh"]