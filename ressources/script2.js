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
                            }
                    });
            });
        
    });