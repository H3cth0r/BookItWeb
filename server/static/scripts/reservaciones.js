
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
                        
                        <div><button id="row_delete" onclick="delete_button('`+ ticketID +`');">Delete</button></div>
                        <div><button id="row_save" onclick="save_button('`+ticketID+`');">Save</button></div>
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