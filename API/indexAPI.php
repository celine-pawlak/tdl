<?php

session_start();
require '../Database/Database.php';
$db = new Database('tdl');
$pdo = $db->getPDO();
// Partie inscription
if ($_POST['page'] == 'inscription') {
    if (isset($_POST['email'], $_POST['conf_email'], $_POST['username'], $_POST['password'], $_POST['conf_password']) && !empty($_POST['email']) && !empty($_POST['conf_email']) && !empty($_POST['password']) && !empty($_POST['username']) && !empty($_POST['conf_password'])) {
        // Déclaration des variables
        $email = $_POST['email'];
        $conf_mail = $_POST['conf_email'];
        $password = $_POST['password'];
        $conf_password = $_POST['conf_password'];
        $username = htmlspecialchars($_POST['username']);
        $errors = [];

        $req = $pdo->prepare("SELECT * FROM user WHERE mail=?");
        $req->execute([$email]);
        $isUser = $req->fetchAll();

        // Vérifie que le mail soit au bon format et que les mails soient les mêmes
        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !preg_match('/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/', $email)) {
            array_push($errors, 'Le mail n\'est pas au bon format');
        }
        if ($email != $conf_mail) {
            array_push($errors, 'Les mails sont différents');
        }
        if (!empty($isUser)) {
            array_push($errors, 'Cet email est déjà lié à un compte');
        }
        if(!preg_match('/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,30})$/', $password))
            {
                array_push($errors, "Le mail n'est pas suffisament sécurisé");
            }
        if ($password != $conf_password) {
            array_push($errors, 'Les mots de passe sont différents');
        }

        if (empty($errors)) {
            $pass_hash = password_hash($password, PASSWORD_BCRYPT);
            $insertUser = $pdo->prepare('INSERT INTO user (mail, username, password) VALUES (?,?,?)');
            $insertUser->execute([$email, $username, $pass_hash]);

            echo 'connexion';
        } else {
            echo json_encode($errors);
        }
    } else {
        $errors = [];
        array_push($errors, 'Veuillez remplir tous les champs');
        echo json_encode($errors);
    }
}
// Partie connexion
if ($_POST['page'] == 'connexion') {
    if (isset($_POST['email_con'], $_POST['password_con']) && !empty($_POST['email_con']) && !empty($_POST['password_con'])) {
        $email_con = $_POST['email_con'];
        $password_con = $_POST['password_con'];
        $errors_con = [];

        $req = $pdo->prepare("SELECT * FROM user WHERE mail=?");
        $req->execute([$email_con]);
        $isRegister = $req->fetch();

        if (!password_verify($password_con, $isRegister['password']) || empty($isRegister)) {
            array_push($errors_con, 'Email ou Mot de passe incorrect');
        }
        if (empty($errors_con)) {
            $_SESSION['user'] = $isRegister;

            echo 'connecter';
        } else {
            echo json_encode($errors_con);
        }
    } else {
        $errors = [];
        array_push($errors, 'Veuillez remplir tous les champs');
        echo json_encode($errors);
    }
}
// Déconnexion
if ($_POST['page'] == 'deconnexion') {
    session_destroy();
    echo 'deconnecter';
}
// Requête pour voir si l'username ou le mail sont dans la bdd
if ($_POST['page'] == 'logged') {
    if (isset($_POST['username'])) {
        $username = $_POST['username'];
        $req = $pdo->prepare("SELECT username FROM user WHERE username=?");
        $req->execute([$username]);
        $isRegister = $req->fetch();
        $errors_con = [];

        if (empty($isRegister)) {
            echo 'dispo';
        } else {
            array_push($errors_con, 'Ce login est déjà prit');
            echo json_encode($errors_con);
        }
    }
}
?>