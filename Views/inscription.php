<h2>Créer un compte</h2>
<p id="info_inscription" class="info_none"></p>
<section class="form">    
    <input type="email" id="email" name="email" placeholder="Email">    
    <input type="email" id="conf_email" name="conf_email" placeholder="Confirmer l'email">    
    <input type="password" id="password" name="password" placeholder="Mot de passe">    
    <input type="password" id="conf_password" name="conf_password" placeholder="Confirmer le mot de passe">    
    <input type="text" id="username" name="username" placeholder="Username">
    <p id="erreur_insc"></p>
    <button id="valid_insc">Inscription</button> 
    <small>Vous avez déjà un compte ? => <span id="con_insc">Connectez-vous</span></small> 
    
</section>

<script >var url = "ressources/inscription.js";
$.getScript(url)</script>       


