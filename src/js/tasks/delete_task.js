// для удаления записи
function delete_task(taskId) {
    if (confirm("Вы уверены, что хотите удалить задачу?")) { // confirm  для уточнения действия пользователя , если true то выполняем запрос
        
        const formData = new FormData(); // используем FormData для формировния корректной формы для отправки
        formData.append('id', taskId); // id = taskId
        formData.append('action', 'delete');// action = delete
        
        fetch(`src/php/tasks/delete_task.php`, {
            method: 'POST', // использую POST потому что в браузерах DELETE под капотом всё равно это пост запрос
            body: formData  // в боди передаём Id таски и действие 
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // После удаления задачи проверяем количество записей в БД чтобы поправить пагинацию если удаляется последняя запись на странице
                fetch('src/php/utils/get_count_task.php', { // не уверен в том что вызывать запрос другим запросом хорошая идея
                    method: 'GET',
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const task_count = data.tasks[0].task_count; // берём кол-во записей 
                        const total_pages = Math.ceil(task_count / 5); // считаем сколько будет кнопок

                        // Если текущая страница больше допустимого числа страниц переходим на последнюю существующую страницу 
                        if (current_page >= total_pages && total_pages > 0) {
                            current_page = total_pages - 1;
                        }
                        load_tasks(current_page); // Загружаем задачи на текущей странице
                        create_page_buttons(); // Обновляем пагинацию
                    }
                });
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    }
}
