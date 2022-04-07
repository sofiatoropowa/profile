<?php

require_once 'config/connect.php'

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cities</title>

    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <div class="container">
        <h2 class="title">Add city to the database</h2>
        <div class="form__container">
            <form action="add.php" method="post" class="form" id="form" autocomplete="off">
                <div>
                    <label for="city" class="form__label">City</label>
                    <input type="text" autocomplete="off" placeholder="Moscow*" required="" name="city" id="city" class="modal-input">
                </div>
                <div>
                    <label for="country" class="form__label">Country</label>
                    <input type="text" autocomplete="off" placeholder="Russia*" required="" name="country" id="country" class="modal-input">
                </div>
                <div>
                    <label for="description" class="form__label">Description</label>
                    <textarea type="text" autocomplete="off" placeholder="Some interesting facts about the city*" required="" name="description" id="description" class="modal-input"></textarea>
                </div>
                <button type="submit" disabled="" class="modal-btn btn" id="btnSubmit" style="opacity: 0.4;">Add city</button>
            </form>
        </div>

        <div class="buttons">
            <button class="buttons__table show-table btn">
                Show all cities
            </button>
            <button class="buttons__table close-table btn">
                Close all cities
            </button>
        </div>

        <div id="table" class="table table-active">
            <table>
                <tr>
                    <th>№</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Information</th>
                </tr>

                <?php
                    include('create.php');
                ?>
            </table>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>