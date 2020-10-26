function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function isComplete(task) {
    if (task == 1) {
        return 'checked';
    }
    if (task == 0) {
        return ''
    }
}

function tasks(tasks=[]){
    if (tasks){
        for (let i=0; i<tasks.length; i++){
// ECRIS TES ETAPES
        }
    }
}

function addList() {
    $.ajax({
        url: 'views/todolistAddList.php',
        method: "GET",
        dataType: "html",
        success: (data) => {
            $("#disconnect_button").remove();
            $('#contenu-to_do_list').html(data);
            $('#header').append(
                "<button id=\"home_button\" class=\"absolute absolute-left ml-1 my-auto border-black clickable\"><i\n" +
                "                    class=\"fas fa-arrow-circle-left icon\"></i></button>"
            )
            $('#header').append(
                "<button id=\"see_users\" class=\"absolute absolute-right mr-1 my-auto border-black clickable\">" +
                "<i class=\"fas fa-ellipsis-v\"></i></button>"
            )
            $('#header_titre').html("<input placeholder='Titre'>");
            $('#contenu-to_do_list').append("<input class='input_task' type='text' placeholder='Tâche à effectuer...'>");
            $('#home_button').click(function () {
                home();
                $("#home_button").remove();
                $("#see_users").remove();
            })

        }
    });

    $.ajax({
        url: 'API/todolistAPI.php?param=addList',
        method: "POST",
        dataType: "json",
        success: (data) => {

        }
    });
}

function home() {
    $("#header").append("<button id=\"disconnect_button\" class=\"absolute absolute-right mr-1 my-auto border-black clickable\"><i\n" +
        "class=\"fas fa-sign-out-alt icon\"></i></button>");
    $.ajax({
        url: 'views/todolistHome.php',
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
            $('#header_titre').html('Bonjour, ' + capitalizeFirstLetter(data.user.username));
            for (let i = 0; i < data.lists.length; i++) {
                let date = new Date(data.lists[i].date);
                let month = date.getMonth() + 1;
                let tasks = '';
                for (let j = 0; j < data.tasks.length; j++) {
                    if (data.tasks[j].name) {
                        tasks += "<li class=\"my-05\">\n" +
                            "    <div class=\"flex flex-row justify-between\" >\n" +
                            "        <label for=" + "task" + data.tasks[j].idTask + ">" + data.tasks[j].name + "</label>\n" +
                            "        <input type=\"checkbox\" id=" + "task" + data.tasks[j].idTask + " name=" + "task" + data.tasks[j].idTask + " " + isComplete(data.tasks[j].complete) + " disabled >\n" +
                            "    </div>\n" +
                            "</li>";
                    }
                }
                $('#add_list').after("<section id=" + "list" + data.lists[i].idList + " class=\"list-container box-shadow clickable flex flex-column m-1 list-user\">\n" +
                    "            <article class=\"p-05 h-100 flex flex-column\">\n" +
                    "                <div class=\"flex flex-row justify-between\">\n" +
                    "                    <h2>" + data.lists[i].name + "</h2>\n" +
                    "                    <p>" + date.getDate() + '/' + month + '/' + date.getFullYear() + "</p>\n" +
                    "                </div>\n" +
                    "                <ul class=\"flex flex-column h-100\">\n" +
                    tasks +
                    "                </ul>\n" +
                    "            </article>\n" +
                    "        </section>");
            }
            $('#add_list').click(function () {
                addList();
            });
            $('.list-user').click(function () {
                console.log(this.id);
            });
        }
    });
}

$(function () {
    home();


})
;