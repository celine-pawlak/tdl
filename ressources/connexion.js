$(function()
    {
        $('#insc_con').click(function()
            {
                $.ajax(
                    {
                        url : 'Views/inscription.php',
                        type : 'POST',
                        success : (data)=>
                            {
                                $('#main_index').html(data);                                   
                            }
                    });
            });
    });