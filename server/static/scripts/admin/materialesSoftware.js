
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
    var softwareAvailability = software.availability;
    console.log(softwareAvailability);
            let the = `<div class="single_row_user" id="` + softwareID + `">

                        <input type="text" value="` + softwarePrefix + ` " id ="prefijo" class="prefijo` + softwareID + `">
                        <input type="text" value="` + softwareName + `" id="nombreObjeto" class="nombreObjeto` + softwareID + `">
                        <textarea rows="2" cols="10"  id="descripcionObjeto" class="descripcionObjeto` + softwareID + `">` + softwareDescription + `</textarea>
                        <input type="number" name="cantidad" id="numero" class="numero` + softwareID + `" value="` + softwareQuantity + `">
                        
                        <p id="tipo"> Software </p>
                        <input type="text" value="` + softwareOS + `" id="sistema" class="sistema` + softwareID + `">
                        <div class="checkbox">
                                    <input type="checkbox" name="disponible" id="disponible" class="checkbox2` + softwareID + `">
                        </div>
                        
                        <div><button id="row_delete" onclick="delete_button('` + softwareID + `');">Delete</button></div>
                        <div><button id="row_save" onclick="save_button('` + softwareID + `');">Save</button></div>
                    </div>
                    <br>`;
        $('#contenedortodo').append(the);
        console.log("lol");
        checkDisponible(softwareID);
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
    var nombreObjetoSend = $(".nombreObjeto" + id_val).val();
    var descripcionObjetoSend = $(".descripcionObjeto" + id_val).val();
    var numeroSend = $(".numero" + id_val).val();
    var prefijoSend = $(".prefijo" + id_val).val();
    var disponibleSend = $(".checkbox2" + id_val).is(":checked");
    
    var sistemaSend = $(".sistema" + id_val).val();


    
    $.ajax({
        url: '/api/editSoftware', //cambiar esto por la ruta del servidor y añadir bien el json
        type: 'POST',
        data: JSON.stringify({ "classId" : id_val , "name" : nombreObjetoSend, "description" : descripcionObjetoSend, "quantity" : numeroSend, "prefix" : prefijoSend , "availability" : disponibleSend, "operativeSystem" : sistemaSend }),
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

function checkDisponible (id_val){
    if (softwareAvailability == 1){
        $(".checkbox2" + id_val).prop("checked", true);
    }
    else{
        $(".checkbox2" + id_val).prop("checked", false);
    }
}
    
