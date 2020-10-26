<?php

require '../Database/Database.php';
$db = new Database('tdl');
$pdo = $db->getPDO();
/*var_dump($pdo->query("SELECT * FROM list LEFT JOIN user_list ON idList = list_idList WHERE user_idUser = 1")->fetchAll());*/

// CHANGER ID PLUS TARD QUAND $_SESSION SERA FAIT

if (isset($_GET['param']) and $_GET['param'] == 'home') {
    //Query for lists
    $user = $pdo->query("SELECT username, mail FROM user WHERE idUser = 1 ")->fetch();
    //Query for user
    $lists = $pdo->query(
        "SELECT *
        FROM list
        LEFT JOIN user_list
        ON idList = list_idList
        LEFT JOIN user
        ON idUser = user_idUser
        WHERE user_idUser = 1"
    )->fetchAll();
    //Query for tasks
    $tasks = $pdo->query(
        "SELECT task.idTask, task.name, task.date, task.complete, task.list_idList
    FROM task
    LEFT JOIN list on task.list_idList = list.idList
    LEFT JOIN user_list on list.idList = user_list.list_idList
    LEFT JOIN user on user_list.user_idUser = user.idUser
    WHERE user.idUser = 1
    LIMIT 4"
    )->fetchAll();
    $data = array();
    $data['user'] = $user;
    $data['lists'] = $lists;
    $data['tasks'] = $tasks;
    echo json_encode($data);
}
if (isset($_GET['param']) and $_GET['param'] == 'addList') {

}
