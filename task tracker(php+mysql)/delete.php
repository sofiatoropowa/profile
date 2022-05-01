<?php

require_once 'config/connect.php';

$id = $_GET['id'];

mysqli_query($connect, query: "DELETE FROM `tasks` WHERE `tasks`.`id` = '$id'");

header('Location: /');
?>