<?php
//скрипт получения задач 

include '../utils/db.php'; 
include '../utils/task.php';

session_start();
// проверяем метод запроса
if ($_SERVER['REQUEST_METHOD'] === 'GET')
{
    $userId = $_SESSION['user_id'];  // Получаем user_id из сессии
    $page = $_GET['page']; // получаем номер страницы

    try {
        $task = new Task($db); // создаём объкт класса Task c подключением к БД
        $tasks = $task->getTasks($userId, $page); // получаем задачи для данного пользователя
        
        echo json_encode(['success' => true, 'tasks' => $tasks]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Не удалось загрузить задачи: ' . $e->getMessage()]);
    }


}
?>
