// функция для проверки кол-во записей в таблице 
function checking_namber_records() {
    // делаем гет запрос 
    fetch('src/php/utils.get_count_task.php', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            //если ответ пришёл успешно вызиваем функцию создания кнопок пагинации
            create_page_buttons(); // Обновляем пагинацию
        } else {
            console.error('Ошибка получения количества задач');
        }
    })
    .catch(error => console.error('Ошибка:', error));
}
