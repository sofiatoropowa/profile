<?php
require_once 'config/connect.php'
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task tracker</title>

    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <div class="container">
            <div class="flex header">
                <div class="flex header__line">
                    <div class="flex mobile__btns">
                        <button class="header__btn-create btns btn__create popup__create">Create task</button>
                        <button class="login_second header__btn-login btns btn__discord">Login</button>
                    </div>
                    <form action="" method="post" onsubmit="submitForm()">
                        <select class="header__selection" name="selection" id="selection">
                            <option value="select__default" selected disabled>по умолчанию</option>
                            <option value="select__executor">Имя пользователя</option>
                            <option value="select__status">Статус</option>
                            <option value="select__period">Срок выполнения</option>
                            <option value="select__date">Дата выполнения</option>
                        </select>
                        <input class="header__sorting" type="submit" name="submit" value="Сортировать"/>
                    </form>
                </div>

                <button class="login_first header__btn-login btns btn__discord">Login</button>
            </div>
        </div>
    </header>

    <div class="container">
        <?php

            if (!isset($_POST['selection'])) {
                $selectOption = false;
            } else {
                $selectOption = $_POST['selection'];
            }
            
            if ($selectOption == 'select__executor') {
                $tasks = mysqli_query($connect, query: "SELECT * FROM `tasks` ORDER BY `executor`");
            } elseif ($selectOption == 'select__status') {
                $tasks = mysqli_query($connect, query: "SELECT * FROM `tasks` ORDER BY `status`");
            } elseif ($selectOption == 'select__period') {
                $tasks = mysqli_query($connect, query: "SELECT * FROM `tasks` ORDER BY `period`");
            } elseif ($selectOption == 'select__date') {
                $tasks = mysqli_query($connect, query: "SELECT * FROM `tasks` ORDER BY `date`");
            } else {
                $tasks = mysqli_query($connect, query: "SELECT * FROM `tasks`");
            }

            include('create.php');
        ?>
    </div>

    <div class="popup">
        <div class="popup__body">
            <div class="popup__content">
                <h1 class="creating-task__header">Создание задачи</h1>
                <form action="add.php" class="creating-task__form flex-column" method="post">
                    <label for="" class="creating-task__label">Название задачи</label>
                    <input type="text" placeholder="Произвольная строка" class="creating-task__name form__input" name="title" id="title">

                    <label for="description" class="creating-task__label">Описание задачи</label>
                    <textarea name="description" id="description" placeholder="Произвольная строка" class="creating-task__description form__input"></textarea>

                    <div class="creating-task__line flex">
                        <div class="flex-column">
                            <label for="executor" class="creating-task__label">Исполнитель</label>
                            <select name="executor" id="executor" class="creating-task__select">
                                <option name="Cody Fisher" value="Cody Fisher">Cody Fisher</option>
                                <option name="Jenny Wilson" value="Jenny Wilson">Jenny Wilson</option>
                                <option name="Cameron Williamson" value="Cameron Williamson">Cameron Williamson</option>
                                <option name="Alex Hernandez" value="Alex Hernandez">Alex Hernandez</option>
                            </select>
                        </div>

                        <div class="flex-column">
                            <label for="period" class="creating-task__label">Срок выполнения</label>
                            <input type="date" name="period" id="period" class="creating-task__calendar popup__calendar form__input">
                        </div>

                        <input type="hidden" name="status" id="status" value="Добавлена">

                        <button class="btns btn__discord close__popup" type="button">Discard</button>
                        <button class="btns btn__create" type="submit">Create task</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="http://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="script.js"></script>
</body>
</html>