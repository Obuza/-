function registrarion() {    
   
 document.getElementById('reg-username-error').style.display = 'none';
 document.getElementById('reg-password-error').style.display = 'none';
 // Собираем данные из полей формы
 const formData = new FormData(document.getElementById('reg-form'));
 const username = formData.get('username');
 const password = formData.get('password');
 
 let valid = true

 // Регулярки
 const usernamePattern = /^[a-zA-Z0-9_]{3,}$/;
 ;

 // Минимум восемь символов, по крайней мере, одна заглавная буква, одна строчная буква, одна цифра и один специальный символ:
 const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*_?&])[A-Za-z\d@$!%*_?&]{8,}$/;

 if (!usernamePattern.test(username)) {
     document.getElementById('reg-username-error').textContent = '(3 символа). Имя пользователя может содержать только буквы, цифры и подчеркивания.';
     document.getElementById('reg-username-error').style.display = 'block';
     valid = false
 }

 if (!passwordPattern.test(password)) {
     document.getElementById('reg-password-error').textContent = '(8 символов). Пароль должен содержать минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ.';
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

                // если false то выводим сообщения ошибки от сервера
                document.getElementById('reg-password-error').textContent = data.message;
                document.getElementById('reg-password-error').style.display = 'block';
                // очищаем форму
                document.getElementById('reg-form').reset();
                
                
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
    }
    else{
        // очищаем форму
        document.getElementById('reg-form').reset();
    }
}
