$(function()
    {
        $('#valid_insc').click(function()
            {                       
                // Vérifier que le mail de confirmation correspondent au mail  
                // Vérifier que le password correspondent à un regex
                // Vérifier que les champs ne soient pas vide
                // Envoie les informations pour traitement                                    
                if(($('#email').val() != "" || $('#email').val() != null) && ($('#password').val() != "" || $('#password').val() != null) && ($('#username').val() != "" || $('#username').val() != null) && ($('#conf_email').val() != "" || $('#conf_email').val() != null))
                    {
                        var email = $('#email').val();
                        var conf_email = $('#conf_email').val();
                        var password = $('#password').val();
                        var username = $('#username').val();

                        $.ajax(
                            {
                                url : 'API/indexAPI.php',
                                type : 'POST',
                                data: {email : email, conf_email: conf_email, password : password, username, username, inscription : true},
                                success : (data)=>
                                    {
                                        console.log(data);
                                    }
                            });
                    }
            });
    });