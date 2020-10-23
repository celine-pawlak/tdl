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
    });