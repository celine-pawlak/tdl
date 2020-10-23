$(function()
    {                   
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
        $('#email').keyup(function()
            {
                var regex_mail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g;
                var valeur = $('#email').val();
                
                if(valeur.match(regex_mail))
                    {
                        $('#email').removeClass("nop").addClass("yep");
                    }
                else
                    {
                        $('#email').removeClass('yep').addClass("nop");
                    }
            });
        $('#con_insc').click(function()
            {
                $.ajax(
                    {
                        url : 'Views/connexion.php',
                        type : 'POST',
                        success : (data)=>
                            {
                                $('#main_index').html(data);                                    
                            }
                    });
            });
        $('#valid_insc').click(function()
            {                       
                $('#erreur_insc').html('');
                // Vérifier que le mail de confirmation correspondent au mail  
                $('#conf_email').change(function()
                    {
                        console.log(this.val());
                    });
                // Vérifier que le password correspondent à un regex
                // Vérifier que les champs ne soient pas vide
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
                                                setTimeout(function()
                                                    {
                                                        $.ajax(
                                                            {
                                                                url : 'Views/connexion.php',
                                                                type : 'POST',
                                                                success : (data)=>
                                                                    {
                                                                        $('#main_index').html(data);    
                                                                       
                                                                        
                                                                    }
                                                            });
                                                    }, 2500);
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