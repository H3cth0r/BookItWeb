for (var i = 0; i < hardW.length; i++) {
    var hardware = hardW[i];
    var hardwareName = hardware.name;
    var hardwareOS = hardware.operativeSystem;
    var hardwareDescription = hardware.description;
    var hardwarePrefix = hardware.prefix;
    var hardwareMaxDays = hardware.maxDays;
    var hardwareQuantity = hardware.quantity;
    var hardwareID = hardware.classId;
    var hardwareAvailability = hardware.availability;
    console.log(hardwareAvailability);

    let the = `<div class="single_row_user" id="`+ hardwareID +`">
      
                        <input type="text" value="`+ hardwarePrefix +`" id="prefijo" class="prefijo`+ hardwareID +`">
                        <input type="text" value="`+ hardwareName +`" id="nombreObjeto" class="nombreObjeto`+ hardwareID +`">
                        <textarea rows="2" cols="10" id="descripcionObjeto" class="descripcionObjeto`+ hardwareID +`">`+ hardwareDescription +`</textarea>
                        
                        <input type="number" name="cantidad" id="numero" class="numero`+ hardwareID +`" value = `+ hardwareQuantity +`>
                        <p id="tipo"> Hardware </p>
                        <input type="text" value="`+ hardwareOS +`" id="tipo" class="tipo`+ hardwareID +`">
                        <div class="checkbox" id="chechboxid">
                                    <input type="checkbox" name="disponible" id="disponible" value="true" class="disponible`+ hardwareID +`">
                        </div>
                        
                        <div><button id="row_delete" onclick="delete_button('`+ hardwareID +`');">Delete</button></div>
                        <div><button id="row_save" onclick="save_button('`+ hardwareID +`');">Save</button></div>
                    </div>
                    <br>`;
        $('#contenedortodo').append(the);
        console.log("lol");
        checkDisponible(hardwareID);
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
    console.log("deleted " + id_val);
    $.ajax({ 
        url: '/api/deleteHardwareClass', //cambiar esto por la 
        type: 'POST',
        data: JSON.stringify({ "classId" : id_val }), //que victor me diga que mandarle al servidor
        contentType: "application/json",
        dataType: "json",
        success: function(data){
            alert(data);
        }
    
        });
    location.reload();
}
}/*{
  "jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiQTAxNjU5ODkxQHRlYy5teCIsImZpcnN0TmFtZSI6IlBlcG8iLCJsYXN0TmFtZSI6IkxvcGV6IiwiYWRtaW4iOjAsImJsb2NrZWQiOjAsImV4cCI6MTY2NDgzMzc3N30.nCyDkEwjnaqLmFXbt61lsuOKjhlNd0cBBrkyahc1Ldg",
  "classId":1,
  "quantity":7,
  "name":"Mac Book Air",
  "operativeSystem":"macOS 12",
  "description":"CPU = M1\nRAM = 8GB\nSSD = 256GB",
  "prefix":"MACAMTR",
  "availability":true,
  "maxDays":"15"
}
'''*/
 
function save_button(id_val){
    console.log("saved " + id_val);
    var nombreObjeto = $(".nombreObjeto" + id_val).val();
    var descripcionObjeto = $(".descripcionObjeto" + id_val).val();
    var tipo = $(".tipo" + id_val).val();
    var numero = $(".numero" + id_val).val();
    var prefijo = $(".prefijo" + id_val).val();
    var availability = $(".disponible" + id_val).is(":checked");
    if (confirm ("¿Estás seguro de que quieres guardar los cambios?")) {
    
    $.ajax({ 
    url: '/api/editHardware', //cambiar esto por la ruta del servidor y añadir bien el json
    type: 'POST',
    data: JSON.stringify({"classId" : id_val, "quantity" : numero, "name" : nombreObjeto, "operativeSystem" : tipo, "description" : descripcionObjeto, "prefix" : prefijo, "availability" : availability}), //que victor me diga que mandarle al servidor 
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
    if (hardwareAvailability == 1){
        $(".disponible" + id_val).prop("checked", true);
    }
    else{
        $(".disponible" + id_val).prop("checked", false);
    }
}
    