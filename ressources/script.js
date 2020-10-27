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

// TDL

$(function () {
    home();
   
})

/*affichage html TDL*/


/*récupération des données + affichage*/

// ADD LISTE

/*button ajouter liste*/
/*requete de creation*/
/*récupération de l'id de créatoin*/

// AFFICHAGE LISTE

/*récupération des données*/
/*Affichage des données*/
/*Edition des tâche en temps réel*/

/*Ajout d'un input 'add_task*/


function loadTask(id, name, date, complete) {
    let taskDate = new Date(date);
    let month = taskDate.getMonth() + 1;
    $('#add_task').before("<li  id='" + id + "' class='flex flex-row my-1 align-center justify-around'>" +
        "<i class=\"fas fa-arrows-alt-v grab_arrows box-shadow grey-color grabable\"></i>" +
        "<label class='flex-grow-1' for=\"newtask-check\">" +
        "   <input class='input_task ml-1 w-90' id='" + id + "' value='" + name + "'>" +
        "</label>" +
        "<p>" + taskDate.getDate() + '/' + month + '/' + taskDate.getFullYear() + "</p>" +
        "<input id='newtask-check' name='newtask-check' type='checkbox' " + isComplete(complete) + ">" +
        "<button class='background-white border-black deleteTask' ><i class=\"fas fa-trash-alt\"></i></button>" +
        "</li>");
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
                    "<button id=\"home_button\" class=\"absolute absolute-left ml-1 my-auto border-black clickable\"><i\n" +
                    "                    class=\"fas fa-arrow-circle-left icon\"></i></button>"
                )
                $('#header').append(
                    "<button id=\"see_users\" class=\"absolute absolute-right mr-1 my-auto border-black clickable\">" +
                    "<i class=\"fas fa-ellipsis-v\"></i></button>"
                )

                $('#home_button').click(function () {
                    home();
                    $("#home_button").remove();
                    $("#see_users").remove();
                })
                //DONNEES
                $.ajax({
                    url: 'API/todolistAPI.php?param=GetList',
                    method: "POST",
                    data: {id: id},
                    dataType: "json",
                    success: (data) => {
                        $('#header_titre').html("<input id=\"list" + data[0].idList + "\" name='title_list' class='no-border text-center font-big title_list' placeholder='" + data[0].listName + "'>");
                        for (let i = 0; i < data.length; i++) {
                            loadTask(data[i].idTask, data[i].taskName, data[i].taskDate, data[i].taskComplete);
                        }
                        //si keyup sur task --> update
                        $('.input_task').keyup(function () {
                            let idTask = $(this).parent().parent().attr('id');
                            let nameTask = $(this).val();
                            $.ajax({
                                url: 'API/todolistAPI.php?param=updateTask',
                                method: "POST",
                                data: {id: idTask, name: nameTask},
                                dataType: "json",
                                success: (data) => {
                                }
                            })
                        })
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
                        })
                        $('#new_task').click(function()
                            {
                                let task_value = $('#add_task').val();                                       
                                $.ajax(
                                    {
                                        url : 'API/todolistAPI.php?param=addtask',
                                        type : 'POST',
                                        data : {name : task_value, id : listId},
                                        dataType : 'json',
                                        success : (data) =>
                                            {                                                            
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
                                            }
                                    });
                            });
                        //si checkbox --> update*
                        //si checkbox 1 --> name barré
                        //si unfocus sur task et vide --> supprimer
                    }
                })
            }
        }
    );
}

function addList() {
    //appartition bouton création
    $(document.body).append("<section id='pop-up-background' class='z-index-3 absolute flex flex-column justify-center align-center'>" +
        "<div id='pop-up-content' class='m-1 background-white p-05 box-shadow'>" +
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
    //génère données
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
                    if (data.tasks[j].list_idList == data.lists[i].idList) {
                        if (data.tasks[j].name) {
                            tasks += "<li class=\"my-05\">\n" +
                                "    <div class=\"flex flex-row justify-between\" >\n" +
                                "        <label for=" + "task" + data.tasks[j].idTask + ">" + data.tasks[j].name + "</label>\n" +
                                "        <input type=\"checkbox\" id=" + "task" + data.tasks[j].idTask + " name=" + "task" + data.tasks[j].idTask + " " + isComplete(data.tasks[j].complete) + " disabled >\n" +
                                "    </div>\n" +
                                "</li>";
                        }
                    }
                }
                $('#add_list').after("<section id=\"" + data.lists[i].idList + "\" class=\"list-container box-shadow clickable flex flex-column m-1 list-user\">\n" +
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
                seeList(this.id);
            });
        }
    });
}


;