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
    let the = `<div class="single_row_user" id="`+ roomName + `">
                        <p id="prefijo">`+ roomLabel +` </p>
                        <p id="nombreObjeto">`+ roomName + `</p>

                        <p id="descripcionObjeto">`+ roomDescription + `</p>
                        <input type="number" name="cantidad" id="cantidad" class="numero">
                        <p id="tipo"> `+ roomLocation + ` </p>
                        <div class="checkbox">
                                    <input type="checkbox" name="disponible" id="disponible" class="checkbox">
                        </div>
                        
                        <div><button id="row_delete" onclick="delete_button('`+ roomName + `');">Delete</button></div>
                        <div><button id="row_save" onclick="save_button('$`+ roomName + `');">Save</button></div>
                    </div>
                    <br>`;
        $('.div_list_users').append(the);
        console.log("lol");
    
}



function move_rows(id_val){
    $(`#${id_val}`).remove();
}
// div div objs display: none
// animation make smaller row div
// delete the div
function delete_button(id_val){
    anime({
        targets: `#${id_val}`,
        translateX: 1500,
        easing: "easeInOutCubic"
    });
    setTimeout(move_rows, 800, id_val);
}

function save_button(id_val){
    alert("saved " + id_val)
    location.reload(true);
}


function block_button(id_val){
    alert("blocked " + id_val)
    location.reload(true);
}
