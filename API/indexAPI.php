<?php
require '../Database/Database.php';
$db = new Database('tdl');
$pdo = $db->getPDO();
/*var_dump($pdo->query("SELECT * FROM user")->fetchAll());*/
