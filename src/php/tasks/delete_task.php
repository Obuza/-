<?php
include '../utils/db.php'; 
include '../utils/task.php';
session_start();
//обрабатываем POST запрос на удаление записи
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $taskId = $_POST['id'];
    $action = $_POST['action'];

    // Проверяем, является ли действие "delete"
    if ($action === 'delete') {
        // Возвращаем ошибку в формате JSON, если ID не указан
        if (empty($taskId)) {
            echo json_encode(['success' => false, 'message' => 'Требуется идентификатор задачи']);
            exit;
        }
        
        $userId = $_SESSION['user_id']; // получаем userId из сессии

        // удаление задачи
        try {
            $task = new Task($db); // создаем объект класса Task с передачей подключения к базе данных
            $task->deleteTask($taskId,$userId);// вызываем метод удаления задачи
            echo json_encode(['success' => true]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => 'Не удалось удалить задачу: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Недопустимое действие']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Недопустимый метод запроса']);
}
