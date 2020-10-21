<?php

require '../Database/Database.php';
$db = new Database('tdl');
$pdo = $db->getPDO();
/*var_dump($pdo->query("SELECT * FROM list LEFT JOIN user_list ON idList = list_idList WHERE user_idUser = 1")->fetchAll());*/

if (isset($_GET['param']) and $_GET['param'] == 'home') {
    $user = $pdo->query("SELECT username, mail FROM user WHERE idUser = 1 ")->fetch();
    $lists = $pdo->query(
        "SELECT *
        FROM list
        LEFT JOIN user_list
        ON idList = list_idList
        LEFT JOIN user
        ON idUser = user_idUser
        WHERE user_idUser = 1"
    )->fetchAll();
    $data = array();
    $data['user'] = $user;
    $data['lists'] = $lists;
    echo json_encode($data);
}
