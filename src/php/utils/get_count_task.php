<?php
// подключаем файлы с конфигурацией базы данных и классом задачи
include '../utils/db.php'; 
include '../utils/task.php';
// запускаем сессию, чтобы иметь доступ к данным сессии
session_start();

//проверяем был ли запрос с методом гет
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userId = $_SESSION['user_id'];// получаем id пользователя сессии
    $task = new Task($db);
    $count = $task->getCountTasks($userId); // получаем количество задач для пользователя с указанным id
    echo json_encode(['success' => true, 'tasks' => [$count]]);
} else {
    echo json_encode(['success' => false, 'message' => 'Ошибка запроса']);
}

    

