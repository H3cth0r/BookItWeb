for (var i = 0; i < hardW.length; i++) {
    var hardware = hardW[i];
    var hardwareName = hardware.name;
    var hardwareOS = hardware.operativeSystem;
    var hardwareDescription = hardware.description;
    var hardwarePrefix = hardware.prefix;
    var hardwareMaxDays = hardware.maxDays;
    var hardwareQuantity = hardware.quantity;
    var hardwareID = hardware.classId;

    let the = `<div class="single_row_user" id="`+ hardwareID +`">
      
                        <input type="text" value="`+ hardwarePrefix +`" id="prefijo">
                        <input type="text" value="`+ hardwareName +`" id="nombreObjeto">
                        <label for="descripcion">Descripcion</label>
                        <textarea rows="2" cols="10" value="`+ hardwareDescription +`" id="descripcionObjeto"></textarea>
                        <input type="number" name="cantidad" id="cantidad" class="numero" value = `+ hardwareQuantity +`>
                        <p> id="tipo"> Hardware </p>
                        <input type="text" value"`+ hardwareOS +`" id="tipo">
                        <div class="checkbox">
                                    <input type="checkbox" name="disponible" id="disponible" class="checkbox">
                        </div>
                        
                        <div><button id="row_delete" onclick="delete_button('`+ hardwareID +`');">Delete</button></div>
                        <div><button id="row_save" onclick="save_button('`+ hardwareID +`s');">Save</button></div>
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
    if (confirm ("¿Estás seguro de que quieres eliminar este objeto?")) {
    anime({
        targets: `#${id_val}`,
        translateX: 1500,
        easing: "easeInOutCubic"
    });
    setTimeout(move_rows, 800, id_val);
    $.ajax({ 
        url: 'api/edit/hardware', //cambiar esto por la ruta del servidor y añadir bien el json
        type: 'POST',
        data: JSON.stringify({ "classId" : hardwareID }),
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
    alert("saved " + id_val)
    $.ajax({ 
    url: 'api/edit/hardware', //cambiar esto por la ruta del servidor y añadir bien el json
    type: 'POST',
    data: JSON.stringify({ "name" : hardwareName, "description" : hardwareDescription, "prefix" : hardwarePrefix, "maxDays" : hardwareMaxDays, "quantity" : hardwareQuantity, "operativeSystem" : hardwareOS, "classId" : hardwareID }),
    contentType: "application/json",
    dataType: "json",
    success: function(data){
        alert(data);
    }

    });
}
}

function add_button(){
    window.location.href = "/admin/nuevoObjeto" //añadir ruta de la página de añadir objeto
}