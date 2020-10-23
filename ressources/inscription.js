$(function()
    {       
        // Vérifie que le mail soit au format mail
        $('#email').keyup(function()
            {
                regexMailValide(this, 'nop', 'yep');
                
            });            
        // Vérifie que le mail de confirmation == mail 
        $('#conf_email').keyup(function()
            {
                console.log(this.value);
                if(this.value !== document.getElementById("email").value)
                    {
                        document.getElementById("conf_email").className = "nop";                        
                    }
                else  
                    {console.log('toto');
                        document.getElementById("conf_email").className = "yep";                        
                    }       
            });
        // Vérifie que le mot de passe soit fort
        $('#password').keyup(function()
            {
                regexPasswordValide(this, 'nop', 'yep')
            });
        // Affiche le formulaire de connexion
        $('#con_insc').click(function()
            {
                htmlRewrite('Views/connexion', '#main_index');
            });
        $('#valid_insc').click(function()
            {                                       
                $('#erreur_insc').html(''); 
                // Mettre tous les inputs et si ok faire traitement
                if($('#email').hasClass('yep'))                             
                    {
                        console.log('Zé parti');
                    }                                          
                // Envoie les informations pour traitement                                    
                if(($('#email').val() != "" || $('#email').val() != null) && ($('#password').val() != "" || $('#password').val() != null) && ($('#username').val() != "" || $('#username').val() != null) && ($('#conf_email').val() != "" || $('#conf_email').val() != null) && ($('#conf_password').val() != '' || $('#conf_password') != null))
                    {
                        var email = $('#email').val();
                        var conf_email = $('#conf_email').val();
                        var password = $('#password').val();
                        var username = $('#username').val();    
                        var conf_password = $('#conf_password').val();

                        $.ajax(
                            {
                                url : 'API/indexAPI.php',
                                type : 'POST',
                                data: {email : email, conf_email: conf_email, password : password, username : username, conf_password : conf_password, page : 'inscription'},
                                success : (data)=>
                                    {                                        
                                        if(data==='connexion')
                                            {
                                                $('#info_inscription').removeClass('info_none').addClass('info_flex');
                                                $('#info_inscription').html('Inscription prise en compte, veuillez patienter..');                                                
                                                timerRedirect('Views/connexion', '#main_index');
                                            }
                                        else
                                            {
                                                var error = JSON.parse(data);
                                                console.log(error);
                                                for(let i = 0; i < error.length; i++)
                                                    {                                                        
                                                        $('#erreur_insc').append(error[i]+'<br/>');
                                                    }
                                            }
                                    }
                            });
                    }
            });
    });