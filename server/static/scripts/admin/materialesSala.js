/*{
  "roomId":1,
  "name":"Sala de Conferencias 01",
  "location":"Hub de Ciberseguridad, piso 3.",
  "label":"SC01",
  "description":"Sala de conferencias, apta para presentaciones ejecutivas a un público grande.",
  "capacity":40,
  "availability":true,
  "maxDays":"12"
}*/


for (var i = 0; i < rooms.length; i++) {
    var room = rooms[i];
    var roomName = room.name;
    var roomLocation = room.location;
    var roomCapacity = room.capacity;
    var roomAvailability = room.availability;
    var roomMaxDays = room.maxDays;
    var roomDescription = room.description;
    var roomLabel = room.label;
    var roomID = room.roomId;
    console.log(roomID);
    let the = `<div class="single_row_user" id="`+ roomID + `">
                        <input type="text" value="`+ roomLabel +` " id="prefijo" class="prefijo`+ roomID +`" disabled>
    
                        
                        <textarea rows="2" cols="10" class="nombreObjeto`+ roomID +`"  id="nombreObjeto">`+ roomName + `</textarea>
                        <textarea rows="2" cols="10"  id="descripcionObjeto" class="descripcionObjeto`+ roomID +`">` + roomDescription +  `</textarea>
                        
                        <input type="number" name="cantidad" id="cantidad" class="numero`+ roomID +`" value=`+roomCapacity+`>

                        <textarea rows="2" cols="10"  id="tipo" class="location`+ roomID +`">` + roomLocation +  `</textarea>
                        <div class="checkbox">
                                    <input type="checkbox" name="disponible" id="disponible`+ roomID + `" class="checkbox`+ roomID +`">
                        </div>
                        
                        <div><button id="row_delete" onclick="delete_button('`+ roomID + `');">Delete</button></div>
                        <div><button id="row_save" onclick="save_button('`+ roomID + `');">Save</button></div>
                    </div>
                    <br>`;
        $('#contenedortodo').append(the);
        console.log("lol");
        checkDisponible(roomID);
    
}



function move_rows(id_val){
    $(`#${id_val}`).remove();
}
// div div objs display: none
// animation make smaller row div
// delete the div
function delete_button(id_val){
    if (confirm ("¿Estás seguro de que quieres eliminar esta sala?")) {
   /* anime({
        targets: `#${id_val}`,
        translateX: 1500,
        easing: "easeInOutCubic"
    });*/
    
    setTimeout(move_rows, 800, id_val);
    console.log(id_val);
    $.ajax({
        url: '/api/deleteRooms', //cambiar esto por la ruta del servidor y añadir bien el json
        type: 'POST',
        data: JSON.stringify({ "roomId" : id_val }), //que victor me diga que mandarle al servidor o que revise porque no se borra
        contentType: "application/json",
        dataType: "json",
        success: function(data){
            alert(data);
        }

    
        });
}
    //location.reload(true);
}


function save_button(id_val){
    if (confirm ("¿Estás seguro de que quieres guardar los cambios?")) {
        console.log(id_val);
    var nombreObjetoSend = $(".nombreObjeto"+id_val).val();
    var descripcionObjetoSend = $(`.descripcionObjeto`+id_val).val();
    var numeroSend = $(`.numero`+id_val).val();
    var locationSend = $(`.location`+id_val).val();
    var prefijoSend = $(`.prefijo`+id_val).val();
    var disponibleSend = $(`.checkbox`+id_val).is(":checked");


    $.ajax({
        url: '/api/editRooms', //cambiar esto por la ruta del servidor y añadir bien el json
        type: 'POST',
        data: JSON.stringify({ "roomId" : id_val, "name" : nombreObjetoSend, "description" : descripcionObjetoSend, "capacity" : numeroSend, "location" : locationSend, "label" : prefijoSend, "availability" : disponibleSend }), //que victor me diga que mandarle al servidor o que revise porque no se borra
        contentType: "application/json",
        dataType: "json",
        success: function(data){
            alert(data);
        }
    
        });
}
    //location.reload(true);
}
function checkDisponible(id_val){
    if (roomAvailability == true){
        document.getElementById(`disponible`+id_val).checked = true;
    }
    else{
        document.getElementById(`disponible`+id_val).checked = false;
    }
}

function add_button(){
    window.location.href = "/admin/nuevoObjeto" //añadir ruta de la página de añadir objeto
}