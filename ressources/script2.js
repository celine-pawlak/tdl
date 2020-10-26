$(function()
    {              
        $('#inscription').click(function()
            {
                htmlRewrite('Views/inscription', '#main_index');
            });

        $('#connexion').click(function()
            {
                htmlRewrite('Views/connexion', '#main_index');
            });   
               
    });