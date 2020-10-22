<h2>Créer un compte</h2>
<section class="form">
    <!-- <label for="email">Email :</label> -->
    <input type="email" id="email" name="email" placeholder="Email">
    <!-- <label for="conf_email">Confirmer l'email :</label> -->
    <input type="email" id="conf_email" name="conf_email" placeholder="Confirmer l'email">
    <!-- <label for="password">Mot de passe :</label> -->
    <input type="password" id="password" name="password" placeholder="Mot de passe">
    <!-- <label for="conf_password">Confirmer mot de passe :</label> -->
    <input type="password" id="conf_password" name="conf_password" placeholder="Confirmer le mot de passe">
    <!-- <label for="username">Username :</label> -->
    <input type="text" id="username" name="username" placeholder="Username">
    <p id="erreur_insc"></p>
    <button id="valid_insc">Inscription</button> 
    <small>Vous avez déjà un compte ? => <span id="con_insc">Connectez-vous</span></small> 
</section>

<script >var url = "ressources/inscription.js";
$.getScript(url)</script>       

