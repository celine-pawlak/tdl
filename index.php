<?php session_start(); 
if(isset($_SESSION['user']))
{
    header('Location:todolist.php ');
}?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Font Awesome icons -->
    <script src="https://kit.fontawesome.com/68f3afb94b.js" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="ressources/script2.js"></script>
    <script src="ressources/function-index.js"></script>
    <link rel="stylesheet" href="ressources/style.css">
    <title>To Do List</title>
</head>
<body id="body_index">
<header id="header_index" class="height-5vh box-shadow z-index-4">
    <?php
    include 'Views/header.php';    
    ?>
</header>
<main>
    <article id="main_index"
             class="max-width-900px mx-auto background-white-ghost h-90vh flex flex-column justify-around align-center box-shadow">
        <h1 class="text-center">Bienvenue sur To Do List !</h1>
        <p class="mx-auto mx-1 text-center">Pour créer vos propres listes, veuillez vous connecter</p>
        <section>
            <button class="clickable button" id="inscription">Inscription</button>
            <button class="clickable button" id="connexion">Connexion</button>
        </section>
    </article>
</main>
<footer class="box-shadow flex flex-row align-center">
    <?php
    include 'Views/footer.php' ?>
</footer>
</body>
</html>