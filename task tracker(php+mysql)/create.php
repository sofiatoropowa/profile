<?php

    $tasks = mysqli_fetch_all($tasks);

    function render_status_list($db_status){

        $options = array( 
            ['Добавлена', 'select__add'],
            ['В работе', 'select__work'],
            ['Завершена', 'select__completed'],
        );

        $list_html = "";

        foreach ($options as [$name, $value]) {
            if ($db_status == $name) {
                if ($name == 'Завершена') {
                    return "<select name='status' id='selection__status' class='selection__status creating-task__select' disabled><option selected value=$value>$name</option></select>";
                } else {
                    $list_html .= "<option selected value=$value>$name</option>'";
                }
            } else {
                $list_html .= "<option value=$value>$name</option>'";
            }
        };

        return "<select name='status' id='selection__status' class='selection__status creating-task__select'>$list_html</select>";
    }

    foreach ($tasks as $task) {

        echo '
        <div class="task-card">
            <div class="user-info">
                <img src="https://ui-avatars.com/api/?size=96&name='. $task[2] .'&background=random&color=fff&rounded=true" class="user-info-avatar center-block" id="avatar">
                <div class="user-info-name" id="name">' . $task[2] . '</div>
            </div>
            <button id="open__menu" class="open__menu">
                <img class="task-card__function" src="img/Primary fill.svg">
            </button>
            <button id="delete__task" class="delete__task hidden">
                <a href="delete.php?id=' . $task[0] . '">Удалить</a>
            </button>
            <h2 class="task-card__title">' . $task[1] . '</h2>
            <p class="task-card__text">' . $task[3] . '</p>
            <div class="task-card__link">
                <div class="text-card__status">
                    <form action="update.php" method="post" class="status__form flex">
                        <input type="hidden" name="id" value="'. $task[0] .'">
                        <div class="flex-column">
                            <label for="status" class="creating-task__label">Статус задачи</label>
                            ' . render_status_list($task[6]) .'
                        </div>
                        <div class="task-card__dates">
                            <div class="task-card__period flex-column">
                                <label for="calendar__period" class="creating-task__label">Срок выполнения</label>
                                <input type="date" value="'. $task[4] .'" name="calendar__period" id="calendar__period" class="creating-task__calendar form__input" disabled>
                            </div>
                            <div class="flex-column">
                                <label for="calendar__date" class="creating-task__label">Дата выполнения</label>
                                <input type="date" value="'. $task[5] .'" name="calendar__date" id="calendar__date" class="creating-task__calendar form__input calendar__date" readonly>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        ';
    };

?>

