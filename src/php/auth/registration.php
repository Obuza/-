<?php
// скрипт регистрации пользователя

// подключаем файл с конфигурацией базы данных
include '../utils/db.php'; 

// проверяем, был ли запрос методом POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // получаем имя пользователя и пароль из POST данных
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    // проверка, что введены имя пользователя и пароль
    if (empty($username) || empty($password)) {
        // возвращаем ошибку в формате JSON, если имя пользователя или пароль пустые
        echo json_encode(['success' => false, 'message' => 'Необходимо ввести логин и пароль']);
        exit; // завершаем выполнение скрипта
    }

    // Проверка, существует ли пользователь с таким логином
    try {
        $sql = "SELECT COUNT(*) FROM users WHERE username = :username";
        $stmt = $db->prepare($sql);
        $stmt->execute(['username' => $username]);
        $count = $stmt->fetchColumn();

        if ($count > 0) {
            echo json_encode(['success' => false, 'message' => 'Пользователь с таким именем уже существует']);
            exit;
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Ошибка при проверке пользователя: ' . $e->getMessage()]);
        exit;
    }
    
    // хешируем пароль перед сохранением
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    try {
        // подготовка SQL-запроса для добавления нового пользователя
        $sql = "INSERT INTO users (username, password) VALUES (:username, :password)";
        $stmt = $db->prepare($sql); // подготовка запроса
        $stmt->execute(['username' => $username, 'password' => $hashed_password]); // выполнение запроса с передачей параметров
        
        // Получение ID последнего вставленного пользователя
        $userId = $db->lastInsertId();
        
        // Установка сессии
        session_start();
        $_SESSION['user_id'] = $userId; // Сохраните ID пользователя в сессии
        $_SESSION['username'] = $username; // Можно сохранить имя пользователя
        
        echo json_encode(['success' => true]); // возвращаем успешный ответ в формате JSON
    } catch (PDOException $e) {
        // если возникла ошибка при выполнении запроса, возвращаем сообщение об ошибке
        echo json_encode(['success' => false, 'message' => 'Ошибка при регистрации: ' . $e->getMessage()]);
    }
}
?>
