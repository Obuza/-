// Переменная для хранения текущей страницы, на которой находится пользователь
let current_page = 0; 
// Переменная для хранения общего количества задач
let total_tasks = 0; 

// Функция для создания кнопок пагинации
function create_page_buttons() {
    // Выполняем гет запрос к серверу для получения количества задач
    fetch('src/php/utils/get_count_task.php', {
        method: 'GET',
    })
    .then(response => response.json()) // Преобразуем ответ в JSON
    .then(data => {
        if (data.success) {
            // Если всё ОК получаем общее количество задач из ответа
            total_tasks = data.tasks[0].task_count; 
            // Обновляем кнопки пагинации на основе общего количества задач
            update_buttons(); 
        } else {
            // Если нет, выводим ошибку в консоль
            console.error('Ошибка получения данных');
        }
    })
    .catch(error => console.error('Ошибка:', error));
}

// Функция для обновления кнопок пагинации
function update_buttons() {
    // Вычисляем количество кнопок,задач будет выводиться 5 штук поэтому делим на 5
    const button_count = Math.ceil(total_tasks / 5); 
    // Либо находим либо создаём контейнер
    const pagination_container = document.querySelector('.pagination') || createPaginationContainer();

    // Очищаем контейнер перед добавлением новых кнопок
    pagination_container.innerHTML = ''; 

    // Создаем кнопку "Назад"
    const left_button = document.createElement('button');
    left_button.textContent = '<';
    left_button.addEventListener('click', () => {
        // Если текущая страница больше 0, уменьшаем номер страницы
        if (current_page > 0) {
            current_page--;
            load_tasks(current_page); // Загружаем задачи для текущей страницы
            update_buttons(); // Обновляем кнопки пагинации
        }
    });
    
    // Создаем кнопку "Вперед"
    const right_button = document.createElement('button');
    right_button.textContent = '>';
    right_button.addEventListener('click', () => {
        // Если текущая страница меньше максимального номера страницы, увеличиваем номер страницы
        if (current_page < button_count - 1) {
            current_page++;
            load_tasks(current_page); // всё тоже что и для кнопки "назад" 
            update_buttons(); 
        }
    });

    // Если количество страниц больше или равно 2, добавляем кнопки пагинации
    if (button_count >= 2) {
        pagination_container.appendChild(left_button); // Добавляем кнопку "Назад"

        // Логика для отображения кнопок пагинации
        // Вычисляем начало и конец диапазона для отображения кнопок
        let start = Math.max(0, current_page - 2); // Начало диапазона
        let end = Math.min(button_count, current_page + 3); // Конец диапазона

        // Если в диапазоне меньше 5 кнопок, корректируем границы
        if (end - start < 5) {
            // Если начало диапазона равно 0, ограничиваем конец до 5
            if (start === 0) {
                end = Math.min(button_count, 5); //показываем не больше 5 кнопок
            } else if (end === button_count) {
                // Если конец диапазона равен количеству страниц, показываем последние 5 кнопок
                start = Math.max(0, button_count - 5); 
            }
        }

        // Создаем кнопки для отображения страниц
        for (let i = start; i < end; i++) {
            const page_button = document.createElement('button');
            page_button.textContent = i + 1; // Нумерация кнопки страниц (начинается с 1)

            // Добавляем класс 'active' к кнопке текущей страницы для выделения
            if (i === current_page) {
                page_button.classList.add('active'); // Добавляем класс текущей страницы
            }
            
            // Обработчик события для загрузки задач при нажатии на кнопку страницы
            page_button.addEventListener('click', () => {
                current_page = i; // Устанавливаем текущую страницу
                load_tasks(current_page); // Загружаем задачи для текущей страницы
                update_buttons(); // Обновляем кнопки пагинации
            });
            
            // Добавляем кнопку страницы в контейнер
            pagination_container.appendChild(page_button); 
        }

        // Добавляем кнопку "Вперед"
        pagination_container.appendChild(right_button); 
    }
}

// Функция для создания контейнера пагинации, если он еще не существует
function createPaginationContainer() {
    const container = document.createElement('div'); // Создаем новый элемент div
    container.classList.add('pagination'); // Добавляем класс 'pagination' к контейнеру
    document.body.appendChild(container); // Добавляем контейнер в body документа
    return container; // Возвращаем созданный контейнер
}
