function timerRedirect(p, b)
    {
        setTimeout(function()
            {
                $.ajax(
                    {
                        url : p+'.php',
                        type : 'POST',
                        success : (data)=>
                            {
                                $(b).html(data);                                                                                                                                                   
                            }
                    });
            }, 2500);
    }

function htmlRewrite(p, b)
    {
        $.ajax(
            {
                url : p+'.php',
                type : 'POST',
                success : (data)=>
                    {
                        $(b).html(data);                                    
                    }
            });
    }