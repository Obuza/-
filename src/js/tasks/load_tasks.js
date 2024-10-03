// функция для загрузки  задач из БД
function load_tasks(page) {
    // делаем гет запрос , передаём в URLe  номер страницы
    fetch(`src/php/tasks/get_tasks.php?page=${page}`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.success && Array.isArray(data.tasks)) {
                all_tasks = data.tasks; // Получаем задачи из ответа
                if (buttonPressed) {
                    sort_tasks(all_tasks); // Если кнопка сортироваки нажата, сортируем задачи
                } else {
                    display_tasks(all_tasks); // Если нет , просто отображаем задачи
                }
            } else {
                console.error('Задачи не найдены или их формат неверен');
            }
        })
        .catch(error => console.error('Error:', error));
}
