<?php session_start(); 

if(isset($_SESSION['user']))
    {
        ?>
        <nav id="nav-header">    
            <p class="bouton-header" id="header_acc">Accueil</p>   
            <button class="bouton-header" id="header_deco"><img src="ressources/images/deco.png" alt="logo déconnexion" /></button>
        </nav>
        <?php
    }
else
    {
        ?>
        <nav id="nav-header">    
            <p class="bouton-header" id="header_acc">Accueil</p>
            <button class="bouton-header" id="header_insc">Inscription</button>
            <button class="bouton-header" id="header_con">Connexion</button>    
        </nav>
        <?php
    }
?>
<script >var url = "ressources/header.js";
$.getScript(url)</script>     
