<?php
// скрипт для обновления задачи
// Подключение к базе данных
include '../utils/db.php'; 
include '../utils/task.php';
session_start();
//проверяем метод 
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получение данных из запроса
    $data = json_decode(file_get_contents('php://input'), true);
    // Проверка, что данные корректно получены
    if (isset($data['id'], $data['title'], $data['description'], $data['status'])) {
        $id = $data['id'];
        $title = $data['title'];
        $description = $data['description'];
        $status = $data['status'];

        $userId = $_SESSION['user_id'];//получаем userId сессии

        try{
        $task = new Task($db); // создаём объект класса с конфигом ДБ
        $success = $task->updateTask($id, $title, $description, $status,$userId); // делаем запрос
        echo json_encode(['success' => true]);
        }
        catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => 'Не удалось обновить задачу: ' . $e->getMessage()]);
        }
       
    } else {
        echo json_encode(['success' => false, 'message' => 'Некорректные данные']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Неверный метод запроса']);
}
?>
