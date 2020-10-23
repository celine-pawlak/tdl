$(function()
    {
        $('#header_deco').click(function()
            {
                $.ajax(
                    {
                        url : 'API/indexAPI.php',
                        type : 'POST',
                        data : {deconnexion : true, page : 'deconnexion'},
                        success : (data) =>
                            {
                                if(data=='deconnecter')
                                    {
                                        window.location.href = 'index.php';
                                    }
                            }
                    });
            });     
        $('#header_acc').click(function()
            {
                window.location.href = 'index.php';
            });
        $('#header_insc').click(function()
            {
                htmlRewrite('Views/inscription', '#main_index');
            });
        $('#header_con').click(function()
            {
                htmlRewrite('Views/connexion', '#main_index');
            });
    });