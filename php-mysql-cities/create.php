<?php
    $cities = mysqli_query($connect, query: "SELECT * FROM `cities`");
    $cities = mysqli_fetch_all($cities);
    foreach ($cities as $cities) {
        echo '
        <tr>
            <td>' . $cities[0] . '</td>
            <td>' . $cities[1] . '</td>
            <td>' . $cities[2] . '</td>
            <td>' . $cities[3] . '</td>
        </tr>
        ';
    }
?>