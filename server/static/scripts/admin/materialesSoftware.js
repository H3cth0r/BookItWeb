
for (var i = 0; i < softW.length; i++) {
    var software = softW[i];
    var softwareName = software.name;
    var softwareBrand = software.brand;
    var softwareOS = software.operativeSystem;
    var softwareDescription = software.description;
    var softwarePrefix = software.prefix;
    var softwareMaxDays = software.maxDays;
    var softwareQuantity = software.quantity;
    var softwareID = software.classId;
            let the = `<div class="single_row_user" id="` + softwareID + `">

                        <input type="text" value="` + softwarePrefix + ` " id ="prefijo"> 
                        <input type="text" value="` + softwareName + `" id="nombreObjeto">
                        <textarea rows="2" cols="10"  id="descripcionObjeto">` + softwareDescription + `</textarea>
                        <input type="number" name="cantidad" id="cantidad" class="numero" value=` + softwareQuantity + `>
                        <p id="tipo"> Software </p>
                        <input type="text" value="` + softwareOS + `" id="sistema">
                        <div class="checkbox">
                                    <input type="checkbox" name="disponible" id="disponible" class="checkbox" >
                        </div>
                        
                        <div><button id="row_delete" onclick="delete_button('` + softwareID + `');">Delete</button></div>
                        <div><button id="row_save" onclick="save_button('` + softwareID + `');">Save</button></div>
                    </div>
                    <br>`;
        $('#contenedortodo').append(the);
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
   /* anime({
        targets: `#${id_val}`,
        translateX: 1500,
        easing: "easeInOutCubic"
    });*/
    setTimeout(move_rows, 800, id_val);
    $.ajax({
        url: '/api/deleteSoftwareClass', //cambiar esto por la ruta del servidor y añadir bien el json
        type: 'POST',
        data: JSON.stringify({ "classId" : id_val }),
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
        url: 'api/editSoftware', //cambiar esto por la ruta del servidor y añadir bien el json
        type: 'POST',
        data: JSON.stringify({ "classId" : softwareID }), 
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

