<?php
session_start();
require '../Database/Database.php';
$db = new Database('tdl');
$pdo = $db->getPDO();
$id_user = $_SESSION['user']['idUser'];

if (isset($_GET['param']) and $_GET['param'] == 'home') {
    //Query for lists
    $user = $pdo->prepare("SELECT username, mail FROM user WHERE idUser = ? ");
    $user->execute([$id_user]);
    //Query for user
    $lists = $pdo->prepare(
        "SELECT *
        FROM list
        LEFT JOIN user_list
        ON idList = list_idList
        LEFT JOIN user
        ON idUser = user_idUser
        WHERE user_idUser = ?"
    );
    $lists->execute([$id_user]);
    //Query for tasks
    $tasks = $pdo->prepare(
        "SELECT task.idTask, task.name, task.date, task.complete, task.list_idList
    FROM task
    LEFT JOIN list on task.list_idList = list.idList
    LEFT JOIN user_list on list.idList = user_list.list_idList
    LEFT JOIN user on user_list.user_idUser = user.idUser
    WHERE user.idUser = ?"
    );
    $tasks->execute([$id_user]);
    $data = array();
    $data['user'] = $user->fetch();
    $data['lists'] = $lists->fetchAll();
    $data['tasks'] = $tasks->fetchAll();
    echo json_encode($data);
}
if (isset($_GET['param']) and $_GET['param'] == 'NewList') {
    $nom_liste = $_POST['listName'];
    $req1 = $pdo->prepare("INSERT INTO list (name, user_idUserAdmin) VALUES (?,?)");
    $req1->execute([$nom_liste, $id_user]);
    $id_list = $pdo->lastInsertId();
    $req2 = $pdo->prepare("INSERT INTO user_list (user_idUser, list_idList) VALUES (?,?)");
    $req2->execute([$id_user, $id_list]);
    echo json_encode($id_list);
}
if (isset($_GET['param']) and $_GET['param'] == 'GetList') {
    $id_list = $_POST['id'];
    $tasks = $pdo->prepare(
        "SELECT task.idTask, task.name as taskName, task.date as taskDate, task.complete as taskComplete, list.name as listName, list.date as listDate, list.user_idUserAdmin as idList
        FROM task
        LEFT JOIN list ON task.list_idList = list.idList
        WHERE task.list_idList = ?"
    );
    $tasks->execute([$id_list]);
    $list = $pdo->prepare(
        "SELECT *
        FROM list
        WHERE idList = ?"
    );
    $list->execute([$id_list]);
    $data = array();
    $data['tasks'] = $tasks->fetchAll();
    $data['listFromTask'] = $list->fetch();
    echo json_encode($data);
}
if (isset($_GET['param']) and $_GET['param'] == 'updateTask') {
    $id_task = $_POST['id'];
    $name_update = $_POST['name'];
    $req7 = $pdo->prepare("UPDATE task SET name=? WHERE idTask=?");
    $req7->execute([$name_update, $id_task]);
}
if (isset($_GET['param']) and $_GET['param'] == 'updateList') {
    $idList = $_POST['id'];
    $update_nom = $_POST['name'];
    $req3 = $pdo->prepare("UPDATE list SET name=? WHERE idList=?");
    $req3->execute([$update_nom, $idList]);
}
if (isset($_GET['param']) and $_GET['param'] == 'deleteTask') {
    $id_task = $_POST['id'];
    $req5 = $pdo->prepare("DELETE FROM task WHERE idTask = ?");
    $req5->execute([$id_task]);
    echo json_encode($id_task);
}

if (isset($_GET['param']) and $_GET['param'] == 'updateStatusTask') {
    $id_task = $_POST['id'];
    $status_task = $_POST['status'];
    $req6 = $pdo->prepare("UPDATE task SET complete=? WHERE idTask=?");
    $req6->execute([$status_task, $id_task]);
}

// Ajoute une tâche à la liste 

if (isset($_GET['param']) && $_GET['param'] == 'addtask') {
    $id_list = $_POST['id'];
    $tache = $_POST['name'];
    $requete = $pdo->prepare("INSERT INTO task (name, list_idList) VALUES (?,?)");
    $requete->execute([$tache, $id_list]);

    $last_id_task = $pdo->lastInsertId();
    $requetebis = $pdo->prepare("SELECT * FROM task WHERE idTask = ?");
    $requetebis->execute([$last_id_task]);
    echo json_encode($requetebis->fetch());
}

