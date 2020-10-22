<?php
    require '../Database/Database.php';
    $db = new Database('tdl');
    $pdo = $db->getPDO();

    var_dump($pdo->query("SELECT * FROM user")->fetchAll());
    $email = 'test';
    $req = $pdo->prepare("SELECT * FROM user WHERE mail=?");    
    $req->execute([$email]);
    $isUser = $req->fetchAll();
    
    if($_POST['inscription'] == true && isset($_POST['email'], $_POST['conf_email'], $_POST['username'], $_POST['password']))            
        {
            // Déclaration des variables
            $email = $_POST['email'];
            $conf_mail = $_POST['conf_email'];
            $password = $_POST['password'];
            $username = $_POST['username'];
            $errors = [];

            $req = $pdo->prepare("SELECT * FROM user WHERE mail=?");    
            $req->execute([$email]);
            $isUser = $req->fetchAll();
            
            // Vérifie que le mail soit au bon format et que les mails soient les mêmes
            if(!filter_var($email, FILTER_VALIDATE_EMAIL) || $email!=$conf_mail)
                {
                    array_push($errors, 'Le mail n\'est pas au bon format, les mails sont différents');
                }     
            if(!empty($isUser))   
                {
                    array_push($errors, 'Cet email est déjà lié à un compte');
                }
            
            if(empty($errors))
                {
                    $pass_hash = password_hash($password, PASSWORD_BCRYPT);
                    $insertUser = $pdo->prepare('INSERT INTO user (mail, username, password) VALUES (?,?,?)');
                    $insertUser->execute([$email, $username, $pass_hash]);
                    echo 'connexion';
                }
            else
                {
                    echo json_encode($errors);
                }
        }
?>