<?php
session_start();

// проверка, существует ли сессия с user_id
if (!isset($_SESSION['user_id'])) {
    // если пользователь не авторизован, перенаправляем на страницу входа
    header('Location: auth_page.php');
    exit(); // остановка выполнения скрипта 
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Управление задачами</title>
    <link rel="stylesheet" href="styles/scss/styles.css">
</head>
<body>

    <button onclick="logout()" name="logout">Выйти</button>

    <!-- Модальное окно для добавления задачи -->
    <div id="add_task_modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Добавить новую задачу</h2>

            <!-- Форма для добавления задачи -->
            <form id="task-form">
                <label for="title">Заголовок:</label>
                <input maxlength="55" type="text" id="title" name="title" required><br><br>

                <label for="description">Описание:</label>
                <textarea maxlength="250" id="description" name="description" required></textarea><br><br>

                <label for="status">Статус:</label>
                <select id="status" name="status">
                    <option value="Не выполнена">Не выполнена</option>
                    <option value="Выполнена">Выполнена</option>
                </select><br><br>
                <button type="submit" onclick="create_task()">Добавить</button>
            </form>
        </div>
    </div>
    <!-- Div для сортировки -->
    <div class="filter-container">
        <button  id="open_add_task_modal_btn">Добавить задачу</button>
    <input type="text" id="search-keyword" placeholder="Поиск по названию..." disabled>
    
    <select id="filter-status" disabled>
        <option value="">Все статусы</option>
        <option value="Не выполнена">Не выполнена</option>
        <option value="Выполнена">Выполнена</option>
    </select>

    <select id="sort-options" disabled>
        <option value="id-asc">По ID (возрастание)</option>
        <option value="id-desc">По ID (убывание)</option>
        <option value="title-asc">По названию (A-Z)</option>
        <option value="title-desc">По названию (Z-A)</option>
    </select>
    <button class="button" id="toggle-button" onclick="load_tasks(current_page)">Сортировать</button>
</div>
<!-- Список задач-->
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Описание</th>
                <th>Статус</th>
                <th>Действия</th>
            </tr>
            </thead>
        <tbody id="task-list">
        </tbody>
    </table>
    <script src="src/js/tasks/load_tasks.js"></script>

    <script>
        // отображаем задачи и кнопки пагинации при загрузке страницы
        window.onload = function() {
            load_tasks(0); 
            create_page_buttons();
        };
    </script>
    <!-- Подключаем все скрипты (не уверен что подключение такого большог кол-во скриптов харошая идея-->
    <script src="src/js/tasks/create_task.js"></script>
    <script src="src/js/tasks/delete_task.js"></script>
    <script src="src/js/tasks/update_task.js"></script>
    <script src="src/js/utils/edit_task.js"></script>
    <script src="src/js/utils/create_page_buttons.js"></script>
    <script src="src/js/utils/check_count.js"></script>
    <script src="src/js/utils/cancel_action.js"></script>
    <script src="src/js/auth/logout.js"></script>
    <script src="src/js/utils/sort_tasks.js"></script>
    <script src="src/js/utils/display_tasks.js"></script>
    <script src="src/js/utils/toggle_filter.js"></script>
    <script src="src/js/utils/modal.js"></script>
</body>
</html>
