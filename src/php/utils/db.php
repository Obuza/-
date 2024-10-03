<?php
// настройки подключения к базе данных
$host = 'db';  // сервер базы данных
$dbname = 'task_manager';  // название базы данных
$username = 'obuza';  // имя пользователя базы данных
$password = '1234';  // пароль для пользователя базы данных

try {
    // создаем объект PDO для подключения к базе данных MySQL
    // формируем строку подключения к БД
    $db = new PDO("mysql:host=$host;port=3306;dbname=$dbname;charset=utf8mb4", $username, $password);
    // устанавливаем режим обработки ошибок в виде исключений
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Устанавливаем кодировку для подключения
    $db->exec("SET NAMES 'utf8mb4'");
    
} catch (PDOException $e) {
    // если произошла ошибка подключения, завершаем выполнение скрипта
    die("Connection failed: " . $e->getMessage());
}
?>
