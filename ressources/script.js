function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function isComplete(taskState) {
    if (taskState == 1) {
        return 'checked';
    }
    if (taskState == 0) {
        return ''
    }
}

function taskChecked() {
    let idTask = $(this).parent().attr('id');
    if ($(this).prop('checked')) {
        var complete = 1;
        $('#input' + idTask).addClass('green-color done');
    } else {
        var complete = 0;
        $('#input' + idTask).removeClass('green-color done');
    }
    $.ajax({
        url: 'API/todolistAPI.php?param=updateStatusTask',
        method: "POST",
        data: {id: idTask, status: complete},
        dataType: "json",
        success: (data) => {

        }
    })

}

function emptyTaskDelete(input) {
    let idTask = $(input).parent().parent().attr('id');
    let taskNameValue = $(input).val();
    if (taskNameValue == '') {
        $.ajax({
            url: 'API/todolistAPI.php?param=deleteTask',
            method: "POST",
            data: {id: idTask},
            dataType: "json",
            success: (data) => {
                $('#' + data).remove();
            }
        });
    }
}

function updateTaskName() {
    let idTask = $(this).parent().parent().attr('id');
    var nameTask = $(this).val();
    $.ajax({
        url: 'API/todolistAPI.php?param=updateTask',
        method: "POST",
        data: {id: idTask, name: nameTask},
    })
}

function updateListName() {
    let idList = $(this).attr('id').substring(4);
    var nameList = $(this).val();
    $.ajax({
        url: 'API/todolistAPI.php?param=updateList',
        method: "POST",
        data: {id: idList, name: nameList},
    })
}

function isDone(taskState) {
    if (taskState == 1) {
        return 'green-color done';
    }
    if (taskState == 0) {
        return '';
    }
}

$(function () {
    home();
})

function loadTask(id, name, date, complete) {
    let taskDate = new Date(date);
    let month = taskDate.getMonth() + 1;
    let taskHtml = "<li  id='" + id + "' class='flex flex-row my-05 align-center justify-around'>" +
        "<p class='font-small mx-1 flex-grow-1-mw600'>" + taskDate.getDate() + '/' + month + '/' + taskDate.getFullYear() + "</p>" +
        "<label class='flex-grow-1' for=\"newtask-check\">" +
        "   <input id='input" + id + "' class='input_task w-90 ml-1-mw600 " + isDone(complete) + "' value='" + name + "'>" +
        "</label>" +
        "<input id='newtask-check' class='checkbox_complete' name='newtask-check' type='checkbox' " + isComplete(complete) + ">" +
        "<button class='background-white deleteTask' ><i class=\"fas fa-trash-alt\"></i></button>" +
        "</li>"
    $('#li-add_task').before(taskHtml);
}

function seeList(id) {
    let listId = id;
    //HTML
    $.ajax({
            url: 'views/todolistSeeList.php',
            method: "GET",
            dataType: "html",
            success: (data) => {
                $("#disconnect_button").remove();
                $('#contenu-to_do_list').html(data);
                $('#header').append(
                    "<button id=\"home_button\" class=\"absolute absolute-left ml-1 my-auto clickable background-white button\"><i\n" +
                    "                    class=\"fas fa-arrow-circle-left icon\"></i></button>"
                )

                $('#home_button').click(function () {
                    home();
                    $("#home_button").remove();
                })
                //DONNEES
                $.ajax({
                    url: 'API/todolistAPI.php?param=GetList',
                    method: "POST",
                    data: {id: id},
                    dataType: "json",
                    success: (data) => {
                        $('#header_titre').html("<input id=\"list" + data.listFromTask.idList + "\" name='title_list' class='no-border text-center font-big title_list' value='" + data.listFromTask.name + "'>");
                        $('#li-add_task').before("<p id='emptyList' class='text-center'>Votre liste est vide <i class=\"far fa-frown-open\"></i> ! Ajoutez une tâche...</p>");
                        for (let i = 0; i < data.tasks.length && i < 4; i++) {
                            $('#emptyList').remove();
                            loadTask(data.tasks[i].idTask, data.tasks[i].taskName, data.tasks[i].taskDate, data.tasks[i].taskComplete);
                        }
                        //si keyup sur titre
                        $('.title_list').keyup(updateListName);

                        //si keyup sur task --> update
                        $('.input_task').keyup(updateTaskName);
                        //si trash click --> suppress
                        $('.deleteTask').click(function () {
                            let idTask = $(this).parent().attr('id');
                            $.ajax({
                                url: 'API/todolistAPI.php?param=deleteTask',
                                method: "POST",
                                data: {id: idTask},
                                dataType: "json",
                                success: (data) => {
                                    $('#' + data).remove();
                                }
                            })
                        });
                        //si checkbox --> update
                        $('.checkbox_complete').click(taskChecked);
                        $('#new_task').click(function () {
                            let task_value = $('#add_task').val();
                            $.ajax(
                                {
                                    url: 'API/todolistAPI.php?param=addtask',
                                    type: 'POST',
                                    data: {name: task_value, id: listId},
                                    dataType: 'json',
                                    success: (data) => {
                                        $('#emptyList').remove();
                                        loadTask(data.idTask, data.name, data.date, data.complete);
                                        $('#add_task').val('');
                                        $('.deleteTask').click(function () {
                                            let idTask = $(this).parent().attr('id');
                                            $.ajax({
                                                url: 'API/todolistAPI.php?param=deleteTask',
                                                method: "POST",
                                                data: {id: idTask},
                                                dataType: "json",
                                                success: (data) => {
                                                    $('#' + data).remove();
                                                }
                                            })
                                        })
                                        $('.checkbox_complete').click(taskChecked);
                                    }
                                });
                        });
                        //si checkbox --> update*
                        //si checkbox 1 --> name barré
                        //si unfocus sur task et vide --> supprimer
                        $("#tasks_list").on("blur", ".input_task", function (event) {
                            emptyTaskDelete(event.currentTarget);
                        });

                    }
                })
            }
        }
    )
    ;
}

function addList() {
    //appartition bouton création
    $(document.body).append("<section id='pop-up-background' class='z-index-3 absolute flex flex-column justify-center align-center'>" +
        "<div id='pop-up-content' class='m-1 background-white p-05'>" +
        "<i class=\"fas fa-edit my-auto grey-color\"></i>" +
        "<input class='mx-1' id='new_list_title' placeholder='Titre liste'>" +
        "<button class='background-white box-shadow border-black' id='new_list'>Créer</button>" +
        "</div>" +
        "</section>");

    //gestion disparition du bouton
    var modal = document.getElementById("pop-up-background");
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.remove();
        }
    };
    //creation nouvelle liste
    $('#new_list').click(function () {
        let listName = $('#new_list_title').val();
        $.ajax({
            url: 'API/todolistAPI.php?param=NewList',
            method: "POST",
            data: {
                listName: listName,
            },
            dataType: "json",
            success: (data) => {
                modal.remove();
                seeList(data);
            }
        });
    })
}


function home() {
    //génere HTML
    $("#header").append("<button id=\"disconnect_button\" class=\"absolute absolute-right mr-1 my-auto border-black clickable button\"><i\n" +
        "class=\"fas fa-sign-out-alt icon\"></i></button>");
    $('#disconnect_button').click(function () {
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
    $.ajax({
        url: 'views/todolistHome.php',
        method: "GET",
        dataType: "html",
        success: (data) => {
            $('#contenu-to_do_list').html(data);
        }
    });
    //génère données
    $.ajax({
        url: 'API/todolistAPI.php?param=home',
        method: "GET",
        dataType: "json",
        success: (data) => {
            $('#header_titre').html('<p>Bonjour, <span class="green-color">' + capitalizeFirstLetter(data.user.username) + '</span></p>');
            for (let i = 0; i < data.lists.length; i++) {
                let date = new Date(data.lists[i].date);
                let month = date.getMonth() + 1;
                let tasks = '<p class="text-center">Votre liste est vide <i class="far fa-frown-open"></i></p>';
                for (let j = 0; j < data.tasks.length; j++) {
                    if (data.tasks[j].list_idList == data.lists[i].idList) {
                        if (data.tasks[j].name) {
                            if (tasks == '<p class="text-center">Votre liste est vide <i class="far fa-frown-open"></i></p>') {
                                tasks = '';
                            }
                            tasks += "<li class=\"my-05\">\n" +
                                "    <div class=\"flex flex-row justify-between clickable relative\" >\n" +
                                "        <label class='clickable' for=" + "task" + data.tasks[j].idTask + ">" + data.tasks[j].name + "</label>\n" +
                                "        <input class='clickable mr-1' type=\"checkbox\" id=" + "task" + data.tasks[j].idTask + " name=" + "task" + data.tasks[j].idTask + " " + isComplete(data.tasks[j].complete) + " disabled >\n" +
                                "    </div>\n" +
                                "</li>";
                        }
                    }
                }
                $('#add_list').after("<section id=\"" + data.lists[i].idList + "\" class=\"list-container clickable flex flex-column m-1 list-user\">\n" +
                    "            <article class=\"p-05 h-100 flex flex-column\">\n" +
                    "                <div class=\"flex flex-row justify-between\">\n" +
                    "                    <h2>" + data.lists[i].name + "</h2>\n" +
                    "                    <p>" + date.getDate() + '/' + month + '/' + date.getFullYear() + "</p>\n" +
                    "                </div>\n" +
                    "                <ul class=\"flex flex-column h-100 overflow-scroll-y tasks-list-home clickable\">\n" +
                    tasks +
                    "                </ul>\n" +
                    "            </article>\n" +
                    "        </section>");
            }
            $('#add_list').click(addList);

            $('.list-user').click(function () {
                seeList(this.id);
            });
        }
    });
}


;