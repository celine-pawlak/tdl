$(function () {
    $.ajax({
        url: 'views/todolistView.php',
        method: "GET",
        dataType: "html",
        success: (data) => {
            $('#contenu-to_do_list').html(data);
        }
    });
    $.ajax({
        url: 'API/todolistAPI.php?param=home',
        method: "GET",
        dataType: "json",
        success: (data) => {

            console.log(data);
            $('#header_bonjour').html('Bonjour'+data.username);
        }
    });
});