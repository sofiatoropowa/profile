<?php

require_once 'config/connect.php';

$id = $_POST['id'];
$date = date($_POST['calendar__date']);

if ($_POST['status'] == 'select__completed') {
    $status = 'Завершена';
} else if ($_POST['status'] == 'select__work') {
    $status = 'В работе';
} else {
    $status = 'Добавлена';
};

mysqli_query($connect, query: "UPDATE `tasks` SET `date` = '$date', `status` = '$status' WHERE `tasks`.`id` = '$id' ");

header('Location: /');

?>