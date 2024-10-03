function registrarion() {    
   
 document.getElementById('reg-username-error').style.display = 'none';
 document.getElementById('reg-password-error').style.display = 'none';
 // Собираем данные из полей формы
 const formData = new FormData(document.getElementById('reg-form'));
 const username = formData.get('username');
 const password = formData.get('password');
 
 let valid = true
 // Проверка длины логина и пароля
 if (username.length < 3 || username.length > 20) {
     document.getElementById('reg-username-error').textContent = 'Имя пользователя должно содержать от 3 до 20 символов.';
     document.getElementById('reg-username-error').style.display = 'block';
     valid = false
 }

 if (password.length < 8 || password.length > 20) {
     document.getElementById('reg-password-error').textContent = 'Пароль должен содержать от 8 до 20 символов.';
     document.getElementById('reg-password-error').style.display = 'block';
     valid = false
 }

 // Проверка на допустимые символы
 const usernamePattern = /^[a-zA-Z0-9_]+$/;
 const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*_?&])[A-Za-z\d@$!%*_?&]{8,}$/;

 if (!usernamePattern.test(username)) {
     document.getElementById('reg-username-error').textContent = 'Имя пользователя может содержать только буквы, цифры и подчеркивания.';
     document.getElementById('reg-username-error').style.display = 'block';
     valid = false
 }

 if (!passwordPattern.test(password)) {
     document.getElementById('reg-password-error').textContent = 'Пароль должен содержать минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ.';
     document.getElementById('reg-password-error').style.display = 'block';
     valid = false
 }

    // Если валидация успешна, отправляем данные
    if (valid)
    {
        // POST запрос, отправляем данные пользователя 
        fetch('src/php/auth/registration.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Если всё ОК — перенаправляем на index.php
                window.location.href = 'index.php';
            } else {
                document.getElementById('reg-password-error').textContent = data.message;
                document.getElementById('reg-password-error').style.display = 'block';
                document.getElementById('reg-form').reset();
                // Если ошибка — показываем сообщение
                
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
    }
    else{
        document.getElementById('reg-form').reset();
    }
}
