-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Окт 02 2024 г., 22:18
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `task_manager`
--

-- --------------------------------------------------------

--
-- Структура таблицы `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Не выполнена','Выполнена') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `tasks`
--

INSERT INTO `tasks` (`id`, `user_id`, `title`, `description`, `status`) VALUES
(2, NULL, '123', '123', 'Не выполнена'),
(3, NULL, '123', '123', 'Не выполнена'),
(4, NULL, '123', '321', 'Не выполнена'),
(8, NULL, '123', '123', 'Не выполнена'),
(9, 2, '123', '12', 'Не выполнена'),
(10, 2, '123', '123', 'Не выполнена'),
(11, 2, '123', '123', 'Не выполнена'),
(17, 2, 'Task Title 1', 'This is the description for task 1.', 'Выполнена'),
(18, 2, 'Task Title 2', 'This is the description for task 2.', 'Не выполнена'),
(19, 2, 'Task Title 3', 'This is the description for task 3.', 'Выполнена'),
(20, 2, 'Task Title 4', 'This is the description for task 4.', 'Не выполнена'),
(21, 2, 'Task Title 5', 'This is the description for task 5.', 'Выполнена'),
(22, 2, 'Task Title 6', 'This is the description for task 6.', 'Не выполнена'),
(23, 2, 'Task Title 7', 'This is the description for task 7.', 'Выполнена'),
(24, 2, 'Task Title 8', 'This is the description for task 8.', 'Не выполнена'),
(25, 2, 'Task Title 9', 'This is the description for task 9.', 'Выполнена'),
(26, 2, 'Task Title 10', 'This is the description for task 10.', 'Не выполнена'),
(27, 2, 'Task Title 11', 'This is the description for task 11.', 'Выполнена'),
(28, 2, 'Task Title 12', 'This is the description for task 12.', 'Не выполнена'),
(29, 2, 'Task Title 13', 'This is the description for task 13.', 'Выполнена'),
(30, 2, 'Task Title 14', 'This is the description for task 14.', 'Не выполнена'),
(31, 2, 'Task Title 15', 'This is the description for task 15.', 'Не выполнена'),
(32, 2, 'Task Title 16', 'This is the description for task 16.', 'Не выполнена'),
(33, 2, 'Task Title 17', 'This is the description for task 17.', 'Выполнена'),
(34, 2, 'Task Title 18', 'This is the description for task 18.', 'Не выполнена'),
(35, 2, 'Task Title 19', 'This is the description for task 19.', 'Выполнена'),
(36, 2, 'Task Title 20', 'This is the description for task 20.', 'Не выполнена'),
(37, 2, 'Task Title 21', 'This is the description for task 21.', 'Выполнена'),
(38, 2, 'Task Title 22', 'This is the description for task 22.', 'Не выполнена'),
(39, 2, 'Task Title 23', 'This is the description for task 23.', 'Выполнена'),
(40, 2, 'Task Title 24', 'This is the description for task 24.', 'Не выполнена'),
(42, 2, 'Task Title 26', 'This is the description for task 26.', 'Не выполнена'),
(43, 2, 'Task Title 27', 'This is the description for task 27.', 'Выполнена'),
(44, 2, 'Task Title 28', 'This is the description for task 28.', 'Не выполнена'),
(45, 2, 'Task Title 29', 'This is the description for task 29.', 'Не выполнена'),
(46, 2, 'Task Title 30', 'This is the description for task 30.123', 'Не выполнена'),
(52, 2, '123', '123', 'Не выполнена'),
(53, 2, '312', '312', 'Не выполнена'),
(61, 2, '213', '123', 'Не выполнена'),
(62, 2, 'dsa', 'dasasd', 'Выполнена'),
(65, 2, 'qwe', 'qwe', 'Не выполнена');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'admin', '$2y$10$CSjERefFn205YFfueE2ptejGR/RzgXPHZgv1qPR0kuIPgBagwkuzO'),
(2, 'admin2', '$2y$10$i1jkjiRjccO6ha5B/zj7w.8yjx5r4ekDSE08/6WqTuJYaAbuUVtma'),
(3, 'admin3', '$2y$10$oEW4rDO4xvw8mSHoKhtImO9Lee8SMQ1cAzUGKGzpcRIQz/ciyiDdm'),
(8, 'admin5', '$2y$10$qXZwRMNkFnORHgtVHZtQkOIOMqkY/46LuH72tT.VkyPJkZD9rbc26'),
(9, 'admin23', '$2y$10$cyYx27XRTlqp4ln3IgiwBeZYauOF1p8xUWgqPiszp3NfDXzQgzWSi'),
(10, 'admin25', '$2y$10$FuLESjRXFkbTrhxexSY9P.JjiVBNk.IenQu2aG6yAG0bCle06WXWa');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
