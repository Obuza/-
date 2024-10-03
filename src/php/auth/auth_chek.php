<?php
// скрипт авторизации пользователя

// начинаем сессию
session_start();
// Если пользователь не авторизован, перенаправляем на страницу входа
if (!isset($_SESSION['user_id'])) {
    header('Location: auth_page.php');
    exit;
}
?>
