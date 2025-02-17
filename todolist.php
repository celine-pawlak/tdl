<?php session_start(); 
if(!isset($_SESSION['user']))
{
    header('Location:index.php ');
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <!--<link rel="icon" type="image/png" href="#" />  LOGO A AJOUTER  -->

    <!--Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap" rel="stylesheet">

    <!-- Font Awesome icons -->
    <script src="https://kit.fontawesome.com/68f3afb94b.js" crossorigin="anonymous"></script>

    <!-- CSS -->
    <link rel="stylesheet" href="ressources/style.css">

    <!-- Js & Jquery -->
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="ressources/script.js"></script>       
</head>
<body class="relative">
<header class="height-5vh box-shadow">
    <div id="header" class="max-width-900px mx-auto flex flex-row align-center justify-center h-100 relative">
        <h1 class="flex" id="header_titre"></h1>
    </div>   
</header>
<main id="main-to_do_list">
    <article id="contenu-to_do_list" class="max-width-900px mx-auto flex flex-row box-shadow h-min90vh background-white-ghost">
    </article>
</main>
<footer class="box-shadow flex flex-row align-center">
    <?php
    include 'Views/footer.php' ?>
</footer>
</body>
</html>