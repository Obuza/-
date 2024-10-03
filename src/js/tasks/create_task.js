//функция для создания задачи
function create_task() 
{
    //получаем данные с формы 
    const formData = new FormData(document.getElementById('task-form'));

    // Отправляем запрос на сервер
    fetch('src/php/tasks/create_task.php', 
    {
        method: 'POST', // метод запроса
        body: formData // тело запроса 
    })
    .then(response => response.json()) // Ожидаем JSON ответ от сервера
    .then(data => 
        {
        if (data.success) 
            {
            //если всё успешно , то очищаем поля ввода
            document.getElementById('task-form').reset();
            // загружаем текущую  страницу , чтобы при добавлении задачи мы не перескакивали на первую
            load_tasks(current_page);
            // проверяем кол-во записей в БД , чтобы при случае добавить кнопку пагинации
            checking_namber_records();
        } 
        else 
        {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}
