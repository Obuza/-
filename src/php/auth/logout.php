<?php
// Запускаем сессию
session_start();

// Проверяем, был ли запрос методом POST и установлено ли значение 'logout' в POST данных
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['logout'])) {
  
    // Уничтожаем сессию
    session_destroy();

   

    // Возвращаем успешный ответ
   
    echo json_encode(['message' => 'Вы вышли из системы.']);
} else {
    // Возвращаем ошибку, если запрос не валидный
 
    echo json_encode(['message' => 'Ошибка выхода.']);
}
?>
