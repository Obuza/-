let buttonPressed = false; // флаг для отслеживания состояния кнопки (нажата/не нажата)

const toggleButton = document.getElementById('toggle-button'); // получаем элемент кнопки по её ID

if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        buttonPressed = !buttonPressed; // меняем состояние флага
        toggleButton.classList.toggle('active', buttonPressed); // добавляем или удаляем класс 'active'
        
        // устанавливаем состояние элементов формы
        set_form_elements_state(buttonPressed); // устанавливаем состояние элементов формы
        load_tasks(current_page); // загружаем задачи, если кнопка нажата
    });
}

// получаем элементы формы для поиска, фильтрации и сортировки
const elements = [
    { id: 'search-keyword', event: 'input' },
    { id: 'filter-status', event: 'change' },
    { id: 'sort-options', event: 'change' }
];

// добавляем обработчики событий для элементов формы
elements.forEach(({ id, event }) => {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener(event, handle_input_change);
    }
});

// функция для обработки изменений в форме
function handle_input_change() {
    // загружаем задачи, если кнопка нажата
    if (buttonPressed) {
        load_tasks(current_page); // обновляем задачи при изменении в форме
    }
}

// функция для установки состояния элементов формы
function set_form_elements_state(isEnabled) {
    elements.forEach(({ id }) => {
        const element = document.getElementById(id); //получаем элемент по id
        if (element) {
            element.disabled = !isEnabled; // устанавливаем disabled в зависимости от состояния кнопки
        }
    });
}
