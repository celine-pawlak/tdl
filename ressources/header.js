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
        $('#header_con').click(function()
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