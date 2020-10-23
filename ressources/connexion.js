$(function()
    {
        $('#insc_con').click(function()
            {
                htmlRewrite('Views/inscription', '#main_index');
            });
        $('#valid_con').click(function()
            {
                $('#erreur_con').html('');

                if(($('#email_con').val() != '' || $('#email_con').val() != null) && ($('#password_con').val() != '' || $('#password_con').val() != null))
                    {
                        var email = $('#email_con').val();
                        var password = $('#password_con').val();

                        $.ajax(
                            {
                                url : 'API/indexAPI.php',
                                type : 'POST',
                                data : {email_con : email, password_con : password, page : 'connexion'},
                                success : (data) =>
                                    {                                        
                                        if(data=='connecter')                                   
                                            {
                                                window.location.href = 'todolist.php';
                                            }
                                        else
                                            {
                                                var error = JSON.parse(data);
                                                console.log(error);
                                                for(let i = 0; i < error.length; i++)
                                                    {                                                        
                                                        $('#erreur_con').append(error[i]+'<br/>');
                                                    }
                                            }
                                    }
                            });
                    }
            });
        
    });