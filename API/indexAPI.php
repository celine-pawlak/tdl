<?php
    require '../Database/Database.php';
    $db = new Database('tdl');
    $pdo = $db->getPDO();
    
    if($_POST['inscription'] == true && isset($_POST['email'], $_POST['conf_email'], $_POST['username'], $_POST['password'], $_POST['conf_password']) && !empty($_POST['email']) && !empty($_POST['conf_email']) && !empty($_POST['password']) && !empty($_POST['username']) && !empty($_POST['conf_password']))            
        {
            // Déclaration des variables
            $email = $_POST['email'];
            $conf_mail = $_POST['conf_email'];
            $password = $_POST['password'];
            $conf_password = $_POST['conf_password'];
            $username = $_POST['username'];
            $errors = [];

            $req = $pdo->prepare("SELECT * FROM user WHERE mail=?");    
            $req->execute([$email]);
            $isUser = $req->fetchAll();
            
            // Vérifie que le mail soit au bon format et que les mails soient les mêmes
            if(!filter_var($email, FILTER_VALIDATE_EMAIL) || $email!=$conf_mail)
                {
                    array_push($errors, 'Le mail n\'est pas au bon format');
                }   
            if($email!=$conf_mail)  
                {
                    array_push($errors, 'Les mails sont différents');  
                }
            if(!empty($isUser))   
                {
                    array_push($errors, 'Cet email est déjà lié à un compte');
                }
            if($password != $conf_password)
                {
                    array_push($errors, 'Les mots de passe sont différents');
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
    else
        {
            $errors = [];
            array_push($errors, 'Veuillez remplir tous les champs');
            echo json_encode($errors);
        }
?>