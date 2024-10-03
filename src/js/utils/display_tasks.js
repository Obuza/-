
// функция для создания ячейки таблицы
function create_cell(content, className, id) { //передаём содержимое , имя класса и ID
    const cell = document.createElement('td'); // создаём td элемент 
    cell.textContent = content; // задаём содержимое этой ячейки
    cell.classList.add(className); // и лобавляем класс 
    if (id) cell.id = id; // если id передаётся , то устанавливаем 
    return cell;
}

// функция для создания кнопки, передаём текст кнопки , класс , логику обработки нажатия, и флаг отображения кнопки , по дефолту будет false 
function create_button(text, className, id, onClick, isHidden = false) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add(className);
    if (id) button.classList.add(id); // устанавливаем id если она передаётся 
    if (isHidden) button.style.display = 'none'; // скрываем кнопку если isHidden true;
    button.onclick = onClick; // устанавливаем логику 
    return button;
}


// для вывода списка задач
function display_tasks(tasks) {
    const taskList = document.getElementById('task-list'); // получаем элемент по id
    taskList.innerHTML = ''; // Очищаем список задач
 
    // Если задач нет, выведем сообщение
    if (tasks.length === 0) {

        const noTasksMessage = create_cell('У вас нет задач', 'no-tasks-message');
        noTasksMessage.colSpan = 5; // Устанавливаем колSpan для того, чтобы ячейка занимала все столбцы
        noTasksMessage.style.textAlign = 'center'; // центруем текст
        taskList.appendChild(noTasksMessage);// добавляем ячейку в таблицу
        return; // Завершаем выполнение функции
    }
    // если задачи есть , пробегаемся по каждой задаче и  создаём строки таблицы
    tasks.forEach(task => {

        const tr = document.createElement('tr'); // создаём строку 
        tr.id = `task-row-${task.id}`;// устанавливаем Id
        tr.classList.add('task-row');// добавляем класс

        // Добавляем ячейки с данными задачи
        tr.appendChild(create_cell(task.id, 'task-id')); // id 
        /* 
        ячейка с  заголовком.
        task.title.slice(0, 55) задаёт что в ячейке будет максимум 55 символов
        этот костыль был создан потому что не смог адекватно реализовать аккуратный вывод данных
        в ячейке. 
        */
        tr.appendChild(create_cell(task.title.slice(0, 55), 'task-title', `title-${task.id}`)); 
        // ячейка с описанием задачи.
        //тут такая же история как и с title
        tr.appendChild(create_cell(task.description.slice(0, 250), 'task-description', `description-${task.id}`)); // Максимум 250 символов
        //ячейка со статусом
        tr.appendChild(create_cell(task.status, 'task-status', `status-${task.id}`));

        // ячйка для кнопок действий
        const tdActions = document.createElement('td');
        tdActions.classList.add('task-actions');
        
        /*
            создаем кнопки для действий над задачей и добавляем их в ячейку действий
            при создании кнопок "Сохранить" и "Отмена" передаём в функцию четвертым аргументом true 
            для того чтобы они были скрыты 

        */ 
        tdActions.appendChild(create_button('Изменить', 'edit-button', `edit-button-${task.id}`, () => edit_task(task.id)));
        tdActions.appendChild(create_button('Сохранить', 'update-button', `update-button-${task.id}`, () => update_task(task.id), true));
        tdActions.appendChild(create_button('Удалить', 'delete-button', `delete-button-${task.id}`, () => delete_task(task.id)));
        tdActions.appendChild(create_button('Отмена', 'cancel-button', `cancel-button-${task.id}`, () => cancel_action(task.id), true));

        // добавляем ячейку действий в строку задачи
        tr.appendChild(tdActions);
        // добавляем строку в список задач 
        taskList.appendChild(tr);
    });
}
