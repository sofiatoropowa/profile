<?php

require_once 'config/connect.php';

$title = $_POST['title'];
$executor = $_POST['executor'];
$description = $_POST['description'];
$period = date($_POST['period']);
$status = $_POST['status'];

mysqli_query($connect, query: "INSERT INTO `tasks` (`title`, `executor`, `description`, `period`, `date`, `status`) VALUES ('$title', '$executor', '$description', '$period', default, '$status')");

header('Location: /');
?>