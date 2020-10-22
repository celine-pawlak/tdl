$(function()
    {        
        $('#inscription').click(function()
            {
                $.ajax(
                    {
                        url : 'Views/inscription.php',
                        type : 'POST',
                        success : (data)=>
                            {
                                // Ré-écrit le main avec la page incsription
                                $('#main_index').html(data);                
                                // Vérifier que le mail de confirmation correspondent au mail  
                                // Vérifier que le password correspondent à un regex
                                // Vérifier que les champs ne soient pas vide
                                $('#valid_insc').click(function()
                                    {

                                    });
                            }
                    });
            });

            $('#connexion').click(function()
            {
                $.ajax(
                    {
                        url : 'Views/connexion.php',
                        type : 'POST',
                        success : (data)=>
                            {
                                $('#main_index').html(data);
                                $('#valid_insc').click(function()
                                    {

                                    });
                            }
                    });
            });
        
    });