<?php
//скрипт авторизации пользователя
session_start();

// подключаем файл с конфигом БД
include '../utils/db.php'; 

// проверяем , был ли запрос методом post
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //получаем логин и пароль пользователя
    $username = $_POST['username'];
    $password = $_POST['password'];

    // проверка, что введены имя пользователя и пароль
    if (empty($username) || empty($password)) {
        //возвращаем ошибку если одно из полей пустые
        echo json_encode(['success' => false, 'message' => 'Необходимо ввести логин и пароль']);
        exit;
    }

    // Поиск пользователя в базе данных
    $sql = "SELECT * FROM users WHERE username = :username"; //запрос для поиска  пользователя
    $stmt = $db->prepare($sql); //подготовка запроса
    $stmt->execute(['username' => $username]); // выполнение запроса с передачей параметров
    $user = $stmt->fetch(PDO::FETCH_ASSOC); // получаем  результат  запроса как ассоциативный массив

    // проверяем существует ли пользователь и совпадает ли пароль 
    if ($user && password_verify($password, $user['password'])) {
        // Успешная аутентификация
        $_SESSION['user_id'] = $user['id']; // сохраняем id пользователя в сесии
        echo json_encode(['success' => true]); 
    } else {
        echo json_encode(['success' => false, 'message' => 'Неверный логин или пароль']);
    }
}
?>
