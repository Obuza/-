
//функция  сортировки задач
function sort_tasks(tasks) {
    // получаем значение ключевого слова для поиска, приводим его к нижнему регистру и убираем лишние пробелы
    const searchKeyword = document.getElementById('search-keyword').value.toLowerCase().trim();
    // получаем статус для фильтрации  
    const filterStatus = document.getElementById('filter-status').value;
    // получаем опцию сортировки 
    const sortOption = document.getElementById('sort-options').value;

    // фильтрация по ключевому слову
    let filtered_tasks = tasks.filter(task => {
        // создаем регулярное выражение для точного поиска
        const regex = new RegExp(`\\b${searchKeyword}\\b`, 'i'); // \\b означает границу слова, 'i' - регистронезависимый поиск
        return regex.test(task.title); // проверяем наличие ключевого слова в названии
    });

    // фильтрация по статусу
    if (filterStatus) {
        filtered_tasks = filtered_tasks.filter(task => task.status === filterStatus);
    }

    // сортировка задач по выбранным опциям
    switch (sortOption) {
        case 'id-asc':
            // сортировка по возрастанию ID
            filtered_tasks.sort((a, b) => a.id - b.id);
            break;
        case 'id-desc':
            // сортировка по убыванию ID
            filtered_tasks.sort((a, b) => b.id - a.id);
            break;
        case 'title-asc':
            // сортировка по возрастанию названия задачи (в алфавитном порядке)
            filtered_tasks.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            // сортировка по убыванию названия задачи (в обратном алфавитном порядке)
            filtered_tasks.sort((a, b) => b.title.localeCompare(a.title));
            break;
    }
    
    display_tasks(filtered_tasks); // Отображаем отсортированные задачи
}
