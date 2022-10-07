
    var username_list = ["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9", "user10"];
    var objeto_list_id = ["objeto1", "objeto2", "objeto3", "objeto4", "objeto5", "objeto6", "objeto7", "objeto8", "objeto9", "objeto10"];
    var fecha_inicio_list = ["11/10/2022","11/11/2022", "11/12/2022", "11/13/2022", "11/14/2022", "11/15/2022", "11/16/2022", "11/17/2022", "11/18/2022", "11/19/2022"];
    var fecha_fin_list = ["11/10/2022","11/11/2022", "11/12/2022", "11/13/2022", "11/14/2022", "11/15/2022", "11/16/2022", "11/17/2022", "11/18/2022", "11/19/2022"];

    for(let i = 0; i < tickets; i++){
        var tickets = tickets[i];
        var ticketID = tickets.ticketId;
        var username = tickets.username;
        var objetoID = tickets.objectId;
        var fecha_inicio = tickets.startDate;
        var fecha_fin = tickets.endDate;

        let the = `<div class="single_row_user" id="`+ ticketID +`" >
                        <p id="ticketId"> `+ ticketID +`</p>
                        <input type="text" value="` + username + `" id="username">
                        <input type="text" value="` + objetoID + `" id="objeto">
                        <input type="date" value="` + fecha_inicio + `" id="fecha_inicio">
                        <input type="date" value="` + fecha_fin + `" id="fecha_fin">
                        
                        <div><button id="row_delete" onclick="delete_button('${objeto_list_id[i]}');">Delete</button></div>
                        <div><button id="row_save" onclick="save_button('${objeto_list_id[i]}');">Save</button></div>
                    </div>
                    <br>`;
        $('.div_list_users').append(the);
        console.log("lol");
    }




    function delete_button(id_val){
        if (confirm ("¿Estás seguro de que quieres eliminar este objeto?")) {
        anime({
            targets: `#${id_val}`,
            translateX: 1500,
            easing: "easeInOutCubic"
        });
        setTimeout(move_rows, 800, id_val);
        $.ajax({
            url: 'api/edit/software', //cambiar esto por la ruta del servidor y añadir bien el json
            type: 'POST',
            data: JSON.stringify({ "ticketID " : ticketID }),
            contentType: "application/json",
            dataType: "json",
            success: function(data){
                alert(data);
            }
        });
    }
    }
    
    function save_button(id_val){
        if (confirm ("¿Estás seguro de que quieres guardar los cambios?")) {
        
        $.ajax({
            url: 'api/edit/software', //cambiar esto por la ruta del servidor y añadir bien el json
            type: 'POST',
            data: JSON.stringify({ "ticketID " : ticketID, "username" : username, "objetoID" : objetoID, "fecha_inicio" : fecha_inicio, "fecha_fin" : fecha_fin }),
            contentType: "application/json",
            dataType: "json",
            success: function(data){
                alert(data);
            }
        });
        
    }
    }