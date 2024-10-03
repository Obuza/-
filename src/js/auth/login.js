function login()
{
    event.preventDefault();

    document.getElementById('username-error').style.display = 'none';
    document.getElementById('password-error').style.display = 'none';
    //собираем данные из полей формы
    const formData = new FormData(document.getElementById('auth-form'));
    // пост запрос , отправляем данные пользователя 
    fetch('src/php/auth/login.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Если всё ОК — перенаправляем на index.php
            window.location.href = 'index.php';
        } else {
            // Если ошибка — показываем сообщение
            document.getElementById('password-error').textContent = data.message;
            document.getElementById('password-error').style.display = 'block';
            document.getElementById('auth-form').reset();
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}

