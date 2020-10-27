
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="ressources/script2.js"></script>
    <script src="ressources/function-index.js"></script>
    <link rel="stylesheet" href="ressources/style.css">
    <title>To Do List</title>
</head>
<body id="body_index">
    <header id="header_index">
        <?php include 'Views/header.php';
            // if(isset($_SESSION['user']))
            //     {
            //         header('Location:todolist.php ');
            //     } 
        ?>         
    </header>
    <main id="main_index">
        <h1>Bienvenu sur To Do List</h1>
        <section>
            <button id="inscription">Inscription</button>
            <button id="connexion">Connexion</button>
        </section>
    </main>
    <footer>
        <?php include 'Views/footer.php' ?>
    </footer>
</body>
</html>