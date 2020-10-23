<?php session_start(); 

if(isset($_SESSION['user']))
    {
        ?>
        <nav id="nav-header">    
            <p id="header_acc">Accueil</p>   
            <button id="header_deco"><img src="ressources/images/deco.png" alt="logo déconnexion" /></button>
        </nav>
        <?php
    }
else
    {
        ?>
        <nav id="nav-header">    
            <p id="header_acc">Accueil</p>
            <p id="header_insc">Inscription</p>
            <p id="header_con">Connexion</p>    
        </nav>
        <?php
    }
?>
<script >var url = "ressources/header.js";
$.getScript(url)</script>     
