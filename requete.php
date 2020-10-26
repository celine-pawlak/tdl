<?php
    require 'Database/Database.php';
    $db = new Database('tdl');
    $pdo = $db->getPDO();  

    // -------------------- Listes -------------------------------

    // Insert nouvelle liste | colonne date dans bdd en cuurent time stampt en valeur par défaut
    // $nom_liste = 'test';
    // $id_user = 43;
    // $req1 = $pdo->prepare("INSERT INTO list (name, user_idUserAdmin) VALUES (?,?)");    
    // $req1->execute([$nom_liste, $id_user]);
    
    // Supprime une liste
    // $idList = 3;
    // $req2 = $pdo->prepare("DELETE FROM list WHERE idList = ?");    
    // $req2->execute([$idList]);
    
    // Update list
    // $update_nom = 'toto';
    // $req3 = $pdo->prepare("UPDATE list SET name=? WHERE idList=?");    
    // $req3->execute([$update_nom, $idList]);

    // ------------------ Tâches ---------------------------------

    // Insert nouvelle tâche | colonne date dans bdd en cuurent time stampt en valeur par défaut
    // $task_name = 'plop';
    // $id_list = 4;
    // $req4 = $pdo->prepare("INSERT INTO task (name, list_idList) VALUES (?,?)");    
    // $req4->execute([$task_name, $id_list]);

    // Supprime la tâche
    // $idTask = 1;
    // $req5 = $pdo->prepare("DELETE FROM task WHERE idtask = ?");    
    // $req5->execute([$idTask]);

    // Update le complete de la tâche
    // $complete = 1;
    // $idTask = 3;
    // $req6 = $pdo->prepare("UPDATE task SET complete=? WHERE idTask=?");    
    // $req6->execute([$complete, $idTask]);

    // Updata le nom de la tâche
    // $name_update = 'tâche test';
    // $idTask = 3;
    // $req7 = $pdo->prepare("UPDATE task SET name=? WHERE idTask=?");    
    // $req7->execute([$name_update, $idTask]);
?>