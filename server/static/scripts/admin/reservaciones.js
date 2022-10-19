console.log(tickets)
    for(let i = 0; i < tickets.length; i++){
        
        var ticket = tickets[i];
        var ticketID = ticket.ticketId;
        var username = ticket.username;
        var objetoID = ticket.objectId;
        var fecha_inicio = ticket.startDate;
        var fecha_fin = ticket.endDate;
        var fechaInicio = fecha_inicio.split(" ");
        var fechaFin = fecha_fin.split(" ");
        var userId = ticket.userId;
        console.log(fechaInicio);

        let the = `<div class="single_row_user" id="`+ ticketID +`" >
                        <p id="ticketId"> `+ ticketID +`</p>
                        <input type="text" value="` + username + `" id="username">
                        <input type="text" value="` + objetoID + `" id="objeto">
                        <input type="date" value="` + fechaInicio[0] + `" id="fecha_inicio">
                        <input type="date" value="` + fechaFin[0] + `" id="fecha_fin">
                        
                        <div><button id="row_delete" onclick="delete_button('`+ ticketID +` `+userId+`');">Delete</button></div>
                        <div><button id="row_save" onclick="save_button('`+ticketID+`');">Save</button></div>
                    </div>
                    <br>`;
        $('#contenedortodo').append(the);
        console.log("lol");
    }


    function move_rows(id_val){
        $(`#${id_val}`).remove();
    }

    function delete_button(id_val ){
        if (confirm ("¿Estás seguro de que quieres eliminar este objeto?")) {
            setTimeout(move_rows, 800, id_val);
            var temp = id_val.split(" ");
            console.log("deleted " + temp[0]);
            console.log("deleted " + temp[1]);
        $.ajax({
            url: '/api/deleteTicket', //cambiar esto por la ruta del servidor y añadir bien el json
            type: 'POST',
            data: JSON.stringify({ "ticketId" : temp[0], "userId" : temp[1] }), 
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
            url: '/api/editTicket', //cambiar esto por la ruta del servidor y añadir bien el json
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