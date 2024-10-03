<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Управление задачами</title>
    <link rel="stylesheet" href="styles/scss/styles.css">
</head>
<body>
    <form id="reg-form" method="post">
        <input type="text" name="username" placeholder="Имя пользователя" required>
        <span class="error-message" id="reg-username-error"></span>
        <input type="password" name="password" placeholder="Пароль" required>
        <span class="error-message" id="reg-password-error"></span>
        <button type="button" onclick="registrarion()">Зарегистрироваться</button>
        <button id="auth" type="button">Есть аккаунт?</button>
    </form>
    <script src="src/js/auth/registration.js"></script>
    <script>
        document.getElementById('auth').addEventListener('click', function() {
            window.location.href = 'auth_page.php'; 
        });
    </script>
</body>
</html>
