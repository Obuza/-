
//функция для обновления задачи
function update_task(taskId) 
{
    const title = document.getElementById(`title-${taskId}`).innerText; // получаем значение ячейки title с переданным id
    const description = document.getElementById(`description-${taskId}`).innerText; // значение ячейки Описания 
    const status = document.querySelector(`#status-${taskId} [name="status"]`).value;// получаем выбранную опцию в селекте

    // создаем объект с новыми данными
    const updatedTask = {
        id: taskId,
        title: title,
        description: description,
        status: status
    };

    //деалаем запрос 
    fetch('src/php/tasks/update_task.php', 
        {
        method: 'POST',
        body: JSON.stringify(updatedTask), // преобразуем массив с новыми данными в JSON и передаём в боди
    })
    .then(response => response.json())  // получаем ответ как JSON
    .then(data => 
        {
        if (data.success) 
        {
            load_tasks(current_page); // обновляем список задач после успешного обновления
        } 
        else 
        {
            console.error('Ошибка при обновлении задачи:', data.message);
        }
    })
    .catch(error => console.error('Ошибка:', error));
    
}
