#!/bin/sh

# Ожидание MySQL
dockerize -wait tcp://db:3306 -timeout 60s
echo 'MySQL is up!'

# Проверка и выполнение SQL-скрипта
if [ -z "$(mysql -h db -u obuza -p1234 -e 'SHOW TABLES IN task_manager;')" ]; then
    mysql -h db -u obuza -p1234 task_manager < /var/www/html/sql/task_manager.sql
fi

# Запуск Apache
apache2-foreground
