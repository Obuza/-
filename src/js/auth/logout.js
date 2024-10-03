function logout() {
    fetch('src/php/auth/logout.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'logout': 'true' // URLSearchParams для формирования body
        })
    })
    .then(response => {
        console.log('Response:', response); // Отладка
        if (response.ok) {
            return response.json(); // Преобразуем ответ в JSON
        } else {
            throw new Error('Ошибка выхода');
        }
    })
    .then(data => {
        console.log(data.message); // Сообщение из ответа сервера
        window.location.href = 'auth_page.php'; // Перенаправляем пользователя
    })
    .catch(error => console.error('Ошибка:', error));
}
