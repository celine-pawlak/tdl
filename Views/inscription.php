<h2 class="text-center">Créez votre compte</h2>
<p id="info_inscription" class="info_none"></p>   

<aside id="info_password" class="info_none">
    Le mot de passe doit contenir au moins 8 caractères, dont :    
    <ul>    
        <li>1 Majuscule</li>
        <li>1 minuscule</li>
        <li>1 chiffre</li>
        <li>1 caractère spècial (-+!*$@%_)</li>
    </ul>
</aside>

<section class="form">    
    <input type="email" id="email" name="email" placeholder="Email">    
    <input type="email" id="conf_email" name="conf_email" placeholder="Confirmer l'email">    
    <input type="password" id="password" name="password" placeholder="Mot de passe">          
    <input type="password" id="conf_password" name="conf_password" placeholder="Confirmer le mot de passe">    
    <input type="text" id="username" name="username" placeholder="Username">
    <p id="erreur_insc"></p>    
    <button class="clickable button m-1" id="valid_insc">Inscription</button>
    <small class="text-center">Vous avez déjà un compte ? <i class="fas fa-arrow-right"></i> <span class="clickable green-color" id="con_insc">Connectez-vous</span></small>
</section>



<script >var url = "ressources/inscription.js";
$.getScript(url)</script>       


