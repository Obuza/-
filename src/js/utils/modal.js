// Получаем элементы модального окна
const addTaskModal = document.getElementById('add_task_modal');
const openAddTaskModalBtn = document.getElementById('open_add_task_modal_btn');
const closeAddTaskBtn = addTaskModal.querySelector('.close');

// Открытие модального окна при клике на кнопку "Добавить задачу"
openAddTaskModalBtn.onclick = function() {
    addTaskModal.style.display = 'flex'; // Показываем модальное окно
}

// Закрытие модального окна при клике на крестик
closeAddTaskBtn.onclick = function() {
    addTaskModal.style.display = 'none'; // Скрываем модальное окно
}

// Закрытие модального окна при клике вне его содержимого
window.onclick = function(event) {
    if (event.target === addTaskModal) {
        addTaskModal.style.display = 'none';
    }
}
