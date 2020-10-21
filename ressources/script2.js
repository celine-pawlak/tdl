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
                                $('main').html(data);

                                $('#valid_insc').click(function()
                                    {
                                        console.log('test');
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
                                $('main').html(data);
                            }
                    });
            });
        
    });