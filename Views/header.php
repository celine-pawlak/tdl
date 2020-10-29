<?php session_start(); 

if(isset($_SESSION['user']))
    {
        ?>
        <nav id="nav-header" class="max-width-900px mx-auto flex flex-row align-center justify-center h-100 relative">
            <p class="bouton-header" id="header_acc">Accueil</p>
            <p class="bouton-header" id="header_deco"><img src="ressources/images/deco.png" alt="logo déconnexion" /></p>
        </nav>
        <?php
    }
else
    {
        ?>
        <nav id="nav-header" class="max-width-900px mx-auto flex flex-row align-center justify-center h-100 relative">
            <p class="bouton-header border-bottom-green background-light-green" id="header_acc">Accueil</p>
            <p class="bouton-header" id="header_insc">Inscription</p>
            <p class="bouton-header" id="header_con">Connexion</p>    
        </nav>
        <?php
    }
?>
<script >var url = "ressources/header.js";
$.getScript(url)</script>     
