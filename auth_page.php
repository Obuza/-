<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Управление задачами</title>
    <link rel="stylesheet" href="styles/scss/styles.css">
</head>
<body>
<form id="auth-form"> 
    <input type="text" name="username" placeholder="Имя пользователя" required>
    <span class="error-message" id="username-error"></span>
    <input type="password" name="password" placeholder="Пароль" required>
    <span class="error-message" id="password-error"></span>
    <button onclick="login()">Войти</button>
    <button id="registration">Регистрация</button>
</form>

</body>
<script>
        document.getElementById('registration').addEventListener('click', function() {
            window.location.href = 'registration_page.php'; // Перенаправление на страницу регистрации
        });
    </script>

<script src="src/js/auth/login.js"></script>
</html>
