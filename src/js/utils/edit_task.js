// функция для реализации логики нажатия на кнопку "Изменить".
// передаём Id таски, чтобы редактировать только выбранную строку
function edit_task(taskId) {
    // Получаем элементы с указанным taskId для редактирования
    const titleElement = document.getElementById(`title-${taskId}`); 
    const descriptionElement = document.getElementById(`description-${taskId}`); 
    const statusElement = document.getElementById(`status-${taskId}`); 
    const selectedRow = document.getElementById(`task-row-${taskId}`);
    const allRows = document.querySelectorAll('.task-row'); // достаём все строки задач чтобы в режиме редактирования добавить полу-прозрачность и запретить нажатия
    
    // проверяем, находится ли элемент в режиме редактирования
    const isEditable = titleElement.contentEditable === "true"; // Если contentEditable равно true, значит редактирование активно
    
    // устанавливаем режим редактирования
    titleElement.contentEditable = !isEditable; // переключаем режим редактирования для заголовка
    descriptionElement.contentEditable = !isEditable; // переключаем режим редактирования для описания

    // обновляем статус, если не в режиме редактирования, иначе мы просто запихаем селектор в ячейку , что не кулл
    if (!isEditable) {
        const selectElement = document.createElement('select'); // создаем элемент select для выбора статуса
        selectElement.name = 'status'; // задаем имя для элемента select
        
        // добавляем варианты выбора в select
        ['Не выполнена', 'Выполнена'].forEach(optionText => {
            const option = document.createElement('option'); // создаем новый элемент option
            option.value = optionText; // устанавливаем значение option
            option.textContent = optionText; // устанавливаем текст для option
            selectElement.appendChild(option); // добавляем option в select
        });
        
        statusElement.innerHTML = ''; // очищаем текущий контент статуса
        statusElement.appendChild(selectElement); // Добавляем новый элемент select со статусами
    }

    // меняем выидимость кнопок в зависимости от  режима редактирования. Если редактируем ,отображается "сохранитьь" и "отмена" , если нет то "изменить" и "удалить"
    document.querySelector(`.update-button-${taskId}`).style.display = isEditable ? "none" : "inline"; 
    document.querySelector(`.edit-button-${taskId}`).style.display = isEditable ? "inline" : "none"; 
    document.querySelector(`.cancel-button-${taskId}`).style.display = isEditable ? "none" : "inline";
    document.querySelector(`.delete-button-${taskId}`).style.display = isEditable ? "inline" : "none"; 

    // Обновление прозрачности строк таблицы
    allRows.forEach(row => {
        if (row !== selectedRow) {
            row.classList.toggle('table-row-blur', !isEditable); // добавляем или убираем класс для размытия строк, кроме выбранной
        }
    });
}
