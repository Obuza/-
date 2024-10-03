<?php
//возобновляем сессию сессию
session_start();
// Подключаем файлы db.php и task.php
include '../utils/db.php'; 
include '../utils/task.php';

// Обработка POST-запроса на создание задачи
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // получаем данные из запроса
    $title = $_POST['title'];
    $description = $_POST['description'];
    $status = $_POST['status'];
    // проверка на наличие Названия и статуса задачи
    if (empty($title) || empty($status)) {
        echo json_encode(['success' => false, 'message' => 'Название и статус задачи обязательны для заполнения']);
        exit;
    }

    // получаем ID пользователя из суперглобального масиива сессии
    $userId = $_SESSION['user_id'];
    // создание объекта задачи
    try {
        $task = new Task($db); // создаем объект Task с подключением к базе данных
        $task->addTask($title, $description, $status,$userId); // добавление задачи в базу данных
        // отправка успешного ответа
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Не удалось создать задачу: ' . $e->getMessage()]);
    }
} else {
    // Если запрос не POST
    echo json_encode(['success' => false, 'message' => 'Недопустимый метод запроса']);
}
?>
