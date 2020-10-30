$(function () {
    $('#header_deco').click(function () {
        $.ajax(
            {
                url: 'API/indexAPI.php',
                type: 'POST',
                data: {deconnexion: true, page: 'deconnexion'},
                success: (data) => {
                    if (data == 'deconnecter') {
                        window.location.href = 'index.php';
                    }
                }
            });
    });
   
    $('#header_acc').click(function () {
        window.location.href = 'index.php';
    });
    $('#header_insc').click(function () {
        $('#header_acc').removeClass('border-bottom-green background-light-green');
        $('#header_con').removeClass('border-bottom-green background-light-green');
        $('#header_insc').addClass('border-bottom-green background-light-green');
        htmlRewrite('Views/inscription', '#main_index');
    });
    $('#header_con').click(function () {
        $('#header_acc').removeClass('border-bottom-green background-light-green');
        $('#header_insc').removeClass('border-bottom-green background-light-green');
        $('#header_con').addClass('border-bottom-green background-light-green');
        htmlRewrite('Views/connexion', '#main_index');
    });
});