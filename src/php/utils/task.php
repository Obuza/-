<?php
// скрипт создания класса и реализации методов для взаимодействия с БД
class Task 
{
    private $db; // переменная для хранения конфига БД

    public function __construct($db) // конструктор класса
    {
        $this->db = $db;
    }

    /*
        метод для получения задач.
        в параметры передаём userId сессии и страницу.
        под страницей подразумеваем диапазон для limit offset 
        чтобы получать только часть данных.
    */ 
    public function getTasks($userId, $page) {
        $tasks_per_page = 5; // количество задач на странице 
        $offset = ($page) * $tasks_per_page; // смещение для получения диапазона
    
        // SQL-запрос для получения задач пользователя с ограничением и смещением
        $sql = "SELECT * FROM tasks WHERE user_id = :user_id ORDER BY id DESC LIMIT :limit OFFSET :offset";
        $stmt = $this->db->prepare($sql); // подготовка запроса
        $stmt->bindValue(':user_id', $userId, PDO::PARAM_INT); // привязка параметра user_id
        $stmt->bindValue(':limit', $tasks_per_page, PDO::PARAM_INT); // привязка параметра limit
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT); // привязка параметра offset
        $stmt->execute(); // выполнение запроса
    
        return $stmt->fetchAll(PDO::FETCH_ASSOC); // возвращаем все задачи
    }

    //метод для получения количества записей для UserId
    public function getCountTasks($userId)
    {
        //sql запрос
        $sql = "SELECT COUNT(*) AS task_count FROM tasks WHERE user_id = :user_id";
        $stmt = $this->db->prepare($sql); // подготовка запроса
        $stmt->bindValue(':user_id', $userId, PDO::PARAM_INT); // привязка параметра user_id
        $stmt->execute(); // выполнение запроса
        return $stmt->fetch(PDO::FETCH_ASSOC); // возвращаем одну строку с task_count
    }
    
    //метод для добавления задачи
    public function addTask($title, $description, $status, $userId) 
    {   
        $sql = "INSERT INTO tasks (title, description, status, user_id) VALUES (:title, :description, :status, :user_id)";
        $stmt = $this->db->prepare($sql); // подготовка запроса
        $stmt->bindValue(':title', $title); // привязка параметра title
        $stmt->bindValue(':description', $description); // привязка параметра description
        $stmt->bindValue(':status', $status); // привязка параметра status
        $stmt->bindValue(':user_id', $userId, PDO::PARAM_INT); // привязка параметра user_id
        $stmt->execute(); // выполнение запроса
    }

    //метод для обновления задачи
    public function updateTask($id, $title, $description, $status, $userId) 
    {
        $sql = "UPDATE tasks SET title = :title, description = :description, status = :status WHERE id = :id AND user_id = :user_id";
        $stmt = $this->db->prepare($sql); // подготовка запроса
        $stmt->bindValue(':title', $title); // привязка параметра title
        $stmt->bindValue(':description', $description); // привязка параметра description
        $stmt->bindValue(':status', $status); // привязка параметра status
        $stmt->bindValue(':id', $id, PDO::PARAM_INT); // привязка параметра id
        $stmt->bindValue(':user_id', $userId, PDO::PARAM_INT); // привязка параметра user_id
        $stmt->execute(); // Выполнение запроса
    }

    //метод для удаления задачи
    public function deleteTask($id, $userId) 
    {

        $sql = "DELETE FROM tasks WHERE id = :id AND user_id = :user_id";
        $stmt = $this->db->prepare($sql); // Подготовка запроса
        $stmt->bindValue(':id', $id, PDO::PARAM_INT); // Привязка параметра id
        $stmt->bindValue(':user_id', $userId, PDO::PARAM_INT); // Привязка параметра user_id
        $stmt->execute(); // Выполнение запроса
    }
}
?>
