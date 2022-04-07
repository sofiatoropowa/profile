<?php

require_once 'config/connect.php';

$city = $_POST['city'];
$country = $_POST['country'];
$description = $_POST['description'];

mysqli_query($connect, query: "INSERT INTO `cities` (`id`, `City`, `Country`, `Description`) VALUES (NULL, '$city', '$country', '$description')");

header('Location: /');

?>